import { ConfigurableModuleBuilder } from '@nestjs/common';
import type { LoggerOptions } from 'pino';
import type { Options } from 'pino-http';

/**
 * Pino logger options.
 */
export interface PinoOptions {
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

export const {
  ConfigurableModuleClass: LoggerConfigurableModuleClass,

  MODULE_OPTIONS_TOKEN: LOGGER_MODULE_OPTIONS_TOKEN,

  // OPTIONS_TYPE: LOGGER_MODULE_OPTIONS_TYPE,

  // ASYNC_OPTIONS_TYPE: LOGGER_MODULE_ASYNC_OPTIONS_TYPE,
} = new ConfigurableModuleBuilder<PinoLoggerModuleOptions>()
  .setClassMethodName('forRoot')
  .build();
