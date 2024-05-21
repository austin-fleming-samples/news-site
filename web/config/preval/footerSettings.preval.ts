/* eslint import/no-default-export: 0 */
import { getFooter } from '@cms/getFooter';
import preval from 'next-plugin-preval';

const getData = async () => {
  const data = await getFooter(false);

  if (!data) throw new Error('Preval: no footer fetched from Sanity.');

  return data;
};

export default preval(getData());
