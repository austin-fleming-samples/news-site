// ESNOTE: reverses typical meta tag property order, causing legibility issues
/* eslint-disable react/jsx-sort-props */

import React from 'react';
import { DEFAULT_COLOR_SCHEME } from '@config/constants';
import type { DocumentContext } from 'next/document';
import Document, { Head, Html, Main, NextScript } from 'next/document';
import { ServerStyleSheet } from 'styled-components';

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const sheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App) => (props) => sheet.collectStyles(<App {...props} />),
        });

      const initialProps = await Document.getInitialProps(ctx);

      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        ),
      };
    } finally {
      sheet.seal();
    }
  }

  render() {
    return (
      <Html lang='en'>
        <Head>
          {/* FONTS */}
          <link rel='preconnect' href='https://fonts.googleapis.com' />
          <link rel='preconnect' href='https://fonts.gstatic.com' />
          <link
            rel='stylesheet'
            href='https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,200;0,300;0,700;1,200;1,300;1,700&display=swap'
            crossOrigin='anonymous'
          />
          <link
            rel='stylesheet'
            href='https://fonts.googleapis.com/css2?family=Quattrocento+Sans:ital,wght@0,400;0,700;1,400;1,700&display=swap'
            crossOrigin='anonymous'
          />
          <link
            rel='stylesheet'
            href='https://fonts.googleapis.com/css2?family=Quattrocento:wght@400;700&display=swap'
            crossOrigin='anonymous'
          />
          {/* FAVICONS */}
          <link rel='apple-touch-icon' href='/apple-icon-57x57.png' sizes='57x57' />
          <link rel='apple-touch-icon' href='/apple-icon-60x60.png' sizes='60x60' />
          <link rel='apple-touch-icon' href='/apple-icon-72x72.png' sizes='72x72' />
          <link rel='apple-touch-icon' href='/apple-icon-76x76.png' sizes='76x76' />
          <link rel='apple-touch-icon' href='/apple-icon-114x114.png' sizes='114x114' />
          <link rel='apple-touch-icon' href='/apple-icon-120x120.png' sizes='120x120' />
          <link rel='apple-touch-icon' href='/apple-icon-144x144.png' sizes='144x144' />
          <link rel='apple-touch-icon' href='/apple-icon-152x152.png' sizes='152x152' />
          <link rel='apple-touch-icon' href='/apple-icon-180x180.png' sizes='180x180' />
          <link rel='icon' href='/android-icon-192x192.png' sizes='192x192' type='image/png' />
          <link rel='icon' href='/favicon-32x32.png' sizes='32x32' type='image/png' />
          <link rel='icon' href='/favicon-96x96.png' sizes='96x96' type='image/png' />
          <link rel='icon' href='/favicon-16x16.png' sizes='16x16' type='image/png' />
          <link rel='manifest' href='/manifest.json' />
          <meta name='msapplication-TileColor' content='#ffffff' />
          <meta name='msapplication-TileImage' content='/ms-icon-144x144.png' />
          <meta name='theme-color' content='#ffffff' />
          <meta key='color-scheme' name='color-scheme' content={DEFAULT_COLOR_SCHEME} />
        </Head>
        <body className='overscroll-none'>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
