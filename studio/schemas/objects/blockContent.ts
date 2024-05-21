import { BlockWithSpellCheck } from "../components/blockWithSpellcheck";

export default {
  title: "Block Content",
  name: "blockContent",
  type: "array",
  inputComponent: BlockWithSpellCheck,
  of: [
    {
      title: "Block",
      type: "block",
      options: {
        spellcheck: true,
      },
      styles: [
        { title: "Normal", value: "normal" },
        { title: "H1", value: "h1" },
        { title: "H2", value: "h2" },
        { title: "H3", value: "h3" },
        { title: "H4", value: "h4" },
        { title: "Quote", value: "blockquote" },
      ],
      lists: [
        { title: "Bullet", value: "bullet" },
        { title: "Numbered", value: "number" },
      ],
      marks: {
        decorators: [
          { title: "Strong", value: "strong" },
          { title: "Emphasis", value: "em" },
          { title: "Underline", value: "underline" },
          { title: "Strike", value: "strike-through" },
        ],
        annotations: [
          {
            title: "URL",
            name: "link",
            type: "object",
            fields: [
              {
                title: "URL",
                name: "href",
                type: "url",
              },
            ],
          },
          // HACK: TODO: reactivate
          /* {
            title: 'Link',
            name: 'complexLink',
            type: 'link'
          }, */
          {
            title: "idMarker",
            name: "ID Marker",
            type: "object",
            fields: [
              {
                title: "Title",
                name: "title",
                type: "string",
                description:
                  "use lowercase letters with no space, don't put a hashtag (#) at the start. For example: nameofsection",
              },
            ],
          },
        ],
      },
    },
    {
      type: "image",
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: "alt",
          title: "Alt",
          type: "string",
        },
      ],
    },
    {
      type: "youtube",
    },
    {
      type: "vimeo",
    },
    {
      type: "instagramPost",
    },
  ],
};
