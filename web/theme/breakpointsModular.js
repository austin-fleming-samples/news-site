// HACK: duplicate from theme/layout. Copied to allow usage with require.
const BASE_TEXT_PIXELS = 16;
const SITE_GUTTER_PIXELS = BASE_TEXT_PIXELS;
const CARD_WIDTH_PIXELS = 400;

const calcGutters = (columns) => (columns + 1) * SITE_GUTTER_PIXELS;

const calcColumns = (columns) => columns * CARD_WIDTH_PIXELS;

const widthFromColumns = (columns) => calcGutters(columns) + calcColumns(columns);

const pxFromColumns = (columns) => `${widthFromColumns(columns)}px`;

const buildMediaQuery = (value) => `only screen and (min-width: ${value})`;

const mediaQueryFromColumns = (columns) => buildMediaQuery(pxFromColumns(columns));

/* 
HACK: This file is a duplicate, but allows use with require.
Fix when moving totally to tailwind
*/
module.exports = {
  desktop: {
    numericWidth: widthFromColumns(1),
    query: mediaQueryFromColumns(3),
    width: pxFromColumns(3),
  },
  desktopLg: {
    numericWidth: widthFromColumns(1),
    query: mediaQueryFromColumns(4),
    width: pxFromColumns(4),
  },
  mobileLg: {
    numericWidth: widthFromColumns(1),
    query: mediaQueryFromColumns(1),
    width: pxFromColumns(1),
  },
  tablet: {
    numericWidth: widthFromColumns(1),
    query: mediaQueryFromColumns(2),
    width: pxFromColumns(2),
  },
};
