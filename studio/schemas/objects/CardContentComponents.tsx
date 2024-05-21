import React from 'react';
import { FaExternalLinkAlt } from 'react-icons/fa';

export const ExternalLinkRenderer = ({ children }: { children: any }) => (
  <span>
    {children}

    <FaExternalLinkAlt />
  </span>
);

export const LeftAlignRender = ({ children }: { children: any }) => (
  <span style={{ width: '100%', maxWidth: '400px', textAlign: 'left', display: 'block', fontSize: '16px', fontWeight: 'normal', color: 'rgb(38, 47, 61)' }}>
    {children}
  </span>
);

export const NormalAlignRender = ({ children }: { children: any }) => (
  <span style={{ width: '100%', maxWidth: '400px', textAlign: 'center', display: 'block' }}>
    {children}
  </span>
);
