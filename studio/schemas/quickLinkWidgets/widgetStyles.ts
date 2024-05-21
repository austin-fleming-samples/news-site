export default {
  name: "widgetStyles",
  type: "object",
  title: "Widget Styles",
  description: "Style options for the widget.",
  fields: [
    {
      name: "color",
      type: "string",
      title: "Color",
      options: {
        list: [
          { title: "Blue Sky", value: "BLUE_SKY" },
          { title: "Blush", value: "BLUSH" },
          { title: "Lavender", value: "LAVENDER" },
          { title: "Mint", value: "MINT" },
          { title: "White", value: "WHITE" },
        ],
      },
      description: "(required) Background color of the widget.",
      validation: (Rule) =>
        Rule.required().error('Widget is missing a "Color" style.'),
      codegen: { required: true },
    },
  ],
};
