

export default {
  name: 'cardseries',
  title: 'Card Series',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      codegen: {required: true},
      validation: (Rule: any) => Rule.required().max(25).warning('Shorter titles are better.')
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title'
      },
      codegen: { required: true },
      validation: (Rule: any) =>
        Rule.required().error(
          'Add a title and click "generate" to produce slug, or type in a custom slug (lowercase letters, numbers, and dashes only.)'
        )
    }
  ]
}
