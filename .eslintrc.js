module.exports = {
  env: {
    browser: true,
    es2020: true,
    node: true,
    amd: true,
    jest: true,
  },
  extends: ['airbnb', 'airbnb/hooks', 'plugin:prettier/recommended'],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: [],
  rules: {
    // Disable proptypes
    'react/prop-types': 'off',
    'react/jsx-filename-extension': ['error', { extensions: ['.js', '.jsx'] }],
    'prettier/prettier': 'error',
    'import/no-extraneous-dependencies': [
      'error',
      { devDependencies: ['**/*.{js,jsx}', '**/*.test.{js,jsx}', '**/*.spec.{js,jsx}'] },
    ],
  },
};
