/* eslint-disable no-console */
/* eslint-disable no-magic-numbers */
import { spawn } from 'child_process';
import { isExecutableAvailable } from './is-exec-available';

const execCmd = (cmd: string) => {
  console.log('executing command:', cmd);

  // takes 'exec arg1 arg2'
  const [exec, ...args] = cmd.split(' ');

  const currentCmd = spawn(exec, args);

  currentCmd.stdout.on('data', (data) => {
    console.log(data.toString());
  });

  currentCmd.stderr.on('data', (data) => {
    console.error(data.toString());
  });

  currentCmd.on('error', (error) => {
    console.error(error.message);
  });

  currentCmd.on('close', (code) => {
    console.log(`child process exited with code ${code}`);
  });

  currentCmd.on('exit', (code) => {
    console.log(`child process exited with code ${code}`);
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
   * ignore args, run all execsMappings passed
   */
  ignoreArgs = false
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
  if (!ignoreArgs && args.length === 0) {
    console.log(
      `No arguments provided. Please provide one of the following arguments: ${Object.keys(
        execsMappings
      ).join(', ')}`
    );
    process.exit(1);
  }

  if (!ignoreArgs) {
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
    for (const cmd of Object.values(execsMappings)) {
      execCmd(cmd);
    }
  }
}
