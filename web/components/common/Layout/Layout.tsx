import type { ReactNode } from 'react';
import { Footer, FooterSignup, Navbar } from '@components/common';
import S from './Layout.module.css';

export const Layout = ({ children }: { children: ReactNode }) => (
  <>
    <Navbar />
    <main className={S.root} id='main-content'>
      {children}
    </main>
    <FooterSignup />
    <Footer />
  </>
);
