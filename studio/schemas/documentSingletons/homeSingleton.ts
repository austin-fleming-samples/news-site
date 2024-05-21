import { FcHome } from 'react-icons/fc'

export default {
    name: 'homeSingleton',
    type: 'document',
    title: 'Home Settings',
    icon: FcHome,
    __experimental_actions: ['update', 'publish'],
    fields: [
        {
            title: 'Page Title',
            name: 'title',
            type: 'string',
            codegen: { required: true },
            validation: (Rule: any) => Rule.required().error('"Title" is missing.')
        }
    ]
}
