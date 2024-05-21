import { getSanityImage } from '@cms/images';
import NextImage from 'next/image';
import { StyledWrapper } from './AspectImage.styled';

type AspectImageProps = {
  aspectRatio?: number;
  // HACK: make required to catch where it breaks.
  fillContainer?: boolean;
  image: any; // TODO: [TS] needs typing
  sizes?: string;
};

// TODO: fallback sizes w/ console warning
export const AspectImage = ({
  image,
  aspectRatio = 1,
  sizes,
  fillContainer = false,
}: AspectImageProps) => {
  const paddingPercentage = (1 / aspectRatio) * 100;

  // HACK: is probably causing a lot of calls.
  // Should this entire block be only on mount?
  // Can this fetch be done only at build time?
  const imageData = getSanityImage(image);

  return (
    <StyledWrapper bottomPaddingPercentage={paddingPercentage} fillContainer={fillContainer}>
      <NextImage
        alt={imageData.alt}
        layout='fill'
        objectFit={image?.isContained ? 'contain' : 'cover'}
        sizes={sizes}
        src={imageData.source}
      />
    </StyledWrapper>
  );
};
