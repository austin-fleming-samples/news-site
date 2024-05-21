import type { Nullable } from '@typings/helpers';
import NextHead from 'next/head';
import type {
  /* HandledString,
  TwitterCardType,
  ImageUrl,
  Keywords,
  RobotsDirective,
  RobotsImageSize,
  RobotsSnippetDirective,
  FBObjectType,
  ImageMimeType,
  Locale,
  SiteName, */
  AuthorData,
} from './types';

// TODO: needs to default to 'webpage' with search info

const convertToMarkup = (jsonld: string) => ({ __html: jsonld });

const formatAuthors = (authors: Nullable<AuthorData | AuthorData[]>) => {
  if (authors && Array.isArray(authors)) {
    const stringifiedAuthors = authors.map(
      ({ name, profileUrl }) => `{"@type": "Person", "name": "${name}", "url":"${profileUrl}"`,
    );
    return `[${stringifiedAuthors}]`;
  }
  if (authors) {
    return `{"@type": "Person", "name": "${authors.name}", "url":"${authors.profileUrl}"`;
  }

  return '{}';
};

const formatDate = (date: Nullable<Date>) => (date ? date.toISOString() : date);

export const JsonLdNews = ({
  canonicalUrl,
  title,
  imageUrl,
  timePublished,
  timeModified,
  description,
  publisherName,
  publisherLogo,
  authors,
}: {
  authors: Nullable<AuthorData | AuthorData[]>;
  canonicalUrl: string;
  description: string;
  imageUrl: string;
  publisherLogo: string;
  publisherName: string;
  timeModified: Date;
  timePublished: Date;
  title: string;
}) => {
  const parsedTimePublished = formatDate(timePublished);
  const parsedTimeModified = formatDate(timeModified);

  const jsonld = `
    {
        "@context": "https://schema.org",
        "@type": "NewsArticle",
        "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": "${canonicalUrl}"
        },
        "headline": "${title}",
        "image": [${imageUrl}],
        "datePublished": "${parsedTimePublished}",
        "dateModified": "${parsedTimeModified || parsedTimePublished}",
        "author": ${formatAuthors(authors)},
        "publisher": {
            "@type": "Organization",
            "name": "${publisherName}",
            "logo": {
                "@type": "ImageObject",
                "url": "${publisherLogo}"
            }
        },
        "description": "${description}"
      }
    `;

  return (
    <NextHead>
      <script
        key='jsonld-newsarticle'
        dangerouslySetInnerHTML={convertToMarkup(jsonld)}
        type='application/ld+json'
      />
    </NextHead>
  );
};

export const JsonLdArticle = ({
  canonicalUrl,
  title,
  imageUrl,
  timePublished,
  timeModified,
  authors,
  description,
  publisherName,
  publisherLogo,
  keywords,
}: {
  authors: AuthorData | AuthorData[];
  canonicalUrl: string;
  description: string;
  imageUrl: string;
  keywords: string[];
  publisherLogo: string;
  publisherName: string;
  timeModified: Date;
  timePublished: Date;
  title: string;
}) => {
  const parsedTimePublished = formatDate(timePublished);
  const parsedTimeModified = formatDate(timeModified);

  const joinedKeywords = keywords && keywords.join(' ');

  const jsonld = `{
    "@context": "https://schema.org",
    "@type": "Article",
    "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": "${canonicalUrl}"
    },
    "headline": "${title}",
    "image": ["${imageUrl}"],
    "datePublished": "${parsedTimePublished}",
    "dateModified": "${parsedTimeModified || parsedTimePublished}",
    "author": ${formatAuthors(authors)},
    "keywords": "${joinedKeywords}",
    "publisher": {
        "@type": "Organization",
        "name": "${publisherName}",
        "logo": {
            "@type": "ImageObject",
            "url": "${publisherLogo}"
        }
    },
    "description": "${description}"
  }`;

  return (
    <NextHead>
      <script
        key='jsonld-article'
        dangerouslySetInnerHTML={convertToMarkup(jsonld)}
        type='application/ld+json'
      />
    </NextHead>
  );
};

type BreadCrumb = {
  itemUrl?: string;
  name: string;
};

export const JsonLdBreadCrumbs = ({ breadCrumbs }: { breadCrumbs: BreadCrumb[] }) => {
  const buildCrumbs = (crumbs: BreadCrumb[]) =>
    crumbs.map(({ name, itemUrl }, index: number) => ({
      '@type': 'ListItem',
      name,
      position: index + 1,
      ...(itemUrl && { item: itemUrl }),
    }));

  const builtBreadCrumbs = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'BreadCrumbList',
    itemListElement: buildCrumbs(breadCrumbs),
  });

  return (
    <NextHead>
      <script
        key='jsonld-breadcrumbs'
        dangerouslySetInnerHTML={convertToMarkup(builtBreadCrumbs)}
        type='application/ld+json'
      />
    </NextHead>
  );
};
