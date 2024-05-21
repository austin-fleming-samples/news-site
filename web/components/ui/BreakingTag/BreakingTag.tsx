import styled from 'styled-components';

// TODO: centralize
export const StyledTag = styled.span<{ size: 'md' | 'sm' }>`
  ${({ theme, size }) => {
    if (size === 'md') return theme.typography.body1;
    if (size === 'sm') return theme.typography.body2;
    return theme.typography.body1;
  }}
  ${({ theme }) => theme.fonts.primary.bold}
  display: inline-block;
  padding-bottom: 0.25rem;
  margin: 0;
  border-bottom: 4px solid white;

  line-height: 1;
  color: ${({ theme }) => theme.palette.white.main};
  text-transform: uppercase;
  letter-spacing: 0.08em;

  border-color: ${({ theme }) => theme.palette.status.alert.main};
`;

export const BreakingTag = ({ size = 'md' }: { size?: 'md' | 'sm' }) => (
  <StyledTag size={size}>Breaking</StyledTag>
);
