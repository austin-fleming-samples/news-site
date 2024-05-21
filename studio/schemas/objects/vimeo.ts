

import { VimeoPreviewComponent } from './VimeoPreviewComponent'

export default {
  name: 'vimeo',
  type: 'object',
  title: 'Vimeo',
  fields: [
    {
      name: 'url',
      type: 'url',
      title: 'Vimeo video URL',
      description: 'Visit an Vimeo in a browser and copy the URL.'
    }
  ],
  preview: {
    select: {
      url: 'url'
    },
    component: VimeoPreviewComponent
  }
}
