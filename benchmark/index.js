var Benchmark = require('benchmark'),
    escodegen = require('../'),
    old = require('./old.js'),
    esotope = require('esotope'),
    asts = require('./asts');


function cycle(codegen) {
    for (var i = 0; i < asts.length; i++)
        codegen.generate(asts[i]);
}

new Benchmark.Suite()
    .add('esotope', function () {
        cycle(esotope);
    })

    .add('escodegen', function () {
        cycle(escodegen);
    })

    .add('old', function () {
        cycle(old);
    })

    .on('start', function () {
        console.log('Benchmarking...')
    })

    .on('cycle', function (event) {
        console.log(event.target.toString());
    })

    .on('complete', function () {
        console.log('Fastest is ' + this.filter('fastest').pluck('name'));

        console.log('esotope is x' + (this[0].hz / this[1].hz).toFixed(2) + ' times faster vs escodegen.');
    })

    .run();
