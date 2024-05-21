import { Fragment, useState } from 'react';
import { getSupportUsPage } from '@cms/setSupportUsSingleton';
import { Seo } from '@components/common';
import { SectionContainer, Container } from '@components/layout';
import { Modal, PolyButton, Typography } from '@components/ui';
import { defaultSettings } from '@config/preval';
import S from '@styles/pages/get-involved/support-us.module.css';
import { GetStaticPropsContext, InferGetStaticPropsType } from 'next';
import {
  EmailIcon,
  EmailShareButton,
  FacebookIcon,
  FacebookShareButton,
  LinkedinIcon,
  LinkedinShareButton,
  RedditIcon,
  RedditShareButton,
  TelegramIcon,
  TelegramShareButton,
  TwitterIcon,
  TwitterShareButton,
  WhatsappIcon,
  WhatsappShareButton,
} from 'react-share';

const { seo } = defaultSettings;

export const getStaticProps = async ({ preview = false }: GetStaticPropsContext) => {
  const data = await getSupportUsPage(preview);

  return {
    props: {
      data,
    },
  };
};

const SupportUs = ({ data }: InferGetStaticPropsType<typeof getStaticProps>) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const { eyebrow, title, description, cards, _createdAt: createdAt, _updatedAt: updatedAt } = data;

  // TODO: [SEO] JSON-LD
  return (
    <>
      <Seo
        canonicalUrl={`${seo.siteUrl}/support-us`}
        description={description}
        pageTitle={`Support Us | ${seo.siteName}`}
        timeModified={new Date(updatedAt)}
        timePublished={new Date(createdAt)}
      />
      <SectionContainer className={S.root}>
        <div className={S.titleBlock}>
          <Container>
            {eyebrow && <span className={S.titleBlockOverline}>{eyebrow}</span>}
            <h1 className={S.titleBlockTitle}>{title}</h1>
            <p className={S.titleBlockDescription}>{description}</p>
          </Container>
        </div>
        <Container>
          <div className={S.cardGrid}>
            {cards.map(
              ({
                _key: key,
                title: cardTitle,
                description: cardDescription,
                buttonLabel,
                destination,
              }) => (
                <Fragment key={key}>
                  <article key={key} className={S.card}>
                    <div className={S.cardLink}>
                      <div className={S.cardContent}>
                        <Typography tag='h1' variant='h3'>
                          {cardTitle}
                        </Typography>
                        <Typography tag='p' variant='body1'>
                          {cardDescription}
                        </Typography>
                      </div>
                      <div>
                        {destination === 'share' && (
                          <PolyButton
                            as='button'
                            className={S.cardButton}
                            color='primary'
                            variant='fill'
                            onClick={() => setModalIsOpen(true)}>
                            {buttonLabel}
                          </PolyButton>
                        )}
                        {destination === 'donate' && (
                          <>
                            {/* <PolyButton
                              isExternal
                              as='link'
                              className={S.cardButton}
                              color='primary'
                              to='https://buy.stripe.com/eVaaFXduM6Pt45W7ss'
                              variant='fill'>
                              {buttonLabel}
                            </PolyButton> */}
                            <PolyButton
                              as='link'
                              className={S.cardButton}
                              color='primary'
                              to='/support-us/contribute'
                              variant='fill'>
                              {buttonLabel}
                            </PolyButton>
                          </>
                        )}
                        {destination === 'shop' && (
                          <PolyButton
                            isExternal
                            as='link'
                            className={S.cardButton}
                            color='primary'
                            to='https://shop.smarthernews.com'
                            variant='fill'>
                            {buttonLabel}
                          </PolyButton>
                        )}
                        {destination === 'partnerships' && (
                          <PolyButton
                            as='link'
                            className={S.cardButton}
                            color='primary'
                            to='/support-us/partnerships'
                            variant='fill'>
                            {buttonLabel}
                          </PolyButton>
                        )}
                      </div>
                    </div>
                  </article>
                  {destination === 'share' && (
                    <Modal
                      className={S.shareModal}
                      id='share-popup'
                      isOpen={modalIsOpen}
                      labeledById='share-title'
                      setIsOpen={setModalIsOpen}>
                      <div className={S.shareModalTitleBlock}>
                        <h1 className={S.shareModalTitle} id='share-title'>
                          Share
                        </h1>
                        <p className={S.shareModalDescription}>
                          Enjoy our content? Let others know!
                        </p>
                      </div>
                      <div className={S.shareModalIcons}>
                        {defaultSettings.generalSettings.sharePlatforms.map((platform) => {
                          const { siteUrl } = defaultSettings.seo;
                          const iconSize = 30;

                          /* TODO: [future] use dynamic imports possibly. */

                          return (
                            <Fragment key={platform}>
                              {platform === 'twitter' && (
                                <TwitterShareButton url={siteUrl}>
                                  <TwitterIcon round size={iconSize} />
                                </TwitterShareButton>
                              )}
                              {platform === 'facebook' && (
                                <FacebookShareButton url={siteUrl}>
                                  <FacebookIcon round size={iconSize} />
                                </FacebookShareButton>
                              )}
                              {platform === 'linkedin' && (
                                <LinkedinShareButton url={siteUrl}>
                                  <LinkedinIcon round size={iconSize} />
                                </LinkedinShareButton>
                              )}
                              {platform === 'reddit' && (
                                <RedditShareButton url={siteUrl}>
                                  <RedditIcon round size={iconSize} />
                                </RedditShareButton>
                              )}
                              {platform === 'email' && (
                                <EmailShareButton url={siteUrl}>
                                  <EmailIcon round size={iconSize} />
                                </EmailShareButton>
                              )}
                              {platform === 'telegram' && (
                                <TelegramShareButton url={siteUrl}>
                                  <TelegramIcon round size={iconSize} />
                                </TelegramShareButton>
                              )}
                              {platform === 'whatsapp' && (
                                <WhatsappShareButton url={siteUrl}>
                                  <WhatsappIcon round size={iconSize} />
                                </WhatsappShareButton>
                              )}
                            </Fragment>
                          );
                        })}
                      </div>
                    </Modal>
                  )}
                </Fragment>
              ),
            )}
          </div>
        </Container>
      </SectionContainer>
    </>
  );
};

export default SupportUs;
