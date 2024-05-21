import { getSanityImage } from '@cms/images';
import NextImage from 'next/image';
import styled from 'styled-components';

const ImageWrapper = styled.figure`
  width: 100%;
  max-width: 500px;
  margin-right: auto;
  margin-left: auto;
  margin-top: ${({ theme }) => theme.layout.siteGutter(1)};
  margin-bottom: ${({ theme }) => theme.layout.siteGutter(1)};
`;

// TODO: [TS] "Node" needs typing
export const BlockImage = ({ node }: { node: any }) => {
  const imageData = getSanityImage(node, 1200);

  return (
    <ImageWrapper>
      <NextImage
        alt={imageData.alt}
        height={imageData.height}
        layout='responsive'
        src={imageData.source}
        width={imageData.width}
      />
    </ImageWrapper>
  );
};
