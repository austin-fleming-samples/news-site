import { QuickLinksSingleton } from '@cms/types/codegen';
import { SectionContainer } from '@components/layout';
import { HeaderBlock } from './HeaderBlock';
import S from './QuickLinks.module.css';
import { SocialLinks } from './socialLinks/SocialLinks';
import { Widgets } from './widgets/Widgets';

export const QuickLinks = ({ widgetList }: QuickLinksSingleton) => (
  <main
    className={`${S.root} h-full min-h-screen w-full bg-gray-400 flex flex-col items-center pb-32`}
    id='main-content'>
    <SectionContainer className='flex flex-col gap-12'>
      <HeaderBlock />
      <Widgets widgets={widgetList} />
      {/* <SocialLinks /> */}
    </SectionContainer>
  </main>
);
