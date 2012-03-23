/*
  Copyright (C) 2012 Yusuke Suzuki <utatane.tea@gmail.com>

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

/*jslint browser:true node:true */
/*global escodegen:true, esprima:true*/

var data = [{
    options: {
        format: {
            base: 2,
            indent: '    '
        }
    },
    items : {
        '        test': 'test'
    }
}, {
    options: {
        format: {
            base: 4,
            indent: '\t'
        }
    },
    items : {
        '\t\t\t\ttest': 'test'
    }
}, {
    options: {
        base: '  ',
        format: {
            base: 4,
            indent: '\t'
        }
    },
    items : {
        '  test': 'test'
    }
}];

(function () {
    'use strict';

    var total = 0,
        failures = [],
        tick = new Date(),
        header,
        escodegen,
        esprima;

    if (typeof window === 'undefined') {
        esprima = require('./3rdparty/esprima');
        escodegen = require('../escodegen');
    }

    function adjustRegexLiteral(key, value) {
        if (key === 'value' && value instanceof RegExp) {
            value = value.toString();
        }
        return value;
    }

    function NotMatchingError(expected, actual) {
        Error.call(this, 'Expected ');
        this.expected = expected;
        this.actual = actual;
    }
    NotMatchingError.prototype = new Error();

    function runTest(options, source, expected) {
        var tree, actual;
        try {
            tree = esprima.parse(source, options);
            expected = JSON.stringify(tree, adjustRegexLiteral, 4);
            tree = esprima.parse(esprima.generate(tree), options);
            actual = JSON.stringify(tree, adjustRegexLiteral, 4);
        } catch (e) {
            throw new NotMatchingError(expected, e.toString());
        }
        if (expected !== actual) {
            throw new NotMatchingError(expected, actual);
        }
    }

    data.forEach(function (category) {
        var options = category.options;
        Object.keys(category.items).forEach(function (source) {
            var expected = category.items[source];
            total += 1;
            try {
                runTest(options, source, expected);
            } catch (e) {
                e.source = source;
                failures.push(e);
            }

        });
    });
    tick = (new Date()) - tick;

    header = total + ' tests. ' + failures.length + ' failures. ' +
        tick + ' ms';
    if (failures.length) {
        console.error(header);
        failures.forEach(function (failure) {
            console.error(failure.source + ': Expected\n    ' +
                failure.expected.split('\n').join('\n    ') +
                '\nto match\n    ' + failure.actual);
        });
    } else {
        console.log(header);
    }
    process.exit(failures.length === 0 ? 0 : 1);
}());
/* vim: set sw=4 ts=4 et tw=80 : */
