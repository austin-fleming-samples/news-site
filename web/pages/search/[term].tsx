import { useState } from 'react';
import { getSearchResults } from '@cms/getSearchResults';
import { ArticleCardRouter } from '@components/articles';
import { Loading, Seo } from '@components/common';
import { CardGrid, Container, SectionContainer } from '@components/layout';
import { SearchBar, SectionHeading, Typography } from '@components/ui';
import { defaultSettings } from '@config/preval';
import type { GetStaticPaths, GetStaticPropsContext, InferGetStaticPropsType } from 'next';
import { useRouter } from 'next/router';
import styled from 'styled-components';

// TODO: [future] why is this 41? Most likely inclusive/exclusive range error in query
const MAX_SEARCH_RESULTS = 41;

// type PathParamsType = { params: { term: string } };

export const getStaticPaths: GetStaticPaths = async () => ({
  fallback: true,
  paths: [{ params: { term: 'smarther news' } }],
});

export const getStaticProps = async ({ params }: GetStaticPropsContext<{ term: string }>) => {
  /* if (!params?.term) return { notFound: true }; */ // necessary?

  const { term } = params!;

  const results = await getSearchResults(term, MAX_SEARCH_RESULTS);

  /* if (!results) {
    console.error(`\tFailed to get search results for term: ${term}.\t`);
    return {
      notFound: true,
    };
  } */

  const pageTitle = `Results for: ${term}`;
  const seoTitle = `${pageTitle} | ${defaultSettings.seo.title}`;

  return {
    props: {
      pageTitle,
      results,
      seoTitle,
      term,
    },
  };
};

// TODO: put in component library
const NoResultsWrapper = styled.div`
  width: 100%;
  padding: ${({ theme }) => `${theme.layout.sectionSpacing(1)} 0`};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const FailedTerm = styled.span`
  text-transform: capitalize;
`;

/* 
 TODO: [SEO] have loader appear on this page when submitting and have fallback: blocking on the other page.
 TODO: [future] get rid of index and just use optional catch all.
*/
const SearchResults = (props: InferGetStaticPropsType<typeof getStaticProps>) => {
  const router = useRouter();
  const [query, setQuery] = useState('');

  if (router.isFallback) return <Loading label='Loading results...' />;

  const { results, term, seoTitle, pageTitle } = props;

  return (
    <>
      <Seo
        canonicalUrl={`${defaultSettings.seo.siteUrl}/search`}
        contentTier='free'
        description={`Search results for "${term}"`}
        pageTitle={seoTitle}
        robots='none'
        timePublished={new Date()}
      />
      {router.isFallback ? (
        <Loading label='searching' />
      ) : (
        <SectionContainer>
          <SearchBar query={query} setQuery={setQuery} />

          <Container>
            <SectionHeading title={pageTitle} />

            {results && results.length > 0 ? (
              <CardGrid>
                {results.map((post) => (
                  <ArticleCardRouter key={post._id} page={post} />
                ))}
              </CardGrid>
            ) : (
              <NoResultsWrapper>
                <Typography center tag='p' variant='h4'>
                  We couldn&apos;t find anything for <br />
                  <FailedTerm>{`"${term}"`}</FailedTerm>
                </Typography>
                <Typography center tag='p' variant='body1'>
                  Try a different search term.
                </Typography>
              </NoResultsWrapper>
            )}
          </Container>
        </SectionContainer>
      )}
    </>
  );
};

export default SearchResults;
