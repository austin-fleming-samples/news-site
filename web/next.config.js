/** @type {import('next').NextConfig} */

/* 
PLUGINS
*/

// REF: https://flaviocopes.com/nextjs-analyze-app-bundle/
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});
const { withSentryConfig } = require('@sentry/nextjs');
const createNextPluginPreval = require('next-plugin-preval/config');

/* 
CONSTANTS
*/

/* const ALLOWED_IMAGE_ORIGINS = ['sanity.io', ...(process.env.DEVELOPMENT ? ['localhost:3000'] : [])];
const ALLOWED_IFRAME_ANCESTORS = 'https://smarthernews-studio.sanity.studio/*';
const ALLOWED_FONT_SOURCES = 'fonts.googleapis.com'; */

/* 
PLUGIN PREPPING
*/
const withNextPluginPreval = createNextPluginPreval();

const configuredSentryPlugin = (nextjsConfig) =>
  withSentryConfig(nextjsConfig, {
    silent: true, // Suppresses all logs
    // For all available options, see:
    // https://github.com/getsentry/sentry-webpack-plugin#options.
  });

/* 
VERIFY ENV VARS ARE ALL SET
*/
const getEnvValue = (envKey) => process.env[envKey];

const isNonEmptyString = (maybeString) =>
  typeof maybeString === 'string' && maybeString.trim().length > 0;

const checkEnvFilesAreDefined = (variableKeys) =>
  variableKeys.forEach((varKey) => {
    const value = getEnvValue(varKey);

    if (!isNonEmptyString(value))
      throw new Error(
        `\n\n\n~~~~~~\n\nFAILED ENVIRONMENTAL VARIABLE CHECK:\nno value found for "${varKey}".\n\n~~~~~~\n\n\n`,
      );
  });

checkEnvFilesAreDefined([
  'CONTACT_FORM_RECEIVING_EMAIL',
  'EMAIL_BOT_PASSWORD',
  'EMAIL_BOT_ADDRESS',
  'SENTRY_AUTH_TOKEN',
  'NEXT_PUBLIC_SANITY_API_VERSION',
  'NEXT_PUBLIC_SANITY_DATASET',
  'NEXT_PUBLIC_SANITY_PROJECT_ID',
  'SANITY_API_TOKEN',
  'SANITY_PREVIEW_SECRET',
  'NEXT_PUBLIC_MAILCHIMP_URL',
  'NEXT_PUBLIC_GOOGLE_ANALYTICS',
  'NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY',
  'STRIPE_SECRET_KEY',
  'NEXT_PUBLIC_STRIPE_API_VERSION',
  'NEXT_PUBLIC_PRODUCTION_URL',
  'NEXT_PUBLIC_DEVELOPMENT_URL',
]);

/* 
CONFIGS
*/

const headers = async () => [
  {
    headers: [
      {
        key: 'Permissions-Policy',
        value: 'camera=(), microphone=(), geolocation=(self)',
      },
      /* NOTE: may want to create a unique one for pages
      with previews then block all iframes as a general rule.
      https://nextjs.org/docs/api-reference/next.config.js/headers */
      /* {
        key: 'Content-Security-Policy',
        value: `default-src 'self'; font-src 'self' ${ALLOWED_FONT_SOURCES}; img-src 'self' ${ALLOWED_IMAGE_ORIGINS}; script-src 'self'; frame-ancestors ${ALLOWED_IFRAME_ANCESTORS}`,
      }, */
      {
        key: 'X-DNS-Prefetch-Control',
        value: 'on',
      },
      // NOTE: not explicitly needed as Vercel injects
      {
        key: 'Strict-Transport-Security',
        value: 'max-age=63072000; includeSubDomains; preload',
      },
      {
        key: 'X-XSS-Protection',
        value: '1; mode=block',
      },
      // NOTE: could be culprit for card download bugs
      {
        key: 'X-Content-Type-Options',
        value: 'nosniff',
      },
      {
        key: 'Referrer-Policy',
        value: 'origin-when-cross-origin',
      },
    ],
    source: '/(.*)',
  },
  // https://nextjs.org/docs/advanced-features/security-headers
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy
  /* {
    headers: [
      {
        key: 'Content-Security-Policy',
        value: `default-src 'self' *.sanity.io static.addtoany.com fonts.gstatic.com *.sentry.io *.googleapis.com *.googletagmanager.com *.icons8.com; script-src 'self' 'unsafe-inline' 'unsafe-eval' www.googletagmanager.com static.addtoany.com; font-src fonts.gstatic.com fonts.googleapis.com; img-src 'self' data: img.icons8.com cdn.sanity.io; style-src 'self' 'unsafe-inline' fonts.googleapis.com static.addtoany.com;`,
      },
    ],
    source: '/quickreads/:pid',
  }, */
];

const redirects = async () => [
  {
    destination: '/quickreads/:pid',
    permanent: true,
    source: '/quick_reads/:pid',
  },
  {
    destination: '/quickquotes/:pid',
    permanent: true,
    source: '/quick_quotes/:pid',
  },
  {
    destination: '/videoposts/:pid',
    permanent: true,
    source: '/video_posts/:pid',
  },
];

const typescript = {
  // HACK: disable later.
  ignoreBuildErrors: true,
};

const eslint = {
  // HACK: disable later.
  ignoreDuringBuilds: true,
};

const images = {
  domains: ['cdn.sanity.io'],
};

/* 
EXPORTS
*/

const moduleExports = {
  eslint,
  experimental: {
    // REF: https://nextjs.org/docs/advanced-features/output-file-tracing#how-it-works
    outputStandalone: true,
    styledComponents: true,
  },
  headers,
  images,
  reactStrictMode: true,
  redirects,
  typescript,
};

module.exports = configuredSentryPlugin(withNextPluginPreval(withBundleAnalyzer(moduleExports)));
