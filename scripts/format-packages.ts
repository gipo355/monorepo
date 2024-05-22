/* eslint-disable no-magic-numbers */
import { execCommands } from './execCommands.js';

const args = process.argv.slice(2);

/**
 * map to commands
 */
const cmds = {
  clear:
    'syncpack set-semver-ranges && syncpack fix-mismatches && syncpack format',
};

/**
 * map of arguments to commands
 */
const execsMappings = {
  '--clear': cmds.clear,
};

execCommands(execsMappings, args, true);
