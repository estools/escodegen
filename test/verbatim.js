/*
  Copyright (C) 2012-2013 Yusuke Suzuki <utatane.tea@gmail.com>

  Redistribution and use in source and binary forms, with or without
  modification, are permitted provided that the following conditions are met:

    * Redistributions of source code must retain the above copyright
      notice, this list of conditions and the following disclaimer.
    * Redistributions in binary form must reproduce the above copyright
      notice, this list of conditions and the following disclaimer in the
      documentation and/or other materials provided with the distribution.

  THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
  AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
  IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
  ARE DISCLAIMED. IN NO EVENT SHALL <COPYRIGHT HOLDER> BE LIABLE FOR ANY
  DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
  (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
  LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
  ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
  (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF
  THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/

'use strict';

var esprima = require('./3rdparty/esprima-1.0.0-dev'),
    escodegen = require('./loader'),
    chai = require('chai'),
    expect = chai.expect,
    StringData,
    ObjectData;

function make_eval(code) {
    return {
        type: 'CallExpression',
        callee: {
            type: 'Identifier',
            name: 'eval'
        },
        'arguments': [{
            type: 'Literal',
            value: code
        }],
        verbatim: code
    };
}

function runTest(expected, result, verbatim) {
    var actual, options;

    options = {
        indent: '    ',
        directive: true,
        parse: esprima.parse,
        verbatim: verbatim
    };

    expect(function () {
        actual = escodegen.generate(result, options);
    }).not.to.be.throw();
    expect(expected).to.be.equal(actual);
}

StringData = {
    'DISABLED': {
        "eval('foo');": {
            type: 'ExpressionStatement',
            expression: make_eval('foo')
        }
    },

    'verbatim': {
        // Check it doesn't apply to statements
        "continue;": {
            type: 'ContinueStatement',
            verbatim: 'FOOBARBAZ'
        },
        "foo;": {
            type: 'ExpressionStatement',
            expression: make_eval('foo')
        },
        "true && (foo)": {
            type: 'BinaryExpression',
            operator: '&&',
            left: { type: 'Literal', value: true },
            right: make_eval('foo')
        },
        "var a = (window.location.href);": {
            type: 'VariableDeclaration',
            kind: 'var',
            declarations: [{
                type: 'VariableDeclarator',
                id: { type: 'Identifier', name: 'a' },
                init: make_eval('window.location.href')
            }]
        },
        // Multiline
        "if (true) {\n    foo('bar');\n    foo('baz');\n}": {
            type: 'IfStatement',
            test: { type: 'Literal', value: true },
            consequent: {
                type: 'BlockStatement',
                body: [{
                    type: 'ExpressionStatement',
                    expression: make_eval("foo('bar');\nfoo('baz')")
                }]
            }
        },
        // Embedded into sequences
        "foo(a, (10, 20), b)": {
            type: 'CallExpression',
            callee: { type: 'Identifier', name: 'foo' },
            arguments: [{
                type: 'Identifier',
                name: 'a'
            },
            make_eval('10, 20'),
            {
                type: 'Identifier',
                name: 'b'
            }]
        },
        // Floating point
        "(0).a": {
            type: 'MemberExpression',
            object: { type: 'Literal', value: 0, verbatim: '0' },
            property: { type: 'Identifier', name: 'a' },
            computed: false
        }
    }
};

describe('verbatim string test', function () {
    var data = StringData;
    Object.keys(data).forEach(function (category) {
        it(category, function () {
            Object.keys(data[category]).forEach(function (source) {
                var expected = data[category][source];
                runTest(source, expected, category);
            });
        });
    });
});

ObjectData = {
    'verbatim': {
        // Floating point
        "(0).a": {
            type: 'MemberExpression',
            object: { type: 'Literal', value: 0, verbatim: { content: '0' } },
            property: { type: 'Identifier', name: 'a' },
            computed: false
        },
        "([]).a": {
            type: 'MemberExpression',
            object: { type: 'Literal', verbatim: { content: '[]' } },
            property: { type: 'Identifier', name: 'a' },
            computed: false
        },
        "[].a": {
            type: 'MemberExpression',
            object: { type: 'Literal', verbatim: { content: '[]', precedence: escodegen.Precedence.Primary } },
            property: { type: 'Identifier', name: 'a' },
            computed: false
        }
    }
};

describe('verbatim object test', function () {
    var data = ObjectData;
    Object.keys(data).forEach(function (category) {
        it(category, function () {
            Object.keys(data[category]).forEach(function (source) {
                var expected = data[category][source];
                runTest(source, expected, category);
            });
        });
    });
});
/* vim: set sw=4 ts=4 et tw=80 : */
