module.exports = {
  env: {
    es6: true,
    node: true,
    jest: true,
  },
  extends: ['airbnb-base'],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  rules: {
    'linebreak-style': 0,
    'no-console': 'off',
    'no-underscore-dangle': 'off',
    'implicit-arrow-linebreak': 'off',
    'function-paren-newline': 'off',
    'consistent-return': 'off',
    'no-restricted-syntax': 'off',
    'no-await-in-loop': 'off',
    'no-use-before-define': 'off',
    'func-names': 'off',
    'space-before-function-paren': 'off',
  },
};
