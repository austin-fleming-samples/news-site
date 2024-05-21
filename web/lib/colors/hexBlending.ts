import { pipe } from '@lib/fp'

const hexToInt = (hexValue: string): number => parseInt(hexValue, 16)

const intToHex = (intValue: number): string => intValue.toString(16)

const delta = (upper: number) => (lower: number): number => upper - lower

const quotient = (dividend: number) => (divisor: number): number => dividend / divisor

const product = (multiplicand: number) => (multiplier: number): number => multiplicand * multiplier

const normalizeRgbChannel = (channel: number): number => channel / 255

const normalizeRgbValue = (rgbValue: number[]): number[] => rgbValue.map(normalizeRgbChannel)

const unNormalizeRgbChannel = (normalizedChannel: number): number => normalizedChannel * 255

const roundRgbChannel = (channel: number): number => Math.floor(channel)

const unNormalizeRgbValue = (rgbValue: number[]): number[] => rgbValue.map(unNormalizeRgbChannel).map(roundRgbChannel)

const removeOctothorpPrefix = (stringValue: string): string =>
    stringValue[0] === '#'
        ? stringValue.slice(1) : stringValue

const splitHexStringIntoPairs = (stringValue: string): string[] =>
    [
        stringValue.slice(0, 2),
        stringValue.slice(2, 4),
        stringValue.slice(4, 6)
    ]

export const hexStringToRgb = (hexString: string): number[] =>
    splitHexStringIntoPairs(removeOctothorpPrefix(hexString)).map(hexToInt)

const joinStringArray = (stringArray: string[]): string => stringArray.join('')

const padTwo = (stringValue: string): string => stringValue.length < 2 ? `0${stringValue}` : stringValue

const rgbValuesToHexValues = (rgbValues: number[]): string[] => rgbValues.map(intToHex).map(padTwo)

const prependOctothorp = (stringValue: string): string => `#${stringValue}`

const normalizedRgbValuesToHexString = (rgbValues: number[]): string =>
    pipe(
        unNormalizeRgbValue,
        rgbValuesToHexValues,
        joinStringArray,
        prependOctothorp
    )(rgbValues)

const applyAlphaToChannel = (alpha: number) => (channel: number): number => alpha * channel

const blendNormalizedRgbChannels = (backgroundChannel: number) => (foregroundChannel: number) => (foregroundAlpha: number): number => {
    const visibleForeground = applyAlphaToChannel(foregroundAlpha)(foregroundChannel)

    const visibleBackground = (1 - foregroundAlpha) * backgroundChannel

    const blendedChannel = visibleForeground + visibleBackground

    return blendedChannel
}

const blendNormalizedRgbValues = (backgroundRgb: number[]) => (foregroundRgb: number[]) => (foregroundAlpha: number): number[] =>
    foregroundRgb.map((currentChannel, index) =>
        blendNormalizedRgbChannels(backgroundRgb[index])(currentChannel)(foregroundAlpha)
    )

const hexStringToNormalizedRgb = (hexString: string): number[] => pipe(hexStringToRgb, normalizeRgbValue)(hexString)

const invertPercentage = (percentage: number): number => Math.abs(percentage - 1)

// converts scale of 0-100 to 1-0
const ratioPercentageToAlpha = (ratioPercentage: number): number => invertPercentage(ratioPercentage / 100)

// hexstring: #FFFFFF tint: 0.5
const blendHexColors = (backgroundHexString: string) => (foregroundHexString: string) => (ratioPercentage: number): string => {
    if (ratioPercentage > 100 || ratioPercentage < 0) {
        throw new Error(`Failed to blend hex colors. Ratio must be between 0 and 1. You specified a ratio of ${ratioPercentage}`);
    }

    const foregroundAlpha = ratioPercentageToAlpha(ratioPercentage)

    const foregroundNormalizedRgb = hexStringToNormalizedRgb(foregroundHexString)
    const backgroundNormalizedRgb = hexStringToNormalizedRgb(backgroundHexString)

    const blendedRgbValue = blendNormalizedRgbValues(backgroundNormalizedRgb)(foregroundNormalizedRgb)(foregroundAlpha)
    const blendedHexValue = normalizedRgbValuesToHexString(blendedRgbValue)

    return blendedHexValue
}

export const tintHexColor = (hexColor: string) => (tintPercentage: number): string => blendHexColors("#FFFFFF")(hexColor)(tintPercentage)

export const shadeHexColor = (hexColor: string) => (shadePercentage: number): string => blendHexColors("#000000")(hexColor)(shadePercentage)

// allows setting up custom color blending; ratio 1 is all background. ratio 0 is all foreground
export const hueHexColor = (backgroundHexColor: string) => (foregroundHexColor: string) => (ratioPercentage: number): string => blendHexColors(backgroundHexColor)(foregroundHexColor)(ratioPercentage)
