import { FiAlignLeft } from "react-icons/fi";
import { CgAlignLeft } from "react-icons/cg";
import {
  ExternalLinkRenderer,
  LeftAlignRender,
  NormalAlignRender,
} from "./CardContentComponents";

// customBodyPortableText.js
import { BlockWithSpellCheck } from "../components/blockWithSpellcheck";

export default {
  title: "Card Content",
  name: "cardContent",
  type: "array",
  inputComponent: BlockWithSpellCheck,
  of: [
    {
      title: "Block",
      type: "block",
      options: {
        spellCheck: true,
      },
      styles: [
        {
          title: "Paragraph",
          value: "normal",
          blockEditor: {
            render: NormalAlignRender,
          },
        },
        {
          title: "H1",
          value: "h1",
          blockEditor: {
            render: NormalAlignRender,
          },
        },
        {
          title: "H2",
          value: "h2",
          blockEditor: {
            render: NormalAlignRender,
          },
        },
        {
          title: "H3",
          value: "h3",
          blockEditor: {
            render: NormalAlignRender,
          },
        },
        {
          title: "H4",
          value: "h4",
          blockEditor: {
            render: NormalAlignRender,
          },
        },
        {
          title: "Quote",
          value: "blockquote",
          blockEditor: {
            render: NormalAlignRender,
          },
        },
        {
          title:
            "Paragraph, Left Align" /* Legacy hack to deal with left-alignment. Is interpreted as <p className="leftAlign"/> on client side */,
          value: "h6",
          blockEditor: {
            icon: FiAlignLeft,
            render: LeftAlignRender,
          },
        },
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
          {
            title: "Left Align",
            value: "leftAlign",
            blockEditor: {
              icon: CgAlignLeft,
              render: LeftAlignRender,
            },
          },
        ],
        annotations: [
          // TODO: [future] refactor content so that 'link' is used.
          {
            title: "URL",
            name: "link",
            type: "object",
            blockEditor: {
              render: ExternalLinkRenderer,
            },
            fields: [
              {
                title: "URL",
                name: "href",
                type: "url",
              },
            ],
          },
        ],
      },
    },
  ],
};
