/* eslint-disable unicorn/no-array-reduce */

/* 
type AnyFunction = (x: unknown) => unknown;

export const pipe =
  (...fns: AnyFunction[]) =>
  (x) =>
    fns.reduce((v, f) => f(v), x); 
    */

export const pipe =
  <T>(...fns: Array<(arg: T) => T>) =>
  (value: T) =>
    fns.reduce((acc, fn) => fn(acc), value);
