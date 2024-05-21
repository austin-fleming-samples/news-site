import { useState } from 'react';
import { Seo } from '@components/common';
import { Container, SectionContainer } from '@components/layout';
import { SearchBar, SectionHeading, Typography } from '@components/ui';
import { defaultSettings } from '@config/preval';
import styled from 'styled-components';

// HACK: duplicated in [term].tsx
const NoResultsWrapper = styled.div`
  width: 100%;
  padding: ${({ theme }) => `${theme.layout.sectionSpacing(1)} 0`};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

/* TODO: UX: there needs to be a search progress bar while searching,
as it takes awhile to get a result. Looks like UI stopped working. */
// TODO: Needs actual "search" button for clearer interaction.
// TODO: [future] maybe just use server side and queries instead of page building each.
const Search = () => {
  const [query, setQuery] = useState('');

  return (
    <>
      <Seo
        canonicalUrl={`${defaultSettings.seo.siteUrl}/search`}
        contentTier='free'
        /* Should come from CMS */
        description='Search through our backlog to find past stories.'
        keywords={['search', 'news', 'archive']}
        pageTitle={`Search | ${defaultSettings.seo.title}`}
        robots='none'
      />
      <SectionContainer>
        <SearchBar query={query} setQuery={setQuery} />
        <Container>
          <SectionHeading title='Results for:' />
          <NoResultsWrapper>
            <Typography tag='p' variant='h4'>
              Looking for something?
            </Typography>
            <Typography tag='p' variant='body1'>
              Use the searchbar above
            </Typography>
          </NoResultsWrapper>
        </Container>
      </SectionContainer>
    </>
  );
};

export default Search;
