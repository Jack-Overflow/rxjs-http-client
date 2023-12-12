module.exports = {
    root: true,
    env: {
        es2021: true,
        node: true
    },
    parser: '@typescript-eslint/parser',
    plugins: [
        '@typescript-eslint'
    ],
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/eslint-recommended',
        'plugin:@typescript-eslint/recommended'
    ],
    rules: {
        'no-console': 'warn',
        'no-debugger': 'warn',
        'no-prototype-builtins': 'off',
        'no-useless-escape': 'off',
        '@typescript-eslint/semi': 'error',
        '@typescript-eslint/no-inferrable-types': 'off',
        '@typescript-eslint/no-empty-function': 'off',
        '@typescript-eslint/ban-ts-comment': 'off',
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/explicit-module-boundary-types': 'off',
        '@typescript-eslint/quotes': [
            'error',
            'single',
            {
                'allowTemplateLiterals': true
            }
        ]
    }
};
