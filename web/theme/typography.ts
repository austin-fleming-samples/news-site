import { css } from 'styled-components';
import { breakpoints } from './breakpoints';
import { fonts } from './fonts';
import { fontSizes } from './fontSizes';
import { palette } from './palette';

// TODO: https://dev.to/arnonate/using-css-variables-to-tame-styled-component-props-2f9o
// https://www.joshwcomeau.com/css/styled-components/
// https://levelup.gitconnected.com/building-a-react-typography-system-f9d1c8e16d55

const h1 = css`
  ${fonts.secondary.bold}
  color: ${palette.text.main};
  line-height: 1.3;

  font-size: ${fontSizes.mobile.jumbo};
  @media ${breakpoints.tablet.query} {
    font-size: ${fontSizes.desktop.jumbo};
  }
`;

const h2 = css`
  ${fonts.secondary.bold}
  color: ${palette.text.main};
  line-height: 1.3;

  font-size: ${fontSizes.mobile.xxxl};
  @media ${breakpoints.tablet.query} {
    font-size: ${fontSizes.desktop.xxxl};
  }
`;

const h3 = css`
  ${fonts.secondary.bold}
  color: ${palette.text.main};
  line-height: 1.3;

  font-size: ${fontSizes.mobile.xxl};
  @media ${breakpoints.tablet.query} {
    font-size: ${fontSizes.desktop.xxl};
  }
`;

const h4 = css`
  ${fonts.secondary.bold}
  color: ${palette.text.main};
  line-height: 1.3;

  font-size: ${fontSizes.mobile.xl};
  @media ${breakpoints.tablet.query} {
    font-size: ${fontSizes.desktop.xl};
  }
`;

const h5 = css`
  ${fonts.secondary.bold}
  color: ${palette.text.main};
  line-height: 1.3;

  font-size: ${fontSizes.mobile.lg};
  @media ${breakpoints.tablet.query} {
    font-size: ${fontSizes.desktop.lg};
  }
`;

const h6 = css`
  ${fonts.secondary.bold}
  color: ${palette.text.main};
  line-height: 1.3;

  font-size: ${fontSizes.mobile.md};
  @media ${breakpoints.tablet.query} {
    font-size: ${fontSizes.desktop.md};
  }
`;

const subtitle1 = css`
  ${fonts.primary.regular}
  color: ${palette.text.main};
  text-transform: uppercase;
  letter-spacing: 0.05em;
  line-height: 1.3;

  font-size: ${fontSizes.mobile.base};
  @media ${breakpoints.tablet.query} {
    font-size: ${fontSizes.desktop.base};
  }
`;
const subtitle2 = css`
  ${fonts.primary.regular}
  color: ${palette.text.light};
  text-transform: uppercase;
  letter-spacing: 0.05em;
  line-height: 1.3;

  font-size: ${fontSizes.mobile.base};
  @media ${breakpoints.tablet.query} {
    font-size: ${fontSizes.desktop.base};
  }
`;

const body1 = css`
  ${fonts.primary.regular}
  color: ${palette.text.main};
  line-height: 1.3;

  font-size: ${fontSizes.mobile.base};
  @media ${breakpoints.tablet.query} {
    font-size: ${fontSizes.desktop.base};
  }
`;

const body2 = css`
  ${fonts.primary.regular}
  color: ${palette.text.light};
  line-height: 1.3;

  font-size: ${fontSizes.mobile.base};
  @media ${breakpoints.tablet.query} {
    font-size: ${fontSizes.desktop.base};
  }
`;

// HACK: for portable text
const bodyLarge = css`
  ${fonts.primary.regular}
  color: ${palette.text.main};
  line-height: 1.3;

  font-size: ${fontSizes.mobile.lg};
  @media ${breakpoints.tablet.query} {
    font-size: ${fontSizes.desktop.lg};
  }
`;

/* 
HACK: using desktop font size on mobile for font size < base.
Done because changing the scaling factor to decrease font sizes > base
also makes sub-base sizes larger on mobile.
*/
const caption = css`
  ${fonts.primary.regular}
  color: ${palette.text.light};
  text-transform: uppercase;
  letter-spacing: 0.05em;

  font-size: ${fontSizes.desktop.sm};
  @media ${breakpoints.tablet.query} {
    font-size: ${fontSizes.desktop.sm};
  }
`;

const overline = css`
  font-size: ${fontSizes.desktop.sm};
  text-transform: uppercase;
  @media ${breakpoints.tablet.query} {
    font-size: ${fontSizes.desktop.sm};
  }
`;

const button1 = css`
  ${fonts.primary.regular}
  color: ${palette.text.main};
  text-transform: uppercase;
  letter-spacing: 0.05em;
  line-height: 1;
  text-decoration: none;

  font-size: ${fontSizes.mobile.base};
  @media ${breakpoints.tablet.query} {
    font-size: ${fontSizes.desktop.base};
  }
`;

const button2 = css`
  ${fonts.primary.regular}
  color: ${palette.text.main};
  text-transform: uppercase;
  letter-spacing: 0.05em;
  line-height: 1;
  text-decoration: none;

  font-size: ${fontSizes.desktop.sm};
  @media ${breakpoints.tablet.query} {
    font-size: ${fontSizes.desktop.sm};
  }
`;

//

export const typography = Object.freeze({
  body1,
  body2,
  bodyLarge,
  button1,
  button2,
  caption,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  overline,
  subtitle1,
  subtitle2,
});

export type Typography = typeof typography;
