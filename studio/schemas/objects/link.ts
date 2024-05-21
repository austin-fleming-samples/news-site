import { filterFalsy } from "../../lib/helpers/arrays"

export default {
    title: 'Link',
    name: 'link',
    type: 'object',
    fields: [
        {
            title: 'Label',
            name: 'label',
            type: 'string',
            codegen: { required: true },
            validation: (Rule: any) => Rule.required().error('"Label" is missing.')
        },
        {
            title: 'Destination',
            name: 'destination',
            description: 'choose one link option.',
            type: 'object',
            fields: [
                {
                    title: 'Page',
                    name: 'postTypePage',
                    type: 'string',
                    options: {
                        list: [
                            { title: `All Card Stacks`, value: 'quickreads' },
                            { title: `All Quick Quotes`, value: 'quickquotes' },
                            { title: `All Video Posts`, value: 'videoposts' },
                            { title: 'Search', value: 'search'},
                            { title: `Home Settings`, value: 'home'},
                            { title: `Support Us`, value: 'support-us' },
                            { title: `Partnerships`, value: 'support-us/partnerships'}
                        ]
                    }
                },
                {
                    title: 'Internal Page Reference',
                    name: 'internalPageReference',
                    type: 'reference',
                    to: [
                        /* { type: 'editorsBlog'}, */
                        { type: 'author' },
                        { type: 'quickreads' },
                        { type: 'quickquotes' },
                        { type: 'videoposts' },
                        { type: 'page' },
                        { type: 'videoseries' },
                        { type: 'cardseries' }
                    ]
                },
                {
                    title: 'External Link',
                    name: 'externalLink',
                    type: 'url'
                },
                {
                    name: 'isSponsor',
                    type: 'boolean',
                    title: 'Is Sponsor',
                    initialValue: false,
                    description: 'Marks external link as a sponsorship link. (adds "sponsor" attribute).',
                    hidden: ({parent}) => {
                        return !parent.externalLink
                    }
                },
                {
                    name: 'isTrusted',
                    type: 'boolean',
                    title: 'Is Trusted',
                    initialValue: false,
                    description: 'Marks external link as being to a trusted, such as our shop. (removes "nofollow" attribute).',
                    hidden: ({parent}) => {
                        return !parent.externalLink
                    }
                }
            ],
            codegen: { required: true },
            validation: (Rule: any) => [
                Rule.required().error('A "Destination" option is required for "Link".'),
                Rule.custom((destination:any) => {
                    if (!destination) return '"Destination" is missing.'

                    const filledFields = filterFalsy([destination.postTypePage, destination.internalPageReference, destination.externalLink])

                    if (filledFields.length === 0) return '"Destination" requires (1) type of link field to be filled.'
                    if (filledFields.length > 1) return '"Destination" should have only (1) type of link field filled.'

                    return true
                }).error(),
            ]
        }
    ]
}
