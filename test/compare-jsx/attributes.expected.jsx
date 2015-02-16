<div>
    <div a='a'></div>
    <div a='a' b c={c() * 2}>text</div>
    <div a='a' b d
        c={c() * 2}>
        text
    </div>
    <div a='a' b c="'c'"
        d='d' e='e' f
        g>
        text
    </div>
    <div a='a' b
        c={c() * 2}
        d={d(function () {
            return d;
        })}>
        text
    </div>
    <div a='a' b
        c={c() * 2}
        d={d(function () {
            return d;
        })}
        e={{ e: 'e' }}
        f={{
            e: 'e',
            f: 'f'
        }}
        g={g({ g: 'g' })}
        h={{
            h: function () {
                return h;
            }
        }}>
        text
    </div>
</div>;
