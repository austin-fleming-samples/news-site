export default {
    title: 'Open Graph Overrides',
    name: 'openGraph',
    type: 'object',
    description: 'Use to control what appears on Search Engines and Social Media platforms.',
    fields: [
      {
        title: 'Title',
        name: 'title',
        type: 'string',
        description: 'Heads up! This will override the page title.',
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
        description: 'Facebook recommends 1200x630 (will be auto cropped). In some cases, sites will crop the image into a square. Use the hotspot options to control what gets kept when cropped.',
        name: 'image',
        type: 'image',
        options: {hotspot:true}
      }
    ],
    preview: {
      select: {
        title: 'title',
        media: 'image.asset',
      }
    }
  }