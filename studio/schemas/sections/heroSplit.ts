import {BsSquareHalf} from 'react-icons/bs'

export default {
  name: 'heroSplit',
  title: 'Hero Split',
  icon: BsSquareHalf,
  description: 'A hero with a complex heading block and optional image.',
  type: 'object',
  fields: [
    {
      name: 'mainimage',
      title: 'Main image',
      type: 'figure',
    },
    {
        name: 'title',
        title: 'Title *',
        type: 'string',
        codegen: {required:true},
        validation: (Rule:any) => Rule.required().error('"Title" is missing.')
    },
    {
        name: 'eyebrow',
        title: 'Eyebrow',
        description: 'Small text that appears above the title. Usually a category or theme term.',
        type: 'string'
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
      eyebrow: 'eyebrow',
      summary: 'summary',
      media: 'mainimage'
    },
    prepare({title,eyebrow,summary,media}:{title:string, eyebrow:string,summary:string,media:any}) {

      return {
        title: `Hero Split | ${title}`,
        subtitle: eyebrow || summary || '',
        media: media || BsSquareHalf
      }
    }
  }
};
