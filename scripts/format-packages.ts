/* eslint-disable no-magic-numbers */
import { execCommands } from './execCommands.js';

const args = process.argv.slice(2);

/**
 * map of arguments to commands
 */
const execsMappings = {
  '--mismatch': 'syncpack fix-mismatches',
  '--semver': 'syncpack set-semver-ranges',
  '--format': 'syncpack format',
  '--install': 'pnpm install',
};

execsMappings['--all'] = Object.values(execsMappings).join(' && ');

execCommands(execsMappings, args);
