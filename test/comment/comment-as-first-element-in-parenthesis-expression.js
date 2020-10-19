let variable = (
    // comment
    3+3
);

let variable = ( // comment
    3+3
);

let variable = ( /* comment */
    3+3
);

let variable = ( /* comment
    comment
    comment
    */
    3+3
);

let variable = (
    // comment
    /* comment */
    // comment
    3+3
);

let variable = /* comment */ (
    // comment
    3+3
);

let variable = (
    (
        // one
        3+3
    ) -
    (
        // two
        1+1
    )
);

function foo(a, b, c) {
    return (
        // comment
        (a >= b && a <= c)
        || a === 42 || a === 666
    );
}

function foo(a, b, c) {
    return (
        ( // comment
            a >= b &&
            a <= c)
        || a === 42 || a === 666
    );
}

function foo(a, b, c) {
    throw (
        // comment
        (a >= b && a <= c)
        || a === 42 || a === 666
    );
}

let arrowFn = () => (
    // comment
    {
      a: 1, b: 2
    }
);

var test = [
    /**
     * Test 2
     */
    a,
    /*
     * Test 1
     */
    2,
    // Test 3
    3+3
];
