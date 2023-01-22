declare const Brand: unique symbol;
declare const Unique: unique symbol;
declare class _Opaque<T, Name extends PropertyKey> {
  private declare [Unique]: Name;
  private declare [Brand]: T;
}

export interface Opaque<T, Name extends PropertyKey> extends _Opaque<T, Name> {}

export type Nominal<T, Name extends PropertyKey> = T & Opaque<T, Name>;
