import { BsCardHeading } from 'react-icons/bs'

export default {
    name: 'heroSimple',
    title: 'Hero Simple',
    icon: BsCardHeading,
    description: 'A simple, large title with option summary block.',
    type: 'object',
    fields: [
        {
            name: 'title',
            title: 'Title *',
            type: 'string',
            codegen: {required:true},
            validation: (Rule:any) => Rule.required().error('"Title" is missing.')
        },
        {
            name: 'summary',
            title: 'Summary',
            type: 'text'
        }
    ],
    preview: {
        select: {
            title: 'title',
            summary: 'summary'
        },
        prepare({title, summary}:{title:string,summary:string}) {
            return {
                title: `Hero Simple | ${title}`,
                subtitle: summary || 'no summary',
                media: BsCardHeading
            }
        }
    }
}
