import React from 'react';
import styled from 'styled-components'

const Root = styled.div`
  width: 100%;
`

const IFrameContainer = styled.div`
  & p {
    padding: 1em;
  }
`

const IFrame = styled.iframe`
  border: 0;
  height: 100%;
  left: 0;
  position: absolute;
  top: 0;
  width: 100%;
`

export const IframePreview = ({ src }: { src: string }) => (
  <Root>
    <IFrameContainer>
      <IFrame src={src} frameBorder={'0'} />
    </IFrameContainer>
  </Root>
);
