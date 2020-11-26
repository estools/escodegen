class MyClass {
    /**
     * description
     */
    foo(a, b) {
        a.bar(b);
    }
}

class MyClass2 {
    // description
    foo(a, b, c,
        // NOTE: ...
        d = false) {
            return 42;
    }
}
