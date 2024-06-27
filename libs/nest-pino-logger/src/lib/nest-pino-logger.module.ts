import type { MiddlewareConsumer, NestModule } from '@nestjs/common';
import { Inject, Module } from '@nestjs/common';

import { LoggerConfigurableModuleClass } from './nest-pino-logger.module-definition';
import { LOGGER_MODULE_OPTIONS_TOKEN } from './nest-pino-logger.module-definition';
import type { PinoLoggerModuleOptions } from './nest-pino-logger.schema';
import { PinoLoggerService } from './nest-pino-logger.service';

/**
 * Pino logger module.
 */
@Module({
  providers: [PinoLoggerService],
  exports: [PinoLoggerService],
})
export class PinoLoggerModule
  extends LoggerConfigurableModuleClass
  implements NestModule
{
  constructor(
    @Inject(LOGGER_MODULE_OPTIONS_TOKEN)
    private readonly opts: PinoLoggerModuleOptions,
    private readonly pinoLoggerService: PinoLoggerService
  ) {
    super();
    this.pinoLoggerService.logger.info('PinoLoggerModule enabled');
  }

  configure(consumer: MiddlewareConsumer): void {
    if (this.opts.pinoHttp?.enabled !== false) {
      consumer
        .apply(this.pinoLoggerService.httpLoggerMiddleware)
        .forRoutes('*');
      this.pinoLoggerService.logger.info('PinoHttpLogger enabled');
    }
  }
}
