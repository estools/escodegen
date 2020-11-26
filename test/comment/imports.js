// this import is important
import 'foo';
import {foo} from 'foo';
import {foo as bar} from 'foo';
// this import is important too
import {
    foo as bar,
    // alias needed because of ...
    test as testing,
    logging
} from 'foo';
