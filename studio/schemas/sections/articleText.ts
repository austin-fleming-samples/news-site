import { GrTextWrap } from 'react-icons/gr'
import { blockContentToPlainText } from "react-portable-text"

export default {
    name: 'articleText',
    title: 'Article Text',
    icon: GrTextWrap,
    type: 'object',
    fields: [
        {
            name: 'body',
            title: 'Body',
            type: 'blockContent',
            codegen: {required:true},
            validation: (Rule:any) => Rule.required().error('"Body" is missing.')
        }
    ],
    preview: {
        select: {
            body: 'body'
        },
        prepare({body}: {body:any}) {
            const titleContent = blockContentToPlainText(body) || 'no content'

            return {
                title: `Article Text | ${titleContent}`
            }
        }
    }
}
