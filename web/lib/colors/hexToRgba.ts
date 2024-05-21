import { hexStringToRgb } from './hexBlending'

export const hexToRgba = (hexString: string) => (alpha: number): string => {
    const rgbValues = hexStringToRgb(hexString)

    const rgbValuesWithAlpha = [...rgbValues, alpha]
    const rgbaString = `rgba(${rgbValuesWithAlpha.join(',')})`

    return rgbaString
}
