import {FcTemplate} from 'react-icons/fc'
import { asyncSlugIsUniqueAcrossDocuments, getSlugSource } from "../../lib/schemaHelpers"

export default {
    title: 'Page',
    name: 'page',
    type: 'document',
    icon: FcTemplate,
    fields: [
        {
            name: 'gatingSettings',
            type: 'gatingSettings',
            title: 'Gating Settings',
        },
        {
            title: 'Page Title',
            name: 'title',
            type: 'string',
            codegen: {required:true},
            validation: (Rule:any) => Rule.required().error('"Title" is missing.')
        },
        {
            title: 'Slug',
            name: 'slug',
            type: 'slug',
            options: {
                source: getSlugSource,
                isUnique: asyncSlugIsUniqueAcrossDocuments
              },
            codegen: {required:true},
            validation: (Rule: any) => Rule.required().error('"Slug" is missing.')
        },
        {
            title: 'Tags',
            name: 'tags',
            description: 'Press enter to add the tag.',
            type: 'tags'
          },
        {
            title: 'Page Builder',
            name: 'sections',
            description: 'Select sections from the dropdown to assemble the page.',
            type: 'sections',
            codegen: {required:true},
            validation: (Rule:any) => Rule.required().min(1).error('"Page Builder" should have at least one section.')
        },
        {
            title: 'SEO Overrides',
            name: 'pageSeo',
            type: 'pageSeo'
        }
    ]
}
