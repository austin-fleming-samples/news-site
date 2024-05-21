import '@styles/globals.css';
import { Layout, Providers, Seo } from '@components/common';
import { defaultSettings } from '@config/preval';
import type { AppProps } from 'next/app';
import 'keen-slider/keen-slider.min.css';
import NextHead from 'next/head';
import { ReactNode } from 'react';

const { seo, generalSettings } = defaultSettings;

const {
  defaultImage,
  fallbackAuthor,
  keywords,
  locale,
  siteUrl,
  siteName,
  siteDescription,
  twitterHandle,
  twitterCardType,
  publisherLogo,
  squarePublisherLogo,
  title,
} = seo;

const {
  alt: defaultImageAlt,
  format: defaultImageFormat,
  width: defaultImageWidth,
  height: defaultImageHeight,
  src: defaultImageSrc,
} = defaultImage;

const WithLayout = ({ children, showLayout }: { children: ReactNode; showLayout: boolean }) =>
  showLayout ? <Layout>{children}</Layout> : <>{children}</>;

const MyApp = ({ Component, pageProps }: AppProps) => {
  // HACK: Layout should be applied per page instead of running this exclusion function for pages without layout.

  // ESNOTE: one-time application of any to simplify adding layout component
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const showLayout = !(Component as any).hideLayout;

  return (
    <Providers>
      {/* <DefaultSeo {...seoDefaults} /> */}
      <NextHead>
        <meta content='text/html; charset=utf-8' httpEquiv='Content-Type' />
        <meta content='minimum-scale=1, initial-scale=1, width=device-width' name='viewport' />
      </NextHead>
      <Seo
        // TODO: [SEO] audit hard-coded. Should these be in the page builder instead?
        canonicalUrl={siteUrl}
        // TODO: [SEO] should this be set here?
        contentTier='free'
        contentType='website'
        description={siteDescription}
        imageAlt={defaultImageAlt}
        imageHeight={defaultImageHeight}
        imageType={defaultImageFormat}
        imageUrl={defaultImageSrc}
        imageWidth={defaultImageWidth}
        keywords={keywords}
        locale={locale}
        pageTitle={title}
        robots='all'
        siteName={siteName}
        siteTitle={title}
        siteTwitterHandle={twitterHandle}
        twitterCardType={twitterCardType}
      />
      <NextHead>
        {/* 
      TODO: [future] Pull from CMS
      Google Analytics */}
        <script
          async
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}`}
        />
        <script
          /* eslint-disable react/no-danger */
          dangerouslySetInnerHTML={{
            __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}', {
              page_path: window.location.pathname,
            });
          `,
          }}
          /* eslint-enable react/no-danger */
        />
      </NextHead>
      <WithLayout showLayout={showLayout}>
        <Component {...pageProps} />
      </WithLayout>
    </Providers>
  );
};
export default MyApp;
