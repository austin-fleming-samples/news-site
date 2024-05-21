export type Nullable<T> = T | null | undefined;

// NOTE: intentionally omits empty strings and 0
export type StrictFalsy<T> = T | null | undefined | false;
