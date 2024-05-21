import type { ClientConfig } from 'next-sanity';

export const clientConfig: ClientConfig = Object.freeze({
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || '',
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '',
  // useCdn: process.env.NODE_ENV === 'production',
  useCdn: false,
});

export const clientPreviewConfig: ClientConfig = Object.freeze({
  ...clientConfig,
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
  withCredentials: true,
});
