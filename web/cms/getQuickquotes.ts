import type { Nullable } from 'typings/helpers';
import { blockContentFragment } from './queryFragments';
import type { Quickquotes } from './types/sanityTypes';
import { getClient } from './utils/getClient';

/*
FRAGMENTS
*/
export const fullProjection = `{
    ...,
    author->,
    'isBreaking': isBreaking == true,
    'body': body[] ${blockContentFragment}
}`;

const ordering = `| order( isBreaking desc, datePublished desc )`;

const simpleOrdering = `| order(datePublished desc)`;

/*
QUERIES
*/
export const countQuickquotesQuery = `count(*[_type == "quickquotes" && defined(slug)])`;

export const singleQuickquoteQuery = `*[_type == "quickquotes" && slug.current == $slug]
    [0]
    ${fullProjection}`;

export const allQuickquotesQuery = `*[_type == "quickquotes" && defined(slug)]
    ${ordering}
    ${fullProjection}`;

/* TODO: [future] currently, most queries check if slug is defined.
This is because there are legacy items in the CMS without slugs.
This should be fixed in the CMS instead of muddling the queries. */
/* TODO: [future] Queries are inconsistent in their usage of range operators .. vs ... 
For example [0..10] returns 11 items, [0...10] returns 10. */
export const someQuickquotesQuery = `*[_type == "quickquotes" && defined(slug)]
    ${fullProjection}
    ${ordering}
    [0...$quantity]
    `;

// TODO: currently doesn't sort by breaking
export const cursoredQuickquotesQuery = `*[_type == "quickquotes" && defined(slug)]
    ${simpleOrdering}
    [$startCursor..$endCursor]
    ${fullProjection}
    `;

/*
FETCHERS
*/

// TODO: handle failed fetch more elegantly than throwing. Should be specific to each function
export const getQuickquotesQuantity = async (preview = false) => {
  const response = await getClient(preview).fetch<Nullable<number>>(countQuickquotesQuery);

  if (!response) throw new Error('Failed to get response to "getQuickquotesQuantity".');

  return response;
};

export const getAllQuickquotes = async (preview = false) =>
  getClient(preview).fetch<Nullable<Quickquotes[]>>(allQuickquotesQuery);

export const getSomeQuickquotes = async (quantity: number, preview = false) =>
  getClient(preview).fetch<Nullable<Quickquotes[]>>(someQuickquotesQuery, {
    quantity,
  });

export const getCursoredQuickquotes = async (
  startCursor: number,
  endCursor: number,
  preview = false,
) =>
  getClient(preview).fetch<Nullable<Quickquotes[]>>(cursoredQuickquotesQuery, {
    endCursor,
    startCursor,
  });
