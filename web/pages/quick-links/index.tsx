import { getQuickLinks } from '@cms/getQuickLinks';
import { QuickLinksSingleton } from '@cms/types/codegen';
import { Seo } from '@components/common';
import { QuickLinks } from '@components/quickLinks';
import { defaultSettings } from '@config/preval';
import { InferGetStaticPropsType } from 'next';

const { seo } = defaultSettings;

export const getStaticProps = async () => {
  // TODO: implement not found
  const response = await getQuickLinks();

  if (!response || !response.shouldRenderPage) return { notFound: true };

  return {
    props: {
      content: response.content,
    },
  };
};

const QuickLinksPage = ({ content }: InferGetStaticPropsType<typeof getStaticProps>) => {
  const {
    widgetList,
    _createdAt: createdAt,
    _updatedAt: updatedAt,
  } = content as QuickLinksSingleton;

  return (
    <>
      <Seo
        canonicalUrl={`${seo.siteUrl}/support-us/contribute`}
        description='A one-click contribution to our $2.19 club is like dropping a quarter in a tip jar! It adds up and matters!'
        pageTitle={`Partnerships | ${seo.siteName}`}
        timeModified={new Date(updatedAt)}
        timePublished={new Date(createdAt)}
      />
      <QuickLinks {...content} />
    </>
  );
};

QuickLinksPage.hideLayout = true;

export default QuickLinksPage;
