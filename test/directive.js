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
    data;

data = {
    'DirectiveStatement': {

        '\'use strict\';': {
            type: 'Program',
            body: [{
                type: 'DirectiveStatement',
                directive: 'use strict',
            }]
        },

        '(\'use strict\');': {
            type: 'Program',
            body: [{
                type: 'ExpressionStatement',
                expression: {
                    type: 'Literal',
                    value: 'use strict',
                }
            }]
        },

        '{\n    \'use strict\';\n}': {
            type: 'Program',
            body: [{
                type: 'BlockStatement',
                body: [{
                    type: 'ExpressionStatement',
                    expression: {
                        type: 'Literal',
                        value: 'use strict',
                    }
                }]
            }]
        },

        '(function () {\n    (\'use strict\');\n});': {
            type: 'Program',
            body: [{
                type: 'ExpressionStatement',
                expression: {
                    type: 'FunctionExpression',
                    id: null,
                    params: [],
                    body: {
                        type: 'BlockStatement',
                        body: [{
                            type: 'ExpressionStatement',
                            expression: {
                                type: 'Literal',
                                value: 'use strict',
                            }
                        }]
                    }
                }
            }]
        },

        '(function () {\n    \'use strict\';\n});': {
            type: 'Program',
            body: [{
                type: 'ExpressionStatement',
                expression: {
                    type: 'FunctionExpression',
                    id: null,
                    params: [],
                    body: {
                        type: 'BlockStatement',
                        body: [{
                            type: 'DirectiveStatement',
                            directive: 'use strict',
                        }]
                    }
                }
            }]
        },

        '(function () {\n    "use strict";\n});': {
            type: 'Program',
            body: [{
                type: 'ExpressionStatement',
                expression: {
                    type: 'FunctionExpression',
                    id: null,
                    params: [],
                    body: {
                        type: 'BlockStatement',
                        body: [{
                            type: 'DirectiveStatement',
                            directive: 'use strict',
                            raw: '"use strict"'
                        }]
                    }
                }
            }]
        },

        '(function () {\n    \'use\\u0020strict\';\n});': {
            type: 'Program',
            body: [{
                type: 'ExpressionStatement',
                expression: {
                    type: 'FunctionExpression',
                    id: null,
                    params: [],
                    body: {
                        type: 'BlockStatement',
                        body: [{
                            type: 'DirectiveStatement',
                            directive: 'use\\u0020strict',
                        }]
                    }
                }
            }]
        },

        '(function () {\n    "use\\u0020strict\'";\n});': {
            type: 'Program',
            body: [{
                type: 'ExpressionStatement',
                expression: {
                    type: 'FunctionExpression',
                    id: null,
                    params: [],
                    body: {
                        type: 'BlockStatement',
                        body: [{
                            type: 'DirectiveStatement',
                            directive: 'use\\u0020strict\'',
                        }]
                    }
                }
            }]
        },

        '(function () {\n    {\n        \'use strict\';\n    }\n});': {
            type: 'Program',
            body: [{
                type: 'ExpressionStatement',
                expression: {
                    type: 'FunctionExpression',
                    id: null,
                    params: [],
                    body: {
                        type: 'BlockStatement',
                        body: [{
                            type: 'BlockStatement',
                            body: [{
                                type: 'ExpressionStatement',
                                expression: {
                                    type: 'Literal',
                                    value: 'use strict',
                                }
                            }]
                        }]
                    }
                }
            }]
        }

    }
};

function runTest(expected, result) {
    var actual, options;

    options = {
        indent: '    ',
        directive: true,
        parse: esprima.parse
    };

    actual = escodegen.generate(result, options);
    expect(actual).to.be.equal(expected);
}

describe('directive support', function () {
    Object.keys(data).forEach(function (category) {
        it(category, function () {
            Object.keys(data[category]).forEach(function (source) {
                runTest(source, data[category][source]);
            });
        });
    });
});
