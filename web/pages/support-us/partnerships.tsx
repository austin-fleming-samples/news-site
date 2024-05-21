import { useEffect, useState } from 'react';
import { getPartnershipsPage } from '@cms/getPartnerships';
import { Seo } from '@components/common';
import { Container, SectionContainer } from '@components/layout';
import { Link, PolyButton, Typography } from '@components/ui';
import { defaultSettings } from '@config/preval';
import { cloin } from '@lib/cloin';
import S from '@styles/pages/get-involved/Partnerships.module.css';
import { GetStaticPropsContext, InferGetStaticPropsType } from 'next';
import NextImage from 'next/image';

const { seo } = defaultSettings;

export const getStaticProps = async ({ preview = false }: GetStaticPropsContext) => {
  const data = await getPartnershipsPage(preview);

  return {
    props: {
      data,
    },
  };
};

type FormState = 'INITIAL' | 'PENDING' | 'SUCCESS' | 'ERROR';

/* 
TODO:
- Button should have ui colors appliable.
- Need to validate data on front and backend.
- Fix header logo.
- Form should reset on send.
- Need notification bar for feedback.
- Just display a thank you message on send.
- Rough in SEO.
*/
const Partnerships = ({ data }: InferGetStaticPropsType<typeof getStaticProps>) => {
  const {
    backgroundImage,
    supportingTitle,
    supportingBody,
    title,
    _createdAt: createdAt,
    _updatedAt: updatedAt,
  } = data;

  const [senderName, setSenderName] = useState('');
  const [senderEmail, setSenderEmail] = useState('');
  const [senderMessage, setSenderMessage] = useState('');
  const [formStatus, setFormStatus] = useState<FormState>('INITIAL');

  const handleSubmit = async (event: MouseEvent) => {
    event.preventDefault();

    setFormStatus('PENDING');

    const submissionData = {
      formName: 'Partnerships',
      senderEmail,
      senderMessage,
      senderName,
    };

    const response = await fetch('/api/contactform', {
      body: JSON.stringify(submissionData),
      headers: {
        Accept: 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
      },
      method: 'POST',
    });

    if (response.status === 200) {
      setFormStatus('SUCCESS');
      setSenderName('');
      setSenderEmail('');
      setSenderMessage('');
    } else {
      setFormStatus('ERROR');
    }
  };

  useEffect(() => {
    const root = document.querySelector('#form-root');
    root?.classList.remove('noJs');
  }, []);

  return (
    <>
      <Seo
        canonicalUrl={`${seo.siteUrl}/support-us/partnerships`}
        description={supportingBody}
        pageTitle={`Partnerships | ${seo.siteName}`}
        timeModified={new Date(updatedAt)}
        timePublished={new Date(createdAt)}
      />
      <SectionContainer className={S.root}>
        <Container className={S.container}>
          <div className={S.formPane}>
            <div className={S.sidePane}>
              <div className={S.breadcrumbs}>
                <Typography tag='span' variant='overline'>
                  <Link to='/support-us'>Support Us /</Link>
                </Typography>
                <Typography tag='h1' variant='overline'>
                  {title}
                </Typography>
              </div>
              <h2 className={S.sidePaneTitle}>{supportingTitle}</h2>
              <Typography tag='p' variant='body1'>
                {supportingBody}
              </Typography>
            </div>

            <form className={cloin(S.form, 'noJs')} id='form-root'>
              <div className={S.noJsWarning}>
                Unfortunately, our form requires Javascript.
                {/* TODO: [SEO] needs rel attributes */}
                <Link
                  isExternal
                  className={S.noJsWarningLink}
                  to='https://www.instagram.com/smarthernews/'>
                  Send a DM on Instagram
                </Link>
              </div>

              <h3 className={S.formTitle}>Contact Us</h3>

              <div className={S.fields}>
                <label className={S.label} htmlFor='name'>
                  Name <span className={S.labelRequiredMark}>*</span>
                  <input
                    required
                    className={S.field}
                    id='name'
                    maxLength={70}
                    name='name'
                    placeholder='Jane Doe'
                    type='text'
                    onChange={(evt) => {
                      setSenderName(evt.target.value);
                    }}
                  />
                </label>

                <label className={S.label} htmlFor='email'>
                  Email <span className={S.labelRequiredMark}>*</span>
                  <input
                    required
                    className={S.field}
                    id='email'
                    name='email'
                    placeholder='example@email.com'
                    type='email'
                    onChange={(evt) => {
                      setSenderEmail(evt.target.value);
                    }}
                  />
                </label>

                <label className={S.label} htmlFor='message'>
                  Your Message <span className={S.labelRequiredMark}>*</span>
                  <textarea
                    required
                    className={cloin(S.field, S.textarea)}
                    id='message'
                    maxLength={1000}
                    name='message'
                    placeholder='Let us know your idea...'
                    onChange={(evt) => {
                      setSenderMessage(evt.target.value);
                    }}
                  />
                </label>

                <PolyButton
                  as='button'
                  className={S.submitButton}
                  isDisabled={formStatus === 'ERROR' || formStatus === 'SUCCESS'}
                  isLoading={formStatus === 'PENDING'}
                  type='submit'
                  variant='fill'
                  onClick={handleSubmit}>
                  {formStatus === 'INITIAL' && 'Send Your Message'}
                  {formStatus === 'PENDING' && 'Sending...'}
                  {formStatus === 'SUCCESS' && 'Sent!'}
                  {formStatus === 'ERROR' && 'Oops...'}
                </PolyButton>
              </div>
            </form>
          </div>
        </Container>
        <NextImage
          alt={backgroundImage.alt}
          className={S.backgroundImage}
          /* height={backgroundImage.height} */
          layout='fill'
          objectFit='cover'
          src={backgroundImage.src}
          /* width={backgroundImage.width} */
        />
      </SectionContainer>
    </>
  );
};

export default Partnerships;
