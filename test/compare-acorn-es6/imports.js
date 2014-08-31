// Acorn has an issue about EmptyStatement and ImportDeclaration.
// So don't add ;
import 'foo'
import foo from 'foo'
import {foo} from 'foo'
import {foo as bar} from 'foo'
import {
    foo as bar,
    test as testing,
    logging
} from 'foo'
import foo, {
    bar
} from "ok"
import foo, {
    a as a1,
    b,
    c as c1,
    d
} from "ok"
