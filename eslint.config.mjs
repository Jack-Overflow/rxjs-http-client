import typescriptEslint from '@typescript-eslint/eslint-plugin';
import globals from 'globals';
import tsParser from '@typescript-eslint/parser';

export default [{
    files: ['**/*.js', '**/*.cjs', '**/*.mjs', '**/*.ts'],
    plugins: {
        '@typescript-eslint': typescriptEslint,
    },
    languageOptions: {
        globals: {
            ...globals.node,
        },

        parser: tsParser,
    },
    rules: {
        'semi': 'error',
        'quotes': ['error', 'single', {'allowTemplateLiterals': true}],
        'no-console': 'warn',
        'no-debugger': 'warn',
        'no-prototype-builtins': 'off',
        'no-useless-escape': 'off',
        '@typescript-eslint/no-inferrable-types': 'off',
        '@typescript-eslint/no-empty-function': 'off',
        '@typescript-eslint/ban-ts-comment': 'off',
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/explicit-module-boundary-types': 'off'
    },
}];
