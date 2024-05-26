import { redisSessionPayloadSchema } from '@gipo355/shared-types';

import { ajvInstance } from '../utils';

export const validateRedisSessionPayload = ajvInstance.compile(
  redisSessionPayloadSchema
);
