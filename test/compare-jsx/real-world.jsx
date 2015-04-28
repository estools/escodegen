function a() {
    var _this = this;
    return (
        <div a="a" b={b} c={c+d} e f={_this.onclick(function(e) {
            var x = 'x';
            return <this.props.component/>;
        })}>
            <div ref="d">Hello {this.props.name}</div>
            <this.widget/>
            <Sample>
                <ul>
                    {_this.props.items.map(function(item) {
                        return (
                            <li a={item.href}>{item.label}</li>
                        );
                    })}
                </ul>
            </Sample>
        </div>
    );
}
