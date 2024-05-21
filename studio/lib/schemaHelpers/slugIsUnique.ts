// Hack: types
// @ts-ignore
import sanityClient from 'part:@sanity/base/client'
const client = sanityClient.withConfig({apiVersion: '2022-01-21'})

const removeDraftPrefix = (id: string): string => id.replace(/^drafts\.$/, '')

const addDraftPrefix = (id: string): string => `drafts.${id}`

const addDraftPrefixOnce = (id: string): string => addDraftPrefix(removeDraftPrefix(id))

type OptionsProps = {
    document: {
        _id: string
    }
}
export const asyncSlugIsUniqueAcrossDocuments = async (slug: string, options: OptionsProps): Promise<boolean> => {

    const { document } = options
    const id = document._id

    const publishedId = removeDraftPrefix(id)
    const draftId = addDraftPrefixOnce(id)

    const params = {
        draft: draftId,
        published: publishedId,
        slug: slug
    }

    const isUniqueSlugQuery = `!defined(*[(_id in [$draft, $published]) && !(slug.current == $slug)][0]._id)`

    const isUniqueSlug = await client.fetch(isUniqueSlugQuery, params)

    return isUniqueSlug
}