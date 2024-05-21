import { useEffect, useState } from 'react';
import { cloin } from '@lib/cloin';
import S from './ContactForm.module.css';

type TextFieldProps = {
  label: string;
  required: boolean;
};

interface ContactFormProps {
  subtitle: string;
  title: string;
}

const nameIsValid = (name: string): true | string =>
  name.length < 70 ||
  'Our form can only handle up to 70 characters for names. Maybe try just you first name.';

const validateEmail = (email: string) => {
  // https://www.regular-expressions.info/email.html

  const emailRegex = /^[\d%+.A-Z_-]+@[\d.A-Z-]+\.[A-Z]{2,}$/;
  return String(email).toLowerCase().match(emailRegex);
};

export const ContactForm = ({ title, subtitle }: ContactFormProps) => {
  const [message, setMessage] = useState('');
  const [senderEmail, setSenderEmail] = useState('');
  const [senderName, setSenderName] = useState('');
  const [hasJs, setHasJs] = useState(true);

  useEffect(() => {
    const root = document.querySelector('#form-root');
    root?.classList.remove('noJs');
  }, []);

  return (
    <form className={cloin(S.root, 'noJs')} id='form-root'>
      <div className={S.noJsWarning}>Our form requires JS.</div>

      <h1>{title}</h1>
      {subtitle && <p>{subtitle}</p>}

      <div className={S.fields}>
        <label className={S.label} htmlFor='name'>
          Name <span className={S.labelRequiredMark}>*</span>
          <input required className={S.field} id='name' name='name' type='text' />
        </label>

        <label className={S.label} htmlFor='email'>
          Email <span className={S.labelRequiredMark}>*</span>
          <input required className={S.field} id='email' name='email' type='email' />
        </label>

        <button type='submit'>Submit</button>
      </div>
    </form>
  );
};
