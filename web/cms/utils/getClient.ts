import { createClient } from 'next-sanity';
import { clientConfig, clientPreviewConfig } from './clientConfig';

export const getClient = (preview = false) =>
  createClient(preview ? clientPreviewConfig : clientConfig);
