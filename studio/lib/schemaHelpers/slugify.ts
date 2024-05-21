// import vendorSlugify from '@sindresorhus/slugify'
import { thenify } from '../helpers/fp'

type CharacterTableProps = {
    illegalChars: string,
    replaceChars: string
}
const characterTable: CharacterTableProps = Object.freeze({
    illegalChars: 'àáâäæãåāăąçćčđďèéêëēėęěğǵḧîïíīįìłḿñńǹňôöòóœøōõőṕŕřßśšşșťțûüùúūǘůűųẃẍÿýžźż·/_,:;@#?',
    replaceChars: 'aaaaaaaaaacccddeeeeeeeegghiiiiiilmnnnnoooooooooprrsssssttuuuuuuuuuwxyyzzz---------'
})

const getLastChar = (str: string): string => str[str.length - 1]

const removeLastChar = (str: string): string => str.slice(0, -1)

const removeAll = (
    str: string,
    char: string
): string =>
    str.split(char).join('')

const replaceAllWith = (
    str: string,
    charToRemove: string,
    delimeter: string
): string =>
    str.split(charToRemove).join(delimeter)

const getNFirstChars = (
    str: string,
    n: number
): string =>
    str.slice(0, n)

const replaceIllegalChar = (
    str: string,
    characterTable: CharacterTableProps,
    index: number
): string =>
    replaceAllWith(str, characterTable.illegalChars[index], characterTable.replaceChars[index])

const replaceIllegalChars = (
    str: string,
    characterTable: CharacterTableProps,
    startIndex = 0
): string =>
    startIndex === characterTable.illegalChars.length
        ? str
        : replaceIllegalChars(str, characterTable, startIndex + 1)

const replaceAllSpaces = (str: string): string => replaceAllWith(str, ' ', '-')

const trimTrailingSpaces = (str: string): string =>
    getLastChar(str) === ' '
        ? trimTrailingSpaces(removeLastChar(str))
        : str

const normalizeCharacters = (str: string): string => replaceIllegalChars(str, characterTable)

const getYearMonthDay = (dateStamp: string): string => {
    const trimmedDate = removeAll(dateStamp, '-')
    const yearMonthDay = getNFirstChars(trimmedDate, 8)

    return yearMonthDay
}

const makeLowerCase = (str: string): string => str.toLowerCase()

const validateTitle = (title: string): string => {
    if (!title) {
        throw new Error('No title provided.')
    }

    return title
}

const handleSlugifyError = (err: Error) => { throw new Error(`Failed to create slug. Error: ${err.message}`) }

/// ///////////////////////////

export const getSlugSource = (
    doc: {
        title: string
    }
): string =>
    doc.title

export const getSlugSourceWithDate = ({
    title,
    datePublished
}: {
    datePublished: string,
    title: string
}): {
    date: string,
    title: string
} =>
    Object.freeze({ title, date: datePublished })

/// ///////////////////////////
const slugify = (str: string) => str.toString().toLowerCase()
.replace(/\s+/g, '-')           // Replace spaces with -
.replace(/[^\w\-]+/g, '')       // Remove all non-word chars
.replace(/\-\-+/g, '-')         // Replace multiple - with single -
.replace(/^-+/, '')             // Trim - from start of text
.replace(/-+$/, '');

export const customSlugify = async (title: string): Promise<string> =>
    await thenify(title)
        .then(validateTitle)
        .then(makeLowerCase)
        .then(trimTrailingSpaces)
        .then(replaceAllSpaces)
        .then(normalizeCharacters)
        .then(slugify)
        .catch(handleSlugifyError)

export const slugifyWithDate = async ({
    title, date
}: {
    date: string, title: string
}): Promise<string> => {

    if (!date) {
        throw new Error('"Publish Date" must be set to generate slug')
    }

    // const slug = await customSlugify(title)
    const slug = await customSlugify(title)
    const slugDate = getYearMonthDay(date)

    const combinedSlug = `${slugDate}-${slug}`

    return combinedSlug
}
