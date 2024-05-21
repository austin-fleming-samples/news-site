/* eslint @next/next/no-img-element: "off" */
import { StyledAside } from './SocialShare.Styled';

// TODO: [future] these links are likely an issue. They are missing rel and href. Maybe should be buttons?
export const SocialShare = () => (
  <StyledAside>
    <p className='share__title'>share</p>
    <div className='share__links a2a_kit a2a_default_style'>
      <a className='share__link a2a_button_facebook narticle__socialButton'>
        <img
          alt='Facebook'
          border='0'
          height='30'
          src='https://img.icons8.com/ios-glyphs/30/000000/facebook-new.png'
          width='30'
        />
      </a>
      <a className='share__link a2a_button_twitter narticle__socialButton'>
        <img
          alt='Twitter'
          border='0'
          height='30'
          src='https://img.icons8.com/ios-glyphs/30/000000/twitter-circled--v1.png'
          width='30'
        />
      </a>
      <a
        className='share__link a2a_dd narticle__socialButton'
        href='https://www.addtoany.com/share'>
        <img
          alt='Share'
          border='0'
          height='30'
          src='https://img.icons8.com/ios-glyphs/30/000000/plus.png'
          width='30'
        />
      </a>
    </div>
    <script async src='https://static.addtoany.com/menu/page.js' />
  </StyledAside>
);
