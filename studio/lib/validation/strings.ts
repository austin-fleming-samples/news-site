import type { Nullable } from "../typings"

export const endsWithSlash = (input: Nullable<string>) => input && input[input.length - 1] === '/'

export const stringLongerThan = (input: Nullable<string>, maxLength: number) => input && input.length > maxLength 