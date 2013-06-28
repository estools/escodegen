var escodegen = require("../escodegen")


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

    var matches = result.map._mappings.filter(function(mapping) {
        return isXParam(mapping) || isYParam(mapping);
    });

    assert.equal(matches.length, 2, "found source map info for both params");
};


require("./driver")(exports);