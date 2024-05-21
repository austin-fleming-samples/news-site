/* eslint import/no-default-export: 0 */
import { getHeaderSettings } from '@cms/getHeaderSettings';
import { parseError } from '@lib/errors';
import preval from 'next-plugin-preval';

const getHeaderSettingsData = async () => {
  try {
    const data = await getHeaderSettings(false);

    if (!data) throw new Error('Preval: no header fetched from Sanity.');

    return data;
  } catch (error: unknown) {
    throw new Error(
      `Failed to fetch data in "getHeaderSettingsData" at "headerSettings.preval.ts". Error: ${parseError(
        error,
      )}`,
    );
  }
};

export default preval(getHeaderSettingsData());
