import { accountSchema } from '@gipo355/shared-types';
import fastJsonStringify from 'fast-json-stringify';

import { ajvInstance } from '../utils/ajv';

/**
 * Validation and serialization functions for the schemas provided
 */

export const stringifyAccount = fastJsonStringify(accountSchema);

export const validateAccount = ajvInstance.compile(accountSchema);
