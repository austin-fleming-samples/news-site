export default {
    title: 'Sections',
    name: 'sections',
    type: 'array',
    of: [
        {type: 'articleText'},
        {type: 'heroSplit'},
        {type: 'heroSimple'},
        { type: 'mailchimpForm' }
    ],
    codegen: {required:true},
    validation: (Rule:any) => Rule.required().min(1).error('"Section" should have at least one section selected.')
}
