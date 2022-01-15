module.exports = {
  env: {
    mocha: true,
    node: true,
  },

  extends: ['@metarashtra/eslint-config'],

  overrides: [
    {
      files: ['hardhat.config.js'],
      globals: { task: true },
    },
    {
      files: '*.test.js',
      rules: {
        'no-unused-expressions': 'off',
      },
    },
  ],
};
