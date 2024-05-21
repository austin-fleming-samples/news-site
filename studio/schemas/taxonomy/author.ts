import { Nullable } from '../../lib/typings';
import { isHttps } from '../../lib/validation';
import { FcBusinesswoman } from 'react-icons/fc';
import { asyncSlugIsUniqueAcrossDocuments, getSlugSource } from '../../lib/schemaHelpers';

export default {
  name: 'author',
  title: 'Author',
  type: 'document',
  icon: FcBusinesswoman,
  fields: [
    {
      name: 'title',
      type: 'string',
      title: 'Name',
      description: '(required)',
      validation: (Rule: any) => [Rule.required().error('"Name" is missing.')],
      codegen: { required: true },
    },
    {
      name: 'slug',
      type: 'slug',
      title: 'Slug',
      options: {
        source: getSlugSource,
        isUnique: asyncSlugIsUniqueAcrossDocuments,
      },
      description: '(required)',
      validation: (Rule: any) => [
        Rule.required().error(
          '"Slug" is missing. Please set a "Name" then click "generate" to produce slug.'
        ),
      ],
      codegen: { required: true },
    },
    {
      name: 'mainimage',
      type: 'image',
      title: 'Image',
      description: '(required)',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative text',
          description: '(required) Important for SEO and accessiblity.',
          options: {
            isHighlighted: true,
          },
          validation: (Rule: any) => Rule.required().error('"Image" is missing "Alternative Text".'),
          codegen: {required: true}
        },
      ],
      validation: (Rule: any) =>
        Rule.required(),
        codegen: {required: true}
    },
    {
      name: 'subtitle',
      title: 'Sub Title',
      description: 'Small line between blurb and title. Useful for job titles, etc.',
      type: 'string',
      validation: (Rule: any) => Rule.required().warning('Consider adding a subtitle.'),
    },
    {
      name: 'summary',
      title: 'Blurb',
      description: 'Brief blurb about author.',
      type: 'text',
      validation: (Rule: any) => Rule.required().warning('Consider adding a "Blurb".'),
    },
    {
      name: 'primarySite',
      type: 'url',
      title: 'Primary Site',
      description: '(required) This person\'s main profile site. Could either be a personal website or social media account.',
      validation: (Rule: any) => Rule.required().custom((primarySite: Nullable<string> ) => isHttps(primarySite) || 'Must start with "https://"'),
      codegen: {required: true}
    },
    {
      name: 'twitterHandle',
      type: 'string',
      title: 'Twitter Handle',
      description: "Example: @smarthernews",
      validation: (Rule: any) => Rule.custom(
          (handle: Nullable<string>) =>{
            if (!handle) return true

            if (handle[0] !== '@' || handle.startsWith('@@')) return '"Twitter Handle" should start with a single "@" character.'
            
            return true
          }).warning()
    },
    /*
    {
      name: 'email',
      title: 'Email Address',
      description: 'Only provide if you want your email publicly displayed on your profile.',
      type: 'string'
    },
    {
      name: 'social_links',
      title: 'Social Media Links',
      type: 'socials'
    } */
  ],
};
