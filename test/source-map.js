/*
  Copyright (C) 2013 Yusuke Suzuki <utatane.tea@gmail.com>
  Copyright (C) 2013 Irakli Gozalishvili <rfobic@gmail.com>

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
    path = require('path'),
    root = path.join(path.dirname(fs.realpathSync(__filename)), '..'),
    esprima = require('./3rdparty/esprima'),
    escodegen = require(root),
    chai = require('chai'),
    expect = chai.expect;

describe('source map test', function () {
    it('function expression identifier test', function () {
        // https://github.com/Constellation/escodegen/issues/107
        var ast = {
            "type": "FunctionExpression",
            "id": {
                "type": "Identifier",
                "name": "x",
                "loc": {
                    "start": {
                        "line": 2,
                        "column": 4
                    },
                    "end": {
                        "line": 2,
                        "column": 5
                    }
                }
            },
            "params": [],
            "defaults": [],
            "body": {
                "type": "BlockStatement",
                "body": [],
            },
            "rest": null,
            "generator": false,
            "expression": false,
        };

        // function x() {\n}
        var result = escodegen.generate(ast, {
            sourceMap: "107",
            sourceMapWithCode: true
        });

        // contains mapping for identifier
        expect(result.map._mappings.some(function (mapping) {
            return mapping.generated.line == 1 &&
                mapping.generated.column == 9 &&
                mapping.original.line == 2 &&
                mapping.original.column == 4;
        })).to.be.true;
    });


    it('FunctionExpression params test', function () {
        // https://github.com/Constellation/escodegen/issues/108
        var ast = {
            "type": "FunctionExpression",
            "params": [
                {
                    "type": "Identifier",
                    "name": "x",
                    "loc": {
                        "start": {
                            "line": 2,
                            "column": 4
                        },
                        "end": {
                            "line": 2,
                            "column": 5
                        }
                    }
                },
                {
                    "type": "Identifier",
                    "name": "y",
                    "loc": {
                        "start": {
                            "line": 3,
                            "column": 6
                        },
                        "end": {
                            "line": 3,
                            "column": 7
                        }
                    }
                }
            ],
            "defaults": [],
            "body": {
                "type": "BlockStatement",
                "body": [],
            },
            "rest": null,
            "generator": false,
            "expression": false,
        };

        // function x() {\n}
        var result = escodegen.generate(ast, {
            sourceMap: "108",
            sourceMapWithCode: true
        });

        function isXParam(mapping) {
            return mapping.generated.line == 1 &&
                mapping.generated.column == 10 &&
                mapping.original.line == 2 &&
                mapping.original.column == 4;
        }

        function isYParam(mapping) {
            return mapping.generated.line == 1 &&
                mapping.generated.column == 13 &&
                mapping.original.line == 3 &&
                mapping.original.column == 6;
        }

        // found x param mapping
        expect(result.map._mappings.filter(isXParam).length).to.be.equal(1);
        // found y param mapping
        expect(result.map._mappings.filter(isYParam).length).to.be.equal(1);
    });

    it('MemberExpression test', function () {
        var ast = {
            "loc": {
                "start": {
                    "line": 1,
                    "column": 0
                },
                "end": {
                    "line": 1,
                    "column": 8
                }
            },
            "type": "MemberExpression",
            "computed": false,
            "object": {
                "loc": {
                    "start": {
                        "line": 1,
                        "column": 0
                    },
                    "end": {
                        "line": 1,
                        "column": 5
                    }
                },
                "type": "Identifier",
                "name": "isFoo"
            },
            "property": {
                "loc": {
                    "start": {
                        "line": 1,
                        "column": 4
                    },
                    "end": {
                        "line": 1,
                        "column": 8
                    }
                },
                "type": "Identifier",
                "name": "bar"
            }
        };


        var result = escodegen.generate(ast, {
            sourceMap: "members",
            sourceMapWithCode: true
        });

        function isObject(mapping) {
            return mapping.generated.line == 1 &&
                mapping.generated.column == 0 &&
                mapping.original.line == 1 &&
                mapping.original.column == 0;
        }

        function isProperty(mapping) {
            return mapping.generated.line == 1 &&
                mapping.generated.column == 6 &&
                mapping.original.line == 1 &&
                mapping.original.column == 4;
        }

        // found object mapping
        expect(result.map._mappings.filter(isObject).length).to.be.equal(1);

        // found one property mapping
        expect(result.map._mappings.filter(isProperty).length).to.be.equal(1);
    });

    it('Declaration in Function test', function () {
        var ast = {
            "loc": {
                "start": {
                    "line": 1,
                    "column": 0
                },
                "end": {
                    "line": 1,
                    "column": 11
                }
            },
            "type": "CallExpression",
            "arguments": [],
            "callee": {
                "type": "SequenceExpression",
                "expressions": [
                    {
                        "type": "FunctionExpression",
                        "params": [],
                        "defaults": [],
                        "expression": false,
                        "generator": false,
                        "body": {
                            "type": "BlockStatement",
                            "body": [
                                {
                                    "type": "VariableDeclaration",
                                    "kind": "var",
                                    "declarations": [
                                        {
                                            "type": "VariableDeclarator",
                                            "id": {
                                                "type": "Identifier",
                                                "name": "xᐝ1",
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
                                            },
                                            "init": {
                                                "type": "Literal",
                                                "value": 1
                                            }
                                    }
                                ]
                            },
                                {
                                    "type": "ReturnStatement",
                                    "argument": {
                                        "type": "UnaryExpression",
                                        "operator": "void",
                                        "argument": {
                                            "type": "Literal",
                                            "value": 0
                                        },
                                        "prefix": true
                                    }
                            }
                        ]
                        }
                }
            ]
            }
        };


        var result = escodegen.generate(ast, {
            sourceMap: "IIFE",
            sourceMapWithCode: true
        });

        // "found a declaration node"
        expect(result.map._mappings.filter(function (x) {
            return x.original &&
                x.original.line == 1 &&
                x.original.column == 6;
        }).length).to.be.equal(1);
    });

    it('names array test', function() {
        var ast = {
            "type": "Program",
            "body": [
                {
                    "type": "VariableDeclaration",
                    "declarations": [
                        {
                            "type": "VariableDeclarator",
                            "id": {
                                "type": "Identifier",
                                "name": "fooga",
                                "loc": {
                                    "start": {
                                        "line": 1,
                                        "column": 4
                                    },
                                    "end": {
                                        "line": 1,
                                        "column": 9
                                    }
                                }
                            },
                            "init": {
                                "type": "Literal",
                                "value": "wooga",
                                "raw": "\"wooga\"",
                                "loc": {
                                    "start": {
                                        "line": 1,
                                        "column": 12
                                    },
                                    "end": {
                                        "line": 1,
                                        "column": 19
                                    }
                                }
                            },
                            "loc": {
                                "start": {
                                    "line": 1,
                                    "column": 4
                                },
                                "end": {
                                    "line": 1,
                                    "column": 19
                                }
                            }
                        }
                    ],
                    "kind": "var",
                    "loc": {
                        "start": {
                            "line": 1,
                            "column": 0
                        },
                        "end": {
                            "line": 1,
                            "column": 20
                        }
                    }
                },
                {
                    "type": "ExpressionStatement",
                    "expression": {
                        "type": "CallExpression",
                        "callee": {
                            "type": "MemberExpression",
                            "computed": false,
                            "object": {
                                "type": "Identifier",
                                "name": "console",
                                "loc": {
                                    "start": {
                                        "line": 3,
                                        "column": 0
                                    },
                                    "end": {
                                        "line": 3,
                                        "column": 7
                                    }
                                }
                            },
                            "property": {
                                "type": "Identifier",
                                "name": "log",
                                "loc": {
                                    "start": {
                                        "line": 3,
                                        "column": 8
                                    },
                                    "end": {
                                        "line": 3,
                                        "column": 11
                                    }
                                }
                            },
                            "loc": {
                                "start": {
                                    "line": 3,
                                    "column": 0
                                },
                                "end": {
                                    "line": 3,
                                    "column": 11
                                }
                            }
                        },
                        "arguments": [
                            {
                                "type": "Identifier",
                                "name": "fooga",
                                "loc": {
                                    "start": {
                                        "line": 3,
                                        "column": 12
                                    },
                                    "end": {
                                        "line": 3,
                                        "column": 17
                                    }
                                }
                            }
                        ],
                        "loc": {
                            "start": {
                                "line": 3,
                                "column": 0
                            },
                            "end": {
                                "line": 3,
                                "column": 18
                            }
                        }
                    },
                    "loc": {
                        "start": {
                            "line": 3,
                            "column": 0
                        },
                        "end": {
                            "line": 3,
                            "column": 19
                        }
                    }
                }
            ],
            "loc": {
                "start": {
                    "line": 1,
                    "column": 0
                },
                "end": {
                    "line": 3,
                    "column": 19
                }
            }
        };
        
        var result = escodegen.generate(ast, {
            sourceMap: "Names",
            sourceMapWithCode: true
        });
        
        expect(result.map._names._array.length).to.be.equal(3);
    });
});
