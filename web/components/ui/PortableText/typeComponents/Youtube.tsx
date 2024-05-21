import getYouTubeId from 'get-youtube-id';
import YouTube from 'react-youtube';

export const Youtube = ({ url, alt }: { alt?: string; url: string }) => {
  if (!url) {
    console.error('Youtube url missing at PortableText/Youtube. Returning null.');
    return null;
  }

  const id = getYouTubeId(url);

  if (!id) {
    console.error('Failed to derive Youtube url at PortableText/Youtube. Returning null.');
    return null;
  }

  return <YouTube videoId={id} />;
};
