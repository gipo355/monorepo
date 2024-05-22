/* eslint-disable no-magic-numbers */
import { execCommands } from './execCommands.js';

const args = process.argv.slice(2);

/**
 * map of arguments to commands
 */
const execsMappings = {
  '--fix': 'syncpack fix-mismatches',
  '--semver': 'syncpack set-semver-ranges',
  '--format': 'syncpack format',
};

execCommands(execsMappings, args, true);
