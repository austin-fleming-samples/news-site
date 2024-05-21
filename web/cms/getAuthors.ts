import type { Nullable } from '@typings/helpers';
import type { Author } from './types/sanityTypes';
import { getClient } from './utils/getClient';

/* FRAGMENTS */
const fullProjection = `{
  ...
}`;

/* QUERIES */
export const singleAuthorQuery = `*[_type == "author" && slug.current == $slug] [0] ${fullProjection}`;

/* FETCHERS */
export const getSingleAuthor = async (slug: string, preview = false) =>
  getClient(preview).fetch<Nullable<Author>>(singleAuthorQuery, { slug });
