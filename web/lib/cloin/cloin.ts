import { StrictFalsy } from '@typings/helpers';

export const cloin = (...classes: Array<StrictFalsy<string>>): string =>
  classes.filter((maybeClass) => !!maybeClass).join(' ');
