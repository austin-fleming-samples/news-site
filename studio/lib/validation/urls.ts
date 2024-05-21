import type { Nullable } from "../typings"

const urlRegex = new RegExp(/((([A-Za-z]{3,9}:(?:\/\/)?)(?:[\-;:&=\+\$,\w]+@)?[A-Za-z0-9\.\-]+|(?:www\.|[\-;:&=\+\$,\w]+@)[A-Za-z0-9\.\-]+)((?:\/[\+~%\/\.\w\-_]*)?\??(?:[\-\+=&;%@\.\w_]*)#?(?:[\.\!\/\\\w]*))?)/)

const testRegex = (expression: RegExp) => (value: string): boolean => expression.test(value)

export const isUrl = (value: string): boolean => testRegex(urlRegex)(value)

export const isHttps = (url: Nullable<string>) => !!(url && url.startsWith(('https://')) )