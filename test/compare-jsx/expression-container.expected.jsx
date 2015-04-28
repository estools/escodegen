<div>
    <div>{a}</div>
    <div>{a.b + c() + function f() {
        }()}</div>
    <div>text {a + b}</div>
    <div>text {a + b} text</div>
    <div>text {a + b} {c + d}</div>
    <div>{f({ a: 'a' })}</div>
    <div>{f({
            a: 'a',
            b: 'b'
        })}</div>
    <ul>{items.map(function (item) {
            return <li a={item.a().b.c()}><a href={item.href}>item {item.label}</a></li>;
        })}</ul>
    {{ a: 'a' }}
    {{
        a: function () {
            return a;
        }
    }}
    {['a']}
</div>;
