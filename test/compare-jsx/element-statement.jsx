function a() {
    return <div></div>;
}
function a() {
    return <div>text</div>;
}
function a() {
    return <div a="a" b="b" c={c}/>;
}
function a() {
    return <div a="a" b="b" c={c} d="d"/>;
}
function a() {
    return <div><span/></div>;
}
function a() {
    return <a><div><span/></div></a>;
}
a(<div></div>);
a(<div></div>, 0);
a(<div><span/></div>);
a(<div><span/></div>, 0);
a(<div><a><span/></a></div>);
a(0,<div><a><span/></a></div>,0);
a(<div><ul><li><a></a></li></ul></div>);
a(0,<div><ul><li><a></a></li></ul></div>, 0);
a = <div></div>;
a = [<div></div>]
a = [<div></div>,1]
a = [<div><span/></div>]
a = [<div><a><span/></a></div>]
a = [0,<div><a><span/></a></div>,0]
a = {a:<div></div>}
a = {a:0,a:<div></div>,a:0}
a = {a:<div><span/></div>}
a = {a:<div><a><span/></a></div>}
a = {a:0,a:<div><a><span/></a></div>,a:0}
