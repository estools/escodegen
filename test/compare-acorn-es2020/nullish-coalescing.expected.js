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
for (let i = 0; i < 100000; i++)
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
    get x() {
        this.count++;
        return 'x';
    }
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
0 || 1 && 2 | 3 ^ 4 & 5 == 6 != 7 === 8 !== 9 < 0 > 1 <= 2 >= 3 << 4 >> 5 >>> 6 + 7 - 8 * 9 / 0 % 1 ** 2;