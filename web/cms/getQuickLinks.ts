import type { Nullable } from '@typings/helpers';
import type { QuickLinksSingleton } from './types/codegen';
import { getClient } from './utils/getClient';

const query = `*[_type == "quickLinksSingleton"][0]`;

export const getQuickLinks = async (preview = false) => {
  const data = await getClient(preview).fetch<Nullable<QuickLinksSingleton>>(query);

  if (!data) throw new Error('Failed in "getQuickLinks". Failed to fetch data.');

  const onlyVisibleWidgets = data.widgetList
    ? data.widgetList.filter((widget) => !widget.isHidden)
    : undefined;

  const shouldRenderPage = !!onlyVisibleWidgets && onlyVisibleWidgets.length > 0;

  const cleanedData = {
    ...data,
    widgetList: onlyVisibleWidgets,
  };

  return {
    content: cleanedData,
    shouldRenderPage,
  };
};
