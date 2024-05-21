export default {
  title: 'Page SEO',
  name: 'pageSeo',
  description: 'Use this section to customize the SEO of this page.',
  type: 'object',
  fields: [
    {
      title: 'Do Not Index',
      name: 'noIndex',
      description: 'If on, engines like Google will not show this page in results.',
      type: 'boolean',
      initialValue: false
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