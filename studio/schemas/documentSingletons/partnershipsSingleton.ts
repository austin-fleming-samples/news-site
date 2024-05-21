
export default {
  name: "partnershipsSingleton",
  type: "document",
  title: 'Partnerships',
  __experimental_actions: ["update", "publish"],
  fieldsets: [
    {
      name: "supportingText",
      title: "Supporting Text",
      options: {
        collapsible: true,
        collapsed: false,
      },
    },
  ],
  fields: [
    {
      title: "Page Title",
      name: "title",
      type: "string",
      description: "(required)",
      validation: (Rule: any) => Rule.required().error('"Title" is missing.'),
      codegen: { required: true },
    },
    {
      fieldset: "supportingText",
      name: "supportingTitle",
      type: "string",
      title: "Headline",
      description: "(required)",
      validation: (Rule: any) => Rule.required(),
      codegen: { required: true },
    },
    {
      fieldset: "supportingText",
      name: "supportingBody",
      type: "text",
      description: "(required)",
      validation: (Rule: any) => Rule.required(),
      codegen: { required: true },
    },
    {
      name: "backgroundImage",
      type: "image",
      title: "Background Image",
      description: "(required)",
      options: {
        hotspot: true
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alt',
          options: {
            isHighlighted: true
          },
          description: '(required)',
          validation: (Rule: any) => Rule.required(),
          codegen: {required: true}
        }
      ],
      validation: (Rule: any) => Rule.required(),
      codegen: { required: true },
    },
  ],
};
