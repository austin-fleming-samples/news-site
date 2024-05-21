import type { NotificationRailSingleton } from '@cms/types/sanityTypes';
import { getClient } from '@cms/utils/getClient';
import { Nullable } from '@typings/helpers';
import { linkFragment } from './queryFragments/linkFragment';

const query = `*[_type == "notificationRailSingleton"][0]{
  ...,
  content${linkFragment}
}`;

export const getNotificationRail = async (preview = false) =>
  getClient(preview).fetch<Nullable<NotificationRailSingleton>>(query);
