import { AiFillAlert } from 'react-icons/ai';
import { FaFileVideo } from 'react-icons/fa';
import { GiTrophy } from 'react-icons/gi';
import { RiDraftFill } from 'react-icons/ri';
import {
  asyncSlugIsUniqueAcrossDocuments,
  getSlugSourceWithDate,
  slugHasDatePrefix,
  slugifyWithDate,
} from '../../lib/schemaHelpers';

export default {
  name: 'videoposts',
  title: 'Video Posts',
  type: 'document',
  icon: FaFileVideo,
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
      name: 'isFeatured',
      title: 'Featured',
      description:
        'Marks post as a featured story and pushes it to the top of feeds, but behind breaking',
      type: 'boolean',
      initialValue: false
    },
    {
      fieldset: 'prominance',
      name: 'isBreaking',
      title: 'Breaking Slider',
      description:
        'Marks post as breaking news and pushes it to the top of feeds, before featured.',
      type: 'boolean',
      initialValue: false
    },
    {
      fieldset: 'prominance',
      name: 'isBreakingDropdown',
      title: 'Breaking Dropdown',
      description: 'Marks post as breaking and adds dropdown notification to pages.',
      type: 'boolean',
      initialValue: false
    },
    {
      fieldset: "content",
      name: 'series',
      title: 'Series',
      description:
        'The video series name that appears in the preview. Go to the "Video Series" collection to edit.',
      type: 'reference',
      to: [{ type: 'videoseries' }],
      validation: (Rule: any) => Rule.required().warning('Consider adding a series.'),
    },
    {
      fieldset: "content",
      name: 'mainimage',
      title: 'Main Image',
      type: 'figure',
      codegen: { required: true },
      validation: (Rule: any) => Rule.required().error('"Main Image" is missing.'),
    },
    {
      fieldset: "content",
      name: 'body',
      title: 'Body',
      type: 'blockContent',
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
    {
      name: 'aliases',
      title: 'Aliases',
      hidden: true, // NOTE: this was created programmatically for legacy content. Editors shouldn't access.
      description:
        'For legacy content: if you need to establish an internal redirect to an old url.',
      type: 'array',
      of: [{ type: 'string' }],
    },
  ],
  preview: {
    select: {
      title: 'title',
      series: 'series',
      date: 'datePublished',
      image: 'mainimage',
      id: '_id',
      breaking: 'isBreaking',
      breaking_dropdown: 'isBreakingDropdown',
      featured: 'isFeatured',
    },
    prepare({
      title,
      date,
      image,
      id,
      breaking,
      breakingDropdown,
      featured,
    }: {
      breaking: boolean;
      breakingDropdown: boolean;
      date: string;
      featured: boolean;
      id: string;
      image: any;
      title: string;
    }) {
      const isPublished = !(id && id.includes('drafts'));
      const datePublished = date ? `${date.slice(0, 10)}` : 'no date';
      const postTitle = title || 'no title';
      const status = id ? (id.includes('drafts') ? '<DRAFT>  ' : '') : '';

      const isBreaking = breaking || breakingDropdown ? ` - BREAKING` : '';
      const isFeatured = featured ? ` - FEATURED` : '';

      const displayImage = isBreaking ? AiFillAlert : isFeatured ? GiTrophy : image;

      return {
        title: status + postTitle,
        subtitle: datePublished + isBreaking + isFeatured,
        media: isPublished ? displayImage : RiDraftFill,
      };
    },
  },
  orderings: [
    {
      title: 'Title, A-Z',
      name: 'titleAZ',
      by: [{ field: 'title', direction: 'asc' }],
    },
    {
      title: 'Title, Z-A',
      name: 'titleZA',
      by: [{ field: 'title', direction: 'desc' }],
    },
    {
      title: 'Publish Date, New',
      name: 'publishDateDesc',
      by: [{ field: 'datePublished', direction: 'desc' }],
    },
    {
      title: 'Publish Date, Old',
      name: 'publishDateAsc',
      by: [{ field: 'datePublished', direction: 'asc' }],
    },
    {
      title: 'Featured',
      name: 'isFeaturedDesc',
      by: [{ field: 'isFeatured', direction: 'desc' }],
    },
    {
      title: 'Breaking',
      name: 'isBreaking',
      by: [{ field: 'isBreaking', direction: 'desc' }],
    },
    {
      title: 'Breaking Dropdown',
      name: 'isBreakingDropdown',
      by: [{ field: 'isBreakingDropdown', direction: 'desc' }],
    },
  ],
};
