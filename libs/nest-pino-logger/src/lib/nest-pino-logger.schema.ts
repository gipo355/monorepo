import type { LoggerOptions } from 'pino';
import type pino from 'pino';
import type { Options } from 'pino-http';

/**
 * Pino logger options.
 */
export interface PinoOptions {
  additionalStreams?: pino.StreamEntry[];
  /**
   * Loki logging options.
   *
   * @default false
   * Refer to pino-loki documentation for more information.
   */
  loki?:
    | {
        basicAuth: {
          password: string;
          username: string;
        };
        batching?: boolean;
        host: string;
        labels: {
          [key: string]: string;
          application: string;
        };
      }
    | false;
  /**
   * Override pino options directly
   *
   * *Implementation:*
   * ```ts
   * const pinoPre = pino({ level: isProd ? 'warn' : 'info' });
   * const pinoOpts = {
   * ...pinoPre,
   * ...this.opts.pino?.overrideOpts,
   * };
   * this.logger = pino(pinoOpts, pino.multistream(streams));
   * ```
   */
  overrideOpts?: LoggerOptions;
  /**
   * Pretty print logs with pino-pretty
   */
  pretty?: boolean;
}

/**
 * PinoHttp logger options.
 *
 * creates middleware to log incoming HTTP requests with pino
 */
export interface PinoHttpOptions {
  enabled?: boolean;
  overrideOpts?: Options;
}

export interface PinoLoggerModuleOptions {
  pino?: PinoOptions;
  pinoHttp?: PinoHttpOptions;
}
