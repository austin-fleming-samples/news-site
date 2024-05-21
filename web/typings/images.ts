export type ImageFormat = 'jpg' | 'png' | 'gif' | 'webp';

export type NormalizedImage = {
  alt: string;
  format: string;
  height: number;
  src: string;
  width: number;
};
