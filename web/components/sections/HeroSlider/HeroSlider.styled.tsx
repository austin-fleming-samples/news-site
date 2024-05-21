import styled from 'styled-components';

// TODO: centralize
export const StyledSummary = styled.p`
  ${({ theme }) => theme.typography.body1}
  color: ${({ theme }) => theme.palette.white.main};
  font-size: 1.25rem !important;
`;

// TODO: centralize
export const StyledTitle = styled.h1`
  ${({ theme }) => theme.typography.h3}
  color: ${({ theme }) => theme.palette.white.main};
  margin: 1rem 0;
`;

export const TextBox = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;

  background-image: linear-gradient(
    to top,
    rgba(0, 0, 0, 0.8) 0%,
    rgba(0, 0, 0, 0.4) 40%,
    rgba(0, 0, 0, 0) 100%
  );

  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-end;
`;

export const SlideLinkWrapper = styled.a`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;

  width: 100%;
  height: 100%;
  padding: 0;
  margin: 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Slide = styled.div<{ isBreaking: boolean }>`
  position: relative;
  width: 100%;
  height: 60vh;
  min-height: 600px;
  max-height: 1000px;
  padding: 0;
  margin: 0;

  ${({ isBreaking, theme }) =>
    isBreaking &&
    `
    border-bottom: 6px solid ${theme.palette.status.alert.main};
  `}
`;
