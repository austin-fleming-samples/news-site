// TSNOTE: mailchimp sucks and doesn't have types.
import mailchimp from '@mailchimp/mailchimp_marketing';
import { withSentry } from '@sentry/nextjs';
import type { NextApiRequest, NextApiResponse } from 'next';

mailchimp.setConfig({
  apiKey: process.env.MAILCHIMP_API_KEY,
  server: process.env.MAILCHIMP_API_SERVER, // e.g. us1
});

const talkToMailchimp = async (request: NextApiRequest, response: NextApiResponse) => {
  const { email } = request.body;

  console.log(email);

  if (!email) {
    return response.status(400).json({ error: 'Email is required' });
  }

  try {
    await mailchimp.lists.addListMember(process.env.MAILCHIMP_AUDIENCE_ID, {
      email_address: email,
      status: 'subscribed',
    });

    return response.status(201).json({ error: '' });
  } catch (error) {
    let errorMessage = error.response?.body?.title || error.message || error.toString();

    errorMessage =
      errorMessage === 'Member Exists'
        ? `The email "${email}" is already signed up.`
        : errorMessage;

    return response.status(500).json({ error: errorMessage });
  }
};

export default withSentry(talkToMailchimp);
