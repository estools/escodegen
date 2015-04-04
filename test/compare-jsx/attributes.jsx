<div>
    <div a='a'></div>
    <div {...this.props} foo={'override'}/>
    <div a='a' c={c()*2} b>text</div>
    <div a='a' c={c()*2} b d>text</div>
    <div a='a' b e='e' f d='d' g c="'c'">text</div>
    <div a='a' b c={c()*2} d={d(function(){return d;})}>text</div>
    <div c={c()*2} e={{e:'e'}} a='a' d={d(function(){return d;})} b f={{e:'e',f:'f'}} g={g({g:'g'})} h={{h:function(){return h;}}}>text</div>
</div>
