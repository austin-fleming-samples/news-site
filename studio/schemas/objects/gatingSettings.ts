export default {
    name: 'gatingSettings',
    type: 'object',
    title: 'Gating',
    hidden: true,
    fields: [
        {
            name: 'tier',
            type: 'string',
            title: 'Tier',
            initialValue: 'free',
            options: {
                list: [
                    {value: 'free', title: 'Free'},
                    {value: 'metered', title: 'Metered'},
                    {value: 'locked', title: 'Locked'}
                ],
                layout: 'radio'
            }
        }
    ]
}