export const isNull = (value: unknown) => value === null;

export const isUndefined = (value: unknown) => value === undefined;

export const isFalse = (value: unknown) => value === false;

export const isNullish = (value: unknown) => isNull(value) || isUndefined(value);

export const isStrictFalsy = (value: unknown) => isNullish(value) || isFalse(value);

export const isFalsy = (value: unknown) => !value;

export const isTrue = (value: unknown) => value === true;

/* eslint-disable-next-line @typescript-eslint/no-unnecessary-type-constraint */
export const isTruthy = (value: unknown) => !!value;
