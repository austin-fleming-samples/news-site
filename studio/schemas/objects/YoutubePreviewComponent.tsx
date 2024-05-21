import React from 'react'
import getYouTubeId from 'get-youtube-id'
import YouTube from 'react-youtube'

export const YoutubePreviewComponent = ({
    value
}: {
    value: {
        url: string
    }
}) => {
    const { url } = value

    if (!url) {
        return <p>Missing URL for Youtube embed</p>
    }
    const id = getYouTubeId(url) || undefined

    return <YouTube videoId={id} />
}