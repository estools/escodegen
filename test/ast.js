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
    fs = require('fs'),
    path = require('path'),
    root = path.join(path.dirname(fs.realpathSync(__filename)), '..'),
    esprima = require('./3rdparty/esprima'),
    escodegen = require(root),
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
                    value: new RegExp('\n', 'i')
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
                    value: new RegExp('\r', 'i')
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
        }
    ],
    'AST-Node "extras"': [
        {
            type: 'Program',
            body: [{
                type: 'ExpressionStatement',
                expression: {
                    type: 'Identifier',
                    name: 'foo'
                },
            }],
            extras: {
                leading: [
                    {
                        type: 'Whitespace',
                        value: '\t'
                    }
                ],
            },
            expected: '\tfoo;'
        },
        {
            type: 'Program',
            body: [{
                type: 'ExpressionStatement',
                expression: {
                    type: 'Identifier',
                    name: 'foo'
                },
            }],
            extras: {
                trailing: [
                    {
                        type: 'Whitespace',
                        value: '\t'
                    }
                ],
            },
            expected: 'foo;\t'
        },
        {
            type: 'Program',
            body: [{
                type: 'ExpressionStatement',
                expression: {
                    type: 'Identifier',
                    name: 'foo'
                },
                extras: {
                    leading: [
                        {
                            type: 'Whitespace',
                            value: '\t'
                        }
                    ],
                    trailing: [
                        {
                            type: 'Whitespace',
                            value: '\t'
                        }
                    ],
                },
            }],
            expected: '\tfoo;\t'
        },
        {
            type: 'Program',
            body: [{
                type: 'ExpressionStatement',
                expression: {
                    type: 'Identifier',
                    name: 'foo',
                    extras: {
                        leading: [
                            {
                                type: 'Whitespace',
                                value: '\t'
                            }
                        ],
                        trailing: [
                            {
                                type: 'Whitespace',
                                value: '\t'
                            }
                        ],
                    },
                },
            }],
            expected: '\tfoo\t;'
        },
        {
            type: 'Program',
            body: [{
                type: 'ExpressionStatement',
                expression: {
                    type: 'CallExpression',
                    callee: {
                        type: 'Identifier',
                        name: 'foo'
                    },
                    arguments: [
                        {
                            type: 'EmptyExpression',
                            value: '',
                            extras: {
                                leading: [
                                    {
                                        type: 'Whitespace',
                                        value: '\t'
                                    }
                                ],
                                trailing: [
                                    {
                                        type: 'Whitespace',
                                        value: '\t'
                                    }
                                ],
                            },
                        }
                    ],
                },
            }],
            expected: 'foo(\t\t);'
        },
        {
            type: 'Program',
            body: [{
                type: 'ExpressionStatement',
                expression: {
                    type: 'CallExpression',
                    callee: {
                        type: 'Identifier',
                        name: 'foo',
                        extras: {
                            trailing: [
                                {
                                    type: 'MultilineComment',
                                    value: '2'
                                },
                            ],
                        }
                    },
                    arguments: [
                        {
                            type: 'EmptyExpression',
                            value: '',
                            extras: {
                                leading: [
                                    {
                                        type: 'MultilineComment',
                                        value: '3'
                                    },
                                ],
                            },
                        }
                    ],
                    extras: {
                        leading: [
                            {
                                type: 'MultilineComment',
                                value: '1'
                            },
                        ],
                        trailing: [
                            {
                                type: 'MultilineComment',
                                value: '4'
                            },
                        ],
                    }
                },
            }],
            extras: {
                trailing: [
                    {
                        type: 'MultilineComment',
                        value: '5'
                    },
                ],
            },
            expected: '/*1*/foo/*2*/(/*3*/)/*4*/;/*5*/'
        },
        {
            type: 'Program',
            body: [{
                type: 'ExpressionStatement',
                expression: {
                    type: 'CallExpression',
                    callee: {
                        type: 'Identifier',
                        name: 'foo',
                        extras: {
                            trailing: [
                                {
                                    type: 'MultilineComment',
                                    value: '2'
                                },
                            ],
                        }
                    },
                    arguments: [
                        {
                            type: 'EmptyExpression',
                            value: '',
                            extras: {
                                leading: [
                                    {
                                        type: 'LineComment',
                                        value: '3'
                                    }
                                ],
                                trailing: [
                                    {
                                        type: 'MultilineComment',
                                        value: '4'
                                    },
                                ],
                            },
                        }
                    ],
                    extras: {
                        leading: [
                            {
                                type: 'MultilineComment',
                                value: '1'
                            },
                        ],
                        trailing: [
                            {
                                type: 'MultilineComment',
                                value: '5'
                            },
                        ]
                    }
                },
            }],
            extras: {
                trailing: [
                    {
                        type: 'MultilineComment',
                        value: '6'
                    },
                ],
            },
            expected: '/*1*/foo/*2*/(//3\n/*4*/)/*5*/;/*6*/'
        },
        {
            type: 'Program',
            body: [{
                type: 'ExpressionStatement',
                expression: {
                    type: 'CallExpression',
                    callee: {
                        type: 'Identifier',
                        name: 'foo',
                        extras: {
                            trailing: [
                                {
                                    type: 'MultilineComment',
                                    value: '2'
                                },
                            ],
                        }
                    },
                    arguments: [
                        {
                            type: 'Literal',
                            value: 4,
                            raw: '4',
                            extras: {
                                leading: [
                                    {
                                        type: 'LineComment',
                                        value: '3'
                                    }
                                ],
                                trailing: [
                                    {
                                        type: 'MultilineComment',
                                        value: '5'
                                    },
                                ],
                            },
                        }
                    ],
                    extras: {
                        leading: [
                            {
                                type: 'MultilineComment',
                                value: '1'
                            },
                        ],
                        trailing: [
                            {
                                type: 'MultilineComment',
                                value: '6'
                            },
                        ]
                    }
                },
            }],
            extras: {
                trailing: [
                    {
                        type: 'MultilineComment',
                        value: '7'
                    },
                ],
            },
            expected: '/*1*/foo/*2*/(//3\n4/*5*/)/*6*/;/*7*/'
        },
        {
            type: 'Program',
            body: [{
                type: 'ExpressionStatement',
                expression: {
                    type: 'CallExpression',
                    callee: {
                        type: 'Identifier',
                        name: 'foo',
                        extras: {
                            trailing: [
                                {
                                    type: 'MultilineComment',
                                    value: '2'
                                },
                            ],
                        }
                    },
                    arguments: [
                        {
                            type: 'Literal',
                            value: 4,
                            raw: '4',
                            extras: {
                                leading: [
                                    {
                                        type: 'LineComment',
                                        value: '3'
                                    }
                                ],
                                trailing: [
                                    {
                                        type: 'MultilineComment',
                                        value: '5'
                                    },
                                    // NOTE: testing custom line-comment markers,
                                    // in support of HTML-style line-comment markers
                                    // Ref: http://javascript.spec.whatwg.org/#comment-syntax
                                    {
                                        type: 'LineComment',
                                        value: '6',
                                        marker: '<!--'
                                    }
                                ],
                            },
                        }
                    ],
                    extras: {
                        leading: [
                            {
                                type: 'MultilineComment',
                                value: '1'
                            },
                        ],
                        trailing: [
                            {
                                type: 'MultilineComment',
                                value: '7'
                            },
                        ]
                    }
                },
            }],
            extras: {
                trailing: [
                    {
                        type: 'MultilineComment',
                        value: '8'
                    },
                ],
            },
            expected: '/*1*/foo/*2*/(//3\n4/*5*/<!--6\n)/*7*/;/*8*/'
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
