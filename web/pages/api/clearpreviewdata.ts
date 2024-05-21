import { withSentry } from '@sentry/nextjs';
import type { NextApiRequest, NextApiResponse } from 'next';

// TODO: use this option to close preview. Find how to use in sanity when preview is closed.

const previewHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  res.clearPreviewData();
  res.end('preview data cleared');
};

export default withSentry(previewHandler);
