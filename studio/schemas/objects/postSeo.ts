export default {
  title: 'Post SEO',
  name: 'postSeo',
  description: 'Use this section to customize the SEO of this post.',
  type: 'object',
  options: {
    collapsible: true,
    collapsed: false
  },
  fields: [
    {
      title: 'Seo Schema Type',
      name: 'seoSchemaType',
      description: '(required) Determines how engines like Google will interpret the content. "News" for news content, "Article" for non-news content.',
      type: 'string',
      options: {
        list: [
          {title: 'News', value: 'newsArticle'},
          {title: 'Article', value: 'article'}
        ],
        layout: 'radio'
      },
      validation: (Rule:any) => Rule.required().error('"Seo Schema Type" is missing.'),
      codegen: {required: true}
    },
    {
      title: 'Title',
      name: 'title',
      type: 'string',
      description: 'Overrides "Title".',
      validation: (Rule:any) => Rule.max(60).warning('Should be under 60 characters')
    },
    {
      title: 'Description',
      name: 'description',
      type: 'text',
      validation: (Rule:any) => Rule.max(155).warning('Should be under 155 characters')
    },
    {
      title: 'Image',
      description: 'Overrides "Main Image". Facebook recommends 1200x630 (will be auto cropped). In some cases, sites will crop the image into a square. Use the hotspot options to control what gets kept when cropped.',
      name: 'image',
      type: 'image',
      options: {hotspot:true}
    }
  ]
}
