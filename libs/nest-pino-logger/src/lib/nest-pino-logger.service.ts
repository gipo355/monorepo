import { Inject, Injectable, LoggerService } from '@nestjs/common';
import type { Logger } from 'pino';
import pino from 'pino';
import type { HttpLogger } from 'pino-http';
import pinoHttp from 'pino-http';

import {
  LOGGER_MODULE_OPTIONS_TOKEN,
  PinoLoggerModuleOptions,
} from './nest-pino-logger.module-definition';

@Injectable()
export class NestPinoLoggerService implements LoggerService {
  constructor(
    @Inject(LOGGER_MODULE_OPTIONS_TOKEN)
    private readonly opts: PinoLoggerModuleOptions
  ) {
    const isProd = process.env['NODE_ENV'] === 'development' ? false : true;

    // TODO: add pino-pretty and pino-loki to deps
    const streams: pino.StreamEntry[] = [];

    if (!opts.pino?.pretty) {
      streams.push({
        level: 'info',
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        stream: pino.transport({
          target: 'pino-pretty',
          options: {
            colorize: true,
          },
        }),
      });
    }

    if (opts.pino?.loki) {
      streams.push({
        level: 'info',
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        stream: pino.transport({
          target: 'pino-loki',
          options: {
            batching: opts.pino.loki.batching ?? false,
            host: opts.pino.loki.host,
            labels: opts.pino.loki.labels,
            basicAuth: {
              username: opts.pino.loki.basicAuth.username,
              password: opts.pino.loki.basicAuth.password,
            },
          },
        }),
      });
    }

    const pinoPre = pino({ level: isProd ? 'warn' : 'info' });

    const pinoOpts = {
      ...pinoPre,
      ...this.opts.pino?.overrideOpts,
    };

    this.logger = pino(pinoOpts, pino.multistream(streams));

    const pinoHttpPre = {
      logger: this.logger,
    };

    const pinoHttpOpts = {
      ...pinoHttpPre,
      ...this.opts.pinoHttp?.overrideOpts,
    };

    this.httpLoggerMiddleware = pinoHttp(pinoHttpOpts);

    this.log = this.logger.info.bind(this.logger);

    this.info = this.logger.info.bind(this.logger);

    this.fatal = this.logger.fatal.bind(this.logger);

    this.error = this.logger.error.bind(this.logger);

    this.warn = this.logger.warn.bind(this.logger);

    this.debug = this.logger.debug.bind(this.logger);

    this.verbose = this.logger.trace.bind(this.logger);

    this.flush = this.logger.flush.bind(this.logger);
  }

  /**
   * The logger instance.
   */
  logger: Logger;

  /**
   * The HTTP logger middleware.
   */
  httpLoggerMiddleware: HttpLogger;

  /**
   * Write a 'log' level log.
   */
  log: pino.LogFn;

  /**
   * Write a 'log' level log.
   */
  info: pino.LogFn;
  /**
   * Write a 'fatal' level log.
   */
  fatal: pino.LogFn;
  /**
   * Write an 'error' level log.
   */
  error: pino.LogFn;
  /**
   * Write a 'warn' level log.
   */
  warn: pino.LogFn;
  /**
   * Write a 'debug' level log.
   */
  debug: pino.LogFn;
  /**
   * Write a 'verbose' level log.
   */
  verbose: pino.LogFn;

  /**
   * Flushes the logger buffer.
   */
  flush: () => void;
}
