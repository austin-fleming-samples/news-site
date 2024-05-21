
const removeFirstChar = (str: string): string => str.slice(1)
const removeLastChar = (str: string): string => str.slice(0, -1)

const isForwardSlash = (str: string): boolean => str === '/'

const removeFirstSlash = (str: string): string =>
    isForwardSlash(str[0])
        ? removeFirstChar(str)
        : str

const removeLastSlash = (str: string): string =>
    isForwardSlash(str[str.length - 1])
        ? removeLastChar(str)
        : str

const joinWithSlash = (...args: any[]): string => args.join('/')

export const buildUrl = (baseUrl: string) => (slug: string): string => {
    const trimmedUrl = removeLastSlash(baseUrl)
    const trimmedSlug = removeFirstSlash(slug)

    return joinWithSlash(trimmedUrl, trimmedSlug)
}