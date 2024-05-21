/* eslint-disable unicorn/prefer-at */
import { Container, SectionContainer } from '@components/layout';
import NextLink from 'next/link';
import {
  StyledPageItem,
  StyledPageLink,
  StyledPaginatorList,
  StyledRule,
  StyledWrapper,
} from './Paginate.Styled';

type PaginateProps = {
  currentPage: number;
  pathRoot: string;
  totalPages: number;
};

type PageProps = {
  isCurrent: boolean;
  key: string;
  pageNumber: number;
  slug: string;
  type: 'page';
};

type CondensedPageProps =
  | PageProps
  | {
      key: string;
      type: 'spacer';
    };

const MAX_PAGES_LISTED = 5;

const condensePages = (pages: PageProps[], currentPage: number): CondensedPageProps[] => {
  const currentIndex = currentPage - 1;

  // no condensing needed
  if (pages.length < MAX_PAGES_LISTED) return pages;

  // is at the start
  if (currentIndex < MAX_PAGES_LISTED - 1)
    // offset by 1 so more appear when you hit limit
    return [
      ...pages.slice(0, MAX_PAGES_LISTED),
      {
        key: 'end-spacer',
        type: 'spacer',
      },
      pages[pages.length - 1],
    ];

  // is at the end
  if (currentIndex > pages.length - (MAX_PAGES_LISTED - 1))
    return [
      pages[0],
      {
        key: 'start-spacer',
        type: 'spacer',
      },
      ...pages.slice(-5),
    ];

  // is in the middle

  const numAdjacentPages = Math.ceil((MAX_PAGES_LISTED - 3) / 2); // subtract first, last, and current page then divide to get how many pages to show on each side.
  const leftPages = pages.slice(currentIndex - numAdjacentPages, currentIndex);
  const rightPages = pages.slice(currentIndex + 1, currentIndex + numAdjacentPages + 1);

  return [
    pages[0],
    {
      key: 'start-spacer',
      type: 'spacer',
    },
    ...leftPages,
    pages[currentIndex],
    ...rightPages,
    {
      key: 'end-spacer',
      type: 'spacer',
    },
    pages[pages.length - 1],
  ];
};

export const Paginate = ({ currentPage, totalPages, pathRoot }: PaginateProps) => {
  /* eslint-disable-next-line unicorn/new-for-builtins */
  const pages: PageProps[] = [...Array(totalPages)].map(
    (_, index): PageProps => ({
      isCurrent: index + 1 === currentPage,
      key: `${index}`,
      pageNumber: index + 1,
      slug: `${pathRoot}/${index + 1}`,
      type: 'page',
    }),
  );

  const condensedPages = condensePages(pages, currentPage);

  return (
    <SectionContainer>
      <Container>
        <StyledWrapper>
          <StyledRule key='first' />
          <StyledPaginatorList>
            <StyledPageItem key='beginning'>
              <NextLink passHref href={`${pathRoot}/1`}>
                <StyledPageLink aria-label='go to first page' isInactive={currentPage <= 1}>
                  <span aria-hidden='true'>««</span>
                </StyledPageLink>
              </NextLink>
            </StyledPageItem>

            <StyledPageItem key='previous'>
              <NextLink passHref href={`${pathRoot}/${currentPage - 1}`}>
                <StyledPageLink
                  aria-label='go to previous page'
                  isInactive={currentPage <= 1}
                  rel='prev'>
                  <span aria-hidden='true'>«</span>
                </StyledPageLink>
              </NextLink>
            </StyledPageItem>

            {condensedPages.map((page) => (
              <StyledPageItem key={page.key}>
                {page.type === 'page' && (
                  <NextLink passHref href={page.slug}>
                    <StyledPageLink isHighlighted={page.pageNumber === currentPage}>
                      {page.pageNumber}
                    </StyledPageLink>
                  </NextLink>
                )}
                {page.type === 'spacer' && <StyledPageLink as='p'>...</StyledPageLink>}
              </StyledPageItem>
            ))}

            <StyledPageItem key='next'>
              <NextLink passHref href={`${pathRoot}/${currentPage + 1}`}>
                <StyledPageLink
                  aria-label='go to next page'
                  isInactive={totalPages <= currentPage}
                  rel='next'>
                  <span aria-hidden='true'>»</span>
                </StyledPageLink>
              </NextLink>
            </StyledPageItem>

            <StyledPageItem key='end'>
              <NextLink passHref href={`${pathRoot}/${totalPages}`}>
                <StyledPageLink aria-label='go to last page' isInactive={currentPage >= totalPages}>
                  <span aria-hidden='true'>»»</span>
                </StyledPageLink>
              </NextLink>
            </StyledPageItem>
          </StyledPaginatorList>
          <StyledRule key='last' />
        </StyledWrapper>
      </Container>
    </SectionContainer>
  );
};
