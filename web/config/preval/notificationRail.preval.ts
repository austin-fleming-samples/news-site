/* eslint import/no-default-export: 0 */
import { getNotificationRail } from "@cms/getNotificationRail";
import preval from "next-plugin-preval";

const getData = async () => {
  const data = await getNotificationRail(false)

  if (!data) throw new Error('Preval: no notication rail fetched from Sanity.');

  return data
}

export default preval(getData())
