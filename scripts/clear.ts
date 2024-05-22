/* eslint-disable no-magic-numbers */
import { execCommands } from './execCommands.js';

const args = process.argv.slice(2);

/**
 * map to commands
 */
const cmds = {
  folders:
    'find . -type d \\( -name node_modules -o -name tsconfig.tsbuildinfo -o -name dist -o -name coverage -o -name .eslintcache -o -name .cache -o -name .stylelintcache -o -name test-dist \\) -exec rm -rf {} +',
  cache:
    'find . -type d \\( -name .eslintcache -o -name .cache -o -name .stylelintcache \\) -exec rm -rf {} +',
};

/**
 * map of arguments to commands
 */
const execsMappings = {
  '--cache': cmds.cache,
  '--folders': cmds.folders,
};

execCommands(execsMappings, args);
