/*
  Copyright (C) 2011-2013 Yusuke Suzuki <utatane.tea@gmail.com>
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

var esprima = require('esprima-moz'),
    escodegen = require('./loader'),
    chai = require('chai'),
    expect = chai.expect,
    data;

data = {
    'Yield with starless generator': {
        'function a() { yield* test; }': {
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

        'function a() { yield* (42,42); }': {
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

        'function a() {\n    yield 1;\n}': {
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
        }
    },

    'Array Comprehension with parenthesized ComprehensionBlock': {

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
                                name: 'x',
                                range: [8, 9],
                                loc: {
                                    start: { line: 1, column: 8 },
                                    end: { line: 1, column: 9 }
                                }
                            },
                            right: {
                                type: 'ArrayExpression',
                                elements: [],
                                range: [13, 15],
                                loc: {
                                    start: { line: 1, column: 13 },
                                    end: { line: 1, column: 15 }
                                }
                            },
                            each: false,
                            of: false
                        }],
                        body: {
                            type: 'Identifier',
                            name: 'x',
                            range: [1, 2],
                            loc: {
                                start: { line: 1, column: 1 },
                                end: { line: 1, column: 2 }
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
                                name: 'x',
                                range: [8, 9],
                                loc: {
                                    start: { line: 1, column: 8 },
                                    end: { line: 1, column: 9 }
                                }
                            },
                            right: {
                                type: 'ArrayExpression',
                                elements: [],
                                range: [13, 15],
                                loc: {
                                    start: { line: 1, column: 13 },
                                    end: { line: 1, column: 15 }
                                }
                            },
                            each: false,
                            of: true
                        }],
                        body: {
                            type: 'Identifier',
                            name: 'x',
                            range: [1, 2],
                            loc: {
                                start: { line: 1, column: 1 },
                                end: { line: 1, column: 2 }
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
                                name: 'f',
                                range: [20, 21],
                                loc: {
                                    start: { line: 1, column: 20 },
                                    end: { line: 1, column: 21 }
                                }
                            },
                            'arguments': [{
                                type: 'Identifier',
                                name: 'x',
                                range: [22, 23],
                                loc: {
                                    start: { line: 1, column: 22 },
                                    end: { line: 1, column: 23 }
                                }
                            }],
                            range: [20, 24],
                            loc: {
                                start: { line: 1, column: 20 },
                                end: { line: 1, column: 24 }
                            }
                        },
                        blocks: [{
                            type: 'ComprehensionBlock',
                            left: {
                                type: 'Identifier',
                                name: 'x',
                                range: [8, 9],
                                loc: {
                                    start: { line: 1, column: 8 },
                                    end: { line: 1, column: 9 }
                                }
                            },
                            right: {
                                type: 'Identifier',
                                name: 'y',
                                range: [13, 14],
                                loc: {
                                    start: { line: 1, column: 13 },
                                    end: { line: 1, column: 14 }
                                }
                            },
                            each: false,
                            of: false
                        }],
                        body: {
                            type: 'Literal',
                            value: 1,
                            raw: '1',
                            range: [1, 2],
                            loc: {
                                start: { line: 1, column: 1 },
                                end: { line: 1, column: 2 }
                            }
                        },
                        range: [0, 26],
                        loc: {
                            start: { line: 1, column: 0 },
                            end: { line: 1, column: 26 }
                        }
                    },
                    range: [0, 26],
                    loc: {
                        start: { line: 1, column: 0 },
                        end: { line: 1, column: 26 }
                    }
                }],
                range: [0, 26],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 1, column: 26 }
                }
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
                                name: 'f',
                                range: [20, 21],
                                loc: {
                                    start: { line: 1, column: 20 },
                                    end: { line: 1, column: 21 }
                                }
                            },
                            'arguments': [{
                                type: 'Identifier',
                                name: 'x',
                                range: [22, 23],
                                loc: {
                                    start: { line: 1, column: 22 },
                                    end: { line: 1, column: 23 }
                                }
                            }],
                            range: [20, 24],
                            loc: {
                                start: { line: 1, column: 20 },
                                end: { line: 1, column: 24 }
                            }
                        },
                        blocks: [{
                            type: 'ComprehensionBlock',
                            left: {
                                type: 'Identifier',
                                name: 'x',
                                range: [8, 9],
                                loc: {
                                    start: { line: 1, column: 8 },
                                    end: { line: 1, column: 9 }
                                }
                            },
                            right: {
                                type: 'Identifier',
                                name: 'y',
                                range: [13, 14],
                                loc: {
                                    start: { line: 1, column: 13 },
                                    end: { line: 1, column: 14 }
                                }
                            },
                            each: false,
                            of: true
                        }],
                        body: {
                            type: 'Literal',
                            value: 1,
                            raw: '1',
                            range: [1, 2],
                            loc: {
                                start: { line: 1, column: 1 },
                                end: { line: 1, column: 2 }
                            }
                        },
                        range: [0, 26],
                        loc: {
                            start: { line: 1, column: 0 },
                            end: { line: 1, column: 26 }
                        }
                    },
                    range: [0, 26],
                    loc: {
                        start: { line: 1, column: 0 },
                        end: { line: 1, column: 26 }
                    }
                }],
                range: [0, 26],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 1, column: 26 }
                }
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
                                name: 'b',
                                range: [41, 42],
                                loc: {
                                    start: { line: 1, column: 41 },
                                    end: { line: 1, column: 42 }
                                }
                            },
                            right: {
                                type: 'Identifier',
                                name: 'c',
                                range: [46, 47],
                                loc: {
                                    start: { line: 1, column: 46 },
                                    end: { line: 1, column: 47 }
                                }
                            },
                            range: [41, 47],
                            loc: {
                                start: { line: 1, column: 41 },
                                end: { line: 1, column: 47 }
                            }
                        },
                        blocks: [{
                            type: 'ComprehensionBlock',
                            left: {
                                type: 'Identifier',
                                name: 'x',
                                range: [14, 15],
                                loc: {
                                    start: { line: 1, column: 14 },
                                    end: { line: 1, column: 15 }
                                }
                            },
                            right: {
                                type: 'ArrayExpression',
                                elements: [],
                                range: [19, 21],
                                loc: {
                                    start: { line: 1, column: 19 },
                                    end: { line: 1, column: 21 }
                                }
                            },
                            each: false,
                            of: false
                        }, {
                            type: 'ComprehensionBlock',
                            left: {
                                type: 'Identifier',
                                name: 'b',
                                range: [28, 29],
                                loc: {
                                    start: { line: 1, column: 28 },
                                    end: { line: 1, column: 29 }
                                }
                            },
                            right: {
                                type: 'ArrayExpression',
                                elements: [],
                                range: [33, 35],
                                loc: {
                                    start: { line: 1, column: 33 },
                                    end: { line: 1, column: 35 }
                                }
                            },
                            each: false,
                            of: false
                        }],
                        body: {
                            type: 'ArrayExpression',
                            elements: [{
                                type: 'Identifier',
                                name: 'x',
                                range: [2, 3],
                                loc: {
                                    start: { line: 1, column: 2 },
                                    end: { line: 1, column: 3 }
                                }
                            }, {
                                type: 'Identifier',
                                name: 'b',
                                range: [4, 5],
                                loc: {
                                    start: { line: 1, column: 4 },
                                    end: { line: 1, column: 5 }
                                }
                            }, {
                                type: 'Identifier',
                                name: 'c',
                                range: [6, 7],
                                loc: {
                                    start: { line: 1, column: 6 },
                                    end: { line: 1, column: 7 }
                                }
                            }],
                            range: [1, 8],
                            loc: {
                                start: { line: 1, column: 1 },
                                end: { line: 1, column: 8 }
                            }
                        },
                        range: [0, 49],
                        loc: {
                            start: { line: 1, column: 0 },
                            end: { line: 1, column: 49 }
                        }
                    },
                    range: [0, 49],
                    loc: {
                        start: { line: 1, column: 0 },
                        end: { line: 1, column: 49 }
                    }
                }],
                range: [0, 49],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 1, column: 49 }
                }
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
                                name: 'b',
                                range: [41, 42],
                                loc: {
                                    start: { line: 1, column: 41 },
                                    end: { line: 1, column: 42 }
                                }
                            },
                            right: {
                                type: 'Identifier',
                                name: 'c',
                                range: [46, 47],
                                loc: {
                                    start: { line: 1, column: 46 },
                                    end: { line: 1, column: 47 }
                                }
                            },
                            range: [41, 47],
                            loc: {
                                start: { line: 1, column: 41 },
                                end: { line: 1, column: 47 }
                            }
                        },
                        blocks: [{
                            type: 'ComprehensionBlock',
                            left: {
                                type: 'Identifier',
                                name: 'x',
                                range: [14, 15],
                                loc: {
                                    start: { line: 1, column: 14 },
                                    end: { line: 1, column: 15 }
                                }
                            },
                            right: {
                                type: 'ArrayExpression',
                                elements: [],
                                range: [19, 21],
                                loc: {
                                    start: { line: 1, column: 19 },
                                    end: { line: 1, column: 21 }
                                }
                            },
                            each: false,
                            of: true
                        }, {
                            type: 'ComprehensionBlock',
                            left: {
                                type: 'Identifier',
                                name: 'b',
                                range: [28, 29],
                                loc: {
                                    start: { line: 1, column: 28 },
                                    end: { line: 1, column: 29 }
                                }
                            },
                            right: {
                                type: 'ArrayExpression',
                                elements: [],
                                range: [33, 35],
                                loc: {
                                    start: { line: 1, column: 33 },
                                    end: { line: 1, column: 35 }
                                }
                            },
                            each: false,
                            of: true
                        }],
                        body: {
                            type: 'ArrayExpression',
                            elements: [{
                                type: 'Identifier',
                                name: 'x',
                                range: [2, 3],
                                loc: {
                                    start: { line: 1, column: 2 },
                                    end: { line: 1, column: 3 }
                                }
                            }, {
                                type: 'Identifier',
                                name: 'b',
                                range: [4, 5],
                                loc: {
                                    start: { line: 1, column: 4 },
                                    end: { line: 1, column: 5 }
                                }
                            }, {
                                type: 'Identifier',
                                name: 'c',
                                range: [6, 7],
                                loc: {
                                    start: { line: 1, column: 6 },
                                    end: { line: 1, column: 7 }
                                }
                            }],
                            range: [1, 8],
                            loc: {
                                start: { line: 1, column: 1 },
                                end: { line: 1, column: 8 }
                            }
                        },
                        range: [0, 49],
                        loc: {
                            start: { line: 1, column: 0 },
                            end: { line: 1, column: 49 }
                        }
                    },
                    range: [0, 49],
                    loc: {
                        start: { line: 1, column: 0 },
                        end: { line: 1, column: 49 }
                    }
                }],
                range: [0, 49],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 1, column: 49 }
                }
            }
        }
    },

    'Expression Closures': {
        'function milky() ({})': {
            type: 'Program',
            body: [{
                type: 'FunctionDeclaration',
                id: {
                    type: 'Identifier',
                    name: 'milky',
                    range: [9, 14],
                    loc: {
                        start: { line: 1, column: 9 },
                        end: { line: 1, column: 14 }
                    }
                },
                params: [],
                defaults: [],
                body: {
                    type: 'ObjectExpression',
                    properties: [],
                    range: [18, 20],
                    loc: {
                        start: { line: 1, column: 18 },
                        end: { line: 1, column: 20 }
                    }
                },
                rest: null,
                generator: false,
                expression: true,
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

        '({ test: function () 42 })': {
            type: 'Program',
            body: [{
                type: 'ExpressionStatement',
                expression: {
                    type: 'ObjectExpression',
                    properties: [{
                        type: 'Property',
                        key: {
                            type: 'Identifier',
                            name: 'test',
                            range: [3, 7],
                            loc: {
                                start: { line: 1, column: 3 },
                                end: { line: 1, column: 7 }
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
                                range: [21, 23],
                                loc: {
                                    start: { line: 1, column: 21 },
                                    end: { line: 1, column: 23 }
                                }
                            },
                            rest: null,
                            generator: false,
                            expression: true,
                            range: [9, 23],
                            loc: {
                                start: { line: 1, column: 9 },
                                end: { line: 1, column: 23 }
                            }
                        },
                        kind: 'init',
                        range: [3, 23],
                        loc: {
                            start: { line: 1, column: 3 },
                            end: { line: 1, column: 23 }
                        }
                    }],
                    range: [1, 25],
                    loc: {
                        start: { line: 1, column: 1 },
                        end: { line: 1, column: 25 }
                    }
                },
                range: [0, 26],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 1, column: 26 }
                }
            }],
            range: [0, 26],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 26 }
            }
        },

        'function a() 1': {
            generateFrom: {
                type: 'Program',
                body: [{
                    type: 'FunctionDeclaration',
                    id: {
                        type: 'Identifier',
                        name: 'a',
                        range: [9, 10],
                        loc: {
                            start: { line: 1, column: 9 },
                            end: { line: 1, column: 10 }
                        }
                    },
                    params: [],
                    defaults: [],
                    body: {
                        type: 'Literal',
                        value: 1,
                        raw: '1',
                        range: [13, 14],
                        loc: {
                            start: { line: 1, column: 13 },
                            end: { line: 1, column: 14 }
                        }
                    },
                    rest: null,
                    generator: false,
                    expression: true,
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

        'function a() {\n}': {
            generateFrom: {
                type: 'Program',
                body: [{
                    type: 'FunctionDeclaration',
                    id: {
                        type: 'Identifier',
                        name: 'a',
                        range: [9, 10],
                        loc: {
                            start: { line: 1, column: 9 },
                            end: { line: 1, column: 10 }
                        }
                    },
                    params: [],
                    defaults: [],
                    body: {
                        type: 'BlockStatement',
                        body: [],
                        range: [13, 15],
                        loc: {
                            start: { line: 1, column: 13 },
                            end: { line: 1, column: 15 }
                        }
                    },
                    rest: null,
                    generator: false,
                    expression: false,
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
            }
        },

        'function a() my()': {
            generateFrom: {
                type: 'Program',
                body: [{
                    type: 'FunctionDeclaration',
                    id: {
                        type: 'Identifier',
                        name: 'a',
                        range: [9, 10],
                        loc: {
                            start: { line: 1, column: 9 },
                            end: { line: 1, column: 10 }
                        }
                    },
                    params: [],
                    defaults: [],
                    body: {
                        type: 'CallExpression',
                        callee: {
                            type: 'Identifier',
                            name: 'my',
                            range: [13, 15],
                            loc: {
                                start: { line: 1, column: 13 },
                                end: { line: 1, column: 15 }
                            }
                        },
                        'arguments': [],
                        range: [13, 17],
                        loc: {
                            start: { line: 1, column: 13 },
                            end: { line: 1, column: 17 }
                        }
                    },
                    rest: null,
                    generator: false,
                    expression: true,
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

        '[function () 1];': {
            generateFrom: {
                type: 'Program',
                body: [{
                    type: 'ExpressionStatement',
                    expression: {
                        type: 'ArrayExpression',
                        elements: [{
                            type: 'FunctionExpression',
                            id: null,
                            params: [],
                            defaults: [],
                            body: {
                                type: 'Literal',
                                value: 1,
                                raw: '1',
                                range: [13, 14],
                                loc: {
                                    start: { line: 1, column: 13 },
                                    end: { line: 1, column: 14 }
                                }
                            },
                            rest: null,
                            generator: false,
                            expression: true,
                            range: [1, 14],
                            loc: {
                                start: { line: 1, column: 1 },
                                end: { line: 1, column: 14 }
                            }
                        }],
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
            }
        },

        '({test: function () (42,42)})': {
            type: 'Program',
            body: [{
                type: 'ExpressionStatement',
                expression: {
                    type: 'ObjectExpression',
                    properties: [{
                        type: 'Property',
                        key: {
                            type: 'Identifier',
                            name: 'test',
                            range: [3, 7],
                            loc: {
                                start: { line: 1, column: 3 },
                                end: { line: 1, column: 7 }
                            }
                        },
                        value: {
                            type: 'FunctionExpression',
                            id: null,
                            params: [],
                            defaults: [],
                            body: {
                                type: 'SequenceExpression',
                                expressions: [{
                                    type: 'Literal',
                                    value: 42,
                                    raw: '42',
                                    range: [22, 24],
                                    loc: {
                                        start: { line: 1, column: 22 },
                                        end: { line: 1, column: 24 }
                                    }
                                }, {
                                    type: 'Literal',
                                    value: 42,
                                    raw: '42',
                                    range: [25, 27],
                                    loc: {
                                        start: { line: 1, column: 25 },
                                        end: { line: 1, column: 27 }
                                    }
                                }],
                                range: [22, 27],
                                loc: {
                                    start: { line: 1, column: 22 },
                                    end: { line: 1, column: 27 }
                                }
                            },
                            rest: null,
                            generator: false,
                            expression: true,
                            range: [9, 28],
                            loc: {
                                start: { line: 1, column: 9 },
                                end: { line: 1, column: 28 }
                            }
                        },
                        kind: 'init',
                        range: [3, 28],
                        loc: {
                            start: { line: 1, column: 3 },
                            end: { line: 1, column: 28 }
                        }
                    }],
                    range: [1, 30],
                    loc: {
                        start: { line: 1, column: 1 },
                        end: { line: 1, column: 30 }
                    }
                },
                range: [0, 31],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 1, column: 31 }
                }
            }],
            range: [0, 31],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 31 }
            }
        }
    }
};

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
        parse: esprima.parse,
        moz: {
            starlessGenerator: true,
            comprehensionExpressionStartsWithAssignment: true
        }
    };

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

describe('moz test', function () {
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
