function foo() {
    return (
        // comment
        3 + 3
    );
}
function foo() {
    return (
        // comment
        3 + 3
    );
}
function foo() {
    return (
        /* comment */
        3 + 3
    );
}
function foo() {
    return (
        /* comment
        comment
        comment
        */
        3 + 3
    );
}
function foo() {
    return (
        /* comment
        comment
        comment
        */
        3 + 3
    );
}
function foo() {
    return (
        // comment
        /* comment */
        // comment
        3 + 3
    );
}
function foo() {
    return (
        // one
        3 + 3
    ) - (
        // two
        (1 + 1)
    );
}
function foo(a, b, c) {
    return (
        // comment
        a >= b && a <= c || a === 42 || a === 666
    );
}
function foo(a, b, c) {
    return (
        // comment
        a >= b && a <= c
    ) || a === 42 || a === 666;
}
function foo(a, b, c) {
    throw (
        // comment
        a >= b && a <= c || a === 42 || a === 666
    );
}
let arrowFn = () => (
    // comment
    {
        a: 1,
        b: 2
    }
);
