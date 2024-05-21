import { BiHide } from "react-icons/bi";
import { FaMailchimp} from "react-icons/fa";


export default {
  name: "newsletterWidget",
  type: "object",
  title: "Newsletter Widget",
  description:
    "When clicked, the widget turns into a mini newsletter sign up form.",
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
        Rule.required().error(
          '"Newsletter Widget" is missing its label.'
        ),
        Rule.max(40).error(
          '"Newsletter Widget" label should be less than 40 characters.'
        ),
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
        media: isHidden ? BiHide : FaMailchimp,
      };
    },
  },
}