import { FcFinePrint } from 'react-icons/fc';
import type { Nullable } from '../../lib/typings';
import { stringLongerThan } from '../../lib/validation/strings';

/* TODO: Robots.txt designer */

export default {
  name: 'defaultSeoSingleton',
  type: 'document',
  title: 'Default SEO',
  icon: FcFinePrint,
  __experimental_actions: ['update', 'publish' /* , 'create' */],
  description:
    'Set the default SEO values for the site. Custom SEO settings in pages will override these values. If a particular SEO value cannot be gathered on a page, these values are used.',
  fields: [
    {
      name: 'title',
      type: 'string',
      title: 'Site Title',
      description: '(required) Default page title.',
      validation: (Rule:any) => Rule.required(),
      codegen: {required: true}
    },
    {
      name: 'siteUrl',
      type: 'url',
      title: 'Site URL',
      initialValue: 'https://www.smarthernews.com',
      readOnly: true,
      description: '(required) For reference. Contact developer to modify.',
      validation: (Rule:any) => Rule.required(),
      codegen: {required: true}
    },
    {
      name: 'siteName',
      type: 'string',
      title: 'Site Name',
      description: '(required) Will be listed in SEO as the site\'s title. For example: smarthernews.com',
      validation: (Rule:any) => Rule.required(),
      codegen: {required: true}
    },
    {
      name: 'siteDescription',
      type: 'string',
      title: 'Site Description',
      description: '(required)',
      validation: 
        (Rule:any) => [
          Rule.required().error(),
          Rule.custom((description: Nullable<string>) => !stringLongerThan(description, 150) || 'Description should be less than (150) characters').warning()
        ],
      codegen: {required: true}
    },
    {
      name: 'twitterHandle',
      type: 'string',
      title: 'Twitter Handle',
      description: "(required) Example: @smarthernews",
      validation: (Rule: any) => [
        Rule.required(),
        Rule.custom(
          (handle: Nullable<string>) =>{
            if (!handle) return '"Twitter Handle" is missing.'

            if (handle[0] !== '@' || handle.startsWith('@@')) return '"Twitter Handle" should start with a single "@" character.'
            
            return true
          })
      ],
      codegen: {required: true}
    },
    {
      name: 'locale',
      type: 'string',
      title: 'Locale',
      initialValue: 'en_US',
      /* readOnly: true, */
      description: '(required) For reference. Contact developer to modify.',
      validation: (Rule:any) => Rule.required().error('"Locale" is missing.'),
      codegen: {required: true}
    },
    {
      name: 'defaultImage',
      type: 'image',
      title: 'Default Image',
      options: {
        hotspot: true
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alt',
          options: {
            isHighlighted: true
          },
          description: '(required)',
          validation: (Rule: any) => Rule.required(),
          codegen: {required: true}
        }
      ],
      description: '(required) Fallback image to be used on social media. Overriden by article images.',
      validation: (Rule: any) => Rule.required(),
      codegen: {required: true}
    },
    // TODO: [SEO] figure out ideal number of keywords
    {
      name: 'keywords',
      type: 'array',
      title: 'Keywords',
      of: [{type: 'string'}],
      options: {
        layout: 'tags'
      },
      description: '(required)',
      validation: (Rule: any) => Rule.required().unique().min(1),
      codegen: {required: true}
    },
    {
      name: 'twitterCardType',
      type: 'string',
      title: 'Twitter Card Type',
      options: {
        layout: 'radio',
        list: [
          {value: 'summary', title: 'Summary'},
          {value: 'summary_large_image', title: 'Large Image Summary'}
        ]
      },
      description: '(required)',
      validation: (Rule: any) => Rule.required(),
      codegen: {required: true}
    },
    {
      name: 'fallbackAuthor',
      type: 'reference',
      title: 'Fallback Author',
      to: [{type: 'author'}],
      description: '(required) If no author is specified for an article or page, this author will be used.',
      validation: (Rule: any) => Rule.required(),
      codegen: {required: true}
    },
    {
      name: 'publisherLogo',
      type: 'image',
      title: 'Publisher Logo',
      options: {hotspot: false},
      description: '(required) JSON-LD "publisherLogo".',
      validation: (Rule: any) => Rule.required(),
      codegen: {required: true}
    },
    {
      name: 'squarePublisherLogo',
      type: 'image',
      title: 'Square Publisher Logo',
      options: {hotspot: false},
      description: '(required) Logo must be a perfect square.',
      validation: (Rule: any) => Rule.required(),
      codegen: {required: true}
    },
  ],
};
