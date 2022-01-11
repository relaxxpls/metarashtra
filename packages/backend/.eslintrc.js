module.exports = {
  env: {
    node: true,
    mongo: true,
  },

  extends: ['@metarashtra/eslint-config'],

  rules: {
    'node/no-unsupported-features/es-syntax': 'off',
  },
};
