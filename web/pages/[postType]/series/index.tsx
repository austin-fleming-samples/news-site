import { getAllCardseries } from '@cms/getCardseries';
import { getAllVideoseries } from '@cms/getVideoseries';
import type { GetStaticPaths, GetStaticPropsContext } from 'next';
import Error from 'next/error';
import NextLink from 'next/link';
import { useRouter } from 'next/router';

export const getStaticPaths: GetStaticPaths = async (context) => ({ fallback: true, paths: [] });

export const getStaticProps = async ({ params, preview = false }: GetStaticPropsContext) => {
  if (!params?.postType) return { notFound: true };

  const { postType } = params;
  /* const postSlug = params.pid */

  // TODO: currently isn't taking postType into consideration
  const allSeries =
    (postType === 'videoposts' && (await getAllVideoseries())) ||
    (postType === 'quickreads' && (await getAllCardseries())) ||
    null;

  // const data = await getQuickquote(preview, postSlug)

  if (!allSeries) return { notFound: true };

  return {
    props: {
      allSeries,
      postType,
      preview,
    },
  };
};

type UnwrapPromise<T> = T extends Promise<infer U> ? U : T;
type Props = UnwrapPromise<ReturnType<typeof getStaticProps>>['props'];

const Page = (props: Props) => {
  const router = useRouter();
  if (!router.isFallback && !props) return <Error statusCode={404} />;
  if (router.isFallback) return <p>Loading...</p>; // TODO: fallback loading component

  const { allSeries, postType } = props!; // HACK: why is it expecting props to be possibly undefined?

  return (
    <div>
      <h1>Series for: {postType}</h1>
      <ul>
        {allSeries.map((series) => (
          <li key={series._id}>
            <NextLink href={`/${postType}/series/${series.slug.current}`}>
              <a>{series.title}</a>
            </NextLink>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Page;
