import type { Quickquotes as QuickquotesProps } from '@cms/types/sanityTypes';
import { ArticleCardRouter } from '@components/articles';
import styled from 'styled-components';

const SlideContainer = styled.div`
  display: flex;
  flex-wrap: nowrap;
  overflow: auto;

  & > * {
    flex: 0 0 auto;
    margin-right: ${({ theme }) => theme.layout.siteGutter(1)};
    max-width: 300px;
  }
`;

// TODO: cleanup
// TODO: better scrollbar
export const QuotesSlider = ({ quotes }: { quotes: QuickquotesProps[] }) => (
  <SlideContainer>
    {quotes.map((q) => (
      <ArticleCardRouter key={q._id} page={q} />
    ))}
  </SlideContainer>
);
