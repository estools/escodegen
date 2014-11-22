var asts = require('./asts'),
    esotope = require('../esotope');

for (var j = 0; j < 50; j++) {
    for (var i = 0; i < asts.length; i++)
        esotope.generate(asts[0]);
}

