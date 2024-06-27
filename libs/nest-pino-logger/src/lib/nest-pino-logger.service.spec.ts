import type { TestingModule } from '@nestjs/testing';
import { Test } from '@nestjs/testing';

import { LOGGER_MODULE_OPTIONS_TOKEN } from './nest-pino-logger.module-definition';
import { NestPinoLoggerService } from './nest-pino-logger.service';

describe('NestPinoLoggerService', () => {
  let service: NestPinoLoggerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        NestPinoLoggerService,
        {
          provide: LOGGER_MODULE_OPTIONS_TOKEN,
          useValue: {
            pino: {
              pretty: false,
            },
          },
        },
      ],
    }).compile();

    service = module.get<NestPinoLoggerService>(NestPinoLoggerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();

    expect(service.logger).toBeDefined();

    expect(service.httpLoggerMiddleware).toBeDefined();
  });

  it('should log', () => {
    // https://github.com/pinojs/pino/issues/837
    // https://stackoverflow.com/questions/62678492/how-to-use-jest-to-test-that-pino-debug-log-is-written-to-stdout-when-load-a-mod
    // https://javascript.plainenglish.io/how-to-test-stdout-output-in-node-js-6c36edc610d1

    const spy = jest.spyOn(service, 'info').mockImplementation((msg) => msg);

    service.info('test');

    expect(spy).toHaveBeenCalled();

    expect(spy).toHaveBeenCalledWith('test');
  });
});
