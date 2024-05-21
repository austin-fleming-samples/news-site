type MaybeNumber = false | number
type MaybeString = false | string
type MaybeDate = Date | string

const isNumber = (value: any): boolean => !isNaN(value)

const coarceToNumber = (value: any): number => parseInt(value)

const coarceToNumberWithCheck = (value: any): MaybeNumber => isNumber(value) && coarceToNumber(value)

const getFirstNChars = (str: string, numChars: number): string => str.slice(0, numChars)

const getMaybeDatePrefix = (slug: string): MaybeString => getFirstNChars(slug, 8)

const isDate = (maybeDate: any): boolean => Object.prototype.toString.call(maybeDate) === '[object Date]'

const canParseYYYYMMDD = (str: MaybeString): boolean => {
    try {
        if (!str) return false

        const isCorrectLength = str.length === 8
        if (!isCorrectLength) return false

        const year = coarceToNumberWithCheck(str.slice(0, 4))
        const month = coarceToNumberWithCheck(str.slice(4, 6))
        const day = coarceToNumberWithCheck(str.slice(6, 8))
        if (!year || !month || !day) return false

        const isValidYear: boolean = year >= 2000
        const isValidMonth: boolean = month > 0 && month <= 12
        const isValidDay: boolean = day > 0 && day <= 31
        if (!(isValidYear && isValidMonth && isValidDay)) return false

        const date = new Date(year, month - 1, day)
        if (!isDate(date)) return false

    } catch (err) {
        console.error(`Date check failed at canConvertToDate in slugHasDatePrefix.\nError: ${err.message}`)
        return false
    }
    return true
}

const hasDatePrefix = (input: string): true | string =>
    canParseYYYYMMDD(getMaybeDatePrefix(input))
        ? true
        : '"Slug" must start with the date in YYYYMMDD format. ex. 20210512-post-name'

type MaybeSlugProps = { current: undefined | string }
export const slugHasDatePrefix = (slug: MaybeSlugProps): true | string =>
    slug?.current
        ? hasDatePrefix(slug.current)
        : '"Slug" must start with the date in YYYYMMDD format. ex. 20210512-post-name'