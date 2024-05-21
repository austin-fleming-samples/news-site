import { getCursoredQuickquotes, getQuickquotesQuantity } from '@cms/getQuickquotes';
import { getCursoredQuickreads, getQuickreadsQuantity } from '@cms/getQuickreads';
import { getCursoredVideoposts, getVideopostsQuantity } from '@cms/getVideoposts';
import { ArticleCardRouter } from '@components/articles';
import { Loading, Seo } from '@components/common';
import { CardSection } from '@components/layout';
import { Paginate } from '@components/ui';
import { POST_TYPES } from '@config/constants';
import { defaultSettings } from '@config/preval';
import type { GetStaticPaths, GetStaticPropsContext } from 'next';
import Error from 'next/error';
import { useRouter } from 'next/router';

const { seo, generalSettings } = defaultSettings;

/* TODO: this should be library. Can it be a codegen type? */
type PostTypes = 'quickquotes' | 'quickreads' | 'videoposts';

/* TODO: typings aren't right for page functions. not passing types currently. */
export const getStaticPaths: GetStaticPaths = async (context) => {
  const paths = POST_TYPES.map((postType) => ({
    params: {
      pageNumber: '1',
      postType,
    },
  }));

  return {
    fallback: true,
    paths,
  };
};

/* 
TODO: these three functions should be in library
TODO: should probably be called something other than "router"
*/
const selectPostCountFetcher = (postType: PostTypes) =>
  ({
    quickquotes: getQuickquotesQuantity,
    quickreads: getQuickreadsQuantity,
    videoposts: getVideopostsQuantity,
  }[`${postType}`]);

const selectDataFetcher = (postType: PostTypes) =>
  ({
    quickquotes: getCursoredQuickquotes,
    quickreads: getCursoredQuickreads,
    videoposts: getCursoredVideoposts,
  }[`${postType}`]);

const selectPageName = (postType: PostTypes) =>
  ({
    quickquotes: 'All Quick Quotes',
    quickreads: 'All Quick Reads',
    videoposts: 'All Video Posts',
  }[`${postType}`]);

export const getStaticProps = async ({ params, preview = false }: GetStaticPropsContext) => {
  if (!params) return { notFound: true };

  const { postsPerPage } = generalSettings;

  const postType = params.postType as string;
  const pageNumber = Number(params.pageNumber);

  const postCountFetcher = selectPostCountFetcher(postType);
  const postCount = await postCountFetcher(preview);
  if (!postCount) return { notFound: true };

  const totalPages = Math.ceil(postCount / postsPerPage);
  if (pageNumber > totalPages) return { notFound: true }; // make sure results exist for page

  // TODO: verify this doesn't skip any posts
  const cursorStart = (pageNumber - 1) * postsPerPage;
  const cursorEnd = pageNumber * postsPerPage - 1;

  const dataFetcher = selectDataFetcher(postType);
  const pageName = selectPageName(postType);

  if (!dataFetcher || !pageName) return { notFound: true };

  const data = await dataFetcher(cursorStart, cursorEnd, preview);

  if (!data) return { notFound: true };

  return {
    props: {
      data,
      pageName,
      pageNumber,
      postType,
      preview,
      totalPages,
    },
  };
};

type UnwrapPromise<T> = T extends Promise<infer U> ? U : T;
type Props = UnwrapPromise<ReturnType<typeof getStaticProps>>['props']; // TODO: can this be modularized?

const PostTypeList = (props: Props) => {
  const router = useRouter();
  if (!router.isFallback && !props) return <Error statusCode={404} />;
  if (router.isFallback || !props) return <Loading label='Loading posts...' />;

  const { data, pageName, totalPages, pageNumber, postType } = props;

  return (
    <>
      <Seo
        canonicalUrl={`${seo.siteUrl}${router.pathname}`}
        description={pageName ? `View our archive for ${pageName}.` : seo.siteDescription}
        pageTitle={`${pageName} | ${seo.siteName}`}
      />
      <CardSection title={pageName}>
        {data.map((post) => (
          <ArticleCardRouter key={post._id} page={post} />
        ))}
      </CardSection>
      <Paginate currentPage={pageNumber} pathRoot={`/${postType}/all`} totalPages={totalPages} />
    </>
  );
};

export default PostTypeList;
