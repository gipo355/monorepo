/* eslint-disable no-magic-numbers */
// .commitlintrc.js
const fs = require('node:fs');
const path = require('node:path');
const { execSync } = require('child_process');

// can propose scope for commit using folder names
const apps = fs.readdirSync(path.resolve(__dirname, 'apps'));
const libs = fs.readdirSync(path.resolve(__dirname, 'libs'));
const pkgs = fs.readdirSync(path.resolve(__dirname, 'packages'));

// can find issues from branch name if standardized
// @tip: git branch name = feature/33-issuename   =>    auto get defaultIssues = #33
// const issue = execSync("git rev-parse --abbrev-ref HEAD")
//   .toString()
//   .trim()
//   .split("-")[0];

// find the number in the string
const issue = execSync('git rev-parse --abbrev-ref HEAD')
  .toString()
  .trim()
  .match(/\d+/)?.[0];

// manually adding scopes examples
// ...["app", "gradle", "npm", "git-hooks"],
const definedScopes = [
  // used to denote global changes
  'global',
  // spread result of folder names found
  ...apps.map((app) => `app-${app}`),
  ...libs.map((lib) => `lib-${lib}`),
  ...pkgs.map((pkg) => `pkg-${pkg}`),
  // "app",
  'npm',
  'tools',
  'git-hooks',
  'actions',
  'github',
  'docs',
];

// .commitlintrc.js
/** @type {import('cz-git').UserConfig} */
module.exports = {
  rules: {
    // @see: https://commitlint.js.org/#/reference-rules
    'scope-enum': [2, 'always', [...definedScopes]],
  },
  prompt: {
    useEmoji: true,
    customIssuePrefixAlign: !issue ? 'top' : 'bottom',
    defaultIssues: !issue ? '' : `#${issue}`,
    issuePrefixes: [
      {
        name: 'Close issue',
        value: 'closes',
      },
      {
        name: 'Fix issue',
        value: 'fixes',
      },
      {
        name: 'Link issue',
        value: 'links',
      },
      {
        name: 'Reference issue',
        value: 'refs',
      },
    ],

    // allow defining multiple scopes with checklist
    enableMultipleScopes: true,
    scopeEnumSeparator: '/',
  },
};
