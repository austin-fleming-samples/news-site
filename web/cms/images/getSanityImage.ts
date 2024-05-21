import { getDimensionsFromSanityImage } from '@cms/images';
import { placeholderImage } from './placeholderImage';
import { urlFor } from './urlFor';

// TODO: [SEO] update type to use normalized image
export type ImageDataProps = {
  alt?: string;
  aspectRatio: number;
  height: number;
  source: string;
  width: number;
};

// TODO: [SEO] remove commented code once verified
/* const constructImageData = (imageSource: string) =>
  Object.freeze({
    source: imageSource,
    ...getDimensionsFromSanityImage(imageSource),
    // ...getImageDimensions(imageSource),
  }); */

const resizeImageData = (imageData: ImageDataProps, targetWidth: number) =>
  Object.freeze({
    ...imageData,
    height: targetWidth / (imageData.width / imageData.height),
    width: targetWidth,
  });

// TODO: [SEO] refactor calls to match normalized image
export const getSanityImage = (imageObject: any, targetWidth?: number): ImageDataProps => {
  const maybeImageSource = imageObject && urlFor(imageObject);

  // TODO: [future] cleanup
  /* const preprocessImageData = maybeImageSource
    ? constructImageData(maybeImageSource)
    : placeholderImage; */
  const preprocessImageData = maybeImageSource
    ? {
        source: maybeImageSource,
        ...getDimensionsFromSanityImage(imageObject),
      }
    : placeholderImage;

  const imageData = targetWidth
    ? resizeImageData(preprocessImageData, targetWidth)
    : preprocessImageData;

  return Object.freeze({
    ...imageData,
    alt: imageObject.alt || placeholderImage.alt,
  });
};
