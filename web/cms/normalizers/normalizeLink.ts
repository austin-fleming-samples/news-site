import type { Link } from '@cms/types/codegen';
import { PAGE_REFERENCE_MAP, POST_TYPE_PAGE_MAP } from '@config/constants';
// TODO: centralize

type NormalizedLink = {
  asNewTab: boolean;
  isExternal: boolean;
  label: string;
  rel?: string;
  to: string;
};

export const normalizeLink = (link: Link): NormalizedLink => {
  if (!link || !link.destination || !link.label)
    throw new Error('Link data missing in "normalizeLink".');

  const { destination, label } = link;

  const { externalLink, internalPageReference, postTypePage, isSponsor, isTrusted } = destination;

  if (externalLink) {
    const relTags = ['noopener', 'noreferrer', isSponsor && 'sponsor', !isTrusted && 'nofollow']
      .filter((tag) => !!tag)
      .join(' ');

    return {
      asNewTab: true,
      isExternal: true,
      label,
      rel: relTags,
      to: externalLink,
    };
  }

  if (internalPageReference) {
    type PageReferenceType =
      | 'author'
      | 'quickreads'
      | 'quickquotes'
      | 'videoposts'
      | 'page'
      | 'cardseries';

    // TODO: [TS] properly destructure and type instead of doing it here.
    type InternalPageDestination = Required<{
      _type: PageReferenceType;
      slug: string;
    }>;
    const { slug, _type: pageType } = internalPageReference as unknown as InternalPageDestination;

    const pageRoute = PAGE_REFERENCE_MAP[`${pageType}`];
    const path = `${pageRoute}/${slug}`;

    return {
      asNewTab: false,
      isExternal: false,
      label,
      to: path,
    };
  }

  if (postTypePage) {
    const path = POST_TYPE_PAGE_MAP[`${postTypePage}`];

    return {
      asNewTab: false,
      isExternal: false,
      label,
      to: path,
    };
  }

  throw new Error(`Failed to parse link with label: "${label}" in normalizeLink.`);
};
