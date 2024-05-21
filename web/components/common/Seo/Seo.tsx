// ESNOTE: reverses typical metatag property order, causing legibility issues
/* eslint-disable react/jsx-sort-props */
import { isNullish } from '@lib/valueChecks';
import NextHead from 'next/head';
import type {
  HandledString,
  TwitterCardType,
  Keywords,
  RobotsDirective,
  RobotsImageSize,
  RobotsSnippetDirective,
  FBObjectType,
  ImageMimeType,
  Locale,
  SiteName,
  ContentTier,
} from './types';

// TODO: have special requirements for "Default" to make sure it applies when in "_app"

// https://moz.com/blog/meta-data-templates-123
// https://developers.facebook.com/docs/sharing/webmasters/optimizing
// https://developers.facebook.com/docs/sharing/webmasters
// https://ogp.me/
// images should be 1200x630 to 1200x1200. File size under 1mb.

// TODO: [app] add app tags once they're created
// TODO: [podcast] may need to add audio og tags for podcasts

// TODO: [auth addition] make sure article:content_tier property follows paywall.
// TODO: [future] figure out the article:opinion use case.

const TwitterMeta = ({
  title,
  description,
  imageUrl,
  imageAlt,
  cardType,
  siteHandle,
  creatorHandle,
  videoUrl,
  videoWidth,
  videoHeight,
}: {
  cardType: TwitterCardType;
  creatorHandle: HandledString;
  description: string;
  imageAlt: string;
  imageUrl: string;
  siteHandle: HandledString;
  title: string;
  videoHeight: number;
  videoUrl: string;
  videoWidth: number;
}) => (
  <NextHead>
    {cardType && <meta key='twitter:card' name='twitter:card' content={cardType} />}
    {title && <meta key='twitter:title' name='twitter:title' content={title} />}
    {description && (
      <meta key='twitter:description' name='twitter:description' content={description} />
    )}
    {imageUrl && (
      <>
        <meta key='twitter:image' name='twitter:image' content={imageUrl} />
        {imageAlt && <meta key='twitter:image:alt' name='twitter:image:alt' content={imageAlt} />}
      </>
    )}

    {siteHandle && <meta key='twitter:site' name='twitter:site' content={siteHandle} />}
    {creatorHandle && <meta key='twitter:creator' name='twitter:creator' content={creatorHandle} />}
    {videoUrl && (
      <>
        <meta key='twitter:player' name='twitter:player' content={videoUrl} />
        {videoWidth && (
          <meta key='twitter:videoWidth' name='twitter:videoWidth' content={`${videoWidth}`} />
        )}
        {videoHeight && (
          <meta key='twitter:videoHeight' name='twitter:videoHeight' content={`${videoHeight}`} />
        )}
      </>
    )}
  </NextHead>
);

const StandardMeta = ({
  title,
  description,
  keywords,
  canonicalUrl,
  robots,
  robotsImage,
  robotsSnippet,
  isHomePage,
}: {
  canonicalUrl: string;
  description: string;
  isHomePage: boolean;
  keywords: Keywords;
  robots: RobotsDirective;
  robotsImage: RobotsImageSize;
  robotsSnippet: RobotsSnippetDirective;
  title: string;
}) => {
  let robotsRules = `${robots}`;

  if (robotsImage) {
    robotsRules = [robotsRules, robotsImage].join(', ');
  }

  if (robotsSnippet) {
    robotsRules = [robotsRules, robotsSnippet].join(', ');
  }

  return (
    <NextHead>
      {title && <title key='title'>{title}</title>}
      {canonicalUrl && <link key='canonical-url' rel='canonical' href={canonicalUrl} />}
      {isHomePage && <meta key='homepage' name='homepage' content={`${isHomePage}`} />}
      {robotsRules && <meta key='robots-rules' name='robots' content={robotsRules} />}
      {description && <meta key='description' name='description' content={description} />}
      {keywords && <meta key='keywords' name='keywords' content={keywords.join(', ')} />}
    </NextHead>
  );
};

const FacebookMeta = ({
  authorProfileUrl,
  contentType,
  canonicalUrl,
  description,
  imageUrl,
  imageAlt,
  imageType,
  imageWidth,
  imageHeight,
  isOpinionPiece,
  locale = 'en_US',
  publisherProfileUrl,
  siteName,
  keywords,
  timePublished,
  timeModified,
  title,
  videoHeight,
  videoUrl,
  videoWidth,
  contentTier,
}: {
  authorProfileUrl: string;
  canonicalUrl: string;
  contentTier: ContentTier;
  contentType: FBObjectType;
  description: string;
  imageAlt: string;
  imageHeight: number;
  imageType: ImageMimeType;
  imageUrl: string;
  imageWidth: number;
  isOpinionPiece: boolean;
  keywords: Keywords;
  locale: Locale;
  publisherProfileUrl: string;
  siteName: SiteName;
  timeModified: Date;
  timePublished: Date;
  title: string;
  videoHeight: number;
  videoUrl: string;
  videoWidth: number;
  // ESNOTE: this is simply a complex function
  // eslint-disable-next-line sonarjs/cognitive-complexity
}) => {
  const mimeType = imageType && `image/${imageType}`;

  const formattedTimePublished = timePublished?.toISOString();
  const formattedTimeModified = timeModified?.toISOString();

  return (
    <NextHead>
      {canonicalUrl && <meta key='og:url' property='og:url' content={canonicalUrl} />}
      {title && <meta key='og:title' property='og:title' content={title} />}
      {/* no prefix. just smarthernews.com */}
      {siteName && <meta key='og:site_name' property='og:site_name' content={siteName} />}
      {locale && <meta key='og:locale' property='og:locale' content={locale} />}
      {contentType && <meta key='og:type' property='og:type' content={contentType} />}
      {description && <meta key='og:description' property='og:description' content={description} />}
      {imageUrl && (
        <>
          <meta key='og:image' property='og:image' content={imageUrl} />
          {imageAlt && <meta key='og:image:alt' property='og:image:alt' content={imageAlt} />}
          {mimeType && <meta key='og:image:type' property='og:image:type' content={mimeType} />}
          {imageHeight && (
            <meta key='og:image:height' property='og:image:height' content={`${imageHeight}`} />
          )}
          {imageWidth && (
            <meta key='og:image:width' property='og:image:width' content={`${imageWidth}`} />
          )}
        </>
      )}
      {videoUrl && (
        <>
          <meta key='og:video' property='og:video' content={videoUrl} />
          <meta key='og:video:secure_url' property='og:video:secure_url' content={videoUrl} />
          {videoWidth && (
            <meta key='og:video:width' property='og:video:width' content={`${videoWidth}`} />
          )}
          {videoHeight && (
            <meta key='og:video:height' property='og:video:height' content={`${videoHeight}`} />
          )}
        </>
      )}

      {formattedTimePublished && (
        <meta
          key='article:published_time'
          property='article:published_time'
          content={formattedTimePublished}
        />
      )}
      {formattedTimeModified && (
        <meta
          key='article:modified_time'
          property='article:modified_time'
          content={formattedTimeModified}
        />
      )}
      {contentTier && (
        <meta key='article:content_tier' property='article:content_tier' content={contentTier} />
      )}
      {!isNullish(isOpinionPiece) && (
        <meta key='article:opinion' property='article:opinion' content={`${isOpinionPiece}`} />
      )}
      {keywords && keywords.length > 0 && (
        <meta key='article:tag' property='article:tag' content={keywords.join(', ')} />
      )}
      {publisherProfileUrl && (
        <meta key='article:publisher' property='article:publisher' content={publisherProfileUrl} />
      )}
      {authorProfileUrl && (
        <meta key='article:author' property='article:author' content={authorProfileUrl} />
      )}
    </NextHead>
  );
};

/*
    TODO: [SEO] set all item requirement as follows:

    rd - req'd for default
    nd - not req'd for default
    ra - req'd for articles
    na - not req'd for articles
*/
export const Seo = ({
  authorProfileUrl,
  authorTwitterHandle, // nd, ra
  canonicalUrl,
  contentTier,
  contentType,
  description,
  imageAlt,
  imageHeight,
  imageType,
  imageUrl,
  imageWidth,
  isHomePage, // nd
  isOpinionPiece,
  publisherProfileUrl,
  keywords,
  locale,
  robots,
  robotsImage, // nd
  robotsSnippet, // nd
  siteName,
  pageTitle,
  siteTwitterHandle,
  timeModified, // nd, ra
  timePublished, // nd, ra
  twitterCardType,
  videoHeight,
  videoUrl,
  videoWidth,
}: {
  authorProfileUrl: string;
  authorTwitterHandle: HandledString;
  canonicalUrl: string;
  contentTier: ContentTier;
  contentType: FBObjectType;
  description: string;
  imageAlt: string;
  imageHeight: number;
  imageType: ImageMimeType;
  imageUrl: string;
  imageWidth: number;
  isHomePage: boolean;
  isOpinionPiece: boolean;
  keywords: Keywords;
  locale: Locale;
  pageTitle: string;
  publisherProfileUrl: string;
  robots: RobotsDirective;
  robotsImage: RobotsImageSize;
  robotsSnippet: RobotsSnippetDirective;
  siteName: SiteName;
  siteTwitterHandle: HandledString;
  timeModified: Date;
  timePublished: Date;
  twitterCardType: TwitterCardType;
  videoHeight: number;
  videoUrl: string;
  videoWidth: number;
}) => {
  // TODO: [SEO] should date parsing be at this level?
  // TODO: [SEO] use author. Split apart for og tags.
  const validatedDescription =
    description && description.length > 150 ? `${description.slice(0, 150)}...` : description;

  // TODO: [SEO] implement. Avoid applying both image and video tabs.
  /* const previewType = videoUrl ? 'VIDEO' : 'IMAGE'; */

  return (
    <>
      <StandardMeta
        canonicalUrl={canonicalUrl}
        description={validatedDescription}
        isHomePage={isHomePage}
        keywords={keywords}
        robots={robots}
        robotsImage={robotsImage}
        robotsSnippet={robotsSnippet}
        title={pageTitle}
      />
      <FacebookMeta
        authorProfileUrl={authorProfileUrl}
        canonicalUrl={canonicalUrl}
        contentTier={contentTier}
        contentType={contentType}
        description={validatedDescription}
        imageAlt={imageAlt}
        imageHeight={imageHeight}
        imageType={imageType}
        imageUrl={imageUrl}
        imageWidth={imageWidth}
        isOpinionPiece={isOpinionPiece}
        keywords={keywords}
        locale={locale}
        publisherProfileUrl={publisherProfileUrl}
        siteName={siteName}
        timeModified={timeModified || timePublished}
        timePublished={timePublished}
        title={pageTitle}
        videoHeight={videoHeight}
        videoUrl={videoUrl}
        videoWidth={videoWidth}
      />
      <TwitterMeta
        cardType={twitterCardType}
        creatorHandle={authorTwitterHandle}
        description={validatedDescription}
        imageAlt={imageAlt}
        imageUrl={imageUrl}
        siteHandle={siteTwitterHandle}
        title={pageTitle}
        videoHeight={videoHeight}
        videoUrl={videoUrl}
        videoWidth={videoWidth}
      />
    </>
  );
};
