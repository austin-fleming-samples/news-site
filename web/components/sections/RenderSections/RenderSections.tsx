import { Fragment } from 'react';
import type { Page as PageProps } from '@cms/types/sanityTypes';
import { ArticleText, HeroSimple, HeroSplit } from '@components/sections';

/*
This component allows any of the listed components to be rendered from an array of 'sections' coming from sanity.
While verbose, explicitly checking the "_type" allows Typescript to infer that 'section' matches the parameter type for each component.
*/
export const RenderSections = ({ sections }: { sections: PageProps['sections'] }) => {
  // Lets us know during the build if something slips through the cracks.
  if (!sections || sections.length === 0) {
    console.error('Sections missing for a page. Returning null.');
    return null;
  }

  return (
    <div>
      {sections.map((section) => (
        <Fragment key={section._type}>
          {section._type === 'heroSplit' && <HeroSplit {...section} />}
          {section._type === 'heroSimple' && <HeroSimple {...section} />}
          {section._type === 'articleText' && <ArticleText {...section} />}
        </Fragment>
      ))}
    </div>
  );
};
