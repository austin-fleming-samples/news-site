import { createPreviewSubscriptionHook } from 'next-sanity';
import { clientPreviewConfig } from './clientConfig';

// TODO: write custom
// TODO: add document limit to general settings
export const usePreviewSubscription = createPreviewSubscriptionHook({
  ...clientPreviewConfig,
  documentLimit: 10_000,
});
