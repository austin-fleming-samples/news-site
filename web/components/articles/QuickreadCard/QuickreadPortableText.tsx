/*
eslint
  @typescript-eslint/ban-types: "off",
  react/display-name:"off",
  jsx-a11y/heading-has-content:"off",
  react/no-multi-comp:"off",
  sort-keys-fix/sort-keys-fix: "off"
*/
import { CardContent as CardContentProps } from '@cms/types/sanityTypes';
import ReactPortableText from 'react-portable-text';
import { ContentContainer } from './QuickreadPortableText.Styled';

const buildSerializers = {
  normal: (props: any) => <p {...props} />,
  h1: (props: any) => <h1 {...props} />,
  h2: (props: any) => <h2 {...props} />,
  h3: (props: any) => <h3 {...props} />,
  h4: (props: any) => <h4 {...props} />,
  h5: (props: any) => <h5 {...props} />,
  h6: (props: any) => <p className='leftAlign' {...props} />, // NOTE: legacy quirk where 'left-align' was mapped to H6
  blockquote: (props: any) => <blockquote {...props} />, // TODO: link component
  leftAlign: (props:any) => <span className='leftAlign' {...props}/>
};

export const QuickreadPortableText = ({
  body,
  textColor,
}: {
  body: CardContentProps;
  textColor: string;
}) =>
  body ? (
    <ContentContainer textColor={textColor}>
      <ReactPortableText
        className='cardportabletext'
        content={body as [object]}
        serializers={buildSerializers}
      />
    </ContentContainer>
  ) : null;
