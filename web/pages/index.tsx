import { getSomeProducts } from '@cms/getProducts';
import { getSomeQuickquotes } from '@cms/getQuickquotes';
import { getSomeQuickreads } from '@cms/getQuickreads';
import { getSomeVideoposts } from '@cms/getVideoposts';
import { ArticleCardRouter } from '@components/articles';
import { Seo } from '@components/common';
import { FeedSection } from '@components/layout';
import { HeroSlider, Newsletter, QuotesSlider } from '@components/sections';
import { SplitFeeds } from '@components/templates';
import { GetStaticPropsContext, InferGetStaticPropsType } from 'next';

// TODO: [SEO] quantities shouldn't be magic numbers. Add to CMS
const QUICKQUOTES_COUNT = 12;
const QUICKREADS_COUNT = 6;
const VIDEOPOSTS_SLIDER_COUNT = 3;
const VIDEOPOSTS_BODY_COUNT = 6;
const PRODUCTS_COUNT = 4;

// Only the first video is exclusively on the slider. The are in body.
const totalVideoposts = () => VIDEOPOSTS_BODY_COUNT + 1;

export const getStaticProps = async ({ preview }: GetStaticPropsContext) => {
  const quickquotesFetch = getSomeQuickquotes(QUICKQUOTES_COUNT, preview);
  const quickreadsFetch = getSomeQuickreads(QUICKREADS_COUNT, preview);
  const videopostsFetch = getSomeVideoposts(totalVideoposts(), preview);
  const productsFetch = getSomeProducts(PRODUCTS_COUNT, preview);

  // TODO: [future] error handle these if they are missing. Currently, the section just vanishes from home.
  const [quickquotes, quickreads, videoposts, products] = [
    await quickquotesFetch,
    await quickreadsFetch,
    await videopostsFetch,
    await productsFetch,
  ];

  const heroVideoposts = videoposts?.slice(0, VIDEOPOSTS_SLIDER_COUNT);
  const bodyVideoposts = videoposts?.slice(1);

  return {
    props: {
      bodyVideoposts,
      heroVideoposts,
      products,
      quickquotes,
      quickreads,
    },
  };
};

const Home = ({
  bodyVideoposts,
  heroVideoposts,
  products,
  quickquotes,
  quickreads,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  // TODO: [future] section order should be determined by singletonHomePage
  // TODO: [future] link shouldn't be hardcoded
  // TODO: [SEO] links should be a link component with referrer and index props. Especially shop.
  const MainFeed = (
    <>
      <Seo isHomePage />
      {heroVideoposts && (
        <FeedSection key='video-slider' isFullWidth link='/videoposts/all/1' title='Watch: Videos'>
          <HeroSlider videoposts={heroVideoposts} />
        </FeedSection>
      )}
      {quickquotes && (
        <FeedSection
          key='quickquotes-main-feed'
          isFullWidth
          isMobileOnly
          link='/quickquotes/all/1'
          title='Read: Quick Quotes'>
          <QuotesSlider quotes={quickquotes} />
        </FeedSection>
      )}
      {quickreads && (
        <FeedSection key='quickreads' link='/quickreads/all/1' title='Read: Quick Reads'>
          {quickreads.map((post) => (
            <ArticleCardRouter key={post._id} page={post} />
          ))}
        </FeedSection>
      )}
      <FeedSection key='newsletter' isFullWidth title='newsletter'>
        <Newsletter />
      </FeedSection>
      {products && products.length > 0 && (
        // TODO: shop link shouldn't be hard coded
        <FeedSection key='products' link='https://shop.smarthernews.com' title='Shop'>
          {products.map((post) => (
            <ArticleCardRouter key={post._id} page={post} />
          ))}
        </FeedSection>
      )}
      {bodyVideoposts && (
        <FeedSection key='videos' link='/videoposts/all/1' title='Watch: Videos'>
          {bodyVideoposts.map((post) => (
            <ArticleCardRouter key={post._id} page={post} />
          ))}
        </FeedSection>
      )}
    </>
  );

  const SideFeed = quickquotes && (
    <FeedSection
      key='quickquotes-side-feed'
      isSideFeed
      link='/quickquotes/all/1'
      title='Read: Quick Quotes'>
      {quickquotes.map((post) => (
        <ArticleCardRouter key={post._id} page={post} />
      ))}
    </FeedSection>
  );

  return <SplitFeeds mainFeed={MainFeed} sideFeed={SideFeed} />;
};

export default Home;
