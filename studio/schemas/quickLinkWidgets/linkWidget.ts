import { BiHide } from "react-icons/bi";
import { FaLink } from "react-icons/fa";

export default {
  name: "linkWidget",
  type: "object",
  title: "Link Widget",
  description: "When clicked, this widget takes the user to a URL.",
  fields: [
    {
      name: "isHidden",
      type: "boolean",
      title: "Hide from Site",
      description: "If hidden, this item won't appear on the site.",
      initialValue: false,
    },
    {
      name: "widgetStyles",
      type: "widgetStyles",
      title: "Widget Styles",
      description: "(required) Style options for widget.",
      validation: (Rule) => Rule.required(),
      codegen: { required: true },
    },
    {
      name: "label",
      type: "string",
      title: "Label",
      description:
        "(required) The title that appears on the button. Should be brief as possible.",
      validation: (Rule) => [
        Rule.required().error('"Link Widget" is missing its label.'),
        Rule.max(40).error(
          '"Link Widget" label should be less than 40 characters.'
        ),
      ],
      codegen: { required: true },
    },
    {
      name: "to",
      type: "url",
      title: "Destination",
      description: "(required) URL for the link.",
      validation: (Rule) => [
        Rule.required().error(
          '"Link Widget" is missing a destination.'
        ),
        Rule.custom((value) => {
          if (!value) return true;

          return value.startsWith("https://")
            ? true
            : "URL must start with 'https://'";
        }),
      ],
      codegen: { required: true },
    },
  ],
  preview: {
    select: {
      label: "label",
      isHidden: "isHidden",
    },
    prepare({ label, isHidden }) {
      return {
        title: label || "Unlabeled",
        subtitle: isHidden && "Hidden",
        media: isHidden ? BiHide : FaLink,
      };
    },
  },
}