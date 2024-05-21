/*
  A generic, general use page. For example: privacy policy, about, media relations
*/
import { getSinglePage, singlePageQuery } from '@cms/getPages';
import { usePreviewSubscription } from '@cms/utils/getPreviewSubscription';
import { Loading, Seo } from '@components/common';
import { RenderSections } from '@components/sections';
import { defaultSettings } from '@config/preval';
import type { GetStaticPaths } from 'next';
import Error from 'next/error';
import { useRouter } from 'next/router';

const { seo } = defaultSettings;

// TODO: fallback:'blocking' is better for seo. prebuild first MAX_POSTS_PER_PAGE so home is good. Keep for 'search' and 'typologies'
export const getStaticPaths: GetStaticPaths = async () => ({
  fallback: 'blocking',
  paths: [],
});

type StaticProps = {
  params: {
    slug: string;
  };
  preview: boolean;
};

export const getStaticProps = async ({ params, preview = false }: StaticProps) => {
  const { slug } = params;

  const initialData = await getSinglePage(slug, preview);

  return {
    props: {
      initialData,
      preview,
    },
  };
};

type UnwrapPromise<T> = T extends Promise<infer U> ? U : T;
type Props = UnwrapPromise<ReturnType<typeof getStaticProps>>['props'];

const InfoPage = ({ preview, initialData }: Props) => {
  const router = useRouter();

  const { _createdAt: createdAt, _updatedAt: updatedAt, pageSeo, title } = initialData!;

  const { data } = usePreviewSubscription(singlePageQuery, {
    enabled: preview,
    initialData,
    params: { slug: initialData?.slug?.current || '' },
  });

  if (!router.isFallback && !data) return <Error statusCode={404} />;
  if (router.isFallback || !data) return <Loading label='Loading...' />;

  return (
    <>
      <Seo
        canonicalUrl={`${seo.siteUrl}${router.pathname}`}
        description={pageSeo?.description || seo.siteDescription}
        pageTitle={`${title} | ${seo.siteName}`}
        timeModified={new Date(updatedAt)}
        timePublished={new Date(createdAt)}
      />
      <RenderSections sections={data.sections} />
    </>
  );
};

export default InfoPage;
