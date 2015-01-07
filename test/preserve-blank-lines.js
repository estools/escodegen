/*
 Copyright (C) 2011-2013 Yusuke Suzuki <utatane.tea@gmail.com>
 Copyright (C) 2014 Kevin Barabash <kevinb7@gmail.com>

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
    esprima = require('esprima'),
    escodegen = require('./loader'),
    chai = require('chai'),
    expect = chai.expect;

function test(code, expected) {
    var tree, actual, options, StringObject;

    // alias, so that JSLint does not complain.
    StringObject = String;

    options = {
        range: true,
        tokens: true,
        comment: true
    };

    tree = esprima.parse(code, options);
    tree = escodegen.attachComments(tree, tree.comments, tree.tokens);

    options = {
        comment: true,
        sourceCode: code,
        format: {
            preserveBlankLines: true
        }
    };

    // for UNIX text comment
    actual = escodegen.generate(tree, options);
    expect(actual).to.be.equal(expected);
}

describe('preserve blank lines test', function () {
    fs.readdirSync(__dirname + '/preserve-blank-lines').sort().forEach(function(file) {
        var code, expected, p;
        if (/\.js$/.test(file) && !/expected\.js$/.test(file)) {
            it(file, function () {
                p = file.replace(/\.js$/, '.expected.js');
                code = fs.readFileSync(__dirname + '/preserve-blank-lines/' + file, 'utf-8');
                expected = fs.readFileSync(__dirname + '/preserve-blank-lines/' + p, 'utf-8');
                test(code, expected);
            });
        }
    });
});

/* vim: set sw=4 ts=4 et tw=80 : */
