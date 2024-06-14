import type { HttpStatus } from '@nestjs/common';

/**
 * @description
 * IBaseResponse is the base interface that defines the structure of a response object.
 */
export interface IBaseResponse<T = never> {
  // data?: T;
  // data?: T extends never ? T : Record<string, T>;
  /**
   * If T is never, data is undefined.
   * The data to be encapsulated in the response object.
   */
  data?: T extends never ? undefined : T;
  /**
   * Optional length of the data field.
   */
  length?: number;
  /**
   * Optional message field.
   */
  message?: string;
  /**
   * Required ok field.
   */
  ok: boolean;
  /**
   * Optional status code field. Based on the HttpStatus enum from NestJs.
   */
  statusCode?: HttpStatus;
}

/**
 * @description
 * Utility type that makes the provided keys required in the object.
 */
export type WithRequired<T, K extends keyof T> = Omit<T, K> &
  Required<Pick<T, K>>;

/**
 * @description
 * TResponseDto is a generic type that takes two optional parameters, T and L.
 * It returns a response object based on the provided parameters.
 * It's useful for creating standardized response objects with type safety for tests and consistency.
 *
 * ## T:
 * - If T is not provided and L is not provided, it defaults to undefined and data field is not required.
 * e.g. `TResponseDto -> { ok: boolean; }`
 *
 * - If T is provided and L is not provided, data field is required.
 * e.g. `TResponseDto<User> -> { ok: boolean; data: User; }`

 * ## L, default 'ok':
 * - If T is provided, L is provided and is a key of IBaseResponse, data field is required and L is required.
 * e.g. `TResponseDto<User, 'message'> -> { ok: boolean; data: User; message: string; }`
 *
 * - If T is not provided, L is provided and is a key of IBaseResponse, data field is not required and L is required.
 * e.g. `TResponseDto<undefined, 'message'> -> { ok: boolean; message: string; }`
 *
 * - L can be an union of keys of IBaseResponse.
 * e.g. `TResponseDto<User, 'message' | 'length'> -> { ok: boolean; data: User; message: string; length: number; }`
 *
 * @param T - The type of the data field in the response object. If provided makes the data field required.
 * @param L - The key of the response object that should be required. Can be an union. If provided makes the keys required.
 */
export type TResponseDto<
  /**
   * The type of the data field in the response object. If provided makes the data field required.
   */
  T = undefined,
  /**
   * The key of the response object that should be required. Can be an union. If provided makes the keys required.
   */
  L extends keyof IBaseResponse<T> = 'ok',
> = T extends undefined
  ? WithRequired<IBaseResponse, L>
  : WithRequired<IBaseResponse<T>, L | 'data'>;
