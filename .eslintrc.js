module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2020: true,
    node: true,
    'jest/globals': true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 11,
  },
  plugins: [
    'react',
    'jest',
  ],
  rules: {
    'no-console': 'off',
    'react/destructuring-assignment': [0],
  },
};
