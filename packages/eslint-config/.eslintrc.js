module.exports = {
  root: true,

  env: {
    es2021: true,
  },

  parserOptions: {
    ecmaFeatures: {
      impliedStrict: true,
    },
    sourceType: 'module',
  },

  extends: [
    'plugin:security/recommended',
    'plugin:node/recommended',
    'plugin:prettier/recommended',
    'plugin:promise/recommended',
    'airbnb',
    'airbnb/hooks',
    'prettier',
  ],

  plugins: ['security', 'prettier'],

  ignorePatterns: ['node_modules/*'],

  rules: {
    'comma-dangle': ['error', 'only-multiline'],
    'linebreak-style': 'off',
    'no-console': 'warn',
    'no-debugger': 'warn',
    'no-param-reassign': 'error',
    'no-unused-expressions': 'warn',
    'no-unused-vars': 'warn',

    'import/extensions': [
      'error',
      'always',
      {
        js: 'never',
        jsx: 'never',
        ts: 'never',
        tsx: 'never',
      },
    ],
    'import/no-extraneous-dependencies': [
      'off',
      {
        devDependencies: true,
        optionalDependencies: true,
        peerDependencies: true,
      },
    ],
    'import/order': [
      'error',
      {
        groups: [
          'builtin',
          'external',
          'internal',
          'parent',
          'sibling',
          'index',
          'object',
          'type',
        ],
        'newlines-between': 'always',
        alphabetize: {
          order: 'asc',
          caseInsensitive: true,
        },
        warnOnUnassignedImports: true,
      },
    ],
    'node/no-missing-import': [
      'error',
      {
        tryExtensions: ['.jsx', '.js', '.json', '.node'],
      },
    ],
    'node/no-unsupported-features/es-syntax': [
      'error',
      { ignores: ['modules'] },
    ],
  },
};
