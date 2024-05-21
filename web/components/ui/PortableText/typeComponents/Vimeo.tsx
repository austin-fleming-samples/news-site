// https://github.com/u-wave/react-vimeo
import ReactVimeo from '@u-wave/react-vimeo'

export const Vimeo = ({
    url
}: {
    url?: string
}) => {
    if (!url) {
        console.error('No url passed to PortableText/Vimeo. Returning null.')
        return null
    }

    return <ReactVimeo video={url} />
}