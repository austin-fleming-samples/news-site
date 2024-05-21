/* eslint @typescript-eslint/ban-types: 'off' */
import type { BlockContent as BlockContentProps } from '@cms/types/sanityTypes';
import NextLink from 'next/link';
import ReactPortableText from 'react-portable-text';
import { TextStyler } from './PortableText.Styled';
import { BlockImage, IDMarker, Instagram, SimpleLink, Vimeo, Youtube } from './typeComponents';

// TODO: link -> handle internal routing and open external links in new tab.
const buildSerializers = {
  'ID Marker': IDMarker,
  image: BlockImage,
  instagramPost: Instagram,
  link: SimpleLink,
  vimeo: Vimeo,
  youtube: Youtube,
};

// TODO: should headings be style only?
// HACK: 'textstyler'
export const PortableText = ({ blockContent }: { blockContent: BlockContentProps }) => (
  <TextStyler>
    <ReactPortableText
      className='portabletext'
      content={blockContent as [object]}
      serializers={buildSerializers}
    />
  </TextStyler>
);
