module.exports = {
  env: {
    browser: true,
    es2021: true,
  },

  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: "module",
  },

  extends: ["next/core-web-vitals"],

  ignorePatterns: ["node_modules/*", "public/*", "build/*"],

  plugins: [],

  rules: {
    "arrow-body-style": ["off"],
    "comma-dangle": "off",
    // ? git handles this instead
    "linebreak-style": "off",
    // ? allow debugger and console statement in development
    "no-console": "warn",
    "no-debugger": "warn",
    // ? for use with redux-toolkit (immer)
    "no-param-reassign": [
      "error",
      {
        ignorePropertyModificationsFor: ["state"],
        props: true,
      },
    ],
    "no-unused-expressions": "warn",
    "no-unused-vars": "warn",
    "import/extensions": [
      "error",
      "always",
      {
        js: "never",
        jsx: "never",
        ts: "never",
        tsx: "never",
      },
    ],
    "import/no-extraneous-dependencies": [
      "off",
      {
        devDependencies: true,
        optionalDependencies: true,
        peerDependencies: true,
      },
    ],
    "import/order": [
      "error",
      {
        groups: [
          "builtin",
          "external",
          "internal",
          "parent",
          "sibling",
          "index",
          "object",
          "type",
        ],
        "newlines-between": "always",
        alphabetize: {
          order: "asc",
          caseInsensitive: true,
        },
        warnOnUnassignedImports: true,
      },
    ],
    "import/prefer-default-export": "off",
    "react/function-component-definition": [
      "error",
      {
        namedComponents: "arrow-function",
        unnamedComponents: "arrow-function",
      },
    ],
    "react/jsx-props-no-spreading": "off",
    "react/prop-types": "off",
    "react/react-in-jsx-scope": "off",
    "react-hooks/exhaustive-deps": "warn",
  },

  settings: {
    next: {
      rootDir: "/packages/frontend/",
    },
  },
};
