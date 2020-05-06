'use strict';

module.exports = {
    extends: 'eslint:recommended',
    globals: {
        Atomics: 'readonly',
        SharedArrayBuffer: 'readonly'
    },
    env: {
        node: true,
        es6: true
    },
    parserOptions: {
        sourceType: 'module',
        ecmaVersion: 2018
    },
    overrides: [{
        files: '.eslintrc.js',
        parserOptions: {
            sourceType: 'script'
        },
        rules: {
            strict: 'error'
        }
    }, {
        files: 'test/**',
        globals: {
            expect: true
        },
        env: {
            mocha: true
        }
    }],
    rules: {
        // 'push-with-multiple-arguments': 2,
        /*
        'no-unused-vars': [
            2,
            {
                vars: 'all',
                args: 'none'
            }
        ],
        */
        'no-unused-vars': 0,
        'no-prototype-builtins': 0,
        'new-cap': [
            2,
            {
                capIsNew: false
            }
        ],
        semi: ['error'],
        // indent: ['error', 4, { SwitchCase: 1 }],
        'prefer-const': ['error'],
        // 'no-var': ['error'],
        // 'prefer-destructuring': ['error'],
        // 'object-shorthand': ['error'],
        // 'object-curly-spacing': ['error', 'always'],
        // quotes: ['error', 'single'],
        // 'quote-props': ['error', 'as-needed'],
        'brace-style': ['error', '1tbs', { allowSingleLine: true }]
        // 'prefer-template': ['error']
    }
};
