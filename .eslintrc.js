module.exports = {
  env: {
    browser: true,
    es2020: true,
    node: true,
  },
  extends: ['airbnb-base', 'plugin:jest/recommended'],
  plugins: ['jest'],
  parserOptions: {
    ecmaVersion: 11,
    sourceType: 'module',
  },
  rules: {
    'class-methods-use-this': 0,
    semi: 'off',
    'no-undef': 'off',
    'no-empty': 'off',
    'no-shadow': 'off',
    'no-trailing-spaces': 'off',
    'no-new': 'off',
    'quote-props': 'off',
    'quotes': 'off',
    'comma-dangle': 'off',
  },
};
