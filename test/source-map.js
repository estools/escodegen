var escodegen = require("../escodegen");


exports.testFunctionExpressionIdentifier = function (assert) {
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

    assert.ok(result.map._mappings.some(function (mapping) {
        return mapping.generated.line == 1 &&
            mapping.generated.column == 9 &&
            mapping.original.line == 2 &&
            mapping.original.column == 4;
    }), "contains mapping for identifier");
};

exports.testFunctionExpressionParams = function (assert) {
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

    assert.equal(result.map._mappings.filter(isXParam).length, 1,
        "found x param mapping");
    assert.equal(result.map._mappings.filter(isYParam).length, 1,
        "found y param mapping");
};

exports.testMemberExpression = function (assert) {
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

    assert.equal(result.map._mappings.filter(isObject).length, 1,
        "found object mapping");

    assert.equal(result.map._mappings.filter(isProperty).length, 1,
        "found one property mapping");
};


exports.testDeclarationInFunction = function (assert) {
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

    assert.equal(result.map._mappings.filter(function (x) {
        return x.original &&
            x.original.line == 1 &&
            x.original.column == 6;
    }).length, 1, "found a declaration node");
};

require("./driver")(exports);
