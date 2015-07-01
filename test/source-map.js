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

var esprima = require('./3rdparty/esprima-1.0.0-dev'),
    escodegen = require('./loader'),
    sourcemap = require('source-map'),
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
        expect(result.map._mappings.toArray().some(function (mapping) {
            return mapping.generatedLine == 1 &&
                mapping.generatedColumn == 9 &&
                mapping.originalLine == 2 &&
                mapping.originalColumn == 4;
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
            return mapping.generatedLine == 1 &&
                mapping.generatedColumn == 10 &&
                mapping.originalLine == 2 &&
                mapping.originalColumn == 4;
        }

        function isYParam(mapping) {
            return mapping.generatedLine == 1 &&
                mapping.generatedColumn == 13 &&
                mapping.originalLine == 3 &&
                mapping.originalColumn == 6;
        }

        // found x param mapping
        expect(result.map._mappings.toArray().filter(isXParam).length).to.be.equal(1);
        // found y param mapping
        expect(result.map._mappings.toArray().filter(isYParam).length).to.be.equal(1);
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
            return mapping.generatedLine == 1 &&
                mapping.generatedColumn == 0 &&
                mapping.originalLine == 1 &&
                mapping.originalColumn == 0;
        }

        function isProperty(mapping) {
            return mapping.generatedLine == 1 &&
                mapping.generatedColumn == 6 &&
                mapping.originalLine == 1 &&
                mapping.originalColumn == 4;
        }

        // found object mapping
        expect(result.map._mappings.toArray().filter(isObject).length).to.be.equal(1);

        // found one property mapping
        expect(result.map._mappings.toArray().filter(isProperty).length).to.be.equal(1);
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
        expect(result.map._mappings.toArray().filter(function (x) {
            return x.originalLine == 1 && x.originalColumn == 6;
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

    it('sourceContent support', function() {
        var source = "(+ a b)"
        var ast = {
            "type": "ExpressionStatement",
            "expression": {"type": "BinaryExpression",
                           "operator": "+",
                           "left": {"type": "Identifier",
                                    "name": "a",
                                    "loc": {"start": {"line": 1, "column": 3 },
                                            "end": {"line": 1, "column": 4 } },
                                   },
                           "right": {"type": "Identifier",
                                     "name": "b",
                                     "loc": {"start": { "line": 1, "column": 5 },
                                             "end": { "line": 1, "column": 6 } }
                                    },
                           "loc": { "start": { "line": 1, "column": 0 },
                                   "end": { "line": 1, "column": 6 } }
                          }
        };
        var output = escodegen.generate(ast, {
            file: "sum.js",
            sourceMap: "sum.ls",
            sourceMapWithCode: true,
            sourceContent: source
        });

        expect(output.code).to.be.equal("a + b;");


        var consumer = new sourcemap.SourceMapConsumer(output.map.toString());
        expect(consumer.sourceContentFor("sum.ls")).to.be.equal(source);
    });

    it('sourceMapWithCode forces output format', function() {
        var ast = {
            "type": "ExpressionStatement",
            "expression": {
                "type": "Literal",
                "value": 1
            }
        };

        // sourceMapWithCode should force result format to be object even with sourceMap:false
        var result = escodegen.generate(ast, {
            sourceMapWithCode: true
        });

        expect(result.code).to.be.a('string');
        expect(result.map).to.be.equal(null);
    });
});
