/* eslint import/no-default-export: 0 */
import { getBreakingRailVideopost } from '@cms/getVideoposts';
import preval from 'next-plugin-preval';

const getData = async () => await getBreakingRailVideopost();

export default preval(getData());
