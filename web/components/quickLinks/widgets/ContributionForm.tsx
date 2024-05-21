/* eslint-disable jsx-a11y/label-has-associated-control */
import { ChangeEventHandler, FormEventHandler, useState } from 'react';
import { Link } from '@components/ui';
import { defaultSettings } from '@config/preval';
import { fetchPostJSON, SessionData, useStripeJs } from '@lib/stripe';
import type { RedirectRoute } from '@lib/stripe';
import { Nullable } from '@typings/helpers';
import { useRouter } from 'next/router';
import S from './ContributionForm.module.css';

const roundToHundreths = (num: number) => Math.ceil(num * 100) / 100;

const stringToNumber = (str: string): number => {
  console.log('stringToNumber:', typeof str);
  const cleanedString = str.trim();
  return cleanedString.length > 0 ? +cleanedString : 0;
};

const formatCurrencyStringForDisplay = (val: string) =>
  roundToHundreths(stringToNumber(val)).toFixed(2);

/* const DEFAULT_CONTRIBUTION = '2.19';
const DEFAULT_PAYMENT_MODE: PaymentMode = 'RECURRING'; */

type FormState = 'READY' | 'WAITING' | 'SUCCESS' | 'FAILED';

interface ContributionFormProps {
  showForm: boolean;
}

export const ContributionForm = ({ showForm }: ContributionFormProps) => {
  const router = useRouter();
  const [contributionAmount, setContributionAmount] = useState<string>('');
  /* const [paymentMode, setPaymentMode] = useState<PaymentMode>(DEFAULT_PAYMENT_MODE); */
  const [errorMessage, setErrorMessage] = useState<Nullable<string>>('');
  const [message, setMessage] = useState<Nullable<string>>('');
  /* const [formDisabled, setFormDisabled] = useState(false); */
  const [formState, setFormState] = useState<FormState>('READY');

  const resetMessageStates = () => {
    setErrorMessage(null);
    setMessage(null);
  };

  /* const resetForm = () => {
    resetMessageStates();
    setFormState('READY');
    setContributionAmount(DEFAULT_CONTRIBUTION);
    // setPaymentMode(DEFAULT_PAYMENT_MODE);
    setFormDisabled(false);
  }; */

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (evt) => {
    evt.preventDefault();

    setFormState('WAITING');

    const sessionData: SessionData = {
      contributionData: {
        description:
          'Contributing is like dropping a little something extra in a tip jar to help us continue to provide quick, concise, nonpartisan news.',
        imageUrl: defaultSettings.seo.defaultImage.src,
        name: 'Custom Contribution',
        price: stringToNumber(contributionAmount),
      },
      mode: 'ONCE',
      redirectRoute: router.asPath as RedirectRoute,
    };

    const response = await fetchPostJSON<SessionData>(
      '/api/stripe/contribution-session',
      sessionData,
    );

    if (response.statusCode === 500) {
      console.error(response.message);
      setFormState('FAILED');
      resetMessageStates();
      setErrorMessage("Looks like Stripe didn't accept the form submission for some reason.");
      return;
    }

    /* eslint-disable-next-line react-hooks/rules-of-hooks */
    const stripe = await useStripeJs();

    if (!stripe) {
      console.error('ERROR: useStripeJs() failed to load stripe');
      setFormState('FAILED');
      resetMessageStates();
      setErrorMessage(
        "It's not your fault. Looks like we aren't able to talk to our payment provider right now. ☹️",
      );
      return;
    }

    const { error } = await stripe.redirectToCheckout({
      sessionId: response.id,
    });

    if (error) {
      console.error(error);
      setFormState('FAILED');
      resetMessageStates();
      setErrorMessage("It's not your fault. For some reason Stripe didn't accept this form.");
    }
  };

  const handlePriceInputChange: ChangeEventHandler<HTMLInputElement> = (evt) => {
    setContributionAmount(evt.currentTarget.value);
  };

  return (
    <form
      className={`bg-background w-full flex flex-col flex-nowrap items-center ${
        showForm ? 'relative' : 'sr-only'
      }`}
      onSubmit={handleSubmit}>
      <h1 className='flex flex-row items-center justify-center w-full h-16 text-lg font-bold border-b-2 border-solid text-primary font-primary border-primary-pale'>
        Contribute to SHN
      </h1>

      <div
        className='flex flex-col items-center w-full gap-10 px-8 pt-8 pb-4'
        id='contribution-fields'>
        <label className='sr-only' htmlFor='contribution-custom-amount'>
          Donation Amount
        </label>
        <div className='relative w-full'>
          <input
            className={`${S.customPriceField} 'text-primary text-lg bg-background border-primary-pale focus-within:border-primary w-full px-[2em] h-[3em] border-2 text-center align-center font-bold border-solid focus:outline-none focus:shadow-sm rounded-full`}
            id='contribution-custom-amount'
            max={10_000}
            min={0.5}
            name='Custom Contribution'
            placeholder='amount'
            step={0.01}
            type='number'
            value={`${contributionAmount}`}
            onChange={handlePriceInputChange}
          />
          <span className='absolute block top-[50%] translate-y-[-50%] left-[1.25em] leading-none'>
            $
          </span>
        </div>

        {/* <div>
          <label
            className='relative bg-background border-2 border-solid border-olive-pale focus-within:border-olive p-[.125rem] h-10 rounded-full flex flex-row flex-nowrap gap-2 focus-within:shadow-lg'
            htmlFor='payment-mode'>
            <span
              className={`h-full px-4 flex flex-row justify-center items-center rounded-full ${
                paymentMode === 'ONCE' ? 'bg-olive text-background' : 'bg-background text-olive'
              }`}>
              One-time
            </span>
            <span
              className={`h-full px-4 flex flex-row justify-center items-center rounded-full ${
                paymentMode === 'RECURRING'
                  ? 'bg-olive text-background'
                  : 'bg-background text-olive'
              }`}>
              Recurring
            </span>

            <input
              readOnly
              aria-checked={paymentMode === 'RECURRING'}
              aria-label='contribute monthly'
              checked={paymentMode === 'RECURRING'}
              className='absolute w-full h-full sr-only'
              id='payment-mode'
              name='Payment Mode'
              role='switch'
              type='checkbox'
              onClick={() => {
                setPaymentMode(paymentMode === 'ONCE' ? 'RECURRING' : 'ONCE');
              }}
            />
          </label>
        </div> */}

        <div className='w-full'>
          <span
            aria-label='summary'
            className={`block text-center text-primary font-bold mb-[2em] ${
              !contributionAmount && 'opacity-0'
            }`}>{`One-time contribution of $${formatCurrencyStringForDisplay(
            contributionAmount,
          )}`}</span>

          <button
            className='h-[3em] w-full bg-primary text-background font-primary font-bold rounded-full focus-within:shadow-lg'
            disabled={formState !== 'READY'}
            type='submit'>
            Continue
          </button>

          <span className='block text-center m-auto font-normal mt-[1em]'>
            Billing handled via{' '}
            <Link isExternal rel='noopener noreferrer' to='https://stripe.com/checkout/legal'>
              Stripe
            </Link>
          </span>

          {/* <span className='block text-center m-auto font-normal mt-[1em]'>
            <Link isExternal rel='noopener noreferrer' to='#'>
              Manage your existing contributions.
            </Link>
          </span> */}
        </div>
      </div>
    </form>
  );
};
