/*
 * Copyright (C) 2020 Sony Interactive Entertainment Inc.
 * Copyright (C) 2020 Apple Inc.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions
 * are met:
 * 1. Redistributions of source code must retain the above copyright
 *    notice, this list of conditions and the following disclaimer.
 * 2. Redistributions in binary form must reproduce the above copyright
 *    notice, this list of conditions and the following disclaimer in the
 *    documentation and/or other materials provided with the distribution.
 *
 * THIS SOFTWARE IS PROVIDED BY APPLE INC. AND ITS CONTRIBUTORS ``AS IS''
 * AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO,
 * THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR
 * PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL APPLE INC. OR ITS CONTRIBUTORS
 * BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR
 * CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF
 * SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS
 * INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN
 * CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
 * ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF
 * THE POSSIBILITY OF SUCH DAMAGE.
 */

obj?.aaa?.bbb;
obj?.aaa.bbb;
(obj?.aaa)?.bbb;
(obj?.aaa).bbb;
obj.aaa.bbb;
obj.aaa?.bbb;
func?.()?.bbb;
func?.().bbb;
(func?.())?.bbb;
(func?.()).bbb;
obj?.aaa?.();
obj?.aaa();
(obj?.aaa)?.();
(obj?.aaa)();
(obj?.aaa?.bbb.ccc?.ddd)?.eee;
((obj?.aaa?.bbb.ccc)?.ddd)?.eee;

function testBasicSuccessCases() {
    shouldBe(undefined?.valueOf(), undefined);
    shouldBe(null?.valueOf(), undefined);
    shouldBe(true?.valueOf(), true);
    shouldBe(false?.valueOf(), false);
    shouldBe(0?.valueOf(), 0);
    shouldBe(1?.valueOf(), 1);
    shouldBe(''?.valueOf(), '');
    shouldBe('hi'?.valueOf(), 'hi');
    shouldBe(({})?.constructor, Object);
    shouldBe(({ x: 'hi' })?.x, 'hi');
    shouldBe([]?.length, 0);
    shouldBe(['hi']?.length, 1);
    shouldBe(masquerader?.foo, 3);

    shouldBe(undefined?.['valueOf'](), undefined);
    shouldBe(null?.['valueOf'](), undefined);
    shouldBe(true?.['valueOf'](), true);
    shouldBe(false?.['valueOf'](), false);
    shouldBe(0?.['valueOf'](), 0);
    shouldBe(1?.['valueOf'](), 1);
    shouldBe(''?.['valueOf'](), '');
    shouldBe('hi'?.['valueOf'](), 'hi');
    shouldBe(({})?.['constructor'], Object);
    shouldBe(({ x: 'hi' })?.['x'], 'hi');
    shouldBe([]?.['length'], 0);
    shouldBe(['hi']?.[0], 'hi');
    shouldBe(masquerader?.['foo'], 3);

    shouldBe(undefined?.(), undefined);
    shouldBe(null?.(), undefined);
    shouldBe((() => 3)?.(), 3);
}
noInline(testBasicSuccessCases);

function testBasicFailureCases() {
    shouldThrowTypeError(() => true?.(), 'true is not a function');
    shouldThrowTypeError(() => false?.(), 'false is not a function');
    shouldThrowTypeError(() => 0?.(), '0 is not a function');
    shouldThrowTypeError(() => 1?.(), '1 is not a function');
    shouldThrowTypeError(() => ''?.(), '\'\' is not a function');
    shouldThrowTypeError(() => 'hi'?.(), '\'hi\' is not a function');
    shouldThrowTypeError(() => ({})?.(), '({}) is not a function');
    shouldThrowTypeError(() => ({ x: 'hi' })?.(), '({ x: \'hi\' }) is not a function');
    shouldThrowTypeError(() => []?.(), '[] is not a function');
    shouldThrowTypeError(() => ['hi']?.(), '[\'hi\'] is not a function');
    shouldThrowTypeError(() => masquerader?.(), 'masquerader is not a function');
}
noInline(testBasicFailureCases);

for (let i = 0; i < 1e5; i++)
    testBasicSuccessCases();

for (let i = 0; i < 100; i++)
    testBasicFailureCases();

shouldThrowTypeError(() => ({})?.i(), '({})?.i is not a function');
shouldBe(({}).i?.(), undefined);
shouldBe(({})?.i?.(), undefined);
shouldThrowTypeError(() => ({})?.['i'](), '({})?.[\'i\'] is not a function');
shouldBe(({})['i']?.(), undefined);
shouldBe(({})?.['i']?.(), undefined);

shouldThrowTypeError(() => ({})?.a['b'], 'undefined is not an object');
shouldBe(({})?.a?.['b'], undefined);
shouldBe(null?.a['b']().c, undefined);
shouldThrowTypeError(() => ({})?.['a'].b, 'undefined is not an object');
shouldBe(({})?.['a']?.b, undefined);
shouldBe(null?.['a'].b()['c'], undefined);
shouldThrowTypeError(() => (() => {})?.()(), '(() => {})?.() is not a function');
shouldBe((() => {})?.()?.(), undefined);
shouldBe(null?.()().a['b'], undefined);

const o0 = { a: { b() { return this._b.bind(this); }, _b() { return this.__b; }, __b: { c: 42 } } };
shouldBe(o0?.a?.['b']?.()?.()?.c, 42);
shouldBe(o0?.i?.['j']?.()?.()?.k, undefined);
shouldBe((o0.a?._b)?.().c, 42);
shouldBe((o0.a?._b)().c, 42);

shouldBe(({ undefined: 3 })?.[null?.a], 3);
shouldBe((() => 3)?.(null?.a), 3);

const o1 = { count: 0, get x() { this.count++; return () => {}; } };
o1.x?.y;
shouldBe(o1.count, 1);
o1.x?.['y'];
shouldBe(o1.count, 2);
o1.x?.();
shouldBe(o1.count, 3);
null?.(o1.x);
shouldBe(o1.count, 3);

shouldBe(delete undefined?.foo, true);
shouldBe(delete null?.foo, true);
shouldBe(delete undefined?.['foo'], true);
shouldBe(delete null?.['foo'], true);
shouldBe(delete undefined?.(), true);
shouldBe(delete null?.(), true);

const o2 = { x: 0, y: 0, z() {} };
shouldBe(delete o2?.x, true);
shouldBe(o2.x, undefined);
shouldBe(delete o2?.x, true);
shouldBe(delete o2?.['y'], true);
shouldBe(o2.y, undefined);
shouldBe(delete o2?.['y'], true);
shouldBe(delete o2.z?.(), true);

function greet(name) { return `hey, ${name}${this.suffix ?? '.'}`; }
shouldBe(eval?.('greet("world")'), 'hey, world.');
shouldBe(greet?.call({ suffix: '!' }, 'world'), 'hey, world!');
shouldBe(greet.call?.({ suffix: '!' }, 'world'), 'hey, world!');
shouldBe(null?.call({ suffix: '!' }, 'world'), undefined);
shouldBe(({}).call?.({ suffix: '!' }, 'world'), undefined);
shouldBe(greet?.apply({ suffix: '?' }, ['world']), 'hey, world?');
shouldBe(greet.apply?.({ suffix: '?' }, ['world']), 'hey, world?');
shouldBe(null?.apply({ suffix: '?' }, ['world']), undefined);
shouldBe(({}).apply?.({ suffix: '?' }, ['world']), undefined);

// NOT an optional chain
shouldBe(false?.4:5, 5);
