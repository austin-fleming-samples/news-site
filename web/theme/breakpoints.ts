import { SITE_GUTTER_PIXELS, CARD_WIDTH_PIXELS } from './layout';

const calcGutters = (columns: number): number => (columns + 1) * SITE_GUTTER_PIXELS;

const calcColumns = (columns: number): number => columns * CARD_WIDTH_PIXELS;

const widthFromColumns = (columns: number): number => calcGutters(columns) + calcColumns(columns);

const pxFromColumns = (columns: number): string => `${widthFromColumns(columns)}px`;

const buildMediaQuery = (value: string): string => `only screen and (min-width: ${value})`;

const mediaQueryFromColumns = (columns: number): string => buildMediaQuery(pxFromColumns(columns));

export const breakpoints = Object.freeze({
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
});

export type Breakpoints = typeof breakpoints;

// ESNOTE: hack to pull in breakpoints via require into tailwind.config
/* eslint-disable-next-line import/no-default-export */
export default breakpoints;
