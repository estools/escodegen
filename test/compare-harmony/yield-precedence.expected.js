function* foo() {
    var a = yield wat(), b = 2;
    var c = yield (a = b);
    return (yield 1) || (yield 2);
}
