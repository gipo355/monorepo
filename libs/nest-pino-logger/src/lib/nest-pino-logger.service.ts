import { Inject, Injectable, LoggerService } from '@nestjs/common';
import type { Logger } from 'pino';
import pino from 'pino';
import type { HttpLogger } from 'pino-http';
import pinoHttp from 'pino-http';

import { LOGGER_MODULE_OPTIONS_TOKEN } from './nest-pino-logger.module-definition';
import { PinoLoggerModuleOptions } from './nest-pino-logger.schema';

/**
 * A service that provides logging capabilities using Pino.
 * Implements the LoggerService interface to be compatible with NestJS.
 */
@Injectable()
export class PinoLoggerService implements LoggerService {
  constructor(
    @Inject(LOGGER_MODULE_OPTIONS_TOKEN)
    private readonly opts: PinoLoggerModuleOptions
  ) {
    const isProd = process.env['NODE_ENV'] === 'development' ? false : true;

    // TODO: add pino-pretty and pino-loki to deps
    const streams: pino.StreamEntry[] = [];

    // by default, log to stdout with pretty in dev only unless explicitly disabled
    if (opts.pino?.pretty !== false && !isProd) {
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

    // must be explicitly enabled
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

    if (opts.pino?.additionalStreams) {
      streams.push(...opts.pino.additionalStreams);
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
