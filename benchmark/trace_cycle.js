import asts from './asts.js';
import escodegen from '../src/escodegen-node.js';

for (var j = 0; j < 50; j++) {
    for (var i = 0; i < asts.length; i++)
        escodegen.generate(asts[0]);
}
