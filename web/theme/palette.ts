import { hexToRgba, shadeHexColor, tintHexColor } from '@lib/colors';

type PaletteColor = {
  contrastText: string;
  light: string;
  main: string;
  pale: string;
  paleContrastText: string;
};
type StatusColor = Pick<PaletteColor, 'main' | 'contrastText'>;

type StatusPalette = {
  alert: StatusColor;
  error: StatusColor;
  info: StatusColor;
  success: StatusColor;
};
export type Palette = {
  background: PaletteColor;
  blush: PaletteColor;
  olive: PaletteColor;
  primary: PaletteColor;
  sage: PaletteColor;
  status: StatusPalette;
  text: PaletteColor;
  white: PaletteColor;
};

const brandBlack = '#1f1f1f';
const brandWhite = '#FAFAFA';
const brandBlush = '#f8d8d5';
const brandSage = '#728778';
const brandOlive = '#2d4d42';

const brand = Object.freeze({
  blush: {
    main: brandBlush,
    shade: shadeHexColor(brandBlush),
    tint: tintHexColor(brandBlush),
  },
  sage: {
    _25: tintHexColor(brandSage)(25),
    _50: tintHexColor(brandSage)(50),
    _75: tintHexColor(brandSage)(25),
    main: brandSage,
    shade: shadeHexColor(brandSage),
    tint: tintHexColor(brandSage),
  },
});

// text is 75% shade
const status: StatusPalette = Object.freeze({
  alert: {
    contrastText: '#402D1A',
    main: '#ffb566',
  },
  error: {
    contrastText: '#402A2C',
    main: '#FFA8B1',
  },
  info: {
    contrastText: '#1A3640',
    main: '#66D6FF',
  },
  success: {
    contrastText: '#1D4036',
    main: '#73FFD7',
  },
});

const primary: PaletteColor = Object.freeze({
  contrastText: brandWhite,
  light: tintHexColor(brandBlack)(20),
  main: brandBlack,
  pale: tintHexColor(brandBlack)(80),
  paleContrastText: brandBlack,
});

const olive: PaletteColor = Object.freeze({
  contrastText: brandWhite,
  light: tintHexColor(brandOlive)(20),
  main: brandOlive,
  pale: tintHexColor(brandOlive)(85),
  paleContrastText: brandOlive,
});

const sage: PaletteColor = Object.freeze({
  contrastText: brandBlack,
  light: tintHexColor(brandSage)(20),
  main: brandSage,
  pale: tintHexColor(brandSage)(85),
  paleContrastText: brandOlive,
});

const blush: PaletteColor = Object.freeze({
  contrastText: brandBlack,
  light: tintHexColor(brandBlush)(20),
  main: brandBlush,
  pale: tintHexColor(brandBlush)(85),
  paleContrastText: brandBlack,
});

const white: PaletteColor = Object.freeze({
  contrastText: brandBlack,
  light: tintHexColor(brandWhite)(20),
  main: brandWhite,
  pale: tintHexColor(brandWhite)(85),
  paleContrastText: brandBlack,
});

const text: PaletteColor = primary;

const background: PaletteColor = white;

// https://maketintsandshades.com/
// https://webaim.org/resources/contrastchecker/
export const palette: Palette = Object.freeze({
  background,
  blush,
  olive,
  primary,
  sage,
  status,
  text,
  white,
});
