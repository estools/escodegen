function a() {
    var _this = this;
    return (
        <div a='a' e
            b={b}
            c={c + d}
            f={_this.onclick(function (e) {
                var x = 'x';
                return <this.props.component/>;
            })}>
            <this.widget/>
            <Sample>
                <ul>
                    {_this.props.items.map(function (item) {
                        return <li a={item.href}>{item.label}</li>;
                    })}
                </ul>
            </Sample>
        </div>
    );
}
