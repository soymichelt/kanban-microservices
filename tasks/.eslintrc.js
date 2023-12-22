/** @type {import('eslint').Linter.Config} */
module.exports = {
  root: true,
  env: {
    node: true,
    jest: true,
  },
  // Read more on: https://github.com/typescript-eslint/typescript-eslint/tree/main/packages/parser#configuration
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.json',
    ecmaVersion: 'latest',
    tsconfigRootDir: __dirname,
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint', 'folders', 'import', 'simple-import-sort', 'unused-imports'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
    'plugin:security/recommended',
  ],
  rules: {
    semi: 'off',
    '@typescript-eslint/semi': ['error', 'always'],
    'array-element-newline': 'off',
    complexity: ['error', 10],
    eqeqeq: 'error',
    'max-depth': ['error', 3],
    'max-len': [
      'warn',
      {
        code: 120,
        ignoreComments: true,
        ignoreTemplateLiterals: true,
        ignorePattern: '^import .*',
      },
    ],
    'max-lines-per-function': [
      'warn',
      {
        max: 50,
        skipBlankLines: true,
        skipComments: true,
      },
    ],
    'max-params': ['error', 6],
    'no-console': 'warn',
    'no-prototype-builtins': 'off',
    'no-use-before-define': 'off',
    'no-var': 'error',
    'object-property-newline': 'error',
    'object-shorthand': 'error',
    'prefer-const': 'error',
    'prefer-destructuring': 'warn',
    'prefer-rest-params': 'warn',
    'prefer-spread': 'warn',
    'prefer-template': 'error',
    yoda: 'error',
    // Plugins
    '@typescript-eslint/array-type': 'warn',
    '@typescript-eslint/member-ordering': 'warn',
    '@typescript-eslint/no-explicit-any': 'warn',
    '@typescript-eslint/no-unnecessary-type-assertion': 'error',
    '@typescript-eslint/no-unused-vars': [
      'error',
      {
        argsIgnorePattern: '^_', // use pipe (|) to add more
        ignoreRestSiblings: true,
      },
    ],
    'simple-import-sort/imports': 'error',
    'simple-import-sort/exports': 'error',
    'import/first': 'error',
    'import/newline-after-import': 'error',
    'import/no-duplicates': 'error',
    'unused-imports/no-unused-imports': 'error',
    'unused-imports/no-unused-vars': [
      'warn',
      {
        vars: 'all',
        varsIgnorePattern: '^_',
        args: 'after-used',
        argsIgnorePattern: '^_',
      },
    ],
    '@typescript-eslint/quotes': [
      'error',
      'single',
      {
        avoidEscape: true,
        allowTemplateLiterals: true,
      },
    ],
  },
};
