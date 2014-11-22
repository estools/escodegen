var asts = require('./asts'),
    escodegen = require('../');

for (var j = 0; j < 50; j++) {
    for (var i = 0; i < asts.length; i++)
        escodegen.generate(asts[0]);
}

