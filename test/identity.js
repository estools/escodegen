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

var fs = require('fs'),
    esprima = require('./3rdparty/esprima-1.0.0-dev'),
    escodegen = require('./loader'),
    chai = require('chai'),
    expect = chai.expect,
    fixtures;

function slug(name) {
    return name.toLowerCase().replace(/\s/g, '-');
}

function adjustRegexLiteral(key, value) {
    if (key === 'value' && value instanceof RegExp) {
        value = value.toString();
    }
    return value;
}

fixtures = [
    'jQuery 1.7.1',
    'jQuery 1.6.4',
    'jQuery.Mobile 1.0',
    'Prototype 1.7.0.0',
    'Prototype 1.6.1',
    'Ext Core 3.1.0',
    'Ext Core 3.0.0',
    'MooTools 1.4.1',
    'MooTools 1.3.2',
    'Backbone 0.5.3',
    'Underscore 1.2.3'
];

function testIdentity(code) {
    var expected, tree, actual, options, commentOptions, commentTree, StringObject, err;

    // alias, so that JSLint does not complain.
    StringObject = String;

    // once
    options = {
        comment: false,
        range: false,
        loc: false,
        tokens: false,
        raw: false
    };

    tree = esprima.parse(code, options);
    expected = JSON.stringify(tree, adjustRegexLiteral, 4);
    tree = esprima.parse(escodegen.generate(tree), options);
    actual = JSON.stringify(tree, adjustRegexLiteral, 4);
    expect(actual).to.be.equal(expected);

    // second, attachComments
    commentOptions = {
        comment: true,
        range: true,
        loc: false,
        tokens: true,
        raw: false
    };

    commentTree = esprima.parse(code, commentOptions);
    commentTree = escodegen.attachComments(commentTree, commentTree.comments, commentTree.tokens);
    tree = esprima.parse(escodegen.generate(commentTree), options);
    actual = JSON.stringify(tree, adjustRegexLiteral, 4);
    expect(actual).to.be.equal(expected);
}

describe('identity test', function () {
    fixtures.forEach(function (filename) {
        it(filename, function () {
            var source = fs.readFileSync(__dirname + '/3rdparty/' + slug(filename) + '.js', 'utf-8'),
                size = source.length;
            testIdentity(source);
        });
    });
});
/* vim: set sw=4 ts=4 et tw=80 : */
