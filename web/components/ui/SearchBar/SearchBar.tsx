import { Container } from '@components/layout';
import { useRouter } from 'next/router';
import { StyledInput, StyledLabel } from './SearchBar.Styled';

export const SearchBar = ({
  query,
  setQuery,
}: {
  query: string;
  setQuery: (query: string) => void;
}) => {
  const router = useRouter();

  const handleKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
    e.preventDefault();

    // TODO: should this be sanitized?
    const preparedQuery = query.toLowerCase();

    if (e.key === 'Enter' && !!query) {
      const encodedQuery = encodeURI(preparedQuery);
      router.push(`/search/${encodedQuery}`);
      /* router.push(
        {
          pathname: `/search/[term]`,
          query: {
            term: preparedQuery,
          },
        },
        undefined,
        { shallow: false }
      ); */
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setQuery(e.target.value);
  };

  return (
    <Container>
      <StyledLabel htmlFor='searchbar'>Search</StyledLabel>
      <StyledInput
        id='searchbar'
        placeholder='Search for Stories'
        type='text'
        value={query}
        onChange={handleChange}
        onKeyUp={handleKeyUp}
      />
    </Container>
  );
};
