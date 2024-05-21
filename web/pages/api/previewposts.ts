import { getSinglePost } from '@cms/getPosts';
import { withSentry } from '@sentry/nextjs';
import type { NextApiRequest, NextApiResponse } from 'next';

// TODO: close route option

const previewHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (!req?.query?.slug) return res.status(401).json('Invalid slug.');

  if (!req?.query?.type) return res.status(401).json('Invalid type.');

  if (req?.query?.secret !== process.env.SANITY_PREVIEW_SECRET)
    return res.status(401).json('Invalid token');

  const isPreview = true;

  const post = await getSinglePost(req.query.type, req.query.slug, isPreview);

  if (!post)
    return res
      .status(404)
      .json(`Could not find post with slug: ${req.query.slug} and type: ${req.query.type}`);

  const newPath = `/${req.query.type}/${req.query.slug}`;

  // TODO: [future] implement timeout
  const oneHourTimeout = 60 * 60;
  res.setPreviewData({});
  res.writeHead(307, { location: newPath });
  res.status(200).end('preview mode enabled');
};

export default withSentry(previewHandler);
