export type HandledString = string;
export type RobotsDirective = "none" | "all" | "nofollow" | "noindex";
export type RobotsSnippetDirective = "none" | number | "auto";
export type RobotsImageSize = "none" | "large" | "auto";
export type SiteName = string;
export type ImageMimeType = "jpeg" | "png" | "gif";
export type Locale = string;
export type Keywords = string[];
export type ContentTier = "locked" | "metered" | "free";

// TODO: [SEO] have in article/page seo settings. Determines JSONLD as well
export type FBObjectType =
  | "music.song"
  | "music.album"
  | "music.playlist"
  | "music.radio_station"
  | "video.movie"
  | "video.episode"
  | "video.tv_show"
  | "video.other"
  | "article"
  | "book"
  | "profile"
  | "website";

export type TwitterCardType =
  | "summary"
  | "summary_large_image"
  | "app"
  | "player";

export type AuthorData = {
  name: string;
  profileUrl: string;
};
