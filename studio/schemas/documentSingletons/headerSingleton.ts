import { CgToolbarTop } from 'react-icons/cg';

export default {
  name: 'headerSingleton',
  type: 'document',
  title: 'Header Settings',
  icon: CgToolbarTop,
  __experimental_actions: ['update', 'publish' /* , 'create' */],
  fields: [
    {
      title: 'Header Logo',
      name: 'headerLogo',
      type: 'figure',
      codegen: { required: true },
      validation: (Rule: any) => Rule.required().error('"Header logo" is missing.'),
    },
    {
      title: 'Header Menu',
      name: 'headerNavigation',
      type: 'array',
      of: [{ type: 'link' }],
      codegen: { required: true },
      validation: (Rule: any) =>
        Rule.required().min(1).error('"Header Menu" must have at least one item.'),
    },
  ],
};
