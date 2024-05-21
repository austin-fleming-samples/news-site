import { palette } from './palette';

export const borders = Object.freeze({
  main: `solid 1px ${palette.primary.light}`,
  title: `solid 2px ${palette.primary.main}`,
  body: `solid 1px ${palette.olive.main}`,
  test: `dashed 1px ${palette.primary.main}`,
});

export type Borders = typeof borders;
