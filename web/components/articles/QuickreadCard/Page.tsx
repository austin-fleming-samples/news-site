import { ForwardedRef, forwardRef } from 'react';
import { getImage } from '@cms/images/urlFor';
import { Quickreads as QuickreadsProps } from '@cms/types/sanityTypes';
import { Checkmark } from './Checkmark';
import {
  BorderDetailsLower,
  BorderDetailsUpper,
  BorderPiece,
  Citation,
  GlassesIcon,
  MainContent,
  SeriesName,
  StyledBody,
  StyledBorder,
  StyledCard,
  StyledBackgroundImage,
} from './Page.Styled';
import { QuickreadPortableText } from './QuickreadPortableText';
import { iconTable, themeTable } from './themeTable';

export type PageProps = {
  id?: string;
  pageContent: QuickreadsProps;
  palette: QuickreadsProps['colorpaletteclassname'];
  preview?: boolean;
  stackIndex: number;
};

/* const imageSizes = `
  (max-width: ${theme.breakpoints.mobileLg.width}) 100vw,
  (max-width: ${theme.breakpoints.tablet.width}) 50vw,
  (max-width: ${theme.breakpoints.desktop.width}) 33vw,
  (max-width: ${theme.breakpoints.desktopLg.width}) 25vw,
  20vw
`; */

const PageForwardRef = (
  { pageContent, stackIndex, preview = false, id }: PageProps,
  ref: ForwardedRef<Text>,
) => {
  const { cards, series, mainimage, colorpaletteclassname } = pageContent;
  // TODO: [future] "showCheckmark" was removed as it was missing from schema. Verify if this affects anything
  const { body, citation } = cards[Number.parseInt(`${stackIndex}`, 10)];
  const isLastCard = cards.length - 1 === stackIndex && stackIndex !== 0; // only mark as last card if there are more than one cards
  const theme = themeTable[colorpaletteclassname || '--light-blue'];
  const glassesIconUrl = iconTable[theme.icon];

  return (
    <StyledCard
      backgroundColor={theme.background}
      /* backgroundImage={
        (stackIndex === 0 && mainimage && getImage(mainimage).width(400).height(450).url()) ||
        undefined
      } */
      id={id}
      preview={preview}>
      {stackIndex === 0 && mainimage && (
        <StyledBackgroundImage
          alt={mainimage.alt || 'article image'}
          // HACK:!
          crossOrigin='anonymous'
          src={getImage(mainimage).width(400).height(450).url()}
        />
      )}
      <StyledBody>
        <StyledBorder borderColor={theme.border}>
          <BorderDetailsUpper>
            <BorderPiece key='left' />
            {series && <SeriesName color={theme.text}>{series.title}</SeriesName>}
            <BorderPiece key='right' />
          </BorderDetailsUpper>
          <MainContent>
            {isLastCard && <Checkmark textHexColor={theme.text} />}
            {body && <QuickreadPortableText body={body} textColor={theme.text} />}
            {citation && <Citation color={theme.text}>{citation}</Citation>}
          </MainContent>
          <BorderDetailsLower>
            <BorderPiece key='left' />
            <GlassesIcon alt='glasses icon' src={glassesIconUrl} />
            <BorderPiece key='right' />
          </BorderDetailsLower>
        </StyledBorder>
      </StyledBody>
    </StyledCard>
  );
};

export const Page = forwardRef(PageForwardRef);
