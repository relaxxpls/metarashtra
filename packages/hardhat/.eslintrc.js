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
  ],
};
