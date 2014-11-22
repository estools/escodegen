var fs = require('fs'),
    path = require('path'),
    esprima = require('esprima');

var FILES_PATH = path.join(__dirname, './asts');

var FILES = [
    'jQuery 1.7.1',
    'jQuery 1.6.4',
    'jQuery.Mobile 1.0',
    'Prototype 1.7.0.0',
    'Prototype 1.6.1',
    'Ext Core 3.1.0',
    'Ext Core 3.0.0',
    'MooTools 1.4.1',
    'MooTools 1.3.2',
    'Backbone 0.5.3',
    'Underscore 1.2.3'
];

function slug(name) {
    return name.toLowerCase().replace(/\s/g, '-');
}

module.exports = FILES.map(function (file) {
    var astJson = fs.readFileSync(FILES_PATH + '/' + slug(file) + '-ast.json');

    return JSON.parse(astJson);
});
