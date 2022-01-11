module.exports = {
  env: {
    browser: true,
  },

  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
  },

  extends: ['@metarashtra/eslint-config', 'next/core-web-vitals'],

  ignorePatterns: ['build/*'],

  rules: {
    'react/function-component-definition': [
      'error',
      {
        namedComponents: 'arrow-function',
        unnamedComponents: 'arrow-function',
      },
    ],
    'react/jsx-props-no-spreading': 'off',
    'react/prop-types': 'off',
    'react/react-in-jsx-scope': 'off',
    'react-hooks/exhaustive-deps': 'warn',
  },

  settings: {
    next: {
      rootDir: '/packages/frontend/',
    },
  },
};
