const globals = require('globals');
const baseConfig = require('../../eslint.config.js');
const tseslint = require('typescript-eslint');
// const { FlatCompat } = require('@eslint/eslintrc');
// const js = require('@eslint/js');

const pluginSecurity = require('eslint-plugin-security');
const nodePlugin = require('eslint-plugin-n');

// const compat = new FlatCompat({
//   baseDirectory: __dirname,
//   recommendedConfig: js.configs.recommended,
// });

module.exports = tseslint.config(
  ...baseConfig,

  {
    ignores: ['!**/*', 'node_modules', 'dist'],
  },

  {
    languageOptions: {
      parserOptions: {
        project: ['tsconfig.*?.json'],
        tsconfigRootDir: __dirname,
      },
      globals: {
        ...globals.node,
        ...globals.es2021,
        ...globals.browser,
      },
    },
  },
  // {
  //   files: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.jsx'],
  //   rules: {},
  //   languageSettings: { parserOptions: { project: ['tsconfig.*?.json'] } },
  // },
  {
    files: ['**/*.ts', '**/*.tsx'],
    rules: {},
  },
  {
    files: ['**/*.js', '**/*.jsx'],
    rules: {},
  },

  nodePlugin.configs['flat/recommended'],

  pluginSecurity.configs.recommended,

  {
    rules: {
      'n/no-missing-import': 'off',
      'n/no-extraneous-import': 'off',
      'n/no-extraneous-require': 'off',
      'n/no-unpublished-require': 'off',
      'unicorn/prefer-module': 'off',
      'unicorn/prefer-top-level-await': 'off',
    },
  }

  // ...compat.config({ parser: 'jsonc-eslint-parser' }).map((config) => ({
  //   ...config,
  //   files: ['**/*.json'],
  //   rules: {
  //     '@nx/dependency-checks': [
  //       'error',
  //       {
  //         ignoredFiles: ['{projectRoot}/vite.config.{js,ts,mjs,mts}'],
  //       },
  //     ],
  //   },
  // }))
);
