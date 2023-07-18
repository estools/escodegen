/*
  Copyright (C) 2012-2013 Yusuke Suzuki <utatane.tea@gmail.com>
  Copyright (C) 2020 Apple Inc. All rights reserved.

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

import fs from 'fs';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import * as acorn from 'acorn';
import chai from 'chai';
import chaiExclude from 'chai-exclude';
import escodegen from './loader.js';

const __dirname = dirname(fileURLToPath(import.meta.url));

chai.use(chaiExclude);

function test(code, expected) {
    var tree, actual, actualTree, options;

    options = {
        ranges: false,
        locations: false,
        ecmaVersion: 12
    };

    tree = acorn.parse(code, options);

    // for UNIX text comment
    actual = escodegen.generate(tree);
    actualTree = acorn.parse(actual, options);

    expect(actual).to.be.equal(expected);
    expect(tree).excludingEvery(['start', 'end', 'raw']).to.deep.equal(actualTree);
}

function testMin(code, expected) {
    var tree, actual, actualTree, options;

    options = {
        ranges: false,
        locations: false,
        ecmaVersion: 12
    };

    tree = acorn.parse(code, options);

    // for UNIX text comment
    actual = escodegen.generate(tree, {
        format: escodegen.FORMAT_MINIFY,
        raw: false
    }).replace(/[\n\r]$/, '') + '\n';
    actualTree = acorn.parse(actual, options);

    expect(actual).to.be.equal(expected);
    expect(tree).excludingEvery(['start', 'end', 'raw']).to.deep.equal(actualTree);
}

describe('compare acorn es2021 test', function () {
    fs.readdirSync(__dirname + '/compare-acorn-es2021').sort().forEach(function(file) {
        var code, expected, exp, min;
        if (/\.js$/.test(file) && !/expected\.js$/.test(file) && !/expected\.min\.js$/.test(file)) {
            it(file, function () {
                exp = file.replace(/\.js$/, '.expected.js');
                min = file.replace(/\.js$/, '.expected.min.js');
                code = fs.readFileSync(__dirname + '/compare-acorn-es2021/' + file, 'utf-8');
                expected = fs.readFileSync(__dirname + '/compare-acorn-es2021/' + exp, 'utf-8');
                test(code, expected);
                if (fs.existsSync(__dirname + '/compare-acorn-es2021/' + min)) {
                    expected = fs.readFileSync(__dirname + '/compare-acorn-es2021/' + min, 'utf-8');
                    testMin(code, expected);
                }
            });
        }
    });
});
/* vim: set sw=4 ts=4 et tw=80 : */
