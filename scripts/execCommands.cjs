/* eslint-disable no-console */
/* eslint-disable no-magic-numbers */
const { execSync } = require('child_process');
const { isExecutableAvailable } = require('./isExecAvailable.cjs');

const execCmd = (cmd) => {
  execSync(cmd, function (error, stdout, stderr) {
    if (error) {
      console.error(error);
      process.exit(1);
    }
    console.log(stdout);
    console.error(stderr);
  });
};

export function execCommands(
  /**
   * map of commands
   */
  executableRequired,
  /**
   * map of cli arguments to commands
   */
  execsMappings,
  /**
   * args passed
   */
  args
) {
  /**
   * guard clause to check if required executables are available
   */
  for (const exec of executableRequired) {
    isExecutableAvailable(exec);
  }

  /**
   * guard clause to check if arguments are provided
   */
  if (args.length === 0) {
    console.log(
      `No arguments provided. Please provide one of the following arguments: ${Object.keys(
        execsMappings
      ).join(', ')}`
    );
  }

  /**
   * execute the command
   */
  for (const arg of args) {
    if (!execsMappings[arg]) {
      console.error(`Invalid argument: ${arg}`);
      continue;
    }
    execCmd(execsMappings[arg]);
  }
}
