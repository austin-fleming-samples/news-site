/* eslint sort-keys-fix/sort-keys-fix:"off" */
const PRIMARY_FONT = `'Montserrat', sans-serif`;
const SECONDARY_FONT = `'Quattrocento', serif`;
const TERTIARY_FONT = `'Quattrocento Sans', sans-serif`;

export const fonts = Object.freeze({
  primary: {
    light: `
            font-family: ${PRIMARY_FONT};
            font-weight: 200;
            font-style: normal;
        `,
    lightItalic: `
            font-family: ${PRIMARY_FONT};
            font-weight: 200;
            font-style: italic;
        `,
    regular: `
            font-family: ${PRIMARY_FONT};
            font-weight: 300;
            font-style: normal;
        `,
    regularItalic: `
            font-family: ${PRIMARY_FONT};
            font-weight: 300;
            font-style: italic;
        `,
    bold: `
            font-family: ${PRIMARY_FONT};
            font-weight: 700;
            font-style: normal;
        `,
    boldItalic: `
            font-family: ${PRIMARY_FONT};
            font-weight: 700;
            font-style: italic;
        `,
  },
  secondary: {
    regular: `
            font-family: ${SECONDARY_FONT};
            font-weight: 400;
            font-style: normal;
        `,
    regularItalic: `
            font-family: ${SECONDARY_FONT};
            font-weight: 400;
            font-style: italic;
        `,
    bold: `
            font-family: ${SECONDARY_FONT};
            font-weight: 700;
            font-style: normal;
        `,
    boldItalic: `
            font-family: ${SECONDARY_FONT};
            font-weight: 700;
            font-style: italic;
        `,
  },
  tertiary: {
    regular: `
            font-family: ${TERTIARY_FONT};
            font-weight: 400;
            font-style: normal;
        `,
    bold: `
            font-family: ${TERTIARY_FONT};
            font-weight: 700;
            font-style: normal;
        `,
  },
});

export type Fonts = typeof fonts;
