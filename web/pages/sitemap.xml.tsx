import { getClient } from '@cms/utils/getClient';
import { GetServerSideProps } from 'next';

/* TODO: add priority '1' for products when the ecommerce goes live */
/* TODO: [SEO] wtf is happening here? Something bad went down */
type PostProps = {
  lastmod: string;
  slug: string;
  type: string;
};
const postsQuery = `*[_type in ["quickquotes", "quickreads", "videoposts", "author", "page"] && defined(slug.current)]{'slug': slug.current, 'type': _type, 'lastmod': _updatedAt}`;

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  const BASE_URL = 'https://smarthernews.com';

  /* Pages */
  const postResults = await getClient(false).fetch<PostProps[]>(postsQuery);
  const postsXML = postResults
    .map(
      ({ slug, type, lastmod }) =>
        `<url>
        <loc>${`${BASE_URL}/${type}/${slug}`}</loc>
        <lastmod>${lastmod}</lastmod>
        <changefreq>monthly</changefreq>
        <priority>0.5</priority>
        </url>`,
    )
    .join('');

  const homeXML = `<url>
      <loc>${`${BASE_URL}/`}</loc>
      <lastmod>${new Date().toISOString()}</lastmod>
      <changefreq>daily</changefreq>
      <priority>1.0</priority>
    </url>
    `;

  /* Full Map */
  const sitemapXML = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${homeXML}
      ${postsXML}
    </urlset>
  `;

  res.setHeader('Content-Type', 'text/xml');
  res.write(sitemapXML);
  res.end();

  return {
    props: {},
  };
};

const Sitemap = () => null;

export default Sitemap;
