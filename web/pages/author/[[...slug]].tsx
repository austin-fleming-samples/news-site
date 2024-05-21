import { getSingleAuthor } from '@cms/getAuthors';
import { getCursoredPostsByAuthor } from '@cms/getPosts';
import { ArticleCardRouter } from '@components/articles';
import { Loading, Seo } from '@components/common';
import { CardSection } from '@components/layout';
import { Paginate } from '@components/ui';
import { defaultSettings } from '@config/preval';
import type { GetStaticPaths } from 'next';
import Error from 'next/error';
import { useRouter } from 'next/router';

const { seo, generalSettings } = defaultSettings;

export const getStaticPaths: GetStaticPaths = async () => ({
  fallback: 'blocking',
  paths: [],
});

type StaticProps = {
  params: {
    slug: string[];
  };
};

export const getStaticProps = async ({ params }: StaticProps) => {
  const { slug } = params;

  const { postsPerPage } = generalSettings;

  const authorName = slug[0];
  const currentPage = Number(slug.length > 1 ? slug[1] : 1);

  const cursorStart = (currentPage - 1) * postsPerPage;
  const cursorEnd = currentPage * postsPerPage - 1;

  const authorData = await getSingleAuthor(authorName, false);

  if (!authorData) return { notFound: true };

  const { data: postsData, quantity: postCount } = await getCursoredPostsByAuthor(
    authorData._id,
    cursorStart,
    cursorEnd,
    false,
  );

  const totalPages = Math.ceil(postCount / postsPerPage);
  if (currentPage > totalPages) return { notFound: true };

  return {
    props: {
      authorData,
      currentPage,
      postsData,
      totalPages,
    },
  };
};

type UnwrapPromise<T> = T extends Promise<infer U> ? U : T;
type Props = UnwrapPromise<ReturnType<typeof getStaticProps>>['props'];

const Author = (props: Props) => {
  const router = useRouter();
  if (!router.isFallback && !props) return <Error statusCode={404} />;
  if (router.isFallback || !props) return <Loading label='Loading...' />;

  const { authorData, postsData, totalPages, currentPage } = props;

  return (
    <>
      <Seo
        canonicalUrl={`${seo.siteUrl}${router.pathname}`}
        description={authorData.summary || seo.siteDescription}
        pageTitle={`${authorData.title} | ${seo.siteName}`}
        robots='none'
        timeModified={new Date(authorData._updatedAt)}
        timePublished={new Date(authorData._createdAt)}
      />
      <CardSection title={`Articles by ${authorData.title}`}>
        {postsData.map((post) => (
          <ArticleCardRouter key={post._id} page={post} />
        ))}
      </CardSection>
      <Paginate
        currentPage={currentPage}
        pathRoot={`/author/${authorData.slug.current}`}
        totalPages={totalPages}
      />
    </>
  );
};

export default Author;
