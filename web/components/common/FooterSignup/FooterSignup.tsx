import { Container } from '@components/layout';
import { Newsletter } from '@components/sections';
import styled from 'styled-components';

const StyledSignup = styled.section`
  width: 100%;
  padding: ${({ theme }) => theme.layout.sectionSpacing(0.5)} 0;
  background-color: ${({ theme }) => theme.palette.blush.main};
  border-top: ${({ theme }) => theme.borders.main};
`;

export const FooterSignup = () => (
  <StyledSignup id="footersignup">
    <Container>
      <Newsletter />
    </Container>
  </StyledSignup>
);
