import { CgToolbarBottom } from 'react-icons/cg';

export default {
  name: 'footerSingleton',
  type: 'document',
  title: 'Footer Settings',
  icon: CgToolbarBottom,
  __experimental_actions: ['update', 'publish' /* , 'create' */],
  fields: [
    {
      title: 'Footer Logo',
      name: 'footerLogo',
      type: 'figure',
      codegen: { required: true },
      validation: (Rule: any) => Rule.required().error('"Footer logo" is missing.'),
    },
    {
      title: 'Footer CTA',
      name: 'footerCta',
      type: 'object',
      fields: [
        {
          title: 'CTA Link',
          name: 'ctaLink',
          type: 'link',
        },
        {
          title: 'CTA text',
          name: 'ctaText',
          type: 'text',
        },
      ],
    },
    {
      title: 'Footer Menu',
      name: 'footerNavigation',
      type: 'array',
      options: {
        editModal: 'dialogue',
      },
      of: [{ type: 'link' }],
      codegen: { required: true },
      validation: (Rule: any) =>
        Rule.required().min(1).error('"Footer Menu" must have at least one item.'),
    },
    {
      title: 'Social Media',
      name: 'socialMedia',
      type: 'socials',
    },
    {
      title: 'Policies',
      name: 'policies',
      type: 'array',
      of: [{ type: 'link' }],
      codegen: { required: true },
      validation: (Rule: any) =>
        Rule.required()
          .min(1)
          .error('"Policies" should have at least one policy listed. For example: Privacy Policy.'),
    },
    {
      title: 'Copyright Notice',
      name: 'copyrightNotice',
      type: 'string',
      codegen: { required: true },
      validation: (Rule: any) => Rule.required().error('"Copyright Notice" is missing.'),
    },
  ],
};
