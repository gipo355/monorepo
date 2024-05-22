const BREAKING_KEYWORDS = ['BREAKING CHANGE', 'BREAKING CHANGES', 'BREAKING'];
module.exports = {
  // choose the branch to release from
  // Default: ['+([0-9])?(.{+([0-9]),x}).x', 'master', 'main', 'next', 'next-major', {name: 'beta', prerelease: true}, {name: 'alpha', prerelease: true}]
  tagFormat: '${version}',
  branches: [
    'main',
    // "dev",
    // "next",
    // "nightly",
    // "stable",
    // "beta",
    // "alpha",
    '+([0-9])?(.{+([0-9]),x}).x', // e.g., 1.x, 1.2.x, 1.2.3.x

    // those branches should publish releases with tag v0.1.1-dev.1
    {
      // preparing for the next major release
      name: 'next',
      prerelease: true,
    },
    {
      // development branch
      name: 'dev',
      prerelease: true,
    },
    {
      // pre-release branch
      name: 'alpha',
      prerelease: true,
    },
    {
      // pre-release branch
      name: 'beta',
      prerelease: true,
    },
  ],

  // ## Plugins
  // by default it uses default plugins
  // if you specify the field in this config file, it gets overridden
  // Default: ['@semantic-release/commit-analyzer', '@semantic-release/release-notes-generator', '@semantic-release/npm', '@semantic-release/github']
  plugins: [
    // commit analyzer, to determine the type of release
    [
      '@semantic-release/commit-analyzer',
      {
        preset: 'angular',
        parserOpts: {
          noteKeywords: BREAKING_KEYWORDS,
        },
      },
    ],
    // release notes generator, which will generate the release notes
    // based on the commits since the last release
    [
      '@semantic-release/release-notes-generator',
      {
        preset: 'angular',
        parserOpts: {
          noteKeywords: BREAKING_KEYWORDS,
        },
      },
    ],
    // exec plugin, to run the publish script and custom commands
    // [
    //   "@semantic-release/exec",
    //   {
    //     verifyConditionsCmd: "./verify.sh",
    //     // verifyReleaseCmd:
    //     //   'mvn versions:set -DnewVersion="${nextRelease.version}" && echo "NEXT_VERSION=${nextRelease.version}" >> build.env',
    //     publishCmd:
    //       "./publish.sh ${nextRelease.version} ${branch.name} ${commits.length} ${Date.now()}",
    //   },
    // ],
    // github plugin, to create a release on github
    // and add assets to the release
    [
      '@semantic-release/github',
      // {
      //   assets: [
      //     {
      //       path: "dist/asset.min.css",
      //       label: "CSS distribution",
      //     },
      //     {
      //       path: "dist/asset.min.js",
      //       label: "JS distribution",
      //     },
      //   ],
      // },
    ],

    // we don't want to update the package.json
    // [
    //   "@semantic-release/npm",
    //   {
    //     npmPublish: false,
    //   },
    // ],

    // WARNING: semantic-release discourages commits during a release
    // to prevend headaches of conflicts and other issues

    // produce a changelog
    // [
    //   "@semantic-release/changelog",
    //   {
    //     changelogFile: "docs/CHANGELOG.md",
    //   },
    // ],
    // // commit the changes to the repository
    // // possible changelog added, package.json version bump, build.gradle version bump
    // [
    //   "@semantic-release/git",
    //   {
    //     assets: ["CHANGELOG.md", "package.json", "build.gradle"],
    //   },
    // ],
  ],
};
