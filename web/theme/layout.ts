export const unitToPixels = (unit: any): string => `${unit}px`;

const BASE_TEXT_PIXELS = 16;
const baseTextCalculator = (scalar: number): string => unitToPixels(scalar * BASE_TEXT_PIXELS);

const SPACING_PIXELS = BASE_TEXT_PIXELS / 2;
const spacingCalculator = (scalar: number): string => unitToPixels(scalar * SPACING_PIXELS);

// NOTE: currently the same as 1rem.
export const SITE_GUTTER_PIXELS = BASE_TEXT_PIXELS;
const siteGutterCalculator = (scalar: number): string => unitToPixels(scalar * SITE_GUTTER_PIXELS);

export const CARD_WIDTH_PIXELS = 400;
const cardWidthCalculator = (scalar: number): string => unitToPixels(scalar * CARD_WIDTH_PIXELS);

export const CARD_PADDING_PIXELS = 16;
const cardPaddingCalculator = (scalar: number): string =>
  unitToPixels(scalar * CARD_PADDING_PIXELS);

const NAV_HEIGHT_PIXELS = BASE_TEXT_PIXELS * 4;
const navHeightCalculator = (scalar: number): string => unitToPixels(scalar * NAV_HEIGHT_PIXELS);

const SECTION_GUTTER = BASE_TEXT_PIXELS * 4;
const sectionSpacingCalculator = (scalar: number): string => unitToPixels(scalar * SECTION_GUTTER);

export const layout = Object.freeze({
  baseText: baseTextCalculator,
  cardPadding: cardPaddingCalculator,
  cardWidth: cardWidthCalculator,
  fillet: siteGutterCalculator,
  navHeight: navHeightCalculator,
  sectionSpacing: sectionSpacingCalculator,
  siteGutter: siteGutterCalculator,
  spacing: spacingCalculator,
});

export type Layout = typeof layout;
