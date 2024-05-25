/**
 * @description
 * This is a cross platform function that returns a string equals to the input
 */
interface ISayHelloCrossOptions {
  /**
   * @description output string which will be returned
   */
  output: string;
}

/**
 * Say hello cross
 * @description it returns a string equals to the input
 * @param {ISayHelloCrossOptions} opts
 * @returns string
 * @example
 * ```ts
 * const result = sayHelloCross();
 * ```
 */
export function sayHelloCross(opts: ISayHelloCrossOptions): string {
  return opts.output;
}
