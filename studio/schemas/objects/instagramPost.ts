import { isUrl } from '../../lib/validation'


// TODO: Get token from Jenna's account -- https://docs.oceanwp.org/article/487-how-to-get-instagram-access-token
export default {
  type: 'object',
  name: 'instagramPost',
  title: 'Instagram Post',
  fields: [
    {
      name: 'url',
      type: 'url',
      description: 'Visit an Instagram post in a browser and copy the URL.',
      codegen: { required: true },
      validation: (Rule: any) => [
        Rule.required().error('"Instagram Post" must have a URL.'),
        Rule.custom((value: any) => (isUrl(value) ? true : `"Instagram Post" takes an URL as input. For example: https://www.instagram.com/tv/CN701x5A1IW/`)).error()
      ]
    }
  ],
  preview: {
    select: { url: 'url' }
  }
}
