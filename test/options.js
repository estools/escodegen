/*
  Copyright (C) 2012 Robert Gust-Bardon <donate@robert.gust-bardon.org>
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
        base: 2,
        indent: '    '
    },
    items: {
        'test': '        test;'
    }
}, {
    options: {
        base: 4,
        indent: '\t'
    },
    items: {
        'test': '\t\t\t\ttest;'
    }
}, {
    options: {
        base: '  ',
        format: {
            indent: {
                style: {
                    base: 4,
                    indent: '\t'
                }
            }
        }
    },
    items: {
        'test': '  test;'
    }
}, {
    options: {
        format: {
            json: false,
            renumber: false,
            hexadecimal: false
        },
        parse: true
    },
    items: {
        '42e-010': '42e-010;'
    }
}, {
    options: {
        format: {
            json: true,
            renumber: false,
            hexadecimal: false
        },
        parse: true
    },
    items: {
        '42e-010': '4.2e-9;'
    }
}, {
    options: {
        format: {
            json: false,
            renumber: true,
            hexadecimal: false
        },
        parse: true
    },
    items: {
        '42e-010': '42e-010;'
    }
}, {
    options: {
        format: {
            json: false,
            renumber: false,
            hexadecimal: false
        },
        parse: null
    },
    items: {
        '4.2e+500': '1e+400;',
        '1.7976931348623157e+308': '1.7976931348623157e+308;',
        '4.2e+100': '4.2e+100;',
        '1000000000001': '1000000000001;',
        '100000000001': '100000000001;',
        '42000': '42000;',
        '4200': '4200;',
        '420': '420;',
        '42': '42;',
        '4.2': '4.2;',
        '0': '0;',
        '0.42': '0.42;',
        '0.042': '0.042;',
        '0.0042': '0.0042;',
        '0.00042': '0.00042;',
        '4.2e-99': '4.2e-99;',
        '5e-324': '5e-324;'
    }
}, {
    options: {
        format: {
            json: true,
            renumber: false,
            hexadecimal: false
        },
        parse: null
    },
    items: {
        '4.2e+500': 'null;',
        '1.7976931348623157e+308': '1.7976931348623157e+308;',
        '4.2e+100': '4.2e+100;',
        '1000000000001': '1000000000001;',
        '100000000001': '100000000001;',
        '42000': '42000;',
        '4200': '4200;',
        '420': '420;',
        '42': '42;',
        '4.2': '4.2;',
        '0': '0;',
        '0.42': '0.42;',
        '0.042': '0.042;',
        '0.0042': '0.0042;',
        '0.00042': '0.00042;',
        '4.2e-99': '4.2e-99;',
        '5e-324': '5e-324;'
    }
}, {
    options: {
        format: {
            json: true,
            renumber: true,
            hexadecimal: false
        },
        parse: null
    },
    items: {
        '4.2e+500': 'null;',
        '1.7976931348623157e+308': '1.7976931348623157e308;',
        '4.2e+100': '42e99;',
        '1000000000001': '1000000000001;',
        '100000000001': '100000000001;',
        '42000': '42e3;',
        '4200': '4200;',
        '420': '420;',
        '42': '42;',
        '4.2': '4.2;',
        '0': '0;',
        '0.42': '0.42;',
        '0.042': '0.042;',
        '0.0042': '42e-4;',
        '0.00042': '42e-5;',
        '4.2e-99': '4.2e-99;',
        '5e-324': '5e-324;'
    }
}, {
    options: {
        format: {
            json: true,
            renumber: true,
            hexadecimal: true
        },
        parse: null
    },
    items: {
        '4.2e+500': 'null;',
        '1.7976931348623157e+308': '1.7976931348623157e308;',
        '4.2e+100': '42e99;',
        '1000000000001': '1000000000001;',
        '100000000001': '100000000001;',
        '42000': '42e3;',
        '4200': '4200;',
        '420': '420;',
        '42': '42;',
        '4.2': '4.2;',
        '0': '0;',
        '0.42': '0.42;',
        '0.042': '0.042;',
        '0.0042': '42e-4;',
        '0.00042': '42e-5;',
        '4.2e-99': '4.2e-99;',
        '5e-324': '5e-324;'
    }
}, {
    options: {
        format: {
            json: false,
            renumber: true,
            hexadecimal: false
        },
        parse: null
    },
    items: {
        '4.2e+500': '1e400;',
        '1.7976931348623157e+308': '1.7976931348623157e308;',
        '4.2e+100': '42e99;',
        '1000000000001': '1000000000001;',
        '100000000001': '100000000001;',
        '42000': '42e3;',
        '4200': '4200;',
        '420': '420;',
        '42': '42;',
        '4.2': '4.2;',
        '0': '0;',
        '0.42': '.42;',
        '0.042': '.042;',
        '0.0042': '.0042;',
        '0.00042': '42e-5;',
        '4.2e-99': '4.2e-99;',
        '5e-324': '5e-324;'
    }
}, {
    options: {
        format: {
            json: false,
            renumber: true,
            hexadecimal: true
        },
        parse: null
    },
    items: {
        '4.2e+500': '1e400;',
        '1.7976931348623157e+308': '1.7976931348623157e308;',
        '4.2e+100': '42e99;',
        '1000000000001': '0xe8d4a51001;',
        '100000000001': '100000000001;',
        '42000': '42e3;',
        '4200': '4200;',
        '420': '420;',
        '42': '42;',
        '4.2': '4.2;',
        '0': '0;',
        '0.42': '.42;',
        '0.042': '.042;',
        '0.0042': '.0042;',
        '0.00042': '42e-5;',
        '4.2e-99': '4.2e-99;',
        '5e-324': '5e-324;'
    }
}, {
    options: {
        format: {
            json: false,
            renumber: false,
            hexadecimal: true
        },
        parse: null
    },
    items: {
        '4.2e+500': '1e+400;',
        '1.7976931348623157e+308': '1.7976931348623157e+308;',
        '4.2e+100': '4.2e+100;',
        '1000000000001': '1000000000001;',
        '100000000001': '100000000001;',
        '42000': '42000;',
        '4200': '4200;',
        '420': '420;',
        '42': '42;',
        '4.2': '4.2;',
        '0': '0;',
        '0.42': '0.42;',
        '0.042': '0.042;',
        '0.0042': '0.0042;',
        '0.00042': '0.00042;',
        '4.2e-99': '4.2e-99;',
        '5e-324': '5e-324;'
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

    function runTest(options, source, expectedCode) {
        var tree, actualTree, expectedTree, actualCode;
        try {
            tree = esprima.parse(source);
            expectedTree = JSON.stringify(tree, adjustRegexLiteral, 4);
            actualCode = escodegen.generate(esprima.parse(source, {raw: true}), options);
            tree = esprima.parse(actualCode);
            actualTree = JSON.stringify(tree, adjustRegexLiteral, 4);
        } catch (e) {
            throw new NotMatchingError(expectedCode, e.toString());
        }
        if (expectedTree !== actualTree) {
            throw new NotMatchingError(expectedTree, actualTree);
        }
        if (expectedCode !== actualCode) {
            throw new NotMatchingError(expectedCode, actualCode);
        }
    }

    data.forEach(function (category) {
        var options = category.options;
        Object.keys(category.items).forEach(function (source) {
            var expectedCode = category.items[source];
            total += 1;
            if (options.parse) {
                options.parse = esprima.parse;
            }
            try {
                runTest(options, source, expectedCode);
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
