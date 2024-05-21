import { Typography } from '@components/ui';
import { StyledContainer, StyledSpinner } from './Loading.Styled';

export const Loading = ({ label = 'loading' }:{ label:string }) => (
  <StyledContainer>
    <StyledSpinner>
      <div key="1" />
      <div key="2" />
      <div key="3" />
      <div key="4" />
      <div key="5" />
      <div key="6" />
      <div key="7" />
      <div key="8" />
      <div key="9" />
    </StyledSpinner>

    <Typography tag="p" variant="caption">
      {label}
      ...
    </Typography>
  </StyledContainer>
);
