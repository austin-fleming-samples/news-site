import {FaMailchimp} from 'react-icons/fa'

export default {
    name: 'mailchimpForm',
    title: 'Mailchimp Form',
    icon: FaMailchimp,
    type: 'object',
    fields: [
        {
            name: 'eyebrow',
            title: 'Eyebrow',
            type: 'string'
        },
        {
          name: 'title',
          title: 'Title',
          type: 'string',
          codegen: {required: true},
          validation: (Rule: any) => Rule.required().error('Title is missing.')
        },
        {
          name: 'actionUrl',
          type: 'url',
          title: 'URL to Mailchimp signup',
          description:
            'URL for the Mailchimp signup form (action url). Remember to add your domain in your mailchimp settings to avoid CORS errors.',
          codegen: {required: true},
          validation: (Rule: any) => Rule.required().error('"URL to Mailchimp signup" is missing.')
        },
    ]
}
