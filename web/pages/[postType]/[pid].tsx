import { getSinglePost, singlePostQueryReducer } from '@cms/getPosts';
import type { PostProps } from '@cms/getPosts';
import { getImage } from '@cms/images';
import { getClient } from '@cms/utils/getClient';
import { usePreviewSubscription } from '@cms/utils/getPreviewSubscription';
import { QuickQuoteHero, QuickreadHero, VideopostHero } from '@components/articles';
import { JsonLdArticle, JsonLdBreadCrumbs, Loading, Seo } from '@components/common';
import { PostBody, PostFooter } from '@components/sections';
import { SocialShare } from '@components/ui';
import {
  FALLBACK_PRERENDERED_POSTS,
  SEO_DEFAULT_IMAGE_FORMAT,
  SEO_DEFAULT_IMAGE_HEIGHT,
  SEO_DEFAULT_IMAGE_WIDTH,
} from '@config/constants';
import { defaultSettings } from '@config/preval';
import type { Nullable } from '@typings/helpers';
import type { GetStaticPaths, GetStaticPropsContext, InferGetStaticPropsType } from 'next';
import NextError from 'next/error';
import { useRouter } from 'next/router';
import { blockContentToPlainText } from 'react-portable-text';

const { generalSettings, seo } = defaultSettings;

export const getStaticPaths: GetStaticPaths = async () => {
  const startingDocuments = generalSettings.prerenderedPosts || FALLBACK_PRERENDERED_POSTS;

  // TODO: [SEO] Needs ordering. Currently, it doesn't grab by date.
  const query = `*[_type == $postType && defined(slug.current)] | order(datePublished desc)[0..$count]{'slug': slug.current, 'id': _id}`;

  type SlugFetchResult = Nullable<Array<{ slug: string }>>;

  /* start fetches */
  const quickquotesFetch = getClient().fetch<SlugFetchResult>(query, {
    count: startingDocuments,
    postType: 'quickquotes',
  });
  const quickreadsFetch = getClient().fetch<SlugFetchResult>(query, {
    count: startingDocuments,
    postType: 'quickreads',
  });
  const videopostsFetch = getClient().fetch<SlugFetchResult>(query, {
    count: startingDocuments,
    postType: 'videoposts',
  });

  /* resolve fetches */
  const [quickquotes, quickreads, videoposts] = [
    await quickquotesFetch,
    await quickreadsFetch,
    await videopostsFetch,
  ];

  /* build paths */
  const quickquotesPaths = quickquotes?.map(({ slug }) => ({
    params: { pid: slug, postType: 'quickquotes' },
  }));

  const quickreadsPaths = quickreads?.map(({ slug }) => ({
    params: { pid: slug, postType: 'quickreads' },
  }));

  const videopostsPaths = videoposts?.map(({ slug }) => ({
    params: { pid: slug, postType: 'videoposts' },
  }));

  /* consolidate paths */
  const allPaths = [
    ...(quickquotesPaths || []),
    ...(quickreadsPaths || []),
    ...(videopostsPaths || []),
  ];

  return {
    fallback: 'blocking',
    paths: allPaths,
  };
};

export const getStaticProps = async ({
  params,
  preview = false,
}: GetStaticPropsContext<{ pid: string; postType: string }>) => {
  const { postType, pid } = params!;

  const untypedInitialData = await getSinglePost(postType, pid, preview);

  /* if (!untypedInitialData) return { notFound: true }; */

  const initialData = untypedInitialData as PostProps;

  /* if (!initialData) return { notFound: true }; */
  // TODO: [SEO] needs stronger typing
  const previewQuery = singlePostQueryReducer(postType);

  const maybeSeoImage =
    initialData?.mainimage &&
    getImage(initialData?.mainimage)
      .width(SEO_DEFAULT_IMAGE_WIDTH)
      .height(SEO_DEFAULT_IMAGE_HEIGHT)
      .format(SEO_DEFAULT_IMAGE_FORMAT)
      .url();

  const description =
    initialData.postSeo?.description ||
    (initialData.body && blockContentToPlainText(initialData.body as any)) ||
    seo.siteDescription;

  const trimmedDescription = description.trim().slice(0, 150);

  const postSeo = {
    canonicalUrl: `${seo.siteUrl}/${postType}/${initialData?.slug.current}`,
    description: trimmedDescription,
    imageUrl: maybeSeoImage || seo.defaultImage.src,
    keywords: initialData.tags || seo.keywords,
    publisherLogo: seo.publisherLogo.src,
    publisherName: seo.siteName,
    timeModified: initialData.lastModified || initialData.datePublished || initialData._updatedAt,
    timePublished: initialData.datePublished || initialData._createdAt,
    title: initialData.title,
  };

  return {
    props: {
      initialData,
      postSeo,
      preview,
      previewQuery,
    },
  };
};

const Post = ({
  preview,
  initialData,
  previewQuery,
  postSeo,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const router = useRouter();

  const typedInitialData = initialData as PostProps;

  const { data: untypedPost } = usePreviewSubscription(previewQuery, {
    enabled: preview,
    initialData,
    params: { slug: typedInitialData.slug.current },
  });

  const post = untypedPost as PostProps;

  if (router.isFallback) return <Loading label='loading post' />;
  if (!post) return <NextError statusCode={404} />;

  return (
    <>
      <JsonLdArticle
        {...postSeo}
        authors={[
          {
            name: post.author?.title || seo.fallbackAuthor.name,
            profileUrl: post.author?.primarySite || seo.fallbackAuthor.primarySite,
          },
        ]}
        timeModified={new Date(postSeo.timeModified)}
        timePublished={new Date(postSeo.timePublished)}
      />
      <JsonLdBreadCrumbs
        breadCrumbs={[
          {
            itemUrl: `https://www.smarthernews.com/${post._type}`,
            name: post._type,
          },
          {
            itemUrl: `https://www.smarthernews.com/${post._type}/${post.slug.current}`,
            name: post.title,
          },
        ]}
      />
      <Seo
        authorProfileUrl={post.author?.primarySite}
        authorTwitterHandle={post.author?.twitterHandle}
        canonicalUrl={postSeo.canonicalUrl}
        contentTier={post.gatingSettings?.tier || 'free'}
        contentType='article'
        description={postSeo.description}
        imageAlt={post.mainimage?.alt || seo.defaultImage.alt}
        imageHeight={SEO_DEFAULT_IMAGE_HEIGHT}
        imageType={SEO_DEFAULT_IMAGE_FORMAT}
        imageUrl={postSeo.imageUrl}
        imageWidth={SEO_DEFAULT_IMAGE_WIDTH}
        keywords={postSeo.keywords}
        pageTitle={`${initialData.title} | ${seo.siteName}`}
        timeModified={new Date(postSeo.timeModified)}
        timePublished={new Date(postSeo.timePublished)}
      />
      {post?._type === 'quickreads' && <QuickreadHero data={post} preview={preview} />}
      {post?._type === 'videoposts' && <VideopostHero data={post} />}
      {post?._type === 'quickquotes' && <QuickQuoteHero data={post} />}

      {post?.body && <PostBody blockContent={post.body} />}
      <SocialShare />
      {post?.author && <PostFooter author={post.author} />}
    </>
  );
};

export default Post;
