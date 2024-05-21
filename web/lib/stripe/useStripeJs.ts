import type { Stripe } from '@stripe/stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { Nullable } from '@typings/helpers';

let stripePromise: Promise<Nullable<Stripe>>;

const publicKey =
  process.env.NEXT_PUBLIC_STRIPE_LIVE_MODE === 'TRUE'
    ? (process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string)
    : (process.env.NEXT_PUBLIC_STRIPE_TESTING_PUBLISHABLE_KEY as string);

export const useStripeJs = () => stripePromise || loadStripe(publicKey);
