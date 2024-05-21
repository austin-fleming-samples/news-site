import { parseError } from '@lib/errors';
import { withSentry } from '@sentry/nextjs';
import type { NextApiRequest, NextApiResponse } from 'next';
import nodemailer, { Transporter } from 'nodemailer';
import SMTPTransport from 'nodemailer/lib/smtp-transport';

type FormName = 'partnerships' | 'general contact';

type ResponseData =
  | {
      success: string;
    }
  | {
      error: string;
    };

type RequestBodyShape = {
  formName: FormName;
  senderEmail: string;
  senderMessage: string;
  senderName: string;
};

const transporterConfig = {
  auth: {
    pass: process.env.EMAIL_BOT_PASSWORD,
    user: process.env.EMAIL_BOT_ADDRESS,
  },
  host: 'smtp.gmail.com',
  port: 465,
};

const transporter: Transporter = nodemailer.createTransport(transporterConfig);

const buildEmailBody = (
  formName: string,
  senderEmail: string,
  senderName: string,
  senderMessage: string,
) => `
  <p style="font-weight:bold;">Form Name:</p>
  <p>${formName}</p>
  </br>
  <p style="font-weight:bold;">Sender's Email:</p>
  <p>${senderEmail}</p>
  </br>
  <p style="font-weight:bold;">Sender's Name:</p>
  <p>${senderName}</p>
  </br>
  <p style="font-weight:bold;">Sender's Message:</p>
  <p>${senderMessage.replace(/\r\n|\r|\n/g, '<br>')}</p>
  `;

const buildEmailSubject = (senderName: string, formName: FormName) =>
  `${formName} form submission by ${senderName}`;

const contactFormService = async (
  request: NextApiRequest,
  response: NextApiResponse<ResponseData>,
) => {
  if (request.method !== 'POST') response.status(405).send({ error: `You can't use that method.` });

  response.setHeader('Content-Type', 'application/json');

  try {
    const { senderEmail, senderName, senderMessage, formName } = request.body as RequestBodyShape;

    if (!formName || !formName.trim())
      response.status(422).json({ error: `"formName" is missing.` });

    if (!senderEmail || !senderEmail.trim())
      response.status(422).json({ error: `Sender email is missing.` });

    if (!senderName || !senderName.trim())
      response.status(422).json({ error: `Sender name is missing.` });

    if (!senderMessage || !senderMessage.trim())
      response.status(422).json({ error: `Message is missing.` });

    const subject = buildEmailSubject(senderName, formName);
    const html = buildEmailBody(formName, senderEmail, senderName, senderMessage);

    /* eslint-disable sort-keys-fix/sort-keys-fix */
    const result: SMTPTransport.SentMessageInfo = await transporter.sendMail({
      from: process.env.EMAIL_BOT_ADDRESS,
      /* to: process.env.CONTACT_FORM_RECEIVING_EMAIL, */
      to: 'austin@flimflamfactory.com',
      replyTo: senderEmail,
      subject,
      html,
    });
    /* eslint-enable sort-keys-fix/sort-keys-fix */

    // TODO: [future] destructure and test email was actually sent before confirming
    if (!result) throw new Error('Is this even supposed to happen? No result at all.');

    const responseJson: ResponseData = {
      success: 'Your email has sent!',
    };

    response.status(200).json(responseJson);
  } catch (error) {
    response.status(500).json({
      error: parseError(error),
    });
  }
};

export default withSentry(contactFormService);
