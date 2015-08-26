/*
  Copyright (C) 2011-2013 Yusuke Suzuki <utatane.tea@gmail.com>
  Copyright (C) 2015 Ingvar Stepanyan <me@rreverser.com>
  Copyright (C) 2012 Ariya Hidayat <ariya.hidayat@gmail.com>
  Copyright (C) 2012 Joost-Wim Boekesteijn <joost-wim@boekesteijn.nl>
  Copyright (C) 2012 Yusuke Suzuki <utatane.tea@gmail.com>
  Copyright (C) 2012 Arpad Borsos <arpad.borsos@googlemail.com>
  Copyright (C) 2011 Ariya Hidayat <ariya.hidayat@gmail.com>
  Copyright (C) 2011 Arpad Borsos <arpad.borsos@googlemail.com>

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

var esprima = require('./3rdparty/esprima-harmony.original'),
    escodegen = require('./loader'),
    chai = require('chai'),
    expect = chai.expect,
    data;

data = {
    'Yield (with star, harmony proposed)': {
        'function* a() { yield* test; }': {
            type: 'Program',
            body: [{
                type: 'FunctionDeclaration',
                id: {
                    type: 'Identifier',
                    name: 'a',
                    range: [10, 11],
                    loc: {
                        start: { line: 1, column: 10 },
                        end: { line: 1, column: 11 }
                    }
                },
                params: [],
                defaults: [],
                body: {
                    type: 'BlockStatement',
                    body: [{
                        type: 'ExpressionStatement',
                        expression: {
                            type: 'YieldExpression',
                            argument: {
                                type: 'Identifier',
                                name: 'test',
                                range: [23, 27],
                                loc: {
                                    start: { line: 1, column: 23 },
                                    end: { line: 1, column: 27 }
                                }
                            },
                            delegate: true,
                            range: [16, 27],
                            loc: {
                                start: { line: 1, column: 16 },
                                end: { line: 1, column: 27 }
                            }
                        },
                        range: [16, 28],
                        loc: {
                            start: { line: 1, column: 16 },
                            end: { line: 1, column: 28 }
                        }
                    }],
                    range: [14, 30],
                    loc: {
                        start: { line: 1, column: 14 },
                        end: { line: 1, column: 30 }
                    }
                },
                rest: null,
                generator: true,
                expression: false,
                range: [0, 30],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 1, column: 30 }
                }
            }],
            range: [0, 30],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 30 }
            }
        },

        'function* a() { yield* (42,42); }': {
            type: 'Program',
            body: [{
                type: 'FunctionDeclaration',
                id: {
                    type: 'Identifier',
                    name: 'a',
                    range: [10, 11],
                    loc: {
                        start: { line: 1, column: 10 },
                        end: { line: 1, column: 11 }
                    }
                },
                params: [],
                defaults: [],
                body: {
                    type: 'BlockStatement',
                    body: [{
                        type: 'ExpressionStatement',
                        expression: {
                            type: 'YieldExpression',
                            argument: {
                                type: 'SequenceExpression',
                                expressions: [{
                                    type: 'Literal',
                                    value: 42,
                                    raw: '42',
                                    range: [24, 26],
                                    loc: {
                                        start: { line: 1, column: 24 },
                                        end: { line: 1, column: 26 }
                                    }
                                }, {
                                    type: 'Literal',
                                    value: 42,
                                    raw: '42',
                                    range: [27, 29],
                                    loc: {
                                        start: { line: 1, column: 27 },
                                        end: { line: 1, column: 29 }
                                    }
                                }],
                                range: [24, 29],
                                loc: {
                                    start: { line: 1, column: 24 },
                                    end: { line: 1, column: 29 }
                                }
                            },
                            delegate: true,
                            range: [16, 30],
                            loc: {
                                start: { line: 1, column: 16 },
                                end: { line: 1, column: 30 }
                            }
                        },
                        range: [16, 31],
                        loc: {
                            start: { line: 1, column: 16 },
                            end: { line: 1, column: 31 }
                        }
                    }],
                    range: [14, 33],
                    loc: {
                        start: { line: 1, column: 14 },
                        end: { line: 1, column: 33 }
                    }
                },
                rest: null,
                generator: true,
                expression: false,
                range: [0, 33],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 1, column: 33 }
                }
            }],
            range: [0, 33],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 33 }
            }
        },

        'function* a() {\n    yield 1;\n}': {
            generateFrom:           {
                type: 'Program',
                body: [{
                    type: 'FunctionDeclaration',
                    id: {
                        type: 'Identifier',
                        name: 'a',
                        range: [10, 11],
                        loc: {
                            start: { line: 1, column: 10 },
                            end: { line: 1, column: 11 }
                        }
                    },
                    params: [],
                    defaults: [],
                    body: {
                        type: 'BlockStatement',
                        body: [{
                            type: 'ExpressionStatement',
                            expression: {
                                type: 'YieldExpression',
                                argument: {
                                    type: 'Literal',
                                    value: 1,
                                    raw: '1',
                                    range: [21, 22],
                                    loc: {
                                        start: { line: 1, column: 21 },
                                        end: { line: 1, column: 22 }
                                    }
                                },
                                delegate: false,
                                range: [15, 22],
                                loc: {
                                    start: { line: 1, column: 15 },
                                    end: { line: 1, column: 22 }
                                }
                            },
                            range: [15, 22],
                            loc: {
                                start: { line: 1, column: 15 },
                                end: { line: 1, column: 22 }
                            }
                        }],
                        range: [14, 23],
                        loc: {
                            start: { line: 1, column: 14 },
                            end: { line: 1, column: 23 }
                        }
                    },
                    rest: null,
                    generator: true,
                    expression: false,
                    range: [0, 23],
                    loc: {
                        start: { line: 1, column: 0 },
                        end: { line: 1, column: 23 }
                    }
                }],
                range: [0, 23],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 1, column: 23 }
                }
            }
        },

        'var a = function* () {\n    yield 1;\n};': {
            generateFrom: {
                "type": "Program",
                "body": [
                    {
                        "type": "VariableDeclaration",
                        "declarations": [
                            {
                                "type": "VariableDeclarator",
                                "id": {
                                    "type": "Identifier",
                                    "name": "a"
                                },
                                "init": {
                                    "type": "FunctionExpression",
                                    "id": null,
                                    "params": [],
                                    "defaults": [],
                                    "body": {
                                        "type": "BlockStatement",
                                        "body": [
                                            {
                                                "type": "ExpressionStatement",
                                                "expression": {
                                                    "type": "YieldExpression",
                                                    "argument": {
                                                        "type": "Literal",
                                                        "value": 1,
                                                        "raw": "1"
                                                    },
                                                    "delegate": false
                                                }
                                            }
                                        ]
                                    },
                                    "rest": null,
                                    "generator": true,
                                    "expression": false
                                }
                            }
                        ],
                        "kind": "var"
                    }
                ]
            }
        },

        'var a = function* b() {\n    yield 1;\n};': {
            generateFrom: {
                "type": "Program",
                "body": [
                    {
                        "type": "VariableDeclaration",
                        "declarations": [
                            {
                                "type": "VariableDeclarator",
                                "id": {
                                    "type": "Identifier",
                                    "name": "a"
                                },
                                "init": {
                                    "type": "FunctionExpression",
                                    "id": {
                                        "type": "Identifier",
                                        "name": "b"
                                    },
                                    "params": [],
                                    "defaults": [],
                                    "body": {
                                        "type": "BlockStatement",
                                        "body": [
                                            {
                                                "type": "ExpressionStatement",
                                                "expression": {
                                                    "type": "YieldExpression",
                                                    "argument": {
                                                        "type": "Literal",
                                                        "value": 1,
                                                        "raw": "1"
                                                    },
                                                    "delegate": false
                                                }
                                            }
                                        ]
                                    },
                                    "rest": null,
                                    "generator": true,
                                    "expression": false
                                }
                            }
                        ],
                        "kind": "var"
                    }
                ]
            }
        },

        'function*test(){yield 42}': {
            options: {
                format: {
                    compact: true,
                    semicolons: false
                }
            },
            generateFrom: {
                type: 'Program',
                body: [{
                    type: 'FunctionDeclaration',
                    id: {
                        type: 'Identifier',
                        name: 'test',
                        range: [9, 13],
                        loc: {
                            start: { line: 1, column: 9 },
                            end: { line: 1, column: 13 }
                        }
                    },
                    params: [],
                    defaults: [],
                    body: {
                        type: 'BlockStatement',
                        body: [{
                            type: 'ExpressionStatement',
                            expression: {
                                type: 'YieldExpression',
                                argument: {
                                    type: 'Literal',
                                    value: 42,
                                    raw: '42',
                                    range: [22, 24],
                                    loc: {
                                        start: { line: 1, column: 22 },
                                        end: { line: 1, column: 24 }
                                    }
                                },
                                delegate: false,
                                range: [16, 24],
                                loc: {
                                    start: { line: 1, column: 16 },
                                    end: { line: 1, column: 24 }
                                }
                            },
                            range: [16, 24],
                            loc: {
                                start: { line: 1, column: 16 },
                                end: { line: 1, column: 24 }
                            }
                        }],
                        range: [15, 25],
                        loc: {
                            start: { line: 1, column: 15 },
                            end: { line: 1, column: 25 }
                        }
                    },
                    rest: null,
                    generator: true,
                    expression: false,
                    range: [0, 25],
                    loc: {
                        start: { line: 1, column: 0 },
                        end: { line: 1, column: 25 }
                    }
                }],
                range: [0, 25],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 1, column: 25 }
                }
            }
        },

        '(function*test(){yield 42})': {
            options: {
                format: {
                    compact: true,
                    semicolons: false
                }
            },
            generateFrom: {
                type: 'Program',
                body: [{
                    type: 'ExpressionStatement',
                    expression: {
                        type: 'FunctionExpression',
                        id: {
                            type: 'Identifier',
                            name: 'test',
                            range: [10, 14],
                            loc: {
                                start: { line: 1, column: 10 },
                                end: { line: 1, column: 14 }
                            }
                        },
                        params: [],
                        defaults: [],
                        body: {
                            type: 'BlockStatement',
                            body: [{
                                type: 'ExpressionStatement',
                                expression: {
                                    type: 'YieldExpression',
                                    argument: {
                                        type: 'Literal',
                                        value: 42,
                                        raw: '42',
                                        range: [23, 25],
                                        loc: {
                                            start: { line: 1, column: 23 },
                                            end: { line: 1, column: 25 }
                                        }
                                    },
                                    delegate: false,
                                    range: [17, 25],
                                    loc: {
                                        start: { line: 1, column: 17 },
                                        end: { line: 1, column: 25 }
                                    }
                                },
                                range: [17, 25],
                                loc: {
                                    start: { line: 1, column: 17 },
                                    end: { line: 1, column: 25 }
                                }
                            }],
                            range: [16, 26],
                            loc: {
                                start: { line: 1, column: 16 },
                                end: { line: 1, column: 26 }
                            }
                        },
                        rest: null,
                        generator: true,
                        expression: false,
                        range: [1, 26],
                        loc: {
                            start: { line: 1, column: 1 },
                            end: { line: 1, column: 26 }
                        }
                    },
                    range: [0, 27],
                    loc: {
                        start: { line: 1, column: 0 },
                        end: { line: 1, column: 27 }
                    }
                }],
                range: [0, 27],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 1, column: 27 }
                }
            }
        }
    },

    'Object destructuring (and aliasing)':  {
        'var {\n    a,\n    b: C\n} = {};' : {
            generateFrom: {
                type: 'Program',
                body: [{
                    type: 'VariableDeclaration',
                    declarations: [{
                        type: 'VariableDeclarator',
                        id: {
                            type: 'ObjectPattern',
                            properties: [{
                                type: 'Property',
                                key: {
                                    type: 'Identifier',
                                    name: 'a',
                                    range: [5, 6],
                                    loc: {
                                        start: { line: 1, column: 5 },
                                        end: { line: 1, column: 6 }
                                    }
                                },
                                value: {
                                    type: 'Identifier',
                                    name: 'a',
                                    range: [5, 6],
                                    loc: {
                                        start: { line: 1, column: 5 },
                                        end: { line: 1, column: 6 }
                                    }
                                },
                                kind: 'init',
                                shorthand: true,
                                range: [5, 6],
                                loc: {
                                    start: { line: 1, column: 5 },
                                    end: { line: 1, column: 6 }
                                }
                            }, {
                                type: 'Property',
                                key: {
                                    type: 'Identifier',
                                    name: 'b',
                                    range: [8, 9],
                                    loc: {
                                        start: { line: 1, column: 8 },
                                        end: { line: 1, column: 9 }
                                    }
                                },
                                value: {
                                    type: 'Identifier',
                                    name: 'C',
                                    range: [10, 11],
                                    loc: {
                                        start: { line: 1, column: 10 },
                                        end: { line: 1, column: 11 }
                                    }
                                },
                                kind: 'init',
                                range: [8, 11],
                                loc: {
                                    start: { line: 1, column: 8 },
                                    end: { line: 1, column: 11 }
                                }
                            }]
                        },
                        init: {
                            type: 'ObjectExpression',
                            properties: [],
                            range: [15, 17],
                            loc: {
                                start: { line: 1, column: 15 },
                                end: { line: 1, column: 17 }
                            }
                        },
                        range: [4, 17],
                        loc: {
                            start: { line: 1, column: 4 },
                            end: { line: 1, column: 17 }
                        }
                    }],
                    kind: 'var',
                    range: [0, 17],
                    loc: {
                        start: { line: 1, column: 0 },
                        end: { line: 1, column: 17 }
                    }
                }],
                range: [0, 17],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 1, column: 17 }
                }
            }
        },

        'var {a, b} = {};':  {
            generateFrom: {
                type: 'Program',
                body: [{
                    type: 'VariableDeclaration',
                    declarations: [{
                        type: 'VariableDeclarator',
                        id: {
                            type: 'ObjectPattern',
                            properties: [{
                                type: 'Property',
                                key: {
                                    type: 'Identifier',
                                    name: 'a',
                                    range: [5, 6],
                                    loc: {
                                        start: { line: 1, column: 5 },
                                        end: { line: 1, column: 6 }
                                    }
                                },
                                value: {
                                    type: 'Identifier',
                                    name: 'a',
                                    range: [5, 6],
                                    loc: {
                                        start: { line: 1, column: 5 },
                                        end: { line: 1, column: 6 }
                                    }
                                },
                                kind: 'init',
                                shorthand: true,
                                range: [5, 6],
                                loc: {
                                    start: { line: 1, column: 5 },
                                    end: { line: 1, column: 6 }
                                }
                            }, {
                                type: 'Property',
                                key: {
                                    type: 'Identifier',
                                    name: 'b',
                                    range: [7, 8],
                                    loc: {
                                        start: { line: 1, column: 7 },
                                        end: { line: 1, column: 8 }
                                    }
                                },
                                value: {
                                    type: 'Identifier',
                                    name: 'b',
                                    range: [7, 8],
                                    loc: {
                                        start: { line: 1, column: 7 },
                                        end: { line: 1, column: 8 }
                                    }
                                },
                                kind: 'init',
                                shorthand: true,
                                range: [7, 8],
                                loc: {
                                    start: { line: 1, column: 7 },
                                    end: { line: 1, column: 8 }
                                }
                            }]
                        },
                        init: {
                            type: 'ObjectExpression',
                            properties: [],
                            range: [12, 14],
                            loc: {
                                start: { line: 1, column: 12 },
                                end: { line: 1, column: 14 }
                            }
                        },
                        range: [4, 14],
                        loc: {
                            start: { line: 1, column: 4 },
                            end: { line: 1, column: 14 }
                        }
                    }],
                    kind: 'var',
                    range: [0, 14],
                    loc: {
                        start: { line: 1, column: 0 },
                        end: { line: 1, column: 14 }
                    }
                }],
                range: [0, 14],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 1, column: 14 }
                }
            }
        },

        'var {a} = {};': {
            generateFrom:  {
                type: 'Program',
                body: [{
                    type: 'VariableDeclaration',
                    declarations: [{
                        type: 'VariableDeclarator',
                        id: {
                            type: 'ObjectPattern',
                            properties: [{
                                type: 'Property',
                                key: {
                                    type: 'Identifier',
                                    name: 'a',
                                    range: [5, 6],
                                    loc: {
                                        start: { line: 1, column: 5 },
                                        end: { line: 1, column: 6 }
                                    }
                                },
                                value: {
                                    type: 'Identifier',
                                    name: 'a',
                                    range: [5, 6],
                                    loc: {
                                        start: { line: 1, column: 5 },
                                        end: { line: 1, column: 6 }
                                    }
                                },
                                kind: 'init',
                                shorthand: true,
                                range: [5, 6],
                                loc: {
                                    start: { line: 1, column: 5 },
                                    end: { line: 1, column: 6 }
                                }
                            }]
                        },
                        init: {
                            type: 'ObjectExpression',
                            properties: [],
                            range: [10, 12],
                            loc: {
                                start: { line: 1, column: 10 },
                                end: { line: 1, column: 12 }
                            }
                        },
                        range: [4, 12],
                        loc: {
                            start: { line: 1, column: 4 },
                            end: { line: 1, column: 12 }
                        }
                    }],
                    kind: 'var',
                    range: [0, 12],
                    loc: {
                        start: { line: 1, column: 0 },
                        end: { line: 1, column: 12 }
                    }
                }],
                range: [0, 12],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 1, column: 12 }
                }
            }
        },

        'var {a:C} = obj;': {
            type: 'Program',
            body: [{
                type: 'VariableDeclaration',
                declarations: [{
                    type: 'VariableDeclarator',
                    id: {
                        type: 'ObjectPattern',
                        properties: [{
                            type: 'Property',
                            key: {
                                type: 'Identifier',
                                name: 'a',
                                range: [5, 6],
                                loc: {
                                    start: { line: 1, column: 5 },
                                    end: { line: 1, column: 6 }
                                }
                            },
                            value: {
                                type: 'Identifier',
                                name: 'C',
                                range: [7, 8],
                                loc: {
                                    start: { line: 1, column: 7 },
                                    end: { line: 1, column: 8 }
                                }
                            },
                            kind: 'init',
                            range: [5, 8],
                            loc: {
                                start: { line: 1, column: 5 },
                                end: { line: 1, column: 8 }
                            }
                        }]
                    },
                    init: {
                        type: 'Identifier',
                        name: 'obj',
                        range: [12, 15],
                        loc: {
                            start: { line: 1, column: 12 },
                            end: { line: 1, column: 15 }
                        }
                    },
                    range: [4, 15],
                    loc: {
                        start: { line: 1, column: 4 },
                        end: { line: 1, column: 15 }
                    }
                }],
                kind: 'var',
                range: [0, 15],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 1, column: 15 }
                }
            }],
            range: [0, 15],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 15 }
            }
        },

        '({a:C} = obj);': {
            type: 'Program',
            body: [{
                type: 'ExpressionStatement',
                expression: {
                    type: 'AssignmentExpression',
                    operator: '=',
                    left: {
                        type: 'ObjectPattern',
                        properties: [{
                            type: 'Property',
                            key: {
                                type: 'Identifier',
                                name: 'a',
                                range: [2, 3],
                                loc: {
                                    start: { line: 1, column: 2 },
                                    end: { line: 1, column: 3 }
                                }
                            },
                            value: {
                                type: 'Identifier',
                                name: 'C',
                                range: [4, 5],
                                loc: {
                                    start: { line: 1, column: 4 },
                                    end: { line: 1, column: 5 }
                                }
                            },
                            kind: 'init',
                            range: [2, 5],
                            loc: {
                                start: { line: 1, column: 2 },
                                end: { line: 1, column: 5 }
                            }
                        }],
                        range: [1, 6],
                        loc: {
                            start: { line: 1, column: 1 },
                            end: { line: 1, column: 6 }
                        }
                    },
                    right: {
                        type: 'Identifier',
                        name: 'obj',
                        range: [10, 13],
                        loc: {
                            start: { line: 1, column: 10 },
                            end: { line: 1, column: 13 }
                        }
                    },
                    range: [0, 13],
                    loc: {
                        start: { line: 1, column: 0 },
                        end: { line: 1, column: 13 }
                    }
                },
                range: [0, 13],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 1, column: 13 }
                }
            }],
            range: [0, 13],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 13 }
            }
        },

        '({test: { obj }, ok } = obj)': {
            type: 'Program',
            body: [{
                type: 'ExpressionStatement',
                expression: {
                    type: 'AssignmentExpression',
                    operator: '=',
                    left: {
                        type: 'ObjectPattern',
                        properties: [{
                            type: 'Property',
                            key: {
                                type: 'Identifier',
                                name: 'test',
                                range: [2, 6],
                                loc: {
                                    start: { line: 1, column: 2 },
                                    end: { line: 1, column: 6 }
                                }
                            },
                            value: {
                                type: 'ObjectPattern',
                                properties: [{
                                    type: 'Property',
                                    key: {
                                        type: 'Identifier',
                                        name: 'obj',
                                        range: [10, 13],
                                        loc: {
                                            start: { line: 1, column: 10 },
                                            end: { line: 1, column: 13 }
                                        }
                                    },
                                    value: {
                                        type: 'Identifier',
                                        name: 'obj',
                                        range: [10, 13],
                                        loc: {
                                            start: { line: 1, column: 10 },
                                            end: { line: 1, column: 13 }
                                        }
                                    },
                                    kind: 'init',
                                    shorthand: true,
                                    range: [10, 13],
                                    loc: {
                                        start: { line: 1, column: 10 },
                                        end: { line: 1, column: 13 }
                                    }
                                }],
                                range: [8, 15],
                                loc: {
                                    start: { line: 1, column: 8 },
                                    end: { line: 1, column: 15 }
                                }
                            },
                            kind: 'init',
                            range: [2, 15],
                            loc: {
                                start: { line: 1, column: 2 },
                                end: { line: 1, column: 15 }
                            }
                        }, {
                            type: 'Property',
                            key: {
                                type: 'Identifier',
                                name: 'ok',
                                range: [17, 19],
                                loc: {
                                    start: { line: 1, column: 17 },
                                    end: { line: 1, column: 19 }
                                }
                            },
                            value: {
                                type: 'Identifier',
                                name: 'ok',
                                range: [17, 19],
                                loc: {
                                    start: { line: 1, column: 17 },
                                    end: { line: 1, column: 19 }
                                }
                            },
                            kind: 'init',
                            shorthand: true,
                            range: [17, 19],
                            loc: {
                                start: { line: 1, column: 17 },
                                end: { line: 1, column: 19 }
                            }
                        }],
                        range: [1, 21],
                        loc: {
                            start: { line: 1, column: 1 },
                            end: { line: 1, column: 21 }
                        }
                    },
                    right: {
                        type: 'Identifier',
                        name: 'obj',
                        range: [24, 27],
                        loc: {
                            start: { line: 1, column: 24 },
                            end: { line: 1, column: 27 }
                        }
                    },
                    range: [1, 27],
                    loc: {
                        start: { line: 1, column: 1 },
                        end: { line: 1, column: 27 }
                    }
                },
                range: [0, 28],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 1, column: 28 }
                }
            }],
            range: [0, 28],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 28 }
            }
        },

        'for (let {\n            a: b,\n            c: d\n        } in obj) {\n}': {
            generateFrom: {
                type: 'Program',
                body: [{
                    type: 'ForInStatement',
                    left: {
                        type: 'VariableDeclaration',
                        kind: 'let',
                        declarations: [
                            {
                                type: 'VariableDeclarator',
                                id: {
                                    type: 'ObjectPattern',
                                    properties: [
                                        {
                                            type: 'Property',
                                            key: {
                                                type: 'Identifier',
                                                name: 'a'
                                            },
                                            value: {
                                                type: 'Identifier',
                                                name: 'b'
                                            },
                                            kind: 'init'
                                        },
                                        {
                                            type: 'Property',
                                            key: {
                                                type: 'Identifier',
                                                name: 'c'
                                            },
                                            value: {
                                                type: 'Identifier',
                                                name: 'd'
                                            },
                                            kind: 'init'
                                        }
                                    ]
                                },
                                init: null
                            }
                        ]
                    },
                    right: {
                        type: 'Identifier',
                        name: 'obj'
                    },
                    body: {
                        type: 'BlockStatement',
                        body: []
                    },
                    each: false
                }]
            }
        },

        'function getIdField({\n    foo: bar,\n    foo2: bar2\n}) {\n}': {
            generateFrom: {
                type: 'Program',
                body: [{
                    type: 'FunctionDeclaration',
                    id: {
                        type: 'Identifier',
                        name: 'getIdField'
                    },
                    params: [
                        {
                            type: 'ObjectPattern',
                            properties: [
                                {
                                    type: 'Property',
                                    key: {
                                        type: 'Identifier',
                                        name: 'foo'
                                    },
                                    value: {
                                        type: 'Identifier',
                                        name: 'bar'
                                    },
                                    kind: 'init'
                                },
                                {
                                    type: 'Property',
                                    key: {
                                        type: 'Identifier',
                                        name: 'foo2'
                                    },
                                    value: {
                                        type: 'Identifier',
                                        name: 'bar2'
                                    },
                                    kind: 'init'
                                }
                            ]
                        }
                    ],
                    defaults: [],
                    body: {
                        type: 'BlockStatement',
                        body: []
                    },
                    rest: null,
                    generator: false,
                    expression: false
                }]
            }
        }
    },

    'Array destructuring (and aliasing)':  {
        '[a] = obj': {
            type: 'Program',
            body: [{
                type: 'ExpressionStatement',
                expression: {
                    type: 'AssignmentExpression',
                    operator: '=',
                    left: {
                        type: 'ArrayPattern',
                        elements: [{
                            type: 'Identifier',
                            name: 'a',
                            range: [1, 2],
                            loc: {
                                start: { line: 1, column: 1 },
                                end: { line: 1, column: 2 }
                            }
                        }],
                        range: [0, 3],
                        loc: {
                            start: { line: 1, column: 0 },
                            end: { line: 1, column: 3 }
                        }
                    },
                    right: {
                        type: 'Identifier',
                        name: 'obj',
                        range: [6, 9],
                        loc: {
                            start: { line: 1, column: 6 },
                            end: { line: 1, column: 9 }
                        }
                    },
                    range: [0, 9],
                    loc: {
                        start: { line: 1, column: 0 },
                        end: { line: 1, column: 9 }
                    }
                },
                range: [0, 9],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 1, column: 9 }
                }
            }],
            range: [0, 9],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 9 }
            }
        },

        'var [a] = obj': {
            type: 'Program',
            body: [{
                type: 'VariableDeclaration',
                declarations: [{
                    type: 'VariableDeclarator',
                    id: {
                        type: 'ArrayPattern',
                        elements: [{
                            type: 'Identifier',
                            name: 'a',
                            range: [5, 6],
                            loc: {
                                start: { line: 1, column: 5 },
                                end: { line: 1, column: 6 }
                            }
                        }]
                    },
                    init: {
                        type: 'Identifier',
                        name: 'obj',
                        range: [10, 13],
                        loc: {
                            start: { line: 1, column: 10 },
                            end: { line: 1, column: 13 }
                        }
                    },
                    range: [4, 13],
                    loc: {
                        start: { line: 1, column: 4 },
                        end: { line: 1, column: 13 }
                    }
                }],
                kind: 'var',
                range: [0, 13],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 1, column: 13 }
                }
            }],
            range: [0, 13],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 13 }
            }
        },

        '[a,b,c] = array': {
            type: 'Program',
            body: [{
                type: 'ExpressionStatement',
                expression: {
                    type: 'AssignmentExpression',
                    operator: '=',
                    left: {
                        type: 'ArrayPattern',
                        elements: [{
                            type: 'Identifier',
                            name: 'a',
                            range: [1, 2],
                            loc: {
                                start: { line: 1, column: 1 },
                                end: { line: 1, column: 2 }
                            }
                        }, {
                            type: 'Identifier',
                            name: 'b',
                            range: [3, 4],
                            loc: {
                                start: { line: 1, column: 3 },
                                end: { line: 1, column: 4 }
                            }
                        }, {
                            type: 'Identifier',
                            name: 'c',
                            range: [5, 6],
                            loc: {
                                start: { line: 1, column: 5 },
                                end: { line: 1, column: 6 }
                            }
                        }],
                        range: [0, 7],
                        loc: {
                            start: { line: 1, column: 0 },
                            end: { line: 1, column: 7 }
                        }
                    },
                    right: {
                        type: 'Identifier',
                        name: 'array',
                        range: [10, 15],
                        loc: {
                            start: { line: 1, column: 10 },
                            end: { line: 1, column: 15 }
                        }
                    },
                    range: [0, 15],
                    loc: {
                        start: { line: 1, column: 0 },
                        end: { line: 1, column: 15 }
                    }
                },
                range: [0, 15],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 1, column: 15 }
                }
            }],
            range: [0, 15],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 15 }
            }
        },

        '[[a],b,c] = array': {
            type: 'Program',
            body: [{
                type: 'ExpressionStatement',
                expression: {
                    type: 'AssignmentExpression',
                    operator: '=',
                    left: {
                        type: 'ArrayPattern',
                        elements: [{
                            type: 'ArrayPattern',
                            elements: [{
                                type: 'Identifier',
                                name: 'a',
                                range: [2, 3],
                                loc: {
                                    start: { line: 1, column: 2 },
                                    end: { line: 1, column: 3 }
                                }
                            }],
                            range: [1, 4],
                            loc: {
                                start: { line: 1, column: 1 },
                                end: { line: 1, column: 4 }
                            }
                        }, {
                            type: 'Identifier',
                            name: 'b',
                            range: [5, 6],
                            loc: {
                                start: { line: 1, column: 5 },
                                end: { line: 1, column: 6 }
                            }
                        }, {
                            type: 'Identifier',
                            name: 'c',
                            range: [7, 8],
                            loc: {
                                start: { line: 1, column: 7 },
                                end: { line: 1, column: 8 }
                            }
                        }],
                        range: [0, 9],
                        loc: {
                            start: { line: 1, column: 0 },
                            end: { line: 1, column: 9 }
                        }
                    },
                    right: {
                        type: 'Identifier',
                        name: 'array',
                        range: [12, 17],
                        loc: {
                            start: { line: 1, column: 12 },
                            end: { line: 1, column: 17 }
                        }
                    },
                    range: [0, 17],
                    loc: {
                        start: { line: 1, column: 0 },
                        end: { line: 1, column: 17 }
                    }
                },
                range: [0, 17],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 1, column: 17 }
                }
            }],
            range: [0, 17],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 17 }
            }
        },

        'for (let [a, b] in obj) {\n}': {
            generateFrom: {
                type: 'Program',
                body: [{
                    type: 'ForInStatement',
                    left: {
                        type: 'VariableDeclaration',
                        kind: 'let',
                        declarations: [
                            {
                                type: 'VariableDeclarator',
                                id: {
                                    type: 'ArrayPattern',
                                    elements: [
                                        {
                                            type: 'Identifier',
                                            name: 'a'
                                        },
                                        {
                                            type: 'Identifier',
                                            name: 'b'
                                        }
                                    ]
                                },
                                init: null
                            }
                        ]
                    },
                    right: {
                        type: 'Identifier',
                        name: 'obj'
                    },
                    body: {
                        type: 'BlockStatement',
                        body: []
                    },
                    each: false
                }]
            }
        },

        'function getIdField([a, b, c]) {\n}': {
            generateFrom: {
                type: 'Program',
                body: [{
                    type: 'FunctionDeclaration',
                    id: {
                        type: 'Identifier',
                        name: "getIdField"
                    },
                    params: [
                        {
                            type: 'ArrayPattern',
                            elements: [
                                {
                                    type: 'Identifier',
                                    name: "a"
                                },
                                {
                                    type: 'Identifier',
                                    name: "b"
                                },
                                {
                                    type: 'Identifier',
                                    name: "c"
                                }
                            ]
                        }
                    ],
                    defaults: [],
                    body: {
                        type: 'BlockStatement',
                        body: []
                    },
                    rest: null,
                    generator: false,
                    expression: false
                }]
            }
        },

        '[x, ...y] = list;': {
            generateFrom: {
                "type": "Program",
                "body": [
                    {
                        "type": "ExpressionStatement",
                        "expression": {
                            "type": "AssignmentExpression",
                            "operator": "=",
                            "left": {
                                "type": "ArrayPattern",
                                "elements": [
                                    {
                                        "type": "Identifier",
                                        "name": "x"
                                    },
                                    {
                                        "type": "RestElement",
                                        "argument": {
                                            "type": "Identifier",
                                            "name": "y"
                                        }
                                    }
                                ]
                            },
                            "right": {
                                "type": "Identifier",
                                "name": "list"
                            }
                        }
                    }
                ]
            }
        },
        '[x, ...[y,z]] = list;': {
            "type": "Program",
            "body": [
                {
                    "type": "ExpressionStatement",
                    "expression": {
                        "type": "AssignmentExpression",
                        "operator": "=",
                        "left": {
                            "type": "ArrayPattern",
                            "elements": [
                                {
                                    "type": "Identifier",
                                    "name": "x"
                                },
                                {
                                    "type": "RestElement",
                                    "argument": {
                                        "type": "ArrayPattern",
                                        "elements": [
                                            {
                                                "type": "Identifier",
                                                "name": "y"
                                            },
                                            {
                                                "type": "Identifier",
                                                "name": "z"
                                            }
                                        ]
                                    }
                                }
                            ]
                        },
                        "right": {
                            "type": "Identifier",
                            "name": "list"
                        }
                    }
                }
            ]
        }
    },

    'Array Comprehension': {

        '[for (x in []) x];':{
            generateFrom: {
                type: 'Program',
                body: [{
                    type: 'ExpressionStatement',
                    expression: {
                        type: 'ComprehensionExpression',
                        filter: null,
                        blocks: [{
                            type: 'ComprehensionBlock',
                            left: {
                                type: 'Identifier',
                                name: 'x'
                            },
                            right: {
                                type: 'ArrayExpression',
                                elements: []
                            },
                            each: false,
                            of: false
                        }],
                        body: {
                            type: 'Identifier',
                            name: 'x'
                        }
                    }
                }]
            }
        },

        '[x for (x in [])];':{
            generateFrom: {
                type: 'Program',
                body: [{
                    type: 'ExpressionStatement',
                    expression: {
                        type: 'ComprehensionExpression',
                        filter: null,
                        blocks: [{
                            type: 'ComprehensionBlock',
                            left: {
                                type: 'Identifier',
                                name: 'x'
                            },
                            right: {
                                type: 'ArrayExpression',
                                elements: []
                            },
                            each: false,
                            of: false
                        }],
                        body: {
                            type: 'Identifier',
                            name: 'x'
                        }
                    }
                }]
            },
            options: {
                moz: {
                    comprehensionExpressionStartsWithAssignment: true
                }
            }
        },

        '[for (x of []) x];': {
            generateFrom: {
                type: 'Program',
                body: [{
                    type: 'ExpressionStatement',
                    expression: {
                        type: 'ComprehensionExpression',
                        filter: null,
                        blocks: [{
                            type: 'ComprehensionBlock',
                            left: {
                                type: 'Identifier',
                                name: 'x'
                            },
                            right: {
                                type: 'ArrayExpression',
                                elements: []
                            },
                            each: false,
                            of: true
                        }],
                        body: {
                            type: 'Identifier',
                            name: 'x'
                        }
                    }
                }]
            }
        },

        '[x for (x of [])];': {
            generateFrom: {
                type: 'Program',
                body: [{
                    type: 'ExpressionStatement',
                    expression: {
                        type: 'ComprehensionExpression',
                        filter: null,
                        blocks: [{
                            type: 'ComprehensionBlock',
                            left: {
                                type: 'Identifier',
                                name: 'x'
                            },
                            right: {
                                type: 'ArrayExpression',
                                elements: []
                            },
                            each: false,
                            of: true
                        }],
                        body: {
                            type: 'Identifier',
                            name: 'x'
                        }
                    }
                }]
            },
            options: {
                moz: {
                    comprehensionExpressionStartsWithAssignment: true
                }
            }
        },

        '[for (x in y) if (f(x)) 1];': {
            generateFrom: {
                type: 'Program',
                body: [{
                    type: 'ExpressionStatement',
                    expression: {
                        type: 'ComprehensionExpression',
                        filter: {
                            type: 'CallExpression',
                            callee: {
                                type: 'Identifier',
                                name: 'f'
                            },
                            'arguments': [{
                                type: 'Identifier',
                                name: 'x'
                            }]
                        },
                        blocks: [{
                            type: 'ComprehensionBlock',
                            left: {
                                type: 'Identifier',
                                name: 'x'
                            },
                            right: {
                                type: 'Identifier',
                                name: 'y'
                            },
                            each: false,
                            of: false
                        }],
                        body: {
                            type: 'Literal',
                            value: 1,
                            raw: '1'
                        }
                    }
                }]
            }
        },

        '[1 for (x in y) if (f(x))];': {
            generateFrom: {
                type: 'Program',
                body: [{
                    type: 'ExpressionStatement',
                    expression: {
                        type: 'ComprehensionExpression',
                        filter: {
                            type: 'CallExpression',
                            callee: {
                                type: 'Identifier',
                                name: 'f'
                            },
                            'arguments': [{
                                type: 'Identifier',
                                name: 'x'
                            }]
                        },
                        blocks: [{
                            type: 'ComprehensionBlock',
                            left: {
                                type: 'Identifier',
                                name: 'x'
                            },
                            right: {
                                type: 'Identifier',
                                name: 'y'
                            },
                            each: false,
                            of: false
                        }],
                        body: {
                            type: 'Literal',
                            value: 1,
                            raw: '1'
                        }
                    }
                }]
            },
            options: {
                moz: {
                    comprehensionExpressionStartsWithAssignment: true
                }
            }
        },

        '[for (x of y) if (f(x)) 1];': {
            generateFrom: {
                type: 'Program',
                body: [{
                    type: 'ExpressionStatement',
                    expression: {
                        type: 'ComprehensionExpression',
                        filter: {
                            type: 'CallExpression',
                            callee: {
                                type: 'Identifier',
                                name: 'f'
                            },
                            'arguments': [{
                                type: 'Identifier',
                                name: 'x'
                            }]
                        },
                        blocks: [{
                            type: 'ComprehensionBlock',
                            left: {
                                type: 'Identifier',
                                name: 'x'
                            },
                            right: {
                                type: 'Identifier',
                                name: 'y'
                            },
                            each: false,
                            of: true
                        }],
                        body: {
                            type: 'Literal',
                            value: 1,
                            raw: '1'
                        }
                    }
                }]
            }
        },

        '[1 for (x of y) if (f(x))];': {
            generateFrom: {
                type: 'Program',
                body: [{
                    type: 'ExpressionStatement',
                    expression: {
                        type: 'ComprehensionExpression',
                        filter: {
                            type: 'CallExpression',
                            callee: {
                                type: 'Identifier',
                                name: 'f'
                            },
                            'arguments': [{
                                type: 'Identifier',
                                name: 'x'
                            }]
                        },
                        blocks: [{
                            type: 'ComprehensionBlock',
                            left: {
                                type: 'Identifier',
                                name: 'x'
                            },
                            right: {
                                type: 'Identifier',
                                name: 'y'
                            },
                            each: false,
                            of: true
                        }],
                        body: {
                            type: 'Literal',
                            value: 1,
                            raw: '1'
                        }
                    }
                }]
            },
            options: {
                moz: {
                    comprehensionExpressionStartsWithAssignment: true
                }
            }
        },

        '[for (x in []) for (b in []) if (b && c) [\n    x,\n    b,\n    c\n]];': {
            generateFrom: {
                type: 'Program',
                body: [{
                    type: 'ExpressionStatement',
                    expression: {
                        type: 'ComprehensionExpression',
                        filter: {
                            type: 'LogicalExpression',
                            operator: '&&',
                            left: {
                                type: 'Identifier',
                                name: 'b'
                            },
                            right: {
                                type: 'Identifier',
                                name: 'c'
                            }
                        },
                        blocks: [{
                            type: 'ComprehensionBlock',
                            left: {
                                type: 'Identifier',
                                name: 'x'
                            },
                            right: {
                                type: 'ArrayExpression',
                                elements: []
                            },
                            each: false,
                            of: false
                        }, {
                            type: 'ComprehensionBlock',
                            left: {
                                type: 'Identifier',
                                name: 'b'
                            },
                            right: {
                                type: 'ArrayExpression',
                                elements: []
                            },
                            each: false,
                            of: false
                        }],
                        body: {
                            type: 'ArrayExpression',
                            elements: [{
                                type: 'Identifier',
                                name: 'x'
                            }, {
                                type: 'Identifier',
                                name: 'b'
                            }, {
                                type: 'Identifier',
                                name: 'c'
                            }]
                        }
                    }
                }]
            }
        },

        '[[\n    x,\n    b,\n    c\n] for (x in []) for (b in []) if (b && c)];': {
            generateFrom: {
                type: 'Program',
                body: [{
                    type: 'ExpressionStatement',
                    expression: {
                        type: 'ComprehensionExpression',
                        filter: {
                            type: 'LogicalExpression',
                            operator: '&&',
                            left: {
                                type: 'Identifier',
                                name: 'b'
                            },
                            right: {
                                type: 'Identifier',
                                name: 'c'
                            }
                        },
                        blocks: [{
                            type: 'ComprehensionBlock',
                            left: {
                                type: 'Identifier',
                                name: 'x'
                            },
                            right: {
                                type: 'ArrayExpression',
                                elements: []
                            },
                            each: false,
                            of: false
                        }, {
                            type: 'ComprehensionBlock',
                            left: {
                                type: 'Identifier',
                                name: 'b'
                            },
                            right: {
                                type: 'ArrayExpression',
                                elements: []
                            },
                            each: false,
                            of: false
                        }],
                        body: {
                            type: 'ArrayExpression',
                            elements: [{
                                type: 'Identifier',
                                name: 'x'
                            }, {
                                type: 'Identifier',
                                name: 'b'
                            }, {
                                type: 'Identifier',
                                name: 'c'
                            }]
                        }
                    }
                }]
            },
            options: {
                moz: {
                    comprehensionExpressionStartsWithAssignment: true
                }
            }
        },

        '[for (x of []) for (b of []) if (b && c) [\n    x,\n    b,\n    c\n]];': {
            generateFrom: {
                type: 'Program',
                body: [{
                    type: 'ExpressionStatement',
                    expression: {
                        type: 'ComprehensionExpression',
                        filter: {
                            type: 'LogicalExpression',
                            operator: '&&',
                            left: {
                                type: 'Identifier',
                                name: 'b'
                            },
                            right: {
                                type: 'Identifier',
                                name: 'c'
                            }
                        },
                        blocks: [{
                            type: 'ComprehensionBlock',
                            left: {
                                type: 'Identifier',
                                name: 'x'
                            },
                            right: {
                                type: 'ArrayExpression',
                                elements: []
                            },
                            each: false,
                            of: true
                        }, {
                            type: 'ComprehensionBlock',
                            left: {
                                type: 'Identifier',
                                name: 'b'
                            },
                            right: {
                                type: 'ArrayExpression',
                                elements: []
                            },
                            each: false,
                            of: true
                        }],
                        body: {
                            type: 'ArrayExpression',
                            elements: [{
                                type: 'Identifier',
                                name: 'x'
                            }, {
                                type: 'Identifier',
                                name: 'b'
                            }, {
                                type: 'Identifier',
                                name: 'c'
                            }]
                        }
                    }
                }]
            }
        },

        '[[\n    x,\n    b,\n    c\n] for (x of []) for (b of []) if (b && c)];': {
            generateFrom: {
                type: 'Program',
                body: [{
                    type: 'ExpressionStatement',
                    expression: {
                        type: 'ComprehensionExpression',
                        filter: {
                            type: 'LogicalExpression',
                            operator: '&&',
                            left: {
                                type: 'Identifier',
                                name: 'b'
                            },
                            right: {
                                type: 'Identifier',
                                name: 'c'
                            }
                        },
                        blocks: [{
                            type: 'ComprehensionBlock',
                            left: {
                                type: 'Identifier',
                                name: 'x'
                            },
                            right: {
                                type: 'ArrayExpression',
                                elements: []
                            },
                            each: false,
                            of: true
                        }, {
                            type: 'ComprehensionBlock',
                            left: {
                                type: 'Identifier',
                                name: 'b'
                            },
                            right: {
                                type: 'ArrayExpression',
                                elements: []
                            },
                            each: false,
                            of: true
                        }],
                        body: {
                            type: 'ArrayExpression',
                            elements: [{
                                type: 'Identifier',
                                name: 'x'
                            }, {
                                type: 'Identifier',
                                name: 'b'
                            }, {
                                type: 'Identifier',
                                name: 'c'
                            }]
                        }
                    }
                }]
            },
            options: {
                moz: {
                    comprehensionExpressionStartsWithAssignment: true
                }
            }
        }
    },

    'Harmony egal operators': {
        'a is b': {
            generateFrom: {
                type: 'BinaryExpression',
                operator: 'is',
                left: {
                    type: 'Identifier',
                    name: 'a'
                },
                right: {
                    type: 'Identifier',
                    name: 'b'
                }
            }
        },

        'a isnt b': {
            generateFrom: {
                type: 'BinaryExpression',
                operator: 'isnt',
                left: {
                    type: 'Identifier',
                    name: 'a'
                },
                right: {
                    type: 'Identifier',
                    name: 'b'
                }
            }
        },

        'a is b < c': {
            generateFrom: {
                type: 'BinaryExpression',
                operator: 'is',
                left: {
                    type: 'Identifier',
                    name: 'a'
                },
                right: {
                    type: 'BinaryExpression',
                    operator: '<',
                    left: {
                        type: 'Identifier',
                        name: 'b'
                    },
                    right: {
                        type: 'Identifier',
                        name: 'c'
                    }
                }
            }
        },

        'a < (b is c)': {
            generateFrom: {
                type: 'BinaryExpression',
                operator: '<',
                left: {
                    type: 'Identifier',
                    name: 'a'
                },
                right: {
                    type: 'BinaryExpression',
                    operator: 'is',
                    left: {
                        type: 'Identifier',
                        name: 'b'
                    },
                    right: {
                        type: 'Identifier',
                        name: 'c'
                    }
                }
            }
        }
    },

    'Harmony rest parameters': {
        'function a(...b) {\n}': {
            generateFrom: {
                type: 'FunctionDeclaration',
                id: {
                    type: 'Identifier',
                    name: 'a'
                },
                params: [],
                defaults: [],
                body: {
                    type: 'BlockStatement',
                    body: []
                },
                rest: {
                    type: 'Identifier',
                    name: 'b'
                },
                generator: false,
                expression: false
            }
        },

        'function a(b, ...c) {\n}': {
            generateFrom: {
                type: 'FunctionDeclaration',
                id: {
                    type: 'Identifier',
                    name: 'a'
                },
                params: [{
                    type: 'Identifier',
                    name: 'b'
                }],
                defaults: [],
                rest: {
                    type: 'Identifier',
                    name: 'c'
                },
                generator: false,
                body: {
                    type: 'BlockStatement',
                    body: []
                },
                expression: false
            }
        },

        '(b, ...c) => {\n};': {
            generateFrom: {
                type: 'ExpressionStatement',
                expression: {
                    type: 'ArrowFunctionExpression',
                    params: [{
                        type: 'Identifier',
                        name: 'b'
                    }],
                    defaults: [],
                    rest: {
                        type: 'Identifier',
                        name: 'c'
                    },
                    generator: false,
                    body: {
                        type: 'BlockStatement',
                        body: []
                    },
                    expression: false
                }
            }
        }
    },

    'Harmony method property': {
        'var obj = { test() { } }': {
            type: 'Program',
            body: [{
                type: 'VariableDeclaration',
                declarations: [{
                    type: 'VariableDeclarator',
                    id: {
                        type: 'Identifier',
                        name: 'obj',
                        range: [4, 7],
                        loc: {
                            start: { line: 1, column: 4 },
                            end: { line: 1, column: 7 }
                        }
                    },
                    init: {
                        type: 'ObjectExpression',
                        properties: [{
                            type: 'Property',
                            key: {
                                type: 'Identifier',
                                name: 'test',
                                range: [12, 16],
                                loc: {
                                    start: { line: 1, column: 12 },
                                    end: { line: 1, column: 16 }
                                }
                            },
                            value: {
                                type: 'FunctionExpression',
                                id: null,
                                params: [],
                                defaults: [],
                                body: {
                                    type: 'BlockStatement',
                                    body: [],
                                    range: [19, 22],
                                    loc: {
                                        start: { line: 1, column: 19 },
                                        end: { line: 1, column: 22 }
                                    }
                                },
                                rest: null,
                                generator: false,
                                expression: false,
                                range: [19, 22],
                                loc: {
                                    start: { line: 1, column: 19 },
                                    end: { line: 1, column: 22 }
                                }
                            },
                            kind: 'init',
                            method: true,
                            range: [12, 22],
                            loc: {
                                start: { line: 1, column: 12 },
                                end: { line: 1, column: 22 }
                            }
                        }],
                        range: [10, 24],
                        loc: {
                            start: { line: 1, column: 10 },
                            end: { line: 1, column: 24 }
                        }
                    },
                    range: [4, 24],
                    loc: {
                        start: { line: 1, column: 4 },
                        end: { line: 1, column: 24 }
                    }
                }],
                kind: 'var',
                range: [0, 24],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 1, column: 24 }
                }
            }],
            range: [0, 24],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 24 }
            }
        },

        'var obj = { test() 42 }': {
            type: 'Program',
            body: [{
                type: 'VariableDeclaration',
                declarations: [{
                    type: 'VariableDeclarator',
                    id: {
                        type: 'Identifier',
                        name: 'obj',
                        range: [4, 7],
                        loc: {
                            start: { line: 1, column: 4 },
                            end: { line: 1, column: 7 }
                        }
                    },
                    init: {
                        type: 'ObjectExpression',
                        properties: [{
                            type: 'Property',
                            key: {
                                type: 'Identifier',
                                name: 'test',
                                range: [12, 16],
                                loc: {
                                    start: { line: 1, column: 12 },
                                    end: { line: 1, column: 16 }
                                }
                            },
                            value: {
                                type: 'FunctionExpression',
                                id: null,
                                params: [],
                                defaults: [],
                                body: {
                                    type: 'Literal',
                                    value: 42,
                                    raw: '42',
                                    range: [19, 21],
                                    loc: {
                                        start: { line: 1, column: 19 },
                                        end: { line: 1, column: 21 }
                                    }
                                },
                                rest: null,
                                generator: false,
                                expression: true,
                                range: [19, 21],
                                loc: {
                                    start: { line: 1, column: 19 },
                                    end: { line: 1, column: 21 }
                                }
                            },
                            kind: 'init',
                            method: true,
                            range: [12, 21],
                            loc: {
                                start: { line: 1, column: 12 },
                                end: { line: 1, column: 21 }
                            }
                        }],
                        range: [10, 23],
                        loc: {
                            start: { line: 1, column: 10 },
                            end: { line: 1, column: 23 }
                        }
                    },
                    range: [4, 23],
                    loc: {
                        start: { line: 1, column: 4 },
                        end: { line: 1, column: 23 }
                    }
                }],
                kind: 'var',
                range: [0, 23],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 1, column: 23 }
                }
            }],
            range: [0, 23],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 23 }
            }
        },

        'var obj = { 42() 42 }': {
            type: 'Program',
            body: [{
                type: 'VariableDeclaration',
                declarations: [{
                    type: 'VariableDeclarator',
                    id: {
                        type: 'Identifier',
                        name: 'obj',
                        range: [4, 7],
                        loc: {
                            start: { line: 1, column: 4 },
                            end: { line: 1, column: 7 }
                        }
                    },
                    init: {
                        type: 'ObjectExpression',
                        properties: [{
                            type: 'Property',
                            key: {
                                type: 'Literal',
                                value: 42,
                                raw: '42',
                                range: [12, 14],
                                loc: {
                                    start: { line: 1, column: 12 },
                                    end: { line: 1, column: 14 }
                                }
                            },
                            value: {
                                type: 'FunctionExpression',
                                id: null,
                                params: [],
                                defaults: [],
                                body: {
                                    type: 'Literal',
                                    value: 42,
                                    raw: '42',
                                    range: [17, 19],
                                    loc: {
                                        start: { line: 1, column: 17 },
                                        end: { line: 1, column: 19 }
                                    }
                                },
                                rest: null,
                                generator: false,
                                expression: true,
                                range: [17, 19],
                                loc: {
                                    start: { line: 1, column: 17 },
                                    end: { line: 1, column: 19 }
                                }
                            },
                            kind: 'init',
                            method: true,
                            range: [12, 19],
                            loc: {
                                start: { line: 1, column: 12 },
                                end: { line: 1, column: 19 }
                            }
                        }],
                        range: [10, 21],
                        loc: {
                            start: { line: 1, column: 10 },
                            end: { line: 1, column: 21 }
                        }
                    },
                    range: [4, 21],
                    loc: {
                        start: { line: 1, column: 4 },
                        end: { line: 1, column: 21 }
                    }
                }],
                kind: 'var',
                range: [0, 21],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 1, column: 21 }
                }
            }],
            range: [0, 21],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 21 }
            }
        },

        'var obj = { *42() { yield test } }': {
            type: 'Program',
            body: [{
                type: 'VariableDeclaration',
                declarations: [{
                    type: 'VariableDeclarator',
                    id: {
                        type: 'Identifier',
                        name: 'obj',
                        range: [4, 7],
                        loc: {
                            start: { line: 1, column: 4 },
                            end: { line: 1, column: 7 }
                        }
                    },
                    init: {
                        type: 'ObjectExpression',
                        properties: [{
                            type: 'Property',
                            key: {
                                type: 'Literal',
                                value: 42,
                                raw: '42',
                                range: [13, 15],
                                loc: {
                                    start: { line: 1, column: 13 },
                                    end: { line: 1, column: 15 }
                                }
                            },
                            value: {
                                type: 'FunctionExpression',
                                id: null,
                                params: [],
                                defaults: [],
                                body: {
                                    type: 'BlockStatement',
                                    body: [{
                                        type: 'ExpressionStatement',
                                        expression: {
                                            type: 'YieldExpression',
                                            argument: {
                                                type: 'Identifier',
                                                name: 'test',
                                                range: [26, 30],
                                                loc: {
                                                    start: { line: 1, column: 26 },
                                                    end: { line: 1, column: 30 }
                                                }
                                            },
                                            delegate: false,
                                            range: [20, 30],
                                            loc: {
                                                start: { line: 1, column: 20 },
                                                end: { line: 1, column: 30 }
                                            }
                                        },
                                        range: [20, 31],
                                        loc: {
                                            start: { line: 1, column: 20 },
                                            end: { line: 1, column: 31 }
                                        }
                                    }],
                                    range: [18, 32],
                                    loc: {
                                        start: { line: 1, column: 18 },
                                        end: { line: 1, column: 32 }
                                    }
                                },
                                rest: null,
                                generator: true,
                                expression: false,
                                range: [18, 32],
                                loc: {
                                    start: { line: 1, column: 18 },
                                    end: { line: 1, column: 32 }
                                }
                            },
                            kind: 'init',
                            method: true,
                            range: [12, 32],
                            loc: {
                                start: { line: 1, column: 12 },
                                end: { line: 1, column: 32 }
                            }
                        }],
                        range: [10, 34],
                        loc: {
                            start: { line: 1, column: 10 },
                            end: { line: 1, column: 34 }
                        }
                    },
                    range: [4, 34],
                    loc: {
                        start: { line: 1, column: 4 },
                        end: { line: 1, column: 34 }
                    }
                }],
                kind: 'var',
                range: [0, 34],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 1, column: 34 }
                }
            }],
            range: [0, 34],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 34 }
            }
        }
    },

    'Harmony export declaration': {
        'export function a() { }': {
            type: 'Program',
            body: [{
                type: 'ExportDeclaration',
                declaration: {
                    type: 'FunctionDeclaration',
                    id: {
                        type: 'Identifier',
                        name: 'a',
                        range: [16, 17],
                        loc: {
                            start: { line: 1, column: 16 },
                            end: { line: 1, column: 17 }
                        }
                    },
                    params: [],
                    defaults: [],
                    body: {
                        type: 'BlockStatement',
                        body: [],
                        range: [20, 23],
                        loc: {
                            start: { line: 1, column: 20 },
                            end: { line: 1, column: 23 }
                        }
                    },
                    rest: null,
                    generator: false,
                    expression: false,
                    range: [7, 23],
                    loc: {
                        start: { line: 1, column: 7 },
                        end: { line: 1, column: 23 }
                    }
                },
                specifiers: null,
                source: null,
                range: [0, 23],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 1, column: 23 }
                }
            }],
            range: [0, 23],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 23 }
            }
        },

        'export var i = 20': {
            type: 'Program',
            body: [{
                type: 'ExportDeclaration',
                declaration: {
                    type: 'VariableDeclaration',
                    declarations: [{
                        type: 'VariableDeclarator',
                        id: {
                            type: 'Identifier',
                            name: 'i',
                            range: [11, 12],
                            loc: {
                                start: { line: 1, column: 11 },
                                end: { line: 1, column: 12 }
                            }
                        },
                        init: {
                            type: 'Literal',
                            value: 20,
                            raw: '20',
                            range: [15, 17],
                            loc: {
                                start: { line: 1, column: 15 },
                                end: { line: 1, column: 17 }
                            }
                        },
                        range: [11, 17],
                        loc: {
                            start: { line: 1, column: 11 },
                            end: { line: 1, column: 17 }
                        }
                    }],
                    kind: 'var',
                    range: [7, 17],
                    loc: {
                        start: { line: 1, column: 7 },
                        end: { line: 1, column: 17 }
                    }
                },
                specifiers: null,
                source: null,
                range: [0, 17],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 1, column: 17 }
                }
            }],
            range: [0, 17],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 17 }
            }
        },

        'export let i = 20': {
            type: 'Program',
            body: [{
                type: 'ExportDeclaration',
                declaration: {
                    type: 'VariableDeclaration',
                    declarations: [{
                        type: 'VariableDeclarator',
                        id: {
                            type: 'Identifier',
                            name: 'i',
                            range: [11, 12],
                            loc: {
                                start: { line: 1, column: 11 },
                                end: { line: 1, column: 12 }
                            }
                        },
                        init: {
                            type: 'Literal',
                            value: 20,
                            raw: '20',
                            range: [15, 17],
                            loc: {
                                start: { line: 1, column: 15 },
                                end: { line: 1, column: 17 }
                            }
                        },
                        range: [11, 17],
                        loc: {
                            start: { line: 1, column: 11 },
                            end: { line: 1, column: 17 }
                        }
                    }],
                    kind: 'let',
                    range: [7, 17],
                    loc: {
                        start: { line: 1, column: 7 },
                        end: { line: 1, column: 17 }
                    }
                },
                specifiers: null,
                source: null,
                range: [0, 17],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 1, column: 17 }
                }
            }],
            range: [0, 17],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 17 }
            }
        },

        'export const i = 20': {
            type: 'Program',
            body: [{
                type: 'ExportDeclaration',
                declaration: {
                    type: 'VariableDeclaration',
                    declarations: [{
                        type: 'VariableDeclarator',
                        id: {
                            type: 'Identifier',
                            name: 'i',
                            range: [13, 14],
                            loc: {
                                start: { line: 1, column: 13 },
                                end: { line: 1, column: 14 }
                            }
                        },
                        init: {
                            type: 'Literal',
                            value: 20,
                            raw: '20',
                            range: [17, 19],
                            loc: {
                                start: { line: 1, column: 17 },
                                end: { line: 1, column: 19 }
                            }
                        },
                        range: [13, 19],
                        loc: {
                            start: { line: 1, column: 13 },
                            end: { line: 1, column: 19 }
                        }
                    }],
                    kind: 'const',
                    range: [7, 19],
                    loc: {
                        start: { line: 1, column: 7 },
                        end: { line: 1, column: 19 }
                    }
                },
                specifiers: null,
                source: null,
                range: [0, 19],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 1, column: 19 }
                }
            }],
            range: [0, 19],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 19 }
            }
        }
    },

    'Harmony classes': {
        'class hello{}': {
            options: {
                format: {
                    compact: true,
                    semicolons: false
                }
            },
            generateFrom: {
                type: 'Program',
                body: [{
                    type: 'ClassDeclaration',
                    id: {
                        type: 'Identifier',
                        name: 'hello',
                        range: [6, 11],
                        loc: {
                            start: { line: 1, column: 6 },
                            end: { line: 1, column: 11 }
                        }
                    },
                    superClass: null,
                    body: {
                        type: 'ClassBody',
                        body: [],
                        range: [11, 13],
                        loc: {
                            start: { line: 1, column: 11 },
                            end: { line: 1, column: 13 }
                        }
                    },
                    range: [0, 13],
                    loc: {
                        start: { line: 1, column: 0 },
                        end: { line: 1, column: 13 }
                    }
                }],
                range: [0, 13],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 1, column: 13 }
                }
            }
        },

        'class hello extends[]{}': {
            options: {
                format: {
                    compact: true,
                    semicolons: false
                }
            },
            generateFrom: {
                type: 'Program',
                body: [{
                    type: 'ClassDeclaration',
                    id: {
                        type: 'Identifier',
                        name: 'hello',
                        range: [6, 11],
                        loc: {
                            start: { line: 1, column: 6 },
                            end: { line: 1, column: 11 }
                        }
                    },
                    superClass: {
                        type: 'ArrayExpression',
                        elements: [],
                        range: [19, 21],
                        loc: {
                            start: { line: 1, column: 19 },
                            end: { line: 1, column: 21 }
                        }
                    },
                    body: {
                        type: 'ClassBody',
                        body: [],
                        range: [21, 23],
                        loc: {
                            start: { line: 1, column: 21 },
                            end: { line: 1, column: 23 }
                        }
                    },
                    range: [0, 23],
                    loc: {
                        start: { line: 1, column: 0 },
                        end: { line: 1, column: 23 }
                    }
                }],
                range: [0, 23],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 1, column: 23 }
                }
            }
        },

        'class hello extends[]{static[ok](){}}': {
            options: {
                format: {
                    compact: true,
                    semicolons: false
                }
            },
            generateFrom: {
                type: 'Program',
                body: [{
                    type: 'ClassDeclaration',
                    id: {
                        type: 'Identifier',
                        name: 'hello',
                        range: [6, 11],
                        loc: {
                            start: { line: 1, column: 6 },
                            end: { line: 1, column: 11 }
                        }
                    },
                    superClass: {
                        type: 'ArrayExpression',
                        elements: [],
                        range: [19, 21],
                        loc: {
                            start: { line: 1, column: 19 },
                            end: { line: 1, column: 21 }
                        }
                    },
                    body: {
                        type: 'ClassBody',
                        body: [{
                            type: 'MethodDefinition',
                            key: {
                                type: 'Identifier',
                                name: 'ok',
                                range: [29, 31],
                                loc: {
                                    start: { line: 1, column: 29 },
                                    end: { line: 1, column: 31 }
                                }
                            },
                            value: {
                                type: 'FunctionExpression',
                                id: null,
                                params: [],
                                defaults: [],
                                body: {
                                    type: 'BlockStatement',
                                    body: [],
                                    range: [34, 36],
                                    loc: {
                                        start: { line: 1, column: 34 },
                                        end: { line: 1, column: 36 }
                                    }
                                },
                                rest: null,
                                generator: false,
                                expression: false,
                                range: [34, 36],
                                loc: {
                                    start: { line: 1, column: 34 },
                                    end: { line: 1, column: 36 }
                                }
                            },
                            kind: '',
                            'static': true,
                            computed: true,
                            range: [22, 36],
                            loc: {
                                start: { line: 1, column: 22 },
                                end: { line: 1, column: 36 }
                            }
                        }],
                        range: [21, 37],
                        loc: {
                            start: { line: 1, column: 21 },
                            end: { line: 1, column: 37 }
                        }
                    },
                    range: [0, 37],
                    loc: {
                        start: { line: 1, column: 0 },
                        end: { line: 1, column: 37 }
                    }
                }],
                range: [0, 37],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 1, column: 37 }
                }
            }
        },

        'class hello extends[]{static"ok"(){}static get"g1"(){}static set"s1"(v){}static*gen(){}}': {
            options: {
                format: {
                    compact: true,
                    semicolons: false
                }
            },
            generateFrom: {
                type: 'Program',
                body: [{
                    type: 'ClassDeclaration',
                    id: {
                        type: 'Identifier',
                        name: 'hello',
                        range: [6, 11],
                        loc: {
                            start: { line: 1, column: 6 },
                            end: { line: 1, column: 11 }
                        }
                    },
                    superClass: {
                        type: 'ArrayExpression',
                        elements: [],
                        range: [19, 21],
                        loc: {
                            start: { line: 1, column: 19 },
                            end: { line: 1, column: 21 }
                        }
                    },
                    body: {
                        type: 'ClassBody',
                        body: [{
                            type: 'MethodDefinition',
                            key: {
                                type: 'Literal',
                                value: 'ok',
                                raw: '"ok"',
                                range: [28, 32],
                                loc: {
                                    start: { line: 1, column: 28 },
                                    end: { line: 1, column: 32 }
                                }
                            },
                            value: {
                                type: 'FunctionExpression',
                                id: null,
                                params: [],
                                defaults: [],
                                body: {
                                    type: 'BlockStatement',
                                    body: [],
                                    range: [34, 36],
                                    loc: {
                                        start: { line: 1, column: 34 },
                                        end: { line: 1, column: 36 }
                                    }
                                },
                                rest: null,
                                generator: false,
                                expression: false,
                                range: [34, 36],
                                loc: {
                                    start: { line: 1, column: 34 },
                                    end: { line: 1, column: 36 }
                                }
                            },
                            kind: '',
                            'static': true,
                            computed: false,
                            range: [22, 36],
                            loc: {
                                start: { line: 1, column: 22 },
                                end: { line: 1, column: 36 }
                            }
                        }, {
                            type: 'MethodDefinition',
                            key: {
                                type: 'Literal',
                                value: 'g1',
                                raw: '"g1"',
                                range: [46, 50],
                                loc: {
                                    start: { line: 1, column: 46 },
                                    end: { line: 1, column: 50 }
                                }
                            },
                            value: {
                                type: 'FunctionExpression',
                                id: null,
                                params: [],
                                defaults: [],
                                body: {
                                    type: 'BlockStatement',
                                    body: [],
                                    range: [52, 54],
                                    loc: {
                                        start: { line: 1, column: 52 },
                                        end: { line: 1, column: 54 }
                                    }
                                },
                                rest: null,
                                generator: false,
                                expression: false,
                                range: [52, 54],
                                loc: {
                                    start: { line: 1, column: 52 },
                                    end: { line: 1, column: 54 }
                                }
                            },
                            kind: 'get',
                            'static': true,
                            computed: false,
                            range: [36, 54],
                            loc: {
                                start: { line: 1, column: 36 },
                                end: { line: 1, column: 54 }
                            }
                        }, {
                            type: 'MethodDefinition',
                            key: {
                                type: 'Literal',
                                value: 's1',
                                raw: '"s1"',
                                range: [64, 68],
                                loc: {
                                    start: { line: 1, column: 64 },
                                    end: { line: 1, column: 68 }
                                }
                            },
                            value: {
                                type: 'FunctionExpression',
                                id: null,
                                params: [{
                                    type: 'Identifier',
                                    name: 'v',
                                    range: [69, 70],
                                    loc: {
                                        start: { line: 1, column: 69 },
                                        end: { line: 1, column: 70 }
                                    }
                                }],
                                defaults: [],
                                body: {
                                    type: 'BlockStatement',
                                    body: [],
                                    range: [71, 73],
                                    loc: {
                                        start: { line: 1, column: 71 },
                                        end: { line: 1, column: 73 }
                                    }
                                },
                                rest: null,
                                generator: false,
                                expression: false,
                                range: [71, 73],
                                loc: {
                                    start: { line: 1, column: 71 },
                                    end: { line: 1, column: 73 }
                                }
                            },
                            kind: 'set',
                            'static': true,
                            computed: false,
                            range: [54, 73],
                            loc: {
                                start: { line: 1, column: 54 },
                                end: { line: 1, column: 73 }
                            }
                        }, {
                            type: 'MethodDefinition',
                            key: {
                                type: 'Identifier',
                                name: 'gen',
                                range: [80, 83],
                                loc: {
                                    start: { line: 1, column: 80 },
                                    end: { line: 1, column: 83 }
                                }
                            },
                            value: {
                                type: 'FunctionExpression',
                                id: null,
                                params: [],
                                defaults: [],
                                body: {
                                    type: 'BlockStatement',
                                    body: [],
                                    range: [85, 87],
                                    loc: {
                                        start: { line: 1, column: 85 },
                                        end: { line: 1, column: 87 }
                                    }
                                },
                                rest: null,
                                generator: true,
                                expression: false,
                                range: [85, 87],
                                loc: {
                                    start: { line: 1, column: 85 },
                                    end: { line: 1, column: 87 }
                                }
                            },
                            kind: '',
                            'static': true,
                            computed: false,
                            range: [73, 87],
                            loc: {
                                start: { line: 1, column: 73 },
                                end: { line: 1, column: 87 }
                            }
                        }],
                        range: [21, 88],
                        loc: {
                            start: { line: 1, column: 21 },
                            end: { line: 1, column: 88 }
                        }
                    },
                    range: [0, 88],
                    loc: {
                        start: { line: 1, column: 0 },
                        end: { line: 1, column: 88 }
                    }
                }],
                range: [0, 88],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 1, column: 88 }
                }
            }
        },

        'class hello extends[]{"ok"(){}get"g1"(){}set"s1"(v){}*gen(){}}': {
            options: {
                format: {
                    compact: true,
                    semicolons: false
                }
            },
            generateFrom: {
                type: 'Program',
                body: [{
                    type: 'ClassDeclaration',
                    id: {
                        type: 'Identifier',
                        name: 'hello',
                        range: [6, 11],
                        loc: {
                            start: { line: 1, column: 6 },
                            end: { line: 1, column: 11 }
                        }
                    },
                    superClass: {
                        type: 'ArrayExpression',
                        elements: [],
                        range: [19, 21],
                        loc: {
                            start: { line: 1, column: 19 },
                            end: { line: 1, column: 21 }
                        }
                    },
                    body: {
                        type: 'ClassBody',
                        body: [{
                            type: 'MethodDefinition',
                            key: {
                                type: 'Literal',
                                value: 'ok',
                                raw: '"ok"',
                                range: [22, 26],
                                loc: {
                                    start: { line: 1, column: 22 },
                                    end: { line: 1, column: 26 }
                                }
                            },
                            value: {
                                type: 'FunctionExpression',
                                id: null,
                                params: [],
                                defaults: [],
                                body: {
                                    type: 'BlockStatement',
                                    body: [],
                                    range: [28, 30],
                                    loc: {
                                        start: { line: 1, column: 28 },
                                        end: { line: 1, column: 30 }
                                    }
                                },
                                rest: null,
                                generator: false,
                                expression: false,
                                range: [28, 30],
                                loc: {
                                    start: { line: 1, column: 28 },
                                    end: { line: 1, column: 30 }
                                }
                            },
                            kind: '',
                            'static': false,
                            computed: false,
                            range: [22, 30],
                            loc: {
                                start: { line: 1, column: 22 },
                                end: { line: 1, column: 30 }
                            }
                        }, {
                            type: 'MethodDefinition',
                            key: {
                                type: 'Literal',
                                value: 'g1',
                                raw: '"g1"',
                                range: [33, 37],
                                loc: {
                                    start: { line: 1, column: 33 },
                                    end: { line: 1, column: 37 }
                                }
                            },
                            value: {
                                type: 'FunctionExpression',
                                id: null,
                                params: [],
                                defaults: [],
                                body: {
                                    type: 'BlockStatement',
                                    body: [],
                                    range: [39, 41],
                                    loc: {
                                        start: { line: 1, column: 39 },
                                        end: { line: 1, column: 41 }
                                    }
                                },
                                rest: null,
                                generator: false,
                                expression: false,
                                range: [39, 41],
                                loc: {
                                    start: { line: 1, column: 39 },
                                    end: { line: 1, column: 41 }
                                }
                            },
                            kind: 'get',
                            'static': false,
                            computed: false,
                            range: [30, 41],
                            loc: {
                                start: { line: 1, column: 30 },
                                end: { line: 1, column: 41 }
                            }
                        }, {
                            type: 'MethodDefinition',
                            key: {
                                type: 'Literal',
                                value: 's1',
                                raw: '"s1"',
                                range: [44, 48],
                                loc: {
                                    start: { line: 1, column: 44 },
                                    end: { line: 1, column: 48 }
                                }
                            },
                            value: {
                                type: 'FunctionExpression',
                                id: null,
                                params: [{
                                    type: 'Identifier',
                                    name: 'v',
                                    range: [49, 50],
                                    loc: {
                                        start: { line: 1, column: 49 },
                                        end: { line: 1, column: 50 }
                                    }
                                }],
                                defaults: [],
                                body: {
                                    type: 'BlockStatement',
                                    body: [],
                                    range: [51, 53],
                                    loc: {
                                        start: { line: 1, column: 51 },
                                        end: { line: 1, column: 53 }
                                    }
                                },
                                rest: null,
                                generator: false,
                                expression: false,
                                range: [51, 53],
                                loc: {
                                    start: { line: 1, column: 51 },
                                    end: { line: 1, column: 53 }
                                }
                            },
                            kind: 'set',
                            'static': false,
                            computed: false,
                            range: [41, 53],
                            loc: {
                                start: { line: 1, column: 41 },
                                end: { line: 1, column: 53 }
                            }
                        }, {
                            type: 'MethodDefinition',
                            key: {
                                type: 'Identifier',
                                name: 'gen',
                                range: [54, 57],
                                loc: {
                                    start: { line: 1, column: 54 },
                                    end: { line: 1, column: 57 }
                                }
                            },
                            value: {
                                type: 'FunctionExpression',
                                id: null,
                                params: [],
                                defaults: [],
                                body: {
                                    type: 'BlockStatement',
                                    body: [],
                                    range: [59, 61],
                                    loc: {
                                        start: { line: 1, column: 59 },
                                        end: { line: 1, column: 61 }
                                    }
                                },
                                rest: null,
                                generator: true,
                                expression: false,
                                range: [59, 61],
                                loc: {
                                    start: { line: 1, column: 59 },
                                    end: { line: 1, column: 61 }
                                }
                            },
                            kind: '',
                            'static': false,
                            computed: false,
                            range: [53, 61],
                            loc: {
                                start: { line: 1, column: 53 },
                                end: { line: 1, column: 61 }
                            }
                        }],
                        range: [21, 62],
                        loc: {
                            start: { line: 1, column: 21 },
                            end: { line: 1, column: 62 }
                        }
                    },
                    range: [0, 62],
                    loc: {
                        start: { line: 1, column: 0 },
                        end: { line: 1, column: 62 }
                    }
                }],
                range: [0, 62],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 1, column: 62 }
                }
            }
        },

        'class hello extends[]{ok(){}get g1(){}set s1(v){}*gen(){}}': {
            options: {
                format: {
                    compact: true,
                    semicolons: false
                }
            },
            generateFrom: {
                type: 'Program',
                body: [{
                    type: 'ClassDeclaration',
                    id: {
                        type: 'Identifier',
                        name: 'hello',
                        range: [6, 11],
                        loc: {
                            start: { line: 1, column: 6 },
                            end: { line: 1, column: 11 }
                        }
                    },
                    superClass: {
                        type: 'ArrayExpression',
                        elements: [],
                        range: [19, 21],
                        loc: {
                            start: { line: 1, column: 19 },
                            end: { line: 1, column: 21 }
                        }
                    },
                    body: {
                        type: 'ClassBody',
                        body: [{
                            type: 'MethodDefinition',
                            key: {
                                type: 'Identifier',
                                name: 'ok',
                                range: [22, 24],
                                loc: {
                                    start: { line: 1, column: 22 },
                                    end: { line: 1, column: 24 }
                                }
                            },
                            value: {
                                type: 'FunctionExpression',
                                id: null,
                                params: [],
                                defaults: [],
                                body: {
                                    type: 'BlockStatement',
                                    body: [],
                                    range: [26, 28],
                                    loc: {
                                        start: { line: 1, column: 26 },
                                        end: { line: 1, column: 28 }
                                    }
                                },
                                rest: null,
                                generator: false,
                                expression: false,
                                range: [26, 28],
                                loc: {
                                    start: { line: 1, column: 26 },
                                    end: { line: 1, column: 28 }
                                }
                            },
                            kind: '',
                            'static': false,
                            computed: false,
                            range: [22, 28],
                            loc: {
                                start: { line: 1, column: 22 },
                                end: { line: 1, column: 28 }
                            }
                        }, {
                            type: 'MethodDefinition',
                            key: {
                                type: 'Identifier',
                                name: 'g1',
                                range: [32, 34],
                                loc: {
                                    start: { line: 1, column: 32 },
                                    end: { line: 1, column: 34 }
                                }
                            },
                            value: {
                                type: 'FunctionExpression',
                                id: null,
                                params: [],
                                defaults: [],
                                body: {
                                    type: 'BlockStatement',
                                    body: [],
                                    range: [36, 38],
                                    loc: {
                                        start: { line: 1, column: 36 },
                                        end: { line: 1, column: 38 }
                                    }
                                },
                                rest: null,
                                generator: false,
                                expression: false,
                                range: [36, 38],
                                loc: {
                                    start: { line: 1, column: 36 },
                                    end: { line: 1, column: 38 }
                                }
                            },
                            kind: 'get',
                            'static': false,
                            computed: false,
                            range: [28, 38],
                            loc: {
                                start: { line: 1, column: 28 },
                                end: { line: 1, column: 38 }
                            }
                        }, {
                            type: 'MethodDefinition',
                            key: {
                                type: 'Identifier',
                                name: 's1',
                                range: [42, 44],
                                loc: {
                                    start: { line: 1, column: 42 },
                                    end: { line: 1, column: 44 }
                                }
                            },
                            value: {
                                type: 'FunctionExpression',
                                id: null,
                                params: [{
                                    type: 'Identifier',
                                    name: 'v',
                                    range: [45, 46],
                                    loc: {
                                        start: { line: 1, column: 45 },
                                        end: { line: 1, column: 46 }
                                    }
                                }],
                                defaults: [],
                                body: {
                                    type: 'BlockStatement',
                                    body: [],
                                    range: [47, 49],
                                    loc: {
                                        start: { line: 1, column: 47 },
                                        end: { line: 1, column: 49 }
                                    }
                                },
                                rest: null,
                                generator: false,
                                expression: false,
                                range: [47, 49],
                                loc: {
                                    start: { line: 1, column: 47 },
                                    end: { line: 1, column: 49 }
                                }
                            },
                            kind: 'set',
                            'static': false,
                            computed: false,
                            range: [38, 49],
                            loc: {
                                start: { line: 1, column: 38 },
                                end: { line: 1, column: 49 }
                            }
                        }, {
                            type: 'MethodDefinition',
                            key: {
                                type: 'Identifier',
                                name: 'gen',
                                range: [50, 53],
                                loc: {
                                    start: { line: 1, column: 50 },
                                    end: { line: 1, column: 53 }
                                }
                            },
                            value: {
                                type: 'FunctionExpression',
                                id: null,
                                params: [],
                                defaults: [],
                                body: {
                                    type: 'BlockStatement',
                                    body: [],
                                    range: [55, 57],
                                    loc: {
                                        start: { line: 1, column: 55 },
                                        end: { line: 1, column: 57 }
                                    }
                                },
                                rest: null,
                                generator: true,
                                expression: false,
                                range: [55, 57],
                                loc: {
                                    start: { line: 1, column: 55 },
                                    end: { line: 1, column: 57 }
                                }
                            },
                            kind: '',
                            'static': false,
                            computed: false,
                            range: [49, 57],
                            loc: {
                                start: { line: 1, column: 49 },
                                end: { line: 1, column: 57 }
                            }
                        }],
                        range: [21, 58],
                        loc: {
                            start: { line: 1, column: 21 },
                            end: { line: 1, column: 58 }
                        }
                    },
                    range: [0, 58],
                    loc: {
                        start: { line: 1, column: 0 },
                        end: { line: 1, column: 58 }
                    }
                }],
                range: [0, 58],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 1, column: 58 }
                }
            }
        },

        'class hello extends[]{2(){}get 3(){}set 42(v){}*4(){}}': {
            options: {
                format: {
                    compact: true,
                    semicolons: false
                }
            },
            generateFrom: {
                type: 'Program',
                body: [{
                    type: 'ClassDeclaration',
                    id: {
                        type: 'Identifier',
                        name: 'hello',
                        range: [6, 11],
                        loc: {
                            start: { line: 1, column: 6 },
                            end: { line: 1, column: 11 }
                        }
                    },
                    superClass: {
                        type: 'ArrayExpression',
                        elements: [],
                        range: [19, 21],
                        loc: {
                            start: { line: 1, column: 19 },
                            end: { line: 1, column: 21 }
                        }
                    },
                    body: {
                        type: 'ClassBody',
                        body: [{
                            type: 'MethodDefinition',
                            key: {
                                type: 'Literal',
                                value: 2,
                                raw: '2',
                                range: [22, 23],
                                loc: {
                                    start: { line: 1, column: 22 },
                                    end: { line: 1, column: 23 }
                                }
                            },
                            value: {
                                type: 'FunctionExpression',
                                id: null,
                                params: [],
                                defaults: [],
                                body: {
                                    type: 'BlockStatement',
                                    body: [],
                                    range: [25, 27],
                                    loc: {
                                        start: { line: 1, column: 25 },
                                        end: { line: 1, column: 27 }
                                    }
                                },
                                rest: null,
                                generator: false,
                                expression: false,
                                range: [25, 27],
                                loc: {
                                    start: { line: 1, column: 25 },
                                    end: { line: 1, column: 27 }
                                }
                            },
                            kind: '',
                            'static': false,
                            computed: false,
                            range: [22, 27],
                            loc: {
                                start: { line: 1, column: 22 },
                                end: { line: 1, column: 27 }
                            }
                        }, {
                            type: 'MethodDefinition',
                            key: {
                                type: 'Literal',
                                value: 3,
                                raw: '3',
                                range: [31, 32],
                                loc: {
                                    start: { line: 1, column: 31 },
                                    end: { line: 1, column: 32 }
                                }
                            },
                            value: {
                                type: 'FunctionExpression',
                                id: null,
                                params: [],
                                defaults: [],
                                body: {
                                    type: 'BlockStatement',
                                    body: [],
                                    range: [34, 36],
                                    loc: {
                                        start: { line: 1, column: 34 },
                                        end: { line: 1, column: 36 }
                                    }
                                },
                                rest: null,
                                generator: false,
                                expression: false,
                                range: [34, 36],
                                loc: {
                                    start: { line: 1, column: 34 },
                                    end: { line: 1, column: 36 }
                                }
                            },
                            kind: 'get',
                            'static': false,
                            computed: false,
                            range: [27, 36],
                            loc: {
                                start: { line: 1, column: 27 },
                                end: { line: 1, column: 36 }
                            }
                        }, {
                            type: 'MethodDefinition',
                            key: {
                                type: 'Literal',
                                value: 42,
                                raw: '42',
                                range: [40, 42],
                                loc: {
                                    start: { line: 1, column: 40 },
                                    end: { line: 1, column: 42 }
                                }
                            },
                            value: {
                                type: 'FunctionExpression',
                                id: null,
                                params: [{
                                    type: 'Identifier',
                                    name: 'v',
                                    range: [43, 44],
                                    loc: {
                                        start: { line: 1, column: 43 },
                                        end: { line: 1, column: 44 }
                                    }
                                }],
                                defaults: [],
                                body: {
                                    type: 'BlockStatement',
                                    body: [],
                                    range: [45, 47],
                                    loc: {
                                        start: { line: 1, column: 45 },
                                        end: { line: 1, column: 47 }
                                    }
                                },
                                rest: null,
                                generator: false,
                                expression: false,
                                range: [45, 47],
                                loc: {
                                    start: { line: 1, column: 45 },
                                    end: { line: 1, column: 47 }
                                }
                            },
                            kind: 'set',
                            'static': false,
                            computed: false,
                            range: [36, 47],
                            loc: {
                                start: { line: 1, column: 36 },
                                end: { line: 1, column: 47 }
                            }
                        }, {
                            type: 'MethodDefinition',
                            key: {
                                type: 'Literal',
                                value: 4,
                                raw: '4',
                                range: [48, 49],
                                loc: {
                                    start: { line: 1, column: 48 },
                                    end: { line: 1, column: 49 }
                                }
                            },
                            value: {
                                type: 'FunctionExpression',
                                id: null,
                                params: [],
                                defaults: [],
                                body: {
                                    type: 'BlockStatement',
                                    body: [],
                                    range: [51, 53],
                                    loc: {
                                        start: { line: 1, column: 51 },
                                        end: { line: 1, column: 53 }
                                    }
                                },
                                rest: null,
                                generator: true,
                                expression: false,
                                range: [51, 53],
                                loc: {
                                    start: { line: 1, column: 51 },
                                    end: { line: 1, column: 53 }
                                }
                            },
                            kind: '',
                            'static': false,
                            computed: false,
                            range: [47, 53],
                            loc: {
                                start: { line: 1, column: 47 },
                                end: { line: 1, column: 53 }
                            }
                        }],
                        range: [21, 54],
                        loc: {
                            start: { line: 1, column: 21 },
                            end: { line: 1, column: 54 }
                        }
                    },
                    range: [0, 54],
                    loc: {
                        start: { line: 1, column: 0 },
                        end: { line: 1, column: 54 }
                    }
                }],
                range: [0, 54],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 1, column: 54 }
                }
            }
        },

        '(class extends[]{static[ok](){}})': {
            options: {
                format: {
                    compact: true,
                    semicolons: false
                }
            },
            generateFrom: {
                type: 'Program',
                body: [{
                    type: 'ExpressionStatement',
                    expression: {
                        type: 'ClassExpression',
                        superClass: {
                            type: 'ArrayExpression',
                            elements: [],
                            range: [14, 16],
                            loc: {
                                start: { line: 1, column: 14 },
                                end: { line: 1, column: 16 }
                            }
                        },
                        body: {
                            type: 'ClassBody',
                            body: [{
                                type: 'MethodDefinition',
                                key: {
                                    type: 'Identifier',
                                    name: 'ok',
                                    range: [24, 26],
                                    loc: {
                                        start: { line: 1, column: 24 },
                                        end: { line: 1, column: 26 }
                                    }
                                },
                                value: {
                                    type: 'FunctionExpression',
                                    id: null,
                                    params: [],
                                    defaults: [],
                                    body: {
                                        type: 'BlockStatement',
                                        body: [],
                                        range: [29, 31],
                                        loc: {
                                            start: { line: 1, column: 29 },
                                            end: { line: 1, column: 31 }
                                        }
                                    },
                                    rest: null,
                                    generator: false,
                                    expression: false,
                                    range: [29, 31],
                                    loc: {
                                        start: { line: 1, column: 29 },
                                        end: { line: 1, column: 31 }
                                    }
                                },
                                kind: '',
                                'static': true,
                                computed: true,
                                range: [17, 31],
                                loc: {
                                    start: { line: 1, column: 17 },
                                    end: { line: 1, column: 31 }
                                }
                            }],
                            range: [16, 32],
                            loc: {
                                start: { line: 1, column: 16 },
                                end: { line: 1, column: 32 }
                            }
                        },
                        range: [1, 32],
                        loc: {
                            start: { line: 1, column: 1 },
                            end: { line: 1, column: 32 }
                        }
                    },
                    range: [0, 33],
                    loc: {
                        start: { line: 1, column: 0 },
                        end: { line: 1, column: 33 }
                    }
                }],
                range: [0, 33],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 1, column: 33 }
                }
            }
        },

        '(class extends"hello"{static[ok](){}})': {
            options: {
                format: {
                    compact: true,
                    semicolons: false
                }
            },
            generateFrom: {
                type: 'Program',
                body: [{
                    type: 'ExpressionStatement',
                    expression: {
                        type: 'ClassExpression',
                        superClass: {
                            type: 'Literal',
                            value: 'hello',
                            raw: '"hello"',
                            range: [14, 21],
                            loc: {
                                start: { line: 1, column: 14 },
                                end: { line: 1, column: 21 }
                            }
                        },
                        body: {
                            type: 'ClassBody',
                            body: [{
                                type: 'MethodDefinition',
                                key: {
                                    type: 'Identifier',
                                    name: 'ok',
                                    range: [29, 31],
                                    loc: {
                                        start: { line: 1, column: 29 },
                                        end: { line: 1, column: 31 }
                                    }
                                },
                                value: {
                                    type: 'FunctionExpression',
                                    id: null,
                                    params: [],
                                    defaults: [],
                                    body: {
                                        type: 'BlockStatement',
                                        body: [],
                                        range: [34, 36],
                                        loc: {
                                            start: { line: 1, column: 34 },
                                            end: { line: 1, column: 36 }
                                        }
                                    },
                                    rest: null,
                                    generator: false,
                                    expression: false,
                                    range: [34, 36],
                                    loc: {
                                        start: { line: 1, column: 34 },
                                        end: { line: 1, column: 36 }
                                    }
                                },
                                kind: '',
                                'static': true,
                                computed: true,
                                range: [22, 36],
                                loc: {
                                    start: { line: 1, column: 22 },
                                    end: { line: 1, column: 36 }
                                }
                            }],
                            range: [21, 37],
                            loc: {
                                start: { line: 1, column: 21 },
                                end: { line: 1, column: 37 }
                            }
                        },
                        range: [1, 37],
                        loc: {
                            start: { line: 1, column: 1 },
                            end: { line: 1, column: 37 }
                        }
                    },
                    range: [0, 38],
                    loc: {
                        start: { line: 1, column: 0 },
                        end: { line: 1, column: 38 }
                    }
                }],
                range: [0, 38],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 1, column: 38 }
                }
            }
        },

        '(class extends Hello{static[ok](){}})': {
            options: {
                format: {
                    compact: true,
                    semicolons: false
                }
            },
            generateFrom: {
                type: 'Program',
                body: [{
                    type: 'ExpressionStatement',
                    expression: {
                        type: 'ClassExpression',
                        superClass: {
                            type: 'Identifier',
                            name: 'Hello',
                            range: [15, 20],
                            loc: {
                                start: { line: 1, column: 15 },
                                end: { line: 1, column: 20 }
                            }
                        },
                        body: {
                            type: 'ClassBody',
                            body: [{
                                type: 'MethodDefinition',
                                key: {
                                    type: 'Identifier',
                                    name: 'ok',
                                    range: [28, 30],
                                    loc: {
                                        start: { line: 1, column: 28 },
                                        end: { line: 1, column: 30 }
                                    }
                                },
                                value: {
                                    type: 'FunctionExpression',
                                    id: null,
                                    params: [],
                                    defaults: [],
                                    body: {
                                        type: 'BlockStatement',
                                        body: [],
                                        range: [33, 35],
                                        loc: {
                                            start: { line: 1, column: 33 },
                                            end: { line: 1, column: 35 }
                                        }
                                    },
                                    rest: null,
                                    generator: false,
                                    expression: false,
                                    range: [33, 35],
                                    loc: {
                                        start: { line: 1, column: 33 },
                                        end: { line: 1, column: 35 }
                                    }
                                },
                                kind: '',
                                'static': true,
                                computed: true,
                                range: [21, 35],
                                loc: {
                                    start: { line: 1, column: 21 },
                                    end: { line: 1, column: 35 }
                                }
                            }],
                            range: [20, 36],
                            loc: {
                                start: { line: 1, column: 20 },
                                end: { line: 1, column: 36 }
                            }
                        },
                        range: [1, 36],
                        loc: {
                            start: { line: 1, column: 1 },
                            end: { line: 1, column: 36 }
                        }
                    },
                    range: [0, 37],
                    loc: {
                        start: { line: 1, column: 0 },
                        end: { line: 1, column: 37 }
                    }
                }],
                range: [0, 37],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 1, column: 37 }
                }
            }
        },

        '(class id extends Hello{static[ok](){}})': {
            options: {
                format: {
                    compact: true,
                    semicolons: false
                }
            },
            generateFrom: {
                type: 'Program',
                body: [{
                    type: 'ExpressionStatement',
                    expression: {
                        type: 'ClassExpression',
                        id: {
                            type: 'Identifier',
                            name: 'id',
                            range: [7, 9],
                            loc: {
                                start: { line: 1, column: 7 },
                                end: { line: 1, column: 9 }
                            }
                        },
                        superClass: {
                            type: 'Identifier',
                            name: 'Hello',
                            range: [18, 23],
                            loc: {
                                start: { line: 1, column: 18 },
                                end: { line: 1, column: 23 }
                            }
                        },
                        body: {
                            type: 'ClassBody',
                            body: [{
                                type: 'MethodDefinition',
                                key: {
                                    type: 'Identifier',
                                    name: 'ok',
                                    range: [31, 33],
                                    loc: {
                                        start: { line: 1, column: 31 },
                                        end: { line: 1, column: 33 }
                                    }
                                },
                                value: {
                                    type: 'FunctionExpression',
                                    id: null,
                                    params: [],
                                    defaults: [],
                                    body: {
                                        type: 'BlockStatement',
                                        body: [],
                                        range: [36, 38],
                                        loc: {
                                            start: { line: 1, column: 36 },
                                            end: { line: 1, column: 38 }
                                        }
                                    },
                                    rest: null,
                                    generator: false,
                                    expression: false,
                                    range: [36, 38],
                                    loc: {
                                        start: { line: 1, column: 36 },
                                        end: { line: 1, column: 38 }
                                    }
                                },
                                kind: '',
                                'static': true,
                                computed: true,
                                range: [24, 38],
                                loc: {
                                    start: { line: 1, column: 24 },
                                    end: { line: 1, column: 38 }
                                }
                            }],
                            range: [23, 39],
                            loc: {
                                start: { line: 1, column: 23 },
                                end: { line: 1, column: 39 }
                            }
                        },
                        range: [1, 39],
                        loc: {
                            start: { line: 1, column: 1 },
                            end: { line: 1, column: 39 }
                        }
                    },
                    range: [0, 40],
                    loc: {
                        start: { line: 1, column: 0 },
                        end: { line: 1, column: 40 }
                    }
                }],
                range: [0, 40],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 1, column: 40 }
                }
            }
        },

        '(class{})': {
            options: {
                format: {
                    compact: true,
                    semicolons: false
                }
            },
            generateFrom: {
                type: 'Program',
                body: [{
                    type: 'ExpressionStatement',
                    expression: {
                        type: 'ClassExpression',
                        superClass: null,
                        body: {
                            type: 'ClassBody',
                            body: [],
                            range: [6, 8],
                            loc: {
                                start: { line: 1, column: 6 },
                                end: { line: 1, column: 8 }
                            }
                        },
                        range: [1, 8],
                        loc: {
                            start: { line: 1, column: 1 },
                            end: { line: 1, column: 8 }
                        }
                    },
                    range: [0, 9],
                    loc: {
                        start: { line: 1, column: 0 },
                        end: { line: 1, column: 9 }
                    }
                }],
                range: [0, 9],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 1, column: 9 }
                }
            }
        }
    },

    'Harmony super': {
        'super.abc();': {
            generateFrom: {
                type: 'ExpressionStatement',
                expression: {
                    type: 'CallExpression',
                    callee: {
                        type: 'MemberExpression',
                        computed: false,
                        object: {
                            type: 'Super'
                        },
                        property: {
                            type: 'Identifier',
                            name: 'abc'
                        }
                    },
                    arguments: []
                }
            }
        },

        'super();': {
            generateFrom:  {
                type: 'ExpressionStatement',
                expression: {
                    type: 'CallExpression',
                    callee: {
                        type: 'Super'
                    },
                    arguments: []
                }
            }
        }
    },

    'Harmony async/await': {
        'async function foo(promise) {\n    await promise;\n}': {
            generateFrom: {
                "type": "FunctionDeclaration",
                "id": {
                    "type": "Identifier",
                    "name": "foo",
                    "range": [15, 18],
                    "loc": {
                        "start": {
                            "line": 1,
                            "column": 15
                        },
                        "end": {
                            "line": 1,
                            "column": 18
                        }
                    }
                },
                "params": [{
                    "type": "Identifier",
                    "name": "promise",
                    "range": [19, 26],
                    "loc": {
                        "start": {
                            "line": 1,
                            "column": 19
                        },
                        "end": {
                            "line": 1,
                            "column": 26
                        }
                    }
                }],
                "defaults": [],
                "body": {
                    "type": "BlockStatement",
                    "body": [{
                        "type": "ExpressionStatement",
                        "expression": {
                            "type": "AwaitExpression",
                            "argument": {
                                "type": "Identifier",
                                "name": "promise",
                                "range": [36, 43],
                                "loc": {
                                    "start": {
                                        "line": 1,
                                        "column": 36
                                    },
                                    "end": {
                                        "line": 1,
                                        "column": 43
                                    }
                                }
                            },
                            "range": [30, 43],
                            "loc": {
                                "start": {
                                    "line": 1,
                                    "column": 30
                                },
                                "end": {
                                    "line": 1,
                                    "column": 43
                                }
                            }
                        },
                        "range": [30, 44],
                        "loc": {
                            "start": {
                                "line": 1,
                                "column": 30
                            },
                            "end": {
                                "line": 1,
                                "column": 44
                            }
                        }
                    }],
                    "range": [28, 46],
                    "loc": {
                        "start": {
                            "line": 1,
                            "column": 28
                        },
                        "end": {
                            "line": 1,
                            "column": 46
                        }
                    }
                },
                "rest": null,
                "generator": false,
                "expression": false,
                "async": true,
                "range": [0, 46],
                "loc": {
                    "start": {
                        "line": 1,
                        "column": 0
                    },
                    "end": {
                        "line": 1,
                        "column": 46
                    }
                }
            }
        },

        'async x => x;': {
            generateFrom: {
                "type": "ExpressionStatement",
                "expression": {
                    "type": "ArrowFunctionExpression",
                    "id": null,
                    "params": [
                        {
                            "type": "Identifier",
                            "name": "x",
                            "range": [
                                6,
                                7
                            ],
                            "loc": {
                                "start": {
                                    "line": 1,
                                    "column": 6
                                },
                                "end": {
                                    "line": 1,
                                    "column": 7
                                }
                            }
                        }
                    ],
                    "defaults": [],
                    "body": {
                        "type": "Identifier",
                        "name": "x",
                        "range": [
                            11,
                            12
                        ],
                        "loc": {
                            "start": {
                                "line": 1,
                                "column": 11
                            },
                            "end": {
                                "line": 1,
                                "column": 12
                            }
                        }
                    },
                    "rest": null,
                    "generator": false,
                    "expression": true,
                    "async": true,
                    "range": [
                        0,
                        12
                    ],
                    "loc": {
                        "start": {
                            "line": 1,
                            "column": 0
                        },
                        "end": {
                            "line": 1,
                            "column": 12
                        }
                    }
                },
                "range": [
                    0,
                    12
                ],
                "loc": {
                    "start": {
                        "line": 1,
                        "column": 0
                    },
                    "end": {
                        "line": 1,
                        "column": 12
                    }
                }
            }
        },

        '(function (x) {\n    async function inner() {\n        await x;\n    }\n});': {
            generateFrom: {
                "type": "ExpressionStatement",
                "expression": {
                    "type": "FunctionExpression",
                    "id": null,
                    "params": [
                        {
                            "type": "Identifier",
                            "name": "x",
                            "range": [
                                10,
                                11
                            ],
                            "loc": {
                                "start": {
                                    "line": 1,
                                    "column": 10
                                },
                                "end": {
                                    "line": 1,
                                    "column": 11
                                }
                            }
                        }
                    ],
                    "defaults": [],
                    "body": {
                        "type": "BlockStatement",
                        "body": [
                            {
                                "type": "FunctionDeclaration",
                                "id": {
                                    "type": "Identifier",
                                    "name": "inner",
                                    "range": [
                                        30,
                                        35
                                    ],
                                    "loc": {
                                        "start": {
                                            "line": 1,
                                            "column": 30
                                        },
                                        "end": {
                                            "line": 1,
                                            "column": 35
                                        }
                                    }
                                },
                                "params": [],
                                "defaults": [],
                                "body": {
                                    "type": "BlockStatement",
                                    "body": [
                                        {
                                            "type": "ExpressionStatement",
                                            "expression": {
                                                "type": "AwaitExpression",
                                                "argument": {
                                                    "type": "Identifier",
                                                    "name": "x",
                                                    "range": [
                                                        46,
                                                        47
                                                    ],
                                                    "loc": {
                                                        "start": {
                                                            "line": 1,
                                                            "column": 46
                                                        },
                                                        "end": {
                                                            "line": 1,
                                                            "column": 47
                                                        }
                                                    }
                                                },
                                                "range": [
                                                    40,
                                                    47
                                                ],
                                                "loc": {
                                                    "start": {
                                                        "line": 1,
                                                        "column": 40
                                                    },
                                                    "end": {
                                                        "line": 1,
                                                        "column": 47
                                                    }
                                                }
                                            },
                                            "range": [
                                                40,
                                                48
                                            ],
                                            "loc": {
                                                "start": {
                                                    "line": 1,
                                                    "column": 40
                                                },
                                                "end": {
                                                    "line": 1,
                                                    "column": 48
                                                }
                                            }
                                        }
                                    ],
                                    "range": [
                                        38,
                                        49
                                    ],
                                    "loc": {
                                        "start": {
                                            "line": 1,
                                            "column": 38
                                        },
                                        "end": {
                                            "line": 1,
                                            "column": 49
                                        }
                                    }
                                },
                                "rest": null,
                                "generator": false,
                                "expression": false,
                                "async": true,
                                "range": [
                                    15,
                                    49
                                ],
                                "loc": {
                                    "start": {
                                        "line": 1,
                                        "column": 15
                                    },
                                    "end": {
                                        "line": 1,
                                        "column": 49
                                    }
                                }
                            }
                        ],
                        "range": [
                            13,
                            51
                        ],
                        "loc": {
                            "start": {
                                "line": 1,
                                "column": 13
                            },
                            "end": {
                                "line": 1,
                                "column": 51
                            }
                        }
                    },
                    "rest": null,
                    "generator": false,
                    "expression": false,
                    "range": [
                        1,
                        51
                    ],
                    "loc": {
                        "start": {
                            "line": 1,
                            "column": 1
                        },
                        "end": {
                            "line": 1,
                            "column": 51
                        }
                    }
                },
                "range": [
                    0,
                    52
                ],
                "loc": {
                    "start": {
                        "line": 1,
                        "column": 0
                    },
                    "end": {
                        "line": 1,
                        "column": 52
                    }
                }
            }
        },

        'var foo = async function (promise) {\n    await promise;\n};': {
            generateFrom: {
                "type": "VariableDeclaration",
                "declarations": [
                    {
                        "type": "VariableDeclarator",
                        "id": {
                            "type": "Identifier",
                            "name": "foo",
                            "range": [
                                4,
                                7
                            ],
                            "loc": {
                                "start": {
                                    "line": 1,
                                    "column": 4
                                },
                                "end": {
                                    "line": 1,
                                    "column": 7
                                }
                            }
                        },
                        "init": {
                            "type": "FunctionExpression",
                            "id": null,
                            "params": [
                                {
                                    "type": "Identifier",
                                    "name": "promise",
                                    "range": [
                                        25,
                                        32
                                    ],
                                    "loc": {
                                        "start": {
                                            "line": 1,
                                            "column": 25
                                        },
                                        "end": {
                                            "line": 1,
                                            "column": 32
                                        }
                                    }
                                }
                            ],
                            "defaults": [],
                            "body": {
                                "type": "BlockStatement",
                                "body": [
                                    {
                                        "type": "ExpressionStatement",
                                        "expression": {
                                            "type": "AwaitExpression",
                                            "argument": {
                                                "type": "Identifier",
                                                "name": "promise",
                                                "range": [
                                                    42,
                                                    49
                                                ],
                                                "loc": {
                                                    "start": {
                                                        "line": 1,
                                                        "column": 42
                                                    },
                                                    "end": {
                                                        "line": 1,
                                                        "column": 49
                                                    }
                                                }
                                            },
                                            "range": [
                                                36,
                                                49
                                            ],
                                            "loc": {
                                                "start": {
                                                    "line": 1,
                                                    "column": 36
                                                },
                                                "end": {
                                                    "line": 1,
                                                    "column": 49
                                                }
                                            }
                                        },
                                        "range": [
                                            36,
                                            50
                                        ],
                                        "loc": {
                                            "start": {
                                                "line": 1,
                                                "column": 36
                                            },
                                            "end": {
                                                "line": 1,
                                                "column": 50
                                            }
                                        }
                                    }
                                ],
                                "range": [
                                    34,
                                    52
                                ],
                                "loc": {
                                    "start": {
                                        "line": 1,
                                        "column": 34
                                    },
                                    "end": {
                                        "line": 1,
                                        "column": 52
                                    }
                                }
                            },
                            "rest": null,
                            "generator": false,
                            "expression": false,
                            "async": true,
                            "range": [
                                10,
                                52
                            ],
                            "loc": {
                                "start": {
                                    "line": 1,
                                    "column": 10
                                },
                                "end": {
                                    "line": 1,
                                    "column": 52
                                }
                            }
                        },
                        "range": [
                            4,
                            52
                        ],
                        "loc": {
                            "start": {
                                "line": 1,
                                "column": 4
                            },
                            "end": {
                                "line": 1,
                                "column": 52
                            }
                        }
                    }
                ],
                "kind": "var",
                "range": [
                    0,
                    52
                ],
                "loc": {
                    "start": {
                        "line": 1,
                        "column": 0
                    },
                    "end": {
                        "line": 1,
                        "column": 52
                    }
                }
            }
        },

        'var o = {\n    a: 1,\n    async foo(promise) {\n        await promise;\n    }\n};': {
            generateFrom: {
                "type": "VariableDeclaration",
                "declarations": [
                    {
                        "type": "VariableDeclarator",
                        "id": {
                            "type": "Identifier",
                            "name": "o",
                            "range": [
                                4,
                                5
                            ],
                            "loc": {
                                "start": {
                                    "line": 1,
                                    "column": 4
                                },
                                "end": {
                                    "line": 1,
                                    "column": 5
                                }
                            }
                        },
                        "init": {
                            "type": "ObjectExpression",
                            "properties": [
                                {
                                    "type": "Property",
                                    "key": {
                                        "type": "Identifier",
                                        "name": "a",
                                        "range": [
                                            10,
                                            11
                                        ],
                                        "loc": {
                                            "start": {
                                                "line": 1,
                                                "column": 10
                                            },
                                            "end": {
                                                "line": 1,
                                                "column": 11
                                            }
                                        }
                                    },
                                    "value": {
                                        "type": "Literal",
                                        "value": 1,
                                        "raw": "1",
                                        "range": [
                                            13,
                                            14
                                        ],
                                        "loc": {
                                            "start": {
                                                "line": 1,
                                                "column": 13
                                            },
                                            "end": {
                                                "line": 1,
                                                "column": 14
                                            }
                                        }
                                    },
                                    "kind": "init",
                                    "method": false,
                                    "shorthand": false,
                                    "computed": false,
                                    "range": [
                                        10,
                                        14
                                    ],
                                    "loc": {
                                        "start": {
                                            "line": 1,
                                            "column": 10
                                        },
                                        "end": {
                                            "line": 1,
                                            "column": 14
                                        }
                                    }
                                },
                                {
                                    "type": "Property",
                                    "key": {
                                        "type": "Identifier",
                                        "name": "foo",
                                        "range": [
                                            22,
                                            25
                                        ],
                                        "loc": {
                                            "start": {
                                                "line": 1,
                                                "column": 22
                                            },
                                            "end": {
                                                "line": 1,
                                                "column": 25
                                            }
                                        }
                                    },
                                    "value": {
                                        "type": "FunctionExpression",
                                        "id": null,
                                        "params": [
                                            {
                                                "type": "Identifier",
                                                "name": "promise",
                                                "range": [
                                                    26,
                                                    33
                                                ],
                                                "loc": {
                                                    "start": {
                                                        "line": 1,
                                                        "column": 26
                                                    },
                                                    "end": {
                                                        "line": 1,
                                                        "column": 33
                                                    }
                                                }
                                            }
                                        ],
                                        "defaults": [],
                                        "body": {
                                            "type": "BlockStatement",
                                            "body": [
                                                {
                                                    "type": "ExpressionStatement",
                                                    "expression": {
                                                        "type": "AwaitExpression",
                                                        "argument": {
                                                            "type": "Identifier",
                                                            "name": "promise",
                                                            "range": [
                                                                43,
                                                                50
                                                            ],
                                                            "loc": {
                                                                "start": {
                                                                    "line": 1,
                                                                    "column": 43
                                                                },
                                                                "end": {
                                                                    "line": 1,
                                                                    "column": 50
                                                                }
                                                            }
                                                        },
                                                        "range": [
                                                            37,
                                                            50
                                                        ],
                                                        "loc": {
                                                            "start": {
                                                                "line": 1,
                                                                "column": 37
                                                            },
                                                            "end": {
                                                                "line": 1,
                                                                "column": 50
                                                            }
                                                        }
                                                    },
                                                    "range": [
                                                        37,
                                                        51
                                                    ],
                                                    "loc": {
                                                        "start": {
                                                            "line": 1,
                                                            "column": 37
                                                        },
                                                        "end": {
                                                            "line": 1,
                                                            "column": 51
                                                        }
                                                    }
                                                }
                                            ],
                                            "range": [
                                                35,
                                                52
                                            ],
                                            "loc": {
                                                "start": {
                                                    "line": 1,
                                                    "column": 35
                                                },
                                                "end": {
                                                    "line": 1,
                                                    "column": 52
                                                }
                                            }
                                        },
                                        "rest": null,
                                        "generator": false,
                                        "expression": false,
                                        "async": true,
                                        "range": [
                                            35,
                                            52
                                        ],
                                        "loc": {
                                            "start": {
                                                "line": 1,
                                                "column": 35
                                            },
                                            "end": {
                                                "line": 1,
                                                "column": 52
                                            }
                                        }
                                    },
                                    "kind": "init",
                                    "method": true,
                                    "shorthand": false,
                                    "computed": false,
                                    "range": [
                                        16,
                                        52
                                    ],
                                    "loc": {
                                        "start": {
                                            "line": 1,
                                            "column": 16
                                        },
                                        "end": {
                                            "line": 1,
                                            "column": 52
                                        }
                                    }
                                }
                            ],
                            "range": [
                                8,
                                54
                            ],
                            "loc": {
                                "start": {
                                    "line": 1,
                                    "column": 8
                                },
                                "end": {
                                    "line": 1,
                                    "column": 54
                                }
                            }
                        },
                        "range": [
                            4,
                            54
                        ],
                        "loc": {
                            "start": {
                                "line": 1,
                                "column": 4
                            },
                            "end": {
                                "line": 1,
                                "column": 54
                            }
                        }
                    }
                ],
                "kind": "var",
                "range": [
                    0,
                    54
                ],
                "loc": {
                    "start": {
                        "line": 1,
                        "column": 0
                    },
                    "end": {
                        "line": 1,
                        "column": 54
                    }
                }
            }
        },

        'class Foo {\n    async bar(promise) {\n        await promise;\n    }\n}': {
            generateFrom: {
                "type": "ClassDeclaration",
                "id": {
                    "type": "Identifier",
                    "name": "Foo",
                    "range": [
                        6,
                        9
                    ],
                    "loc": {
                        "start": {
                            "line": 1,
                            "column": 6
                        },
                        "end": {
                            "line": 1,
                            "column": 9
                        }
                    }
                },
                "superClass": null,
                "body": {
                    "type": "ClassBody",
                    "body": [
                        {
                            "type": "MethodDefinition",
                            "key": {
                                "type": "Identifier",
                                "name": "bar",
                                "range": [
                                    18,
                                    21
                                ],
                                "loc": {
                                    "start": {
                                        "line": 1,
                                        "column": 18
                                    },
                                    "end": {
                                        "line": 1,
                                        "column": 21
                                    }
                                }
                            },
                            "value": {
                                "type": "FunctionExpression",
                                "id": null,
                                "params": [
                                    {
                                        "type": "Identifier",
                                        "name": "promise",
                                        "range": [
                                            22,
                                            29
                                        ],
                                        "loc": {
                                            "start": {
                                                "line": 1,
                                                "column": 22
                                            },
                                            "end": {
                                                "line": 1,
                                                "column": 29
                                            }
                                        }
                                    }
                                ],
                                "defaults": [],
                                "body": {
                                    "type": "BlockStatement",
                                    "body": [
                                        {
                                            "type": "ExpressionStatement",
                                            "expression": {
                                                "type": "AwaitExpression",
                                                "argument": {
                                                    "type": "Identifier",
                                                    "name": "promise",
                                                    "range": [
                                                        39,
                                                        46
                                                    ],
                                                    "loc": {
                                                        "start": {
                                                            "line": 1,
                                                            "column": 39
                                                        },
                                                        "end": {
                                                            "line": 1,
                                                            "column": 46
                                                        }
                                                    }
                                                },
                                                "range": [
                                                    33,
                                                    46
                                                ],
                                                "loc": {
                                                    "start": {
                                                        "line": 1,
                                                        "column": 33
                                                    },
                                                    "end": {
                                                        "line": 1,
                                                        "column": 46
                                                    }
                                                }
                                            },
                                            "range": [
                                                33,
                                                47
                                            ],
                                            "loc": {
                                                "start": {
                                                    "line": 1,
                                                    "column": 33
                                                },
                                                "end": {
                                                    "line": 1,
                                                    "column": 47
                                                }
                                            }
                                        }
                                    ],
                                    "range": [
                                        31,
                                        48
                                    ],
                                    "loc": {
                                        "start": {
                                            "line": 1,
                                            "column": 31
                                        },
                                        "end": {
                                            "line": 1,
                                            "column": 48
                                        }
                                    }
                                },
                                "rest": null,
                                "generator": false,
                                "expression": false,
                                "async": true,
                                "range": [
                                    31,
                                    48
                                ],
                                "loc": {
                                    "start": {
                                        "line": 1,
                                        "column": 31
                                    },
                                    "end": {
                                        "line": 1,
                                        "column": 48
                                    }
                                }
                            },
                            "kind": "",
                            "static": false,
                            "computed": false,
                            "range": [
                                12,
                                48
                            ],
                            "loc": {
                                "start": {
                                    "line": 1,
                                    "column": 12
                                },
                                "end": {
                                    "line": 1,
                                    "column": 48
                                }
                            }
                        }
                    ],
                    "range": [
                        10,
                        50
                    ],
                    "loc": {
                        "start": {
                            "line": 1,
                            "column": 10
                        },
                        "end": {
                            "line": 1,
                            "column": 50
                        }
                    }
                },
                "range": [
                    0,
                    50
                ],
                "loc": {
                    "start": {
                        "line": 1,
                        "column": 0
                    },
                    "end": {
                        "line": 1,
                        "column": 50
                    }
                }
            }
        },

        'f(a, async promise => await promise);': {
            generateFrom: {
                "type": "ExpressionStatement",
                "expression": {
                    "type": "CallExpression",
                    "callee": {
                        "type": "Identifier",
                        "name": "f",
                        "range": [
                            0,
                            1
                        ],
                        "loc": {
                            "start": {
                                "line": 1,
                                "column": 0
                            },
                            "end": {
                                "line": 1,
                                "column": 1
                            }
                        }
                    },
                    "arguments": [
                        {
                            "type": "Identifier",
                            "name": "a",
                            "range": [
                                2,
                                3
                            ],
                            "loc": {
                                "start": {
                                    "line": 1,
                                    "column": 2
                                },
                                "end": {
                                    "line": 1,
                                    "column": 3
                                }
                            }
                        },
                        {
                            "type": "ArrowFunctionExpression",
                            "id": null,
                            "params": [
                                {
                                    "type": "Identifier",
                                    "name": "promise",
                                    "range": [
                                        11,
                                        18
                                    ],
                                    "loc": {
                                        "start": {
                                            "line": 1,
                                            "column": 11
                                        },
                                        "end": {
                                            "line": 1,
                                            "column": 18
                                        }
                                    }
                                }
                            ],
                            "defaults": [],
                            "body": {
                                "type": "AwaitExpression",
                                "argument": {
                                    "type": "Identifier",
                                    "name": "promise",
                                    "range": [
                                        28,
                                        35
                                    ],
                                    "loc": {
                                        "start": {
                                            "line": 1,
                                            "column": 28
                                        },
                                        "end": {
                                            "line": 1,
                                            "column": 35
                                        }
                                    }
                                },
                                "range": [
                                    22,
                                    35
                                ],
                                "loc": {
                                    "start": {
                                        "line": 1,
                                        "column": 22
                                    },
                                    "end": {
                                        "line": 1,
                                        "column": 35
                                    }
                                }
                            },
                            "rest": null,
                            "generator": false,
                            "expression": true,
                            "async": true,
                            "range": [
                                5,
                                35
                            ],
                            "loc": {
                                "start": {
                                    "line": 1,
                                    "column": 5
                                },
                                "end": {
                                    "line": 1,
                                    "column": 35
                                }
                            }
                        }
                    ],
                    "range": [
                        0,
                        36
                    ],
                    "loc": {
                        "start": {
                            "line": 1,
                            "column": 0
                        },
                        "end": {
                            "line": 1,
                            "column": 36
                        }
                    }
                },
                "range": [
                    0,
                    36
                ],
                "loc": {
                    "start": {
                        "line": 1,
                        "column": 0
                    },
                    "end": {
                        "line": 1,
                        "column": 36
                    }
                }
            }
        },

        'f(a, async (x, y) => await [\n    x,\n    y\n], b);': {
            generateFrom: {
                "type": "ExpressionStatement",
                "expression": {
                    "type": "CallExpression",
                    "callee": {
                        "type": "Identifier",
                        "name": "f",
                        "range": [
                            0,
                            1
                        ],
                        "loc": {
                            "start": {
                                "line": 1,
                                "column": 0
                            },
                            "end": {
                                "line": 1,
                                "column": 1
                            }
                        }
                    },
                    "arguments": [
                        {
                            "type": "Identifier",
                            "name": "a",
                            "range": [
                                2,
                                3
                            ],
                            "loc": {
                                "start": {
                                    "line": 1,
                                    "column": 2
                                },
                                "end": {
                                    "line": 1,
                                    "column": 3
                                }
                            }
                        },
                        {
                            "type": "ArrowFunctionExpression",
                            "id": null,
                            "params": [
                                {
                                    "type": "Identifier",
                                    "name": "x",
                                    "range": [
                                        11,
                                        12
                                    ],
                                    "loc": {
                                        "start": {
                                            "line": 1,
                                            "column": 11
                                        },
                                        "end": {
                                            "line": 1,
                                            "column": 12
                                        }
                                    }
                                },
                                {
                                    "type": "Identifier",
                                    "name": "y",
                                    "range": [
                                        14,
                                        15
                                    ],
                                    "loc": {
                                        "start": {
                                            "line": 1,
                                            "column": 14
                                        },
                                        "end": {
                                            "line": 1,
                                            "column": 15
                                        }
                                    }
                                }
                            ],
                            "defaults": [],
                            "body": {
                                "type": "AwaitExpression",
                                "argument": {
                                    "type": "ArrayExpression",
                                    "elements": [
                                        {
                                            "type": "Identifier",
                                            "name": "x",
                                            "range": [
                                                27,
                                                28
                                            ],
                                            "loc": {
                                                "start": {
                                                    "line": 1,
                                                    "column": 27
                                                },
                                                "end": {
                                                    "line": 1,
                                                    "column": 28
                                                }
                                            }
                                        },
                                        {
                                            "type": "Identifier",
                                            "name": "y",
                                            "range": [
                                                30,
                                                31
                                            ],
                                            "loc": {
                                                "start": {
                                                    "line": 1,
                                                    "column": 30
                                                },
                                                "end": {
                                                    "line": 1,
                                                    "column": 31
                                                }
                                            }
                                        }
                                    ],
                                    "range": [
                                        26,
                                        32
                                    ],
                                    "loc": {
                                        "start": {
                                            "line": 1,
                                            "column": 26
                                        },
                                        "end": {
                                            "line": 1,
                                            "column": 32
                                        }
                                    }
                                },
                                "range": [
                                    20,
                                    32
                                ],
                                "loc": {
                                    "start": {
                                        "line": 1,
                                        "column": 20
                                    },
                                    "end": {
                                        "line": 1,
                                        "column": 32
                                    }
                                }
                            },
                            "rest": null,
                            "generator": false,
                            "expression": true,
                            "async": true,
                            "range": [
                                5,
                                32
                            ],
                            "loc": {
                                "start": {
                                    "line": 1,
                                    "column": 5
                                },
                                "end": {
                                    "line": 1,
                                    "column": 32
                                }
                            }
                        },
                        {
                            "type": "Identifier",
                            "name": "b",
                            "range": [
                                34,
                                35
                            ],
                            "loc": {
                                "start": {
                                    "line": 1,
                                    "column": 34
                                },
                                "end": {
                                    "line": 1,
                                    "column": 35
                                }
                            }
                        }
                    ],
                    "range": [
                        0,
                        36
                    ],
                    "loc": {
                        "start": {
                            "line": 1,
                            "column": 0
                        },
                        "end": {
                            "line": 1,
                            "column": 36
                        }
                    }
                },
                "range": [
                    0,
                    36
                ],
                "loc": {
                    "start": {
                        "line": 1,
                        "column": 0
                    },
                    "end": {
                        "line": 1,
                        "column": 36
                    }
                }
            }
        },

        'f(async function (promise) {\n    await promise;\n});': {
            generateFrom: {
                "type": "ExpressionStatement",
                "expression": {
                    "type": "CallExpression",
                    "callee": {
                        "type": "Identifier",
                        "name": "f",
                        "range": [
                            0,
                            1
                        ],
                        "loc": {
                            "start": {
                                "line": 1,
                                "column": 0
                            },
                            "end": {
                                "line": 1,
                                "column": 1
                            }
                        }
                    },
                    "arguments": [
                        {
                            "type": "FunctionExpression",
                            "id": null,
                            "params": [
                                {
                                    "type": "Identifier",
                                    "name": "promise",
                                    "range": [
                                        17,
                                        24
                                    ],
                                    "loc": {
                                        "start": {
                                            "line": 1,
                                            "column": 17
                                        },
                                        "end": {
                                            "line": 1,
                                            "column": 24
                                        }
                                    }
                                }
                            ],
                            "defaults": [],
                            "body": {
                                "type": "BlockStatement",
                                "body": [
                                    {
                                        "type": "ExpressionStatement",
                                        "expression": {
                                            "type": "AwaitExpression",
                                            "argument": {
                                                "type": "Identifier",
                                                "name": "promise",
                                                "range": [
                                                    34,
                                                    41
                                                ],
                                                "loc": {
                                                    "start": {
                                                        "line": 1,
                                                        "column": 34
                                                    },
                                                    "end": {
                                                        "line": 1,
                                                        "column": 41
                                                    }
                                                }
                                            },
                                            "range": [
                                                28,
                                                41
                                            ],
                                            "loc": {
                                                "start": {
                                                    "line": 1,
                                                    "column": 28
                                                },
                                                "end": {
                                                    "line": 1,
                                                    "column": 41
                                                }
                                            }
                                        },
                                        "range": [
                                            28,
                                            42
                                        ],
                                        "loc": {
                                            "start": {
                                                "line": 1,
                                                "column": 28
                                            },
                                            "end": {
                                                "line": 1,
                                                "column": 42
                                            }
                                        }
                                    }
                                ],
                                "range": [
                                    26,
                                    43
                                ],
                                "loc": {
                                    "start": {
                                        "line": 1,
                                        "column": 26
                                    },
                                    "end": {
                                        "line": 1,
                                        "column": 43
                                    }
                                }
                            },
                            "rest": null,
                            "generator": false,
                            "expression": false,
                            "async": true,
                            "range": [
                                2,
                                43
                            ],
                            "loc": {
                                "start": {
                                    "line": 1,
                                    "column": 2
                                },
                                "end": {
                                    "line": 1,
                                    "column": 43
                                }
                            }
                        }
                    ],
                    "range": [
                        0,
                        44
                    ],
                    "loc": {
                        "start": {
                            "line": 1,
                            "column": 0
                        },
                        "end": {
                            "line": 1,
                            "column": 44
                        }
                    }
                },
                "range": [
                    0,
                    44
                ],
                "loc": {
                    "start": {
                        "line": 1,
                        "column": 0
                    },
                    "end": {
                        "line": 1,
                        "column": 44
                    }
                }
            }
        },

        '(async function (promise) {\n    await promise;\n});': {
            generateFrom: {
                "type": "ExpressionStatement",
                "expression": {
                    "type": "FunctionExpression",
                    "id": null,
                    "params": [
                        {
                            "type": "Identifier",
                            "name": "promise"
                        }
                    ],
                    "defaults": [],
                    "body": {
                        "type": "BlockStatement",
                        "body": [
                            {
                                "type": "ExpressionStatement",
                                "expression": {
                                    "type": "AwaitExpression",
                                    "argument": {
                                        "type": "Identifier",
                                        "name": "promise"
                                    }
                                }
                            }
                        ]
                    },
                    "rest": null,
                    "generator": false,
                    "expression": false,
                    "async": true
                }
            }
        },

        '(async function hello(promise) {\n    await promise;\n});': {
            generateFrom: {
                "type": "ExpressionStatement",
                "expression": {
                    "type": "FunctionExpression",
                    "id": {
                        "type": "Identifier",
                        "name": "hello"
                    },
                    "params": [
                        {
                            "type": "Identifier",
                            "name": "promise"
                        }
                    ],
                    "defaults": [],
                    "body": {
                        "type": "BlockStatement",
                        "body": [
                            {
                                "type": "ExpressionStatement",
                                "expression": {
                                    "type": "AwaitExpression",
                                    "argument": {
                                        "type": "Identifier",
                                        "name": "promise"
                                    }
                                }
                            }
                        ]
                    },
                    "rest": null,
                    "generator": false,
                    "expression": false,
                    "async": true
                }
            }
        },

        'async function hello(promise) {\n    await promise;\n}': {
            generateFrom: {
                "type": "FunctionDeclaration",
                "id": {
                    "type": "Identifier",
                    "name": "hello"
                },
                "params": [
                    {
                        "type": "Identifier",
                        "name": "promise"
                    }
                ],
                "defaults": [],
                "body": {
                    "type": "BlockStatement",
                    "body": [
                        {
                            "type": "ExpressionStatement",
                            "expression": {
                                "type": "AwaitExpression",
                                "argument": {
                                    "type": "Identifier",
                                    "name": "promise"
                                }
                            }
                        }
                    ]
                },
                "rest": null,
                "generator": false,
                "expression": false,
                "async": true
            }
        },
    }
};

function updateDeeply(target, override) {
    var key, val;

    function isHashObject(target) {
        return typeof target === 'object' && target instanceof Object && !(target instanceof RegExp);
    }

    for (key in override) {
        if (override.hasOwnProperty(key)) {
            val = override[key];
            if (isHashObject(val)) {
                if (isHashObject(target[key])) {
                    updateDeeply(target[key], val);
                } else {
                    target[key] = updateDeeply({}, val);
                }
            } else {
                target[key] = val;
            }
        }
    }
    return target;
}

// Special handling for regular expression literal since we need to
// convert it to a string literal, otherwise it will be decoded
// as object "{}" and the regular expression would be lost.
function adjustRegexLiteral(key, value) {
    'use strict';
    if (key === 'value' && value instanceof RegExp) {
        value = value.toString();
    }
    return value;
}

function testIdentity(code, syntax) {
    'use strict';
    var expected, tree, actual, actual2, options, StringObject;

    // alias, so that JSLint does not complain.
    StringObject = String;

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
    tree = esprima.parse(escodegen.generate(syntax), options);
    actual2 = JSON.stringify(tree, adjustRegexLiteral, 4);
    expect(actual).to.be.equal(expected);
    expect(actual2).to.be.equal(expected);
}

function testGenerate(expected, result) {
    'use strict';
    var actual, options;

    options = {
        indent: '    ',
        parse: esprima.parse
    };

    if (result.options) {
        options = updateDeeply(options, result.options);
    }

    actual = escodegen.generate(result.generateFrom, options);
    expect(actual).to.be.equal(expected);
}

function isGeneratorIdentityFixture(result) {
    'use strict';
    return !result.hasOwnProperty('generateFrom') &&
        !result.hasOwnProperty('result');
}

function runTest(code, result) {
    'use strict';
    if (result.hasOwnProperty('generateFrom')) {
        testGenerate(code, result);
    } else {
        testIdentity(code, result);
    }
}

describe('harmony test', function () {
    Object.keys(data).forEach(function (category) {
        Object.keys(data[category]).forEach(function (source) {
            it(category, function () {
                var expected = data[category][source];
                runTest(source, expected);
            });
        });
    });
});
/* vim: set sw=4 ts=4 et tw=80 : */
