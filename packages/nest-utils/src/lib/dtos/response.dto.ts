import type { HttpStatus } from '@nestjs/common';
import type { Static } from '@sinclair/typebox';

/**
 * IBaseResponse is a generic interface that defines the structure of the response object.
 * Provides a common structure for all responses.
 * Being an interface, it can be extended with another interface simply by shadowing it.
 */
export interface IBaseResponse<T> {
  /**
   * The data to be encapsulated in the response object.
   */
  data?: T;
  /**
   * The length of the data array.
   */
  length?: number;
  /**
   * Optional message to be sent in the response object.
   */
  message?: string;
  /**
   * Utility key to determine if the request was successful.
   */
  ok: boolean;
  /**
   * The status code of the response. Uses NestJS HttpStatus enum.
   */
  statusCode?: HttpStatus;
}
export type BaseResponseDto = Static<typeof BaseResponseDtoSchema>;

/**
 * WithRequired is a utility type that makes the specified keys required for a given type or interface.
 */
export type WithRequired<T, K extends keyof T> = Omit<T, K> &
  Required<Pick<T, K>>;

/**
 * TResponseDto is a generic type that defines the structure of the response object.
 * Allows to specify the type of the data and the required keys that the response object can have.
 * This way, it provides a common structure for all responses with the flexibility to add more keys or make them required to provide type safety for tests.
 * Being a type, it can be extended with an union type to add more required keys.
 * @param T - The type of the data to be encapsulated in the response object.
 * @param L - The union type of the required keys that the response object can have. Default is standard IBaseResponse<T>.
 *
 * @example
 * TResponseDto<{user: UserDto}, 'message'> - Response object with a message key.
 * Provides:
 * {
 *  ok: boolean,
 *  length?: number,
 *  message: string,
 *  data: {user: UserDto},
 * }
 */
export type TResponseDto<
  T,
  L extends keyof IBaseResponse<T> = never,
> = L extends never ? IBaseResponse<T> : WithRequired<IBaseResponse<T>, L>;
