import {
    AiFillTwitterCircle,
    AiFillFacebook,
    AiFillInstagram,
    AiFillYoutube,
    AiFillLinkedin,
    AiFillMediumCircle
} from 'react-icons/ai'

export default {
    title: 'Socials',
    name: 'socials',
    type: 'object',
    fields: [
        {
            name: 'links',
            title: 'Links',
            type: 'array',
            of: [
                {
                    title: 'Platform',
                    name: 'platform',
                    type: 'object',
                    fields: [
                        {
                            name: 'title',
                            title: 'Title',
                            type: 'string',
                            options: {
                                list: [
                                    { title: 'Instagram', value: 'instagram' },
                                    { title: 'Twitter', value: 'twitter' },
                                    { title: 'Facebook', value: 'facebook' },
                                    { title: 'YouTube', value: 'youtube' },
                                    { title: 'Medium', value: 'medium' },
                                    { title: 'LinkedIn', value: 'linkedin' }
                                ],
                                layout: 'radio'
                            },
                            codegen: { required: true },
                            validation: (Rule: any) => Rule.required().error('"Title" is missing.')
                        },
                        {
                            name: 'link',
                            title: 'Link',
                            type: 'url',
                            codegen: { required: true },
                            validation: (Rule: any) => Rule.required().min(1).error('"Link" is missing.')
                        }
                    ]
                }
            ],
            codegen: { required: true },
            validation: (Rule: any) => Rule.required().error('"Links" is missing.')
        }
    ],
    codegen: { required: true },
    validation: (Rule: any) => Rule.required().error('"Links" is missing.')
}