/* eslint react/button-has-type:"off", react/destructuring-assignment:"off" */
import type { HTMLProps } from 'react';
import type { Link as LinkProps } from 'cms/types/sanityTypes';
import NextLink from 'next/link';

type LinkDestinationProps = LinkProps['destination'];

// TODO: Can this be condensed into a reducer with REFERENCE_MAP?
const lookupPostTypePage = (postType: LinkDestinationProps['postTypePage']) => {
  const POST_TYPE_PAGE_MAP = Object.freeze({
    home: '/',
    quickquotes: '/quickquotes/all/1',
    quickreads: '/quickreads/all/1',
    search: '/search',
    videoposts: '/videoposts/all/1',
  });

  return postType && POST_TYPE_PAGE_MAP[postType];
};

// HACK: way too complicated
const buildReferencePath = (reference: LinkDestinationProps['internalPageReference']) => {
  if (!reference) return;

  const REFERENCE_MAP = Object.freeze({
    page: '/info',
    quickquotes: '/quickquotes',
    quickreads: '/quickreads',
    videoposts: '/videoposts',
  });

  const prefix = REFERENCE_MAP[reference._type];
  const slug = reference.slug.current;

  return `${prefix}/${slug}`;
};

// TODO: [future] fix this.
// HACK: Exporting is just to short circuit the button for the convenience of Navbar Links
export const getDestination = (destination: LinkDestinationProps) =>
  destination &&
  (destination.externalLink ||
    lookupPostTypePage(destination.postTypePage) ||
    buildReferencePath(destination.internalPageReference));

type ButtonProps = HTMLProps<HTMLButtonElement> & {
  linkData?: LinkProps;
};

export const Button = (props: ButtonProps) => {
  const { linkData, ...buttonFields } = props;

  if (linkData) {
    const destination = getDestination(linkData.destination);

    return destination ? (
      <NextLink passHref href={destination}>
        <a target={linkData.isBlankTarget ? '_blank' : '_self'}>{linkData.label}</a>
      </NextLink>
    ) : (
      <a key='brokenlink' href='#'>
        {linkData.label}
      </a>
    );
  }

  return <button {...buttonFields} type={props.type || 'button'} />;
};
