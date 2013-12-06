function* foo() {
    var a = yield wat(), b = 2;
    var c = yield (a = b);
    yield a, yield b;
    return (yield 1) || (yield 2);
}
