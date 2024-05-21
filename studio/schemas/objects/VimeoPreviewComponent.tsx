import React from 'react'
import getVideoId from 'get-video-id'

export const VimeoPreviewComponent = ({
    value
}: {
    value: { url: string }
}) => {
    const { url } = value
    if (!url) {
        return <p>Missing URL for Vimeo embed </p>
    }

    const { id, service } = getVideoId(url)

    if (!id) {
        return <div>Missing Vimeo URL </div>
    }

    const vimeoEmbedUrl = 'https://player.vimeo.com/video/' + id
    const youtubeEmbedUrl = 'https://www.youtube.com/embed/' + id

    if (service === 'vimeo') {
        return (
            <div style={{
                padding: '56.25% 0 0 0',
                position: 'relative'
            }} >
                <iframe
                    src={vimeoEmbedUrl}
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%'
                    }}
                    frameBorder="0"
                    allow="autoplay; fullscreen"
                    allowFullScreen
                />
            </div>
        )
    }

    if (service === 'youtube') {
        return (
            <div style={{
                padding: '56.25% 0 0 0',
                position: 'relative'
            }} >
                <iframe
                    src={youtubeEmbedUrl}
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%'
                    }}
                    frameBorder="0"
                    allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                />
            </div>
        )
    }

    return <div>Missing Vimeo URL </div>
}