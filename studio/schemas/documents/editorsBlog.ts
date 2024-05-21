
import { GiQuillInk } from "react-icons/gi"
import {
    asyncSlugIsUniqueAcrossDocuments,
    getSlugSourceWithDate,
    slugHasDatePrefix,
    slugifyWithDate,
  } from '../../lib/schemaHelpers';

export default {
    name: 'editorsBlog',
    type: 'document',
    title: "Editor's Blog",
    icon: GiQuillInk,
    fieldsets: [
        {
          name: 'metadata', 
          title: 'Metadata', 
          options: {
            collapsible: true,
            collapsed: false
          }
        },
        {
          name: 'content',
          title: 'Content',
          options: {
            collapsible: true,
            collapsed: false
          }
        }
      ],
    fields: [
        {
            name: 'gatingSettings',
            type: 'gatingSettings',
            title: 'Gating Settings',
          },
          {
            name: 'title',
            title: 'Title',
            type: 'string',
            description: 'Good titles are descriptive and between 20 to 60 characters long.',
            codegen: { required: true },
            validation: (Rule: any) => [
              Rule.required().error('"Title" is missing.'),
              Rule.min(20).warning('Consider making "Title" between 20 to 60 characters long.'),
              Rule.custom((value: string) =>
                value[0] === '_'
                  ? '"Title" starts with an underscore (_). Consider removing underscore.'
                  : true
              ).warning(),
            ],
          },
          {
            fieldset: 'metadata',
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            description:
              'Enter a "Publish Date" and "Title" then click the "generate" button. YYYYMMDD-TITLE format.',
            options: {
              source: getSlugSourceWithDate,
              slugify: slugifyWithDate,
              isUnique: asyncSlugIsUniqueAcrossDocuments,
            },
            codegen: { required: true },
            validation: (Rule: any) => [
              Rule.required().error(
                '"Slug" is missing. Please set a "Publish Date" and "Title" then click "generate" to produce slug.'
              ),
              Rule.custom(slugHasDatePrefix).error('"Slug" does not have a YYYYMMDD prefix.'),
            ],
          },
          {
            fieldset: 'metadata',
            name: 'datePublished',
            title: 'Publish Date',
            type: 'datetime',
            description:
              'Will be used for sorting content. Avoid changing once published as it will be used to establish the "canonical" date for SEO.',
            codegen: { required: true },
            validation: (Rule: any) => Rule.required().error(`"Publish Date" is missing.`),
          },
          {
            fieldset: 'metadata',
            name: 'lastModified',
            title: 'Revision Date',
            type: 'datetime',
            description: 'Will display as "last revised" in articles.',
          },
          {
            fieldset: 'metadata',
            name: 'author',
            title: 'Author',
            type: 'reference',
            to: [{ type: 'author' }],
            description: '(required)',
            validation: (Rule: any) => Rule.required().error('"Author" is missing.'),
            codegen: {required: true}
          },
          {
            fieldset: 'metadata',
            name: 'tags',
            type: 'array',
            title: 'Tags',
            options: {
                layout: 'tags'
            },
            of: [{type: 'string'}],
            description: '(required) Press enter to add the tag. 3-5 items recommended.',
            validation: (Rule: any) => [
                Rule.required().min(1).error('"Tags" is missing.'),
                Rule.required().min(3).max(5).warning('It\'s recommended to have (3-5) tags.')
            ],
            codegen: {required: true}
          },
          {
            fieldset: "content",
            name: 'mainimage',
            title: 'Main Image',
            type: 'figure',
            validation: (Rule: any) => Rule.warning('"Main Image" is strongly recommended.'),
          },
          {
            fieldset: "content",
            name: 'body',
            title: 'Body',
            type: 'blockContent',
            description: '(required)',
            validation: (Rule: any) => Rule.required(),
            codegen: {required: true}
          },
          {
            fieldset: "content",
            name: 'summary',
            title: 'Summary',
            type: 'text',
            summary: 'Appears on preview cards and used for SEO description. Aim for 50-160 characters.',
            validation: (Rule: any) => [
              Rule.max(180).warning(
                'Best to keep around 160 characters. Google cuts descriptions to around this length'
              ),
              Rule.required().warning(
                'Consider adding a description for better SEO control and to control what appears in the post preview.'
              ),
            ],
          },
          {
            name: 'postSeo',
            title: 'SEO Settings',
            type: 'postSeo'
          },
    ],
    preview: {
        select: {
            title: 'title',
            date: 'datePublished',
            image: 'mainimage',
            id: '_id',
        },
        prepare({
            title,
            date,
            image,
            id,
        }: {
            title: string;
            date: string;
            id: string;
            image: any;
        }) {
          const isPublished = !(id && id.includes('drafts'));
          const datePublished = date ? `${date.slice(0, 10)}` : 'no date';
          const postTitle = title || 'no title';
    
          return {
            title: postTitle,
            subtitle: datePublished,
            media: isPublished ? image : GiQuillInk,
          };
        },
      },
}