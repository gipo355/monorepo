/* eslint-disable no-magic-numbers */
import { execCommands } from './execCommands.js';

const args = process.argv.slice(2);

import { cpus } from 'node:os';

const allowedArgs = ['--lint', '--test', '--build'];

const targets: string[] = [];

allowedArgs.forEach((arg) => {
  if (args.includes(arg)) {
    targets.push(arg.replace('--', ''));
  }
});

const cmd = `nx run-many --maxParallel ${cpus().length - 1} -t ${targets.join(' ')}`;

/**
 * map of arguments to commands
 */
const execsMappings = {
  base: cmd,
};

execCommands(execsMappings, args);
