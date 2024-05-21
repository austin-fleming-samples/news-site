import { FcAdvertising } from 'react-icons/fc';

export default {
  name: 'notificationRailSingleton',
  type: 'document',
  title: 'Notification Rail',
  icon: FcAdvertising,
  __experimental_actions: ['update', 'publish'/* , 'create' */],
  fields: [
    {
      title: 'Activate',
      name: 'isActive',
      type: 'boolean',
      codegen: { required: true },
      validation: (Rule: any) =>
        Rule.required().error('"Activate" state needs to be either off or on.'),
    },
    {
      title: 'Content',
      name: 'content',
      type: 'link',
      codegen: { required: true },
      validation: (Rule: any) => Rule.required().error('"Content" is missing.'),
    },
  ],
  initialValue: {
    isActive: false,
  },
};
