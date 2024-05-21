export const icons = Object({
  light: '/sh_sunglasses_white.png',
  dark: '/sh_sunglasses_sage.png',
});

export const createCheckmark = (checkColor: string): string =>
  `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" fill="${checkColor}" viewBox="0 0 24 24" width="96px" height="96px"><path d="M 22.59375 3.5 L 8.0625 18.1875 L 1.40625 11.5625 L 0 13 L 8.0625 21 L 24 4.9375 Z"/></svg>`;
