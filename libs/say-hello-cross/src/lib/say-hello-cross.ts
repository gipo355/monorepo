/**
 * This is a cross platform function that returns a string equals to the input
 */
export interface ISayHelloCrossOptions {
  /**
   * output string which will be returned
   */
  output: string;
}

/**
 * Say hello cross returns a string
 */
export function sayHelloCross(opts: ISayHelloCrossOptions): string {
  return opts.output;
}
