/* eslint import/no-default-export: 0 */
import { getDefaultSettings } from '@cms/getDefaultSettings';
import { parseError } from '@lib/errors';
import preval from 'next-plugin-preval';

// TODO: [SEO] images are currently pulled from Sanity's CDN for SEO. Need a caching function to save these locally.
const getDefaultSettingsData = async () => {
  try {
    const data = await getDefaultSettings(false);

    if (!data) throw new Error('Preval: no default settings fetched from Sanity.');

    return data;
  } catch (error: unknown) {
    throw new Error(
      `Failed to fetch data in "getDefaultSettingsData" at "defaultSeo.preval". Error: ${parseError(
        error,
      )}`,
    );
  }
};

export default preval(getDefaultSettingsData());
