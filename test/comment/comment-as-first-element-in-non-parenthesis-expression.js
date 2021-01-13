function foo(x) {
    return /* comment 1 */ x > 0 || // comment 2
        x < 5;
}

function foo(x) {
    return /* comment 1 */ x > 0 ||
        // comment 2
        x < 5;
}
