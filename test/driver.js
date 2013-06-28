var assert = require("assert");

module.exports = function driver(tests) {
    var total = 0,
        failures = [],
        tick = new Date(),
        expected,
        header;

    Object.keys(tests).forEach(function (title) {
        try {
            total += 1;
            tests[title](assert);
        } catch (e) {
            e.title = title;
            failures.push(e);
        };
    });
    tick = (new Date()) - tick;

    header = total + ' tests. ' + failures.length + ' failures. ' + tick + ' ms';
    if (failures.length) {
        console.error(header);
        failures.forEach(function (failure) {
            console.error(failure.title, failure.message);
        });
    } else {
        console.log(header);
    }
    process.exit(failures.length === 0 ? 0 : 1);
};
