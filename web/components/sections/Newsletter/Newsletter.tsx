// HACK: handle message differently
/* eslint react/no-danger:"off" */

// https://devsday.ru/blog/details/36985?__cf_chl_jschl_tk__=pmd_7206e6263418402eea1411832e5b4b1b2b8c2b5c-1627776672-0-gqNtZGzNAiKjcnBszQh6
// https://imranhsayed.medium.com/adding-mailchimp-subscribe-newsletter-in-next-js-react-application-7c776daae710
// https://gist.github.com/GedalyaKrycer/f9dcc6e76e93a804ce61de222d327d0f#file-mailchimpform-js
// https://github.com/sanity-io/sanity-template-nextjs-event-starter/blob/9c174c2f2e790f3d7f708625044f7c0dff8e2d11/components/form.tsx

import { useState } from 'react';
import type { SyntheticEvent } from 'react';
import { Button, Typography } from '@components/ui';
import NextLink from 'next/link';
import MailchimpSubscribe from 'react-mailchimp-subscribe';
import type { EmailFormFields, FormHooks } from 'react-mailchimp-subscribe';
import {
  FormButton,
  StyledForm,
  StyledInput,
  StyledSubtitle,
  StyledTitle,
} from './Newsletter.styled';

/* HACK: subscription URL should come from site settings */
export const Newsletter = () => {
  /* const [isFocused, setFocused] = useState(false); // use for styling */
  const [email, setEmail] = useState<string>('');

  return (
    <MailchimpSubscribe
      render={({ subscribe, status, message }) => (
        <StyledForm
          onSubmit={(e) => {
            e.preventDefault();
            if (email) {
              const onValidate = () => subscribe({ EMAIL: email });
              onValidate();
            }
          }}>
          <StyledSubtitle>Sign up today to</StyledSubtitle>
          <StyledTitle>Get SmartHER News In Your Inbox</StyledTitle>
          {status === 'sending' && <div>Sending...</div>}
          {status === 'error' && (
            <div dangerouslySetInnerHTML={{ __html: message || 'Oops, an error occured.' }} />
          )}
          {status === 'success' && (
            <div dangerouslySetInnerHTML={{ __html: message || 'Success!' }} />
          )}
          {status !== 'success' && (
            <StyledInput
              required
              aria-label='your email address'
              autoComplete='off'
              placeholder='Your Email'
              type='email'
              value={email}
              onChange={(e) => setEmail(e?.target?.value || '')}
            />
          )}
          {
            // When successful submission, disable button, change to 'text' and show thank you.
            status === 'success' ? (
              <p>Thank You!</p>
            ) : (
              <FormButton disabled={status === 'error'} type='submit'>
                Submit
              </FormButton>
            )
          }
          <div key='privacy policy'>
            <Typography tag='p' variant='caption'>
              Read our{' '}
              <NextLink passHref href='/info/privacy-policy'>
                <a>Privacy Policy</a>
              </NextLink>
            </Typography>
          </div>
        </StyledForm>
      )}
      url={process.env.NEXT_PUBLIC_MAILCHIMP_URL!}
    />
  );
};
