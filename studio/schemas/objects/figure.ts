export default {
  name: 'figure',
  title: 'Image',
  type: 'image',
  options: {
    hotspot: true
  },
  fields: [
    {
      name: 'alt',
      type: 'string',
      title: 'Alternative text',
      description: '(required) Important for SEO and accessibility.',
      options: {
        isHighlighted: true
      },
      validation: (Rule: any) => Rule.required(),
      codegen: {required: true}
    },
    {
      name: 'isContained',
      title: 'Contain Image',
      type: 'boolean'
    }
  ],
  preview: {
    select: {
      imageUrl: 'asset.url',
      title: 'caption'
    }
  }
}
