import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import { terser } from 'rollup-plugin-terser';

export default [{
    input: 'src/escodegen-node.js',
    output: {
        file: 'dist/escodegen.cjs',
        format: 'cjs',
        sourcemap: true
    },
    plugins: [commonjs(), resolve(), terser()]
}, {
    input: 'src/escodegen-browser.js',
    output: {
        name: 'escodegen',
        file: 'dist/escodegen.umd.js',
        format: 'umd',
        sourcemap: true
    },
    plugins: [commonjs(), resolve(), terser()]
}, {
    input: 'src/escodegen-browser.js',
    output: {
        file: 'dist/escodegen.esm.js',
        format: 'esm',
        sourcemap: true
    },
    plugins: [commonjs(), resolve(), terser()]
}];
