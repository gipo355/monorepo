/* eslint-disable no-console */
/* eslint-disable no-magic-numbers */
import { execSync } from 'child_process';
import { isExecutableAvailable } from './isExecAvailable';

const execCmd = (cmd: string) => {
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
   * map of cli arguments to commands
   */
  execsMappings: Record<string, string>,
  /**
   * args passed
   */
  args: string[],
  /**
   *
   */
  allowEmpty = false
) {
  const executablesRequired = Object.entries(execsMappings).map(
    ([, exec]) => exec.split(' ')[0]
  );

  /**
   * guard clause to check if required executables are available
   */
  for (const exec of executablesRequired) {
    isExecutableAvailable(exec);
  }

  /**
   * guard clause to check if arguments are provided
   */
  if (!allowEmpty && args.length === 0) {
    console.log(
      `No arguments provided. Please provide one of the following arguments: ${Object.keys(
        execsMappings
      ).join(', ')}`
    );
    process.exit(1);
  }

  if (!allowEmpty) {
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
  } else {
    for (const exec of Object.values(execsMappings)) {
      execCmd(exec);
    }
  }
}
