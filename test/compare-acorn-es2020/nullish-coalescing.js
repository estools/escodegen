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

function testBasicCases() {
    shouldBe(undefined ?? 3, 3);
    shouldBe(null ?? 3, 3);
    shouldBe(true ?? 3, true);
    shouldBe(false ?? 3, false);
    shouldBe(0 ?? 3, 0);
    shouldBe(1 ?? 3, 1);
    shouldBe('' ?? 3, '');
    shouldBe('hi' ?? 3, 'hi');
    shouldBe(({} ?? 3) instanceof Object, true);
    shouldBe(({ x: 'hi' } ?? 3).x, 'hi');
    shouldBe(([] ?? 3) instanceof Array, true);
    shouldBe((['hi'] ?? 3)[0], 'hi');
    shouldBe((makeMasquerader() ?? 3) == null, true);
}
noInline(testBasicCases);

for (let i = 0; i < 1e5; i++)
    testBasicCases();

shouldBe(1 | null ?? 3, 1);
shouldBe(1 ^ null ?? 3, 1);
shouldBe(1 & null ?? 3, 0);
shouldBe(3 == null ?? 3, false);
shouldBe(3 != null ?? 3, true);
shouldBe(3 === null ?? 3, false);
shouldBe(3 !== null ?? 3, true);
shouldBe(1 < null ?? 3, false);
shouldBe(1 > null ?? 3, true);
shouldBe(1 <= null ?? 3, false);
shouldBe(1 >= null ?? 3, true);
shouldBe(1 << null ?? 3, 1);
shouldBe(1 >> null ?? 3, 1);
shouldBe(1 >>> null ?? 3, 1);
shouldBe(1 + null ?? 3, 1);
shouldBe(1 - null ?? 3, 1);
shouldBe(1 * null ?? 3, 0);
shouldBe(1 / null ?? 3, Infinity);
shouldBe(isNaN(1 % null ?? 3), true);
shouldBe(1 ** null ?? 3, 1);

const obj = {
    count: 0,
    get x() { this.count++; return 'x'; }
};
false ?? obj.x;
shouldBe(obj.count, 0);
null ?? obj.x;
shouldBe(obj.count, 1);
obj.x ?? obj.x;
shouldBe(obj.count, 2);

(0 || 1) ?? 2;
0 || (1 ?? 2);
(0 && 1) ?? 2;
0 && (1 ?? 2);
(0 ?? 1) || 2;
0 ?? (1 || 2);
(0 ?? 1) && 2;
0 ?? (1 && 2);

0 || 1 && 2 | 3 ^ 4 & 5 == 6 != 7 === 8 !== 9 < 0 > 1 <= 2 >= 3 << 4 >> 5 >>> 6 + 7 - 8 * 9 / 0 % 1 ** 2
