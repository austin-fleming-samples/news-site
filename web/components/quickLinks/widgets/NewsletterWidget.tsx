import { FormEvent, useState } from 'react';
import type { NewsletterWidget as NewsletterWidgetCodegen } from '@cms/types/codegen';
import { Nullable } from '@typings/helpers';
import { WidgetCover } from './WidgetCover';
import { WidgetWrapper } from './WidgetWrapper';

// TODO: Loading/processing state. Color code forms state. Close button. Smart errors. Use on homepage.

type FormState = 'READY' | 'WAITING' | 'SUCCESS' | 'FAILED';

const NewsletterForm = ({ showForm }: { showForm: boolean }) => {
  const [inputValue, setInputValue] = useState('');
  const [errorMessage, setErrorMessage] = useState<Nullable<string>>(null);
  const [message, setMessage] = useState<Nullable<string>>(null);
  const [formDisabled, setFormDisabled] = useState(false);
  const [formState, setFormState] = useState<FormState>('READY');

  const resetMessageStates = () => {
    setErrorMessage(null);
    setMessage(null);
  };

  const resetForm = () => {
    resetMessageStates();
    setFormState('READY');
    setInputValue('');
    setFormDisabled(false);
  };

  const subscribe = async (evt: FormEvent) => {
    evt.preventDefault();

    setFormState('WAITING');

    const response = await fetch('/api/newsletter/subscribe', {
      body: JSON.stringify({
        email: inputValue,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
    });
    const { error } = await response.json();

    if (error) {
      resetMessageStates();
      setFormState('FAILED');
      setErrorMessage(error);
      return;
    }

    resetMessageStates();
    setFormState('SUCCESS');
    setMessage('Thank you for subscribing! 🎉');
  };

  return (
    <form
      className={`bg-background w-full min-h-[4rem] h-auto flex flex-col flex-nowrap items-center ${
        showForm ? 'relative' : 'sr-only'
      }`}
      onSubmit={subscribe}>
      <div className='w-full h-16 flex flex-row flex-nowrap items-center'>
        {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
        <label className='sr-only' htmlFor='newsletter-email-input'>
          Email Address
        </label>

        <input
          required
          className='w-full h-full pl-8 flex flex-row flex-nowrap items-center justify-center bg-background focus:outline-none'
          id='newsletter-email-input'
          name='email'
          placeholder='your@email.com'
          type='email'
          value={inputValue}
          onChange={(evt) => {
            setInputValue(evt.target.value);
          }}
        />

        <button
          className='block h-[80%] text-primary font-primary font-bold px-[1.5em] border-l-2 border-solid border-primary'
          disabled={formState !== 'READY' || formDisabled}
          type='submit'>
          {
            {
              FAILED: 'Error',
              READY: 'Submit',
              SUCCESS: 'Sent',
              WAITING: 'Sending',
            }[`${formState}`]
          }
        </button>
      </div>
      {(errorMessage || message) && (
        <div className='w-full p-3 flex flex-col gap-3' id='newsletter-form-message'>
          {errorMessage && (
            <div className='w-full p-4 text-center bg-alert rounded-[1.25rem]'>
              <p className='font-primary  font-bold text-base text-alert-contrast'>
                Uh oh... something went wrong
              </p>
              <p className='font-primary font-normal text-sm text-alert-contrast'>{errorMessage}</p>
              <button
                aria-label='Reset form'
                className='underline font-primary font-bold mt-[1em] hover:opacity-50'
                type='button'
                onClick={() => {
                  resetForm();
                }}>
                Reset
              </button>
            </div>
          )}
          {message && (
            <div className='w-full p-4 text-center bg-info rounded-[1.25rem]'>
              <p className='font-primary font-bold text-base text-info-contrast'>{message}</p>
            </div>
          )}
        </div>
      )}
    </form>
  );
};

interface NewsletterWidgetProps {
  widget: NewsletterWidgetCodegen;
}

export const NewsletterWidget = ({ widget }: NewsletterWidgetProps) => {
  const [showForm, setShowForm] = useState(false);

  return (
    <WidgetWrapper color={widget.widgetStyles.color}>
      <WidgetCover
        clickAction={() => {
          setShowForm(!showForm);
        }}
        label={widget.label}
        showCover={!showForm}
      />
      <NewsletterForm showForm={showForm} />
    </WidgetWrapper>
  );
};
