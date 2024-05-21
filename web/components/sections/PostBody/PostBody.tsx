import { BlockContent as BlockContentProps } from '@cms/types/sanityTypes';
import { Container, SectionContainer } from '@components/layout';
import { PortableText } from '@components/ui';
import styled from 'styled-components';

const StyledSection = styled.section`
  width: 100%;
  padding: ${({ theme }) => `${theme.layout.sectionSpacing(1)} 0`};
`;

export const PostBody = ({ blockContent }: { blockContent: BlockContentProps }) => (
  <StyledSection>
    <Container width='narrow'>
      {blockContent && <PortableText blockContent={blockContent} />}
    </Container>
  </StyledSection>
);
