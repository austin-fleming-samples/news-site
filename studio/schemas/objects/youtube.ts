import { YoutubePreviewComponent } from './YoutubePreviewComponent'


export default {
  name: 'youtube',
  type: 'object',
  title: 'YouTube Embed',
  fields: [
    {
      name: 'url',
      type: 'url',
      title: 'YouTube video URL',
      description: 'Visit Youtube in a browser and copy the URL.'
    },
    {
      name: 'alt',
      type: 'string',
      title: 'Alternative text',
      description: 'Important for SEO and accessiblity.',
      validation: (Rule: any) =>
        Rule.warning(
          `Please add alt text to your youtube embed. Hover on the embed, then at the top right go to 'YouTube Embed' > 'Edit'.`
        ).required()
    }
  ],
  preview: {
    select: {
      url: 'url'
    },
    component: YoutubePreviewComponent
  }
}
