

export default {
  name: "supportUsSingleton",
  type: "document",
  title: "Support Us",
  __experimental_actions: ["update", "publish", "create"],
  fieldsets: [
    {
      name: "titleBlock",
      title: "Title Block",
    },
  ],
  fields: [
    {
      name: "eyebrow",
      type: "string",
      title: "Eyebrow",
    },
    {
      name: "title",
      type: "string",
      title: "Title",
      description: "(required)",
      validation: (Rule: any) => Rule.required(),
      codegen: { required: true },
    },
    {
      name: "description",
      type: "text",
      title: "Description",
      description: "(required)",
      validation: (Rule: any) => Rule.required(),
      codegen: { required: true },
    },
    {
      name: "cards",
      type: "array",
      title: "Cards",
      description: "(required)",
      of: [
        {
          name: "card",
          type: "object",
          title: "Card",
          fields: [
            {
              name: "title",
              type: "string",
              title: "Title",
              description: "(required)",
              validation: (Rule: any) => Rule.required(),
              codegen: { required: true },
            },
            {
              name: "description",
              type: "string",
              title: "Description",
              description: "(required)",
              validation: (Rule: any) => Rule.required(),
              codegen: { required: true },
            },
            {
              name: "buttonLabel",
              type: "string",
              title: "Button Label",
              description: "(required)",
              validation: (Rule: any) => Rule.required(),
              codegen: { required: true },
            },
            {
              name: "destination",
              type: "string",
              title: "Destination",
              options: {
                list: [
                  { value: "share", title: "Share" },
                  { value: "donate", title: "Donate" },
                  { value: "shop", title: "Shop" },
                  { value: "partnerships", title: "Partnerships" },
                ],
                layout: "radio",
                direction: "vertical",
              },
              description: "(required)",
              validation: (Rule: any) => Rule.required(),
              codegen: { required: true },
            },
          ],
        },
      ],
      validation: (Rule: any) => Rule.required(),
      codegen: { required: true },
    },
  ],
};
