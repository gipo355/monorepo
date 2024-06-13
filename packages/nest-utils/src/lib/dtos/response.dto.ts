export interface IBaseResponse<T> {
  data?: T;
  length?: number;
  message?: string;
  ok: boolean;
}
export type WithRequired<T, K extends keyof T> = Omit<T, K> &
  Required<Pick<T, K>>;

export type TResponseDto<
  T,
  L extends keyof IBaseResponse<T> = never,
> = L extends never ? IBaseResponse<T> : WithRequired<IBaseResponse<T>, L>;
