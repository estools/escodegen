function foo(a, b, c) {
    throw (
        // comment
        a >= b && a <= c || a === 42 || a === 666
    );
}
