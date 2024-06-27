import { ConfigurableModuleBuilder } from '@nestjs/common';

import type { PinoLoggerModuleOptions } from './nest-pino-logger.schema';

export const {
  ConfigurableModuleClass: LoggerConfigurableModuleClass,

  MODULE_OPTIONS_TOKEN: LOGGER_MODULE_OPTIONS_TOKEN,

  // OPTIONS_TYPE: LOGGER_MODULE_OPTIONS_TYPE,

  // ASYNC_OPTIONS_TYPE: LOGGER_MODULE_ASYNC_OPTIONS_TYPE,
} = new ConfigurableModuleBuilder<PinoLoggerModuleOptions>()
  .setClassMethodName('forRoot')
  .build();
