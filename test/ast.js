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

var data,
    esprima = require('./3rdparty/esprima-1.0.0-dev'),
    escodegen = require('./loader'),
    chai = require('chai'),
    expect = chai.expect;

data = {
    'RegExp string': [
        {
            type: 'Program',
            body: [{
                type: 'ExpressionStatement',
                expression: {
                    type: 'Literal',
                    value: new RegExp('///')
                },
            }],
            expected: '/\\/\\/\\//;'
        },
        {
            type: 'Program',
            body: [{
                type: 'ExpressionStatement',
                expression: {
                    type: 'Literal',
                    value: new RegExp('///', 'i')
                },
            }],
            expected: '/\\/\\/\\//i;'
        },
        {
            type: 'Program',
            body: [{
                type: 'ExpressionStatement',
                expression: {
                    type: 'Literal',
                    value: /\n/i
                },
            }],
            expected: '/\\n/i;'
        },
        {
            type: 'Program',
            body: [{
                type: 'ExpressionStatement',
                expression: {
                    type: 'Literal',
                    value: /\r/i
                },
            }],
            expected: '/\\r/i;'
        },
        {
            type: 'Program',
            body: [{
                type: 'ExpressionStatement',
                expression: {
                    type: 'Literal',
                    value: new RegExp('\u2028', 'i')
                },
            }],
            expected: '/\\u2028/i;'
        },
        {
            type: 'Program',
            body: [{
                type: 'ExpressionStatement',
                expression: {
                    type: 'Literal',
                    value: new RegExp('\u2029', 'i')
                },
            }],
            expected: '/\\u2029/i;'
        },
        {
            type: 'Program',
            body: [{
                type: 'ExpressionStatement',
                expression: {
                    type: 'Literal',
                    value: new RegExp('\\\\', 'i')
                },
            }],
            expected: '/\\\\/i;'
        },
        {
            type: 'Program',
            body: [{
                type: 'ExpressionStatement',
                expression: {
                    type: 'Literal',
                    value: new RegExp('\\\u2028', 'i')
                },
            }],
            expected: '/\\u2028/i;'
        },
        {
            type: 'Program',
            body: [{
                type: 'ExpressionStatement',
                expression: {
                    type: 'Literal',
                    value: new RegExp('\\\\u2028', 'i')
                },
            }],
            expected: '/\\\\u2028/i;'
        },
        {
            type: 'Program',
            body: [{
                type: 'ExpressionStatement',
                expression: {
                    type: 'Literal',
                    value: {
                        toString: function() { return new RegExp('', 'i').toString(); },
                        source: ''
                    }
                },
            }],
            expected: '/(?:)/i;'
        },
        {
            type: 'Program',
            body: [{
                type: 'ExpressionStatement',
                expression: {
                    type: 'MemberExpression',
                    computed: false,
                    object: {
                        type: 'Literal',
                        value: 1,
                        raw: '1'
                    },
                    property: {
                        type: 'Identifier',
                        name: 'a'
                    }
                }
            }],
            expected: '1 .a;'
        },
    ]
};

function runTest(ast, expected) {
    var actual, options;

    options = {
        indent: '    ',
        parse: esprima.parse
    };

    actual = escodegen.generate(ast, options);
    expect(actual).to.be.equal(expected);
}

describe('AST', function () {
    Object.keys(data).forEach(function (category) {
        it(category + ' test', function () {
            data[category].forEach(function (ast) {
                runTest(ast, ast.expected);
            });
        });
    });
});
/* vim: set sw=4 ts=4 et tw=80 : */
