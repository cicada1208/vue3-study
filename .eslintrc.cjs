/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution');

module.exports = {
  root: true,
  parserOptions: {
    ecmaVersion: 'latest',
    ecmaFeatures: {
      jsx: true // If you are using JSX, you need to enable JSX in your ESLint configuration.
    }
  },
  extends: [
    // add more generic rulesets here
    'eslint:recommended',
    'plugin:vue/vue3-essential',
    '@vue/eslint-config-typescript'
    // '@vue/eslint-config-prettier'
  ],
  rules: {
    // override/add rules settings here
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'linebreak-style': ['off'] // 關閉換行符號的 lint，因可能跨平台
  }
};
