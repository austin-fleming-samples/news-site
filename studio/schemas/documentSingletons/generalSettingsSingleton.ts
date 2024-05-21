export default {
  name: "generalSettingsSingleton",
  type: "document",
  title: "General Settings",
  __experimental_actions: ["update", "publish"],
  fieldsets: [
    {
      name: "integrations",
      title: "Integrations",
      options: {
        collapsible: true,
        collapsed: false,
      },
    },
    {
      name: "contentSettings",
      title: "Content Settings",
      options: {
        collapsible: true,
        collapsed: false,
      },
    },
    {
      name: "socials",
      title: "Social Media",
      options: {
        collapsible: true,
        collapsed: false,
      },
    },
  ],
  fields: [
    {
      fieldset: "socials",
      name: "socialLinks",
      type: "socials",
      title: "Social Media Links",
      description:
        "(required) SHN's social media links. Appears in places such as the footer.",
      validation: Rule => Rule.required(),
      codegen: {required: true}
    },
    {
      fieldset: "socials",
      name: "sharePlatforms",
      type: "array",
      title: "Share Platforms",
      description:
        "(required) Determines which platforms there should be a 'share' button for on the site.",
      of: [{ type: "string" }],
      options: {
        list: [
          { value: "facebook", title: "Facebook" },
          { value: "linkedin", title: "LinkedIn" },
          { value: "twitter", title: "Twitter" },
          { value: "reddit", title: "Reddit" },
          { value: "email", title: "Email" },
          { value: "whatsapp", title: "WhatsApp" },
          { value: "telegram", title: "Telegram" },
        ],
        layout: "tags",
      },
      validation: (Rule: any) => Rule.min(1).required(),
      codegen: { required: true },
    },
    {
      name: "siteUrl",
      type: "string",
      title: "Site URL",
      initialValue: "https://www.smarthernews.com",
      readOnly: true,
      description: "For reference. Contact developer to modify.",
      validation: (Rule: any) =>
        Rule.required().error('"Site URL" is missing.'),
      codegen: { required: true },
    },
    {
      fieldset: "contentSettings",
      name: "postsPerPage",
      type: "number",
      title: "Posts per Page",
      description:
        'For pages such as "all posts" and search results, how many articles should be displayed per page.',
      validation: (Rule: any) => [
        Rule.required().error('"Posts per Page" is missing.'),
        Rule.integer()
          .positive()
          .min(4)
          .error(
            "Must be a whole number not less than 4. For example: 12✅ 12.5❌"
          ),
        Rule.custom(
          (num: number) =>
            !num ||
            num % 4 === 0 ||
            "Must be a multiple of 4. For example: 20, 24, 28"
        ),
      ],
      codegen: { required: true },
    },
    {
      fieldset: "contentSettings",
      title: "Prerendered Posts",
      name: "prerenderedPosts",
      description:
        'How many pages should be prerendered when the site is deployed. More prerendered pages means more "fast" pages after deployment; however, more prerendered pages mean slower deployments and potentially higher hosting fees.',
      type: "number",
      validation: (Rule: any) => [
        Rule.integer()
          .positive()
          .min(0)
          .error("Must be a whole number. For example: 12✅ 12.5❌"),
        Rule.required().error('"Prerendered Posts" is missing.'),
      ],
      codegen: { required: true },
    },
    {
      fieldset: "integrations",
      name: "googleAnalyticsGtagID",
      type: "string",
      title: "Google Analytics GTag ID",
      description:
        "The gtag can be found in the analytics embed. Looks like: https://www.googletagmanager.com/gtag/js?id=THIS_IS_THE_GTAG",
    },
    {
      fieldset: "integrations",
      name: "mailchimpActionUrl",
      type: "url",
      title: "URL to Mailchimp signup",
      description:
        "URL for the Mailchimp signup form (action url). Remember to add your domain in your mailchimp settings to avoid CORS errors.",
      codegen: { required: true },
      validation: (Rule: any) =>
        Rule.required().error('"URL to Mailchimp signup" is missing.'),
    },
  ],
};
