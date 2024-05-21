import { GiCardAceSpades, GiCardRandom } from 'react-icons/gi'
import { RiDraftFill } from 'react-icons/ri'
import { blockContentToPlainText } from 'react-portable-text'
import {
  asyncSlugIsUniqueAcrossDocuments,
  getSlugSourceWithDate,
  slugHasDatePrefix,
  slugifyWithDate
} from '../../lib/schemaHelpers'

export default {
  name: 'quickreads',
  title: 'Card Stack',
  type: 'document',
  icon: GiCardRandom,
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
        Rule.custom(slugHasDatePrefix).error()
      ]
    },
    {
      fieldset: 'metadata',
      name: 'datePublished',
      title: 'Publish Date',
      type: 'datetime',
      description:
        'Will be used for sorting content. Avoid changing once published as it will be used to establish the "canonical" date for SEO.',
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
      fieldset: 'content',
      name: 'series',
      title: 'Series',
      description:
        'The card series name that appears at the top of cards. Go to the "Card Series" collection to edit.',
      type: 'reference',
      to: [{ type: 'cardseries' }],
      codegen: { required: true },
      validation: (Rule: any) => Rule.required().error('A series must be selected.')
    },
    {
      fieldset: 'content',
      title: 'Color Palette',
      name: 'colorpaletteclassname',
      type: 'string',
      options: {
        list: [
          { title: 'black', value: '--black' },
          { title: 'blue (light)', value: '--light-blue' },
          { title: 'blue (dark)', value: '--dark-blue' },
          { title: 'bronze', value: '--bronze' },
          { title: 'brown (dark)', value: '--dark-brown' },
          { title: 'gray (light)', value: '--light-gray' },
          { title: 'gray (medium)', value: '--medium-gray' },
          { title: 'gray (dark)', value: '--dark-gray' },
          { title: 'green (light)', value: '--light-green' },
          { title: 'green (dark)', value: '--dark-green' },
          { title: 'pink (light)', value: '--light-pink' },
          { title: 'pink (dark)', value: '--dark-pink' },
          { title: 'purple (light)', value: '--light-purple' },
          { title: 'purple (dark)', value: '--dark-purple' },
          { title: 'white', value: '--white' },
          { title: 'yellow (light)', value: '--light-yellow' }
        ]
      },
      codegen: { required: true },
      validation: (Rule: any) => Rule.required().error('"Color Palette" is missing.')
    },
    {
      fieldset: 'content',
      name: 'mainimage',
      title: 'Main image',
      type: 'figure'
    },
    {
      fieldset: 'content',
      name: 'cards',
      title: 'Cards',
      type: 'array',
      codegen: { required: true },
      validation: (Rule: any) => [
        Rule.min(1).error('"Cards" must have at least one card.'),
        Rule.max(10).warning('"Cards": it\'s best not to exceed (10) cards.')
      ],
      of: [
        {
          title: 'Card',
          name: 'card',
          type: 'object',
          collapsed: false,
          collapsible: false,
          fields: [
            {
              name: 'body',
              title: 'Body',
              type: 'cardContent'
            },
            {
              name: 'citation',
              title: 'Citation',
              type: 'string'
            }
          ],
          preview: {
            select: {
              title: 'body',
              subtitle: 'citation'
            },
            prepare({
              title,
              subtitle
            }: {
              subtitle: string,
              title: any
            }) {
              const outputTitle = title ? blockContentToPlainText(title) : 'card'
              const outputSubtitle = subtitle || ''

              return {
                title: outputTitle,
                subtitle: outputSubtitle,
                media: GiCardAceSpades
              }
            }
          }
        }
      ]
    },
    {
      fieldset: 'content',
      name: 'body',
      title: 'Sources Body',
      type: 'blockContent'
    },
    {
      fieldset: 'content',
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
      name: 'postSeo',
      title: 'SEO Settings',
      type: 'postSeo',
      validation: (Rule:any) => Rule.required()
    },
    {
      name: 'aliases',
      title: 'Aliases',
      type: 'array',
      hidden: true, // NOTE: this was created programmatically for legacy content. Editors shouldn't access.
      description:
        'For legacy content: if you need to establish an internal redirect to an old url.',
      of: [{ type: 'string' }]
    }
  ],
  preview: {
    select: {
      title: 'title',
      series: 'series.title',
      date: 'datePublished',
      image: 'mainimage',
      id: '_id'
    },
    prepare({
      title,
      series,
      date,
      image,
      id
    }: {
      date: string,
      id: string,
      image: any,
      series: string,
      title: string
    }) {

      const isPublished = !(id && id.includes('drafts'))

      const datePublished = date ? `${date.slice(0, 10)} - ` : 'no date - '

      const postTitle = title || '_Untitled'

      const status = id ? (id.includes('drafts') ? '<DRAFT>  ' : '') : ''

      const cardSeries = series || 'no series'

      return {
        title: status + postTitle,
        subtitle: datePublished + cardSeries,
        media: isPublished ? image : RiDraftFill
      }
    }
  },
  orderings: [
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
    }
  ]
}
