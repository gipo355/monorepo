/* eslint-disable no-console */
const { execSync } = require('child_process');

const shell = (cmd) => execSync(cmd, { encoding: 'utf8' });

export function isExecutableAvailable(name) {
  try {
    shell(`which ${name}`);
    return true;
  } catch {
    console.error(`Executable ${name} not found`);
    return false;
  }
}
