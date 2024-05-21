import { SessionData } from '@lib/stripe';
import { withSentry } from '@sentry/nextjs';
import type { NextApiRequest, NextApiResponse } from 'next';
import Stripe from 'stripe';

/* 
HELPERS 
*/
const dollarsToCents = (dollars: number) => Math.round(dollars * 100);

/*
INITIALIZE
*/
const secretKey =
  process.env.NEXT_PUBLIC_STRIPE_LIVE_MODE === 'TRUE'
    ? (process.env.STRIPE_SECRET_KEY as string)
    : (process.env.STRIPE_TESTING_SECRET_KEY as string);

const publicKey =
  process.env.NEXT_PUBLIC_STRIPE_LIVE_MODE === 'TRUE'
    ? (process.env.NEXT_PUBLIC_STRIPE_API_VERSION as string)
    : (process.env.NEXT_PUBLIC_STRIPE_TESTING_PUBLISHABLE_KEY as string);

const stripe = new Stripe(secretKey, {
  // ESNOTE: Stripe recommends disabling ts-ignore when using .env here
  /* eslint-disable-next-line @typescript-eslint/ban-ts-comment */
  // @ts-ignore
  apiVersion: process.env.NEXT_PUBLIC_STRIPE_API_VERSION,
});

/* 
SERVER
*/

/* 
- May need to just allow one product at a time. Not sure if 'subscription' locks in the purchase or allows for options on payment page.
*/
const contributionSession = async (request: NextApiRequest, response: NextApiResponse) => {
  if (request.method !== 'POST') {
    response.setHeader('Allow', 'POST');
    response.status(405).end('Method Not Allowed. Be gone.');
  }

  try {
    const { contributionData, mode, redirectRoute } = request.body as SessionData;

    const { cancelRedirectUrl, successRedirectUrl } = {
      cancelRedirectUrl: `${request.headers.origin}${redirectRoute}?status=cancel&{CHECKOUT_SESSION_ID}`,
      successRedirectUrl: `${request.headers.origin}${redirectRoute}?status=success&{CHECKOUT_SESSION_ID}`,
    };

    const params: Stripe.Checkout.SessionCreateParams = {
      cancel_url: cancelRedirectUrl,
      consent_collection: {
        // ask if we can send promotions
        promotions: 'auto',
      },
      line_items: [
        {
          description: contributionData.description,
          price_data: {
            currency: 'usd',
            product_data: {
              ...(contributionData.imageUrl && { images: [contributionData.imageUrl] }),
              name: contributionData.name,
            },
            ...(mode === 'RECURRING' && {
              recurring: {
                interval: 'month',
              },
            }),
            unit_amount: dollarsToCents(contributionData.price),
          },
          quantity: 1,
        },
      ],
      mode: mode === 'RECURRING' ? 'subscription' : 'payment',
      payment_method_types: ['card'],
      success_url: successRedirectUrl,
    };

    const checkoutSession = await stripe.checkout.sessions.create(params);

    response.status(200).json({ id: checkoutSession.id });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Internal server error';
    response.status(500).json({ message: errorMessage, statusCode: 500 });
  }
};

export default withSentry(contributionSession);
