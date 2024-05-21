/* import { css } from 'styled-components'; */
import { objectMap } from '@lib/objects';

const toRem = (input: number): string => `${input}rem`;
const objToRems = objectMap(toRem);

const ratios = Object.freeze({
  majorSecond: 1.125,
  majorThird: 1.25,
  minorSecond: 1.067,
  minorThird: 1.2,
  perfectFourth: 1.333,
});

const fontSizeCalculator = (ratio: number, base: number) => {
  const sm = base / ratio;
  const lg = base * ratio;
  const xl = lg * ratio;
  const xxl = xl * ratio;
  const xxxl = xxl * ratio;
  const jumbo = xxxl * ratio;

  return Object.freeze({
    base,
    jumbo,
    lg,
    sm,
    xl,
    xxl,
    xxxl,
  });
};

const mobileFontSizes = objToRems(fontSizeCalculator(ratios.majorSecond, 1));
const desktopFontSizes = objToRems(fontSizeCalculator(ratios.majorThird, 1));

export const fontSizes = Object.freeze({
  desktop: desktopFontSizes,
  mobile: mobileFontSizes,
});

export type FontSizes = typeof fontSizes;
