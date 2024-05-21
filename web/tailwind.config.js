/* const tailwindTypography = require('@tailwindcss/typography'); */
const defaultTheme = require('tailwindcss/defaultTheme');
const breakpoints = require('./theme/breakpointsModular');

module.exports = {
  content: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  /* plugins: [tailwindTypography], */
  theme: {
    extend: {
      colors: {
        alert: {
          contrast: `var(--ui-alert-fg)`,
          DEFAULT: `var(--ui-alert-bg)`,
          muted: `var(--ui-alert-bg--muted)`,
        },
        background: {
          DEFAULT: `var(--c-white)`,
          light: `var(--c-white--light)`,
          pale: `var(--c-white--pale)`,
        },
        blush: {
          DEFAULT: `var(--c-blush)`,
          muted: `var(--c-blush--light)`,
          pale: `var(--c-blush--pale)`,
        },
        error: {
          contrast: `var(--ui-error-fg)`,
          DEFAULT: `var(--ui-error-bg)`,
          muted: `var(ui-error-bg--muted)`,
        },
        info: {
          contrast: `var(--ui-info-fg)`,
          DEFAULT: `var(--ui-info-bg)`,
          muted: `var(--ui-info-bg--muted)`,
        },
        olive: {
          DEFAULT: `var(--c-olive)`,
          muted: `var(--c-olive--light)`,
          pale: `var(--c-olive--pale)`,
        },
        primary: {
          DEFAULT: `var(--c-black)`,
          muted: `var(--c-black--light)`,
          pale: `var(--c-black--pale)`,
        },
        sage: {
          DEFAULT: `var(--c-sage)`,
          muted: `var(--c-sage--light)`,
          pale: `var(--c-sage--pale)`,
        },
        success: {
          contrast: `var(--ui-success-fg)`,
          DEFAULT: `var(--ui-success-bg)`,
          muted: `var(--ui-success-bg--muted)`,
        },
      },
      fontFamily: {
        primary: ['Montserrat', ...defaultTheme.fontFamily.sans],
        secondary: ['Quattrocento', ...defaultTheme.fontFamily.serif],
        tertiary: ['Quattrocento Sans', ...defaultTheme.fontFamily.sans],
      },
      fontSize: {
        /* eslint-disable sort-keys-fix/sort-keys-fix */
        xs: `var(--fs-xs)`,
        sm: `var(--fs-sm)`,
        base: `var(--fs-base)`,
        lg: `var(--fs-lg)`,
        xl: `var(--fs-xl)`,
        '2xl': `var(--fs-2xl)`,
        '3xl': `var(--fs-3xl)`,
        '4xl': `var(--fs-4xl)`,
        '5xl': `var(--fs-5xl)`,
        '6xl': `var(--fs-6xl)`,
        '7xl': `var(--fs-7xl)`,
        '8xl': `var(--fs-8xl)`,
        '9xl': `var(--fs-9xl)`,
        /* eslint-enable sort-keys-fix/sort-keys-fix */
      },
      zIndex: {
        /* eslint-disable sort-keys-fix/sort-keys-fix */
        headerPrimary: 6000,
        headerSecondary: 5999,
        headerTertiary: 5000,
        overlay: 8000,
        modal: 9000,
        /* eslint-enable sort-keys-fix/sort-keys-fix */
      },
    },
    /* TODO: [style] have this be in a lib instead of styled components */
    screens: {
      // ESNOTE: Breakpoints break if not in descending order.
      /* eslint-disable sort-keys-fix/sort-keys-fix */
      sm: breakpoints.mobileLg.width,
      md: breakpoints.tablet.width,
      lg: breakpoints.desktop.width,
      xl: breakpoints.desktopLg.width,
      /* eslint-enable sort-keys-fix/sort-keys-fix */
    },
  },
};
