const removeAllFromString = (charToRemove: string) => (str: string): string =>
    str.split(charToRemove).join('')

const removeAllForwardSlashes = (str: string): string =>
    removeAllFromString('/')(str)

const joinIntoSlug = (firstString: string, secondString: string): string =>
    `/${firstString}/${secondString}`

export const buildSlug = (first: string, second: string): string => {
    const firstSlug = removeAllForwardSlashes(first)
    const secondSlug = removeAllForwardSlashes(second)
    return joinIntoSlug(firstSlug, secondSlug)
}
