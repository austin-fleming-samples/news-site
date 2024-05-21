import { Nullable } from '@typings/helpers';
import type { Cardseries } from './types/sanityTypes';
import { getClient } from './utils/getClient';

/* FRAGMENTS */
const fullProjection = `{...}`;

const ordering = `| order(title asc)`;

/* QUERIES */
export const allCardseriesQuery = `*[_type == "cardseries" && defined(slug)] ${ordering} ${fullProjection}`;

/* FETCHERS */
export const getAllCardseries = async (preview = false) =>
  getClient(preview).fetch<Nullable<Cardseries[]>>(allCardseriesQuery);
