function *foo () {
  var a = yield 'wat';
  return (yield 1) || (yield 2);
}
