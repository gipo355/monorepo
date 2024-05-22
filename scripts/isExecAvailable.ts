/* eslint-disable no-console */
import { execSync } from 'child_process';

const shell = (cmd: string) => execSync(cmd, { encoding: 'utf8' });

export function isExecutableAvailable(name: string) {
  try {
    shell(`which ${name}`);
    return true;
  } catch {
    console.error(`Executable ${name} not found`);
    return false;
  }
}
