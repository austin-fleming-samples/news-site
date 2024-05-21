import { Nullable } from '@typings/helpers';
import type { Products } from './types/sanityTypes';
import { getClient } from './utils/getClient';

const ordering = `| order( priority asc )`;

export const someProductsQuery = `*[_type == "products" && defined(slug)] ${ordering} [0...$quantity]`;

export const getSomeProducts = async (quantity: number, preview = false) =>
  getClient(preview).fetch<Nullable<Products[]>>(someProductsQuery, { quantity });
