import { BsFillChatQuoteFill } from 'react-icons/bs'
import { AiFillAlert } from 'react-icons/ai'
import { RiDraftFill } from 'react-icons/ri'
import {
  slugifyWithDate,
  getSlugSourceWithDate,
  asyncSlugIsUniqueAcrossDocuments,
  slugHasDatePrefix
} from './../../lib/schemaHelpers'

export default {
  name: 'quickquotes',
  title: 'Quick Quotes',
  type: 'document',
  icon: BsFillChatQuoteFill,
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
      name: 'prominance',
      title: 'Prominance',
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
        Rule.custom((value: string) => (
          value[0] === '_'
            ? '"Title" starts with an underscore (_). Consider removing underscore.'
            : true
        )).warning()
      ]
    },
    {
      fieldset: 'metadata',
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      description: 'Enter a "Publish Date" and "Title" then click the "generate" button. YYYYMMDD-TITLE format.',
      options: {
        source: getSlugSourceWithDate,
        slugify: slugifyWithDate,
        isUnique: asyncSlugIsUniqueAcrossDocuments
      },
      codegen: { required: true },
      validation: (Rule: any) => [
        Rule.required().error('"Slug" is missing. Please set a "Publish Date" and "Title" then click "generate" to produce slug.'),
        Rule.custom(slugHasDatePrefix).error('"Slug" does not have a YYYYMMDD prefix.')
      ]
    },
    {
      fieldset: 'metadata',
      name: 'datePublished',
      title: 'Publish Date',
      type: 'datetime',
      description: 'Will be used for sorting content. Avoid changing once published as it will be used to establish the "canonical" date for SEO.',
      codegen: { required: true },
      validation: (Rule: any) => Rule.required().error(`"Publish Date" is missing.`)
    },
    {
      fieldset: 'metadata',
      name: 'lastModified',
      title: 'Revision Date',
      type: 'datetime',
      description: 'Will display as "last revised" in articles.'
    },
    {
      fieldset: 'metadata',
      name: 'author',
      title: 'Author',
      type: 'reference',
      to: [{ type: 'author' }]
    },
    {
      fieldset: 'metadata',
      title: 'Tags',
      name: 'tags',
      description: 'Press enter to add the tag.',
      type: 'tags',
      validation: (Rule: any) => Rule.required().warning('Consider adding at least one tag.'),
    },
    {
      fieldset: 'prominance',
      name: 'isBreaking',
      title: 'Breaking',
      description: 'Marks post as breaking news and pushes it to the top of feeds.',
      type: 'boolean',
      initialValue: false
    },
    
    {
      fieldset: 'content',
      name: 'mainimage',
      title: 'Main image',
      type: 'figure'
    },
    {
      fieldset: 'content',
      name: 'featured_quote',
      title: 'Featured Quote',
      type: 'object',
      collapsed: false,
      collapsible: false,
      codegen: { required: true },
      validation: (Rule: any) => Rule.required().error('"Featured Quote" is missing.'),
      fields: [
        {
          name: 'quote',
          title: 'Quote',
          type: 'text',
          description: 'Do not include quotes. Brief quote that will appear on the preview card and top of post.',
          codegen: { required: true },
          validation: (Rule: any) => Rule.required().error('"Quote" is missing.')
        },
        {
          name: 'summary',
          title: 'Summary',
          type: 'text',
          summary: 'Appears on preview cards and used for SEO description. Aim for 50-160 characters.',
          validation: (Rule: any) => [
            Rule.max(180).warning(
              'Best to keep around 160 characters. Google cuts descriptions to around this length'
            ),
            Rule.required().warning(
              '"Summary" is missing. Consider adding a description for better SEO control and to control what appears in the post preview.'
            )
          ]
        },
        {
          name: 'citation',
          title: 'Citation',
          type: 'string',
          description: 'Name of who or what is being quoted.'
        }
      ]
    },
    {
      fieldset: 'content',
      name: 'body',
      title: 'Article Body',
      type: 'blockContent'
    },
    {
      name: 'postSeo',
      title: 'SEO Settings',
      type: 'postSeo'
    },
    {
      name: 'aliases',
      title: 'Aliases',
      description: 'For legacy content: if you need to establish an internal redirect to an old url.',
      type: 'array',
      hidden: true, // NOTE: this was created programmatically for legacy content. Editors shouldn't access.
      of: [{ type: 'string' }]
    },
  ],
  preview: {
    select: {
      title: 'title',
      date: 'datePublished',
      image: 'mainimage',
      id: '_id',
      breaking: 'isBreaking'
    },
    prepare({
      title,
      date,
      image,
      id,
      breaking
    }: {
      title: string,
      date: string,
      image: any,
      id: string,
      breaking: boolean
    }) {

      const isPublished = !(id && id.includes('drafts'))

      const datePublished = date ? `${date.slice(0, 10)}` : 'no date'
      const postTitle = title ? title : 'no title'
      const status = id ? (id.includes('drafts') ? '<DRAFT>  ' : '') : ''
      const isBreaking = breaking ? ` - BREAKING` : ''

      const displayImage = isBreaking ? AiFillAlert : image
      return {
        title: status + postTitle,
        subtitle: datePublished + isBreaking,
        media: isPublished ? displayImage : RiDraftFill
      }
    }
  },
  orderings: [
    {
      title: 'Title, A-Z',
      name: 'titleAZ',
      by: [
        { field: 'title', direction: 'asc' }
      ]
    },
    {
      title: 'Title, Z-A',
      name: 'titleZA',
      by: [
        { field: 'title', direction: 'desc' }
      ]
    },
    {
      title: 'Publish Date, New',
      name: 'publishDateDesc',
      by: [
        { field: 'datePublished', direction: 'desc' }
      ]
    },
    {
      title: 'Publish Date, Old',
      name: 'publishDateAsc',
      by: [
        { field: 'datePublished', direction: 'asc' }
      ]
    },
    {
      title: 'Breaking',
      name: 'breakingDesc',
      by: [
        { field: 'isBreaking', direction: 'desc' }
      ]
    }
  ],
}
