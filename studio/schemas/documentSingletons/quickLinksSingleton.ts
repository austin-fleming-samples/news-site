import { BiHide } from "react-icons/bi";
import { FaMailchimp, FaStripe, FaLink } from "react-icons/fa";


export default {
  name: "quickLinksSingleton",
  type: "document",
  title: "Quick Links",
  __experimental_actions: ["update", "publish", "create"],
  fields: [
    {
      // TODO: add warning if no widgets are provided
      name: "widgetList",
      type: "array",
      title: "Widgets",
      description:
        'Linktree style widget list for quickly listing useful links in one place. If no widgets are active, the page will be hidden from the site. Social media links at bottom of page can be edited in "General Settings".',
      of: [
        /* linkWidget */
        {
          name: "linkWidget",
          type: "linkWidget",
          title: "Link Widget",
          description: "When clicked, this widget takes the user to a URL.",
        },
        /* newsletterWidget */
        {
          name: "newsletterWidget",
          type: "newsletterWidget",
          title: "Newsletter Widget",
          description:
            "When clicked, the widget turns into a mini newsletter sign up form.",
        },
        /* contributionWidget */
        {
          name: "contributionWidget",
          type: "contributionWidget",
          title: "Contribution Widget",
          description:
            "When clicked, this widget turns into a contribution form.",
        },
      ],
    },
  ],
};
