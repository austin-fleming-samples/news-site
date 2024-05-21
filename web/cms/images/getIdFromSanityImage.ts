import type { SanityImageSource } from '@sanity/image-url/lib/types/types';

export const getIdFromSanityImage = (imageAsset: SanityImageSource) => {
  // Note: Unpack Sanity abstraction
  type ImageAsset = {
    asset: {
      _ref: string;
    };
  };

  // Note: imageAsset format follows: image-<id>-<width>x<height>-png
  return (imageAsset as ImageAsset).asset._ref;
};
