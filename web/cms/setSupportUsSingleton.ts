import type { Nullable } from '@typings/helpers';
import type { SupportUsSingleton } from './types/codegen';
import { getClient } from './utils/getClient';

const query = `*[_type == "supportUsSingleton"][0]`;

export const getSupportUsPage = async (preview = false) => {
  const data = await getClient(preview).fetch<Nullable<SupportUsSingleton>>(query);

  if (!data) throw new Error('Failed in "getSupportUsPage". Failed to fetch data.');

  return {
    ...data,
  };
};
