import type {
  SanityReference,
  SanityKeyedReference,
  SanityAsset,
  SanityImage,
  SanityFile,
  SanityGeoPoint,
  SanityBlock,
  SanityDocument,
  SanityImageCrop,
  SanityImageHotspot,
  SanityKeyed,
  SanityImageAsset,
  SanityImageMetadata,
  SanityImageDimensions,
  SanityImagePalette,
  SanityImagePaletteSwatch,
} from "sanity-codegen";

export type {
  SanityReference,
  SanityKeyedReference,
  SanityAsset,
  SanityImage,
  SanityFile,
  SanityGeoPoint,
  SanityBlock,
  SanityDocument,
  SanityImageCrop,
  SanityImageHotspot,
  SanityKeyed,
  SanityImageAsset,
  SanityImageMetadata,
  SanityImageDimensions,
  SanityImagePalette,
  SanityImagePaletteSwatch,
};

/**
 * Page
 *
 *
 */
export interface Page extends SanityDocument {
  _type: "page";

  /**
   * Gating Settings — `gatingSettings`
   *
   *
   */
  gatingSettings?: GatingSettings;

  /**
   * Page Title — `string`
   *
   *
   */
  title: string;

  /**
   * Slug — `slug`
   *
   *
   */
  slug: { _type: "slug"; current: string };

  /**
   * Tags — `tags`
   *
   * Press enter to add the tag.
   */
  tags?: Tags;

  /**
   * Page Builder — `sections`
   *
   * Select sections from the dropdown to assemble the page.
   */
  sections: Sections;

  /**
   * SEO Overrides — `pageSeo`
   *
   *
   */
  pageSeo?: PageSeo;
}

/**
 * Products
 *
 *
 */
export interface Products extends SanityDocument {
  _type: "products";

  /**
   * Product Title — `string`
   *
   *
   */
  title: string;

  /**
   * Slug — `slug`
   *
   *
   */
  slug: { _type: "slug"; current: string };

  /**
   * Priority — `number`
   *
   * Can be used to order products. 0 comes before 1.
   */
  priority?: number;

  /**
   * Shop Link — `url`
   *
   * URL of the product page on woocommerce. When someone clicks on a preview card, this is where they will be taken. Looks like: https://example.com/product-name
   */
  storeLink: string;

  /**
   * Product Price — `string`
   *
   * Format as: $10.29
   */
  price: string;

  /**
   * Discounted From — `string`
   *
   * If you want a crossed out "original price" in front of the current price (Product Price field above), you can specify it here. Format as: $10.29
   */
  discountedFromPrice?: string;

  /**
   * Publish Date — `datetime`
   *
   * Will be used for sorting content. Avoid changing once published as it will be used to establish the "canonical" date for SEO.
   */
  datePublished: string;

  /**
   * Product Series — `string`
   *
   * For if you want a series such as "home" or "fitness" displayed on the preview card.
   */
  productSeries?: string;

  /**
   * Product Image — `image`
   *
   *
   */
  mainimage: {
    _type: "image";
    asset: SanityReference<SanityImageAsset>;
    crop?: SanityImageCrop;
    hotspot?: SanityImageHotspot;

    /**
     * Alternative text — `string`
     *
     * Important for SEO and accessiblity.
     */
    alt?: string;
  };

  /**
   * Summary — `text`
   *
   * Appears on preview cards and used for SEO description. Aim for 50-160 characters.
   */
  summary?: string;
}

/**
 * Quick Quotes
 *
 *
 */
export interface Quickquotes extends SanityDocument {
  _type: "quickquotes";

  /**
   * Gating Settings — `gatingSettings`
   *
   *
   */
  gatingSettings?: GatingSettings;

  /**
   * Title — `string`
   *
   * Good titles are descriptive and between 20 to 60 characters long.
   */
  title: string;

  /**
   * Slug — `slug`
   *
   * Enter a "Publish Date" and "Title" then click the "generate" button. YYYYMMDD-TITLE format.
   */
  slug: { _type: "slug"; current: string };

  /**
   * Publish Date — `datetime`
   *
   * Will be used for sorting content. Avoid changing once published as it will be used to establish the "canonical" date for SEO.
   */
  datePublished: string;

  /**
   * Revision Date — `datetime`
   *
   * Will display as "last revised" in articles.
   */
  lastModified?: string;

  /**
   * Author — `reference`
   *
   *
   */
  author?: SanityReference<Author>;

  /**
   * Tags — `tags`
   *
   * Press enter to add the tag.
   */
  tags?: Tags;

  /**
   * Breaking — `boolean`
   *
   * Marks post as breaking news and pushes it to the top of feeds.
   */
  isBreaking?: boolean;

  /**
   * Main image — `figure`
   *
   *
   */
  mainimage?: Figure;

  /**
   * Featured Quote — `object`
   *
   *
   */
  featured_quote: {
    _type: "featured_quote";
    /**
     * Quote — `text`
     *
     * Do not include quotes. Brief quote that will appear on the preview card and top of post.
     */
    quote: string;

    /**
     * Summary — `text`
     *
     *
     */
    summary?: string;

    /**
     * Citation — `string`
     *
     * Name of who or what is being quoted.
     */
    citation?: string;
  };

  /**
   * Article Body — `blockContent`
   *
   *
   */
  body?: BlockContent;

  /**
   * SEO Settings — `postSeo`
   *
   *
   */
  postSeo?: PostSeo;

  /**
   * Aliases — `array`
   *
   * For legacy content: if you need to establish an internal redirect to an old url.
   */
  aliases?: Array<SanityKeyed<string>>;
}

/**
 * Card Stack
 *
 *
 */
export interface Quickreads extends SanityDocument {
  _type: "quickreads";

  /**
   * Gating Settings — `gatingSettings`
   *
   *
   */
  gatingSettings?: GatingSettings;

  /**
   * Title — `string`
   *
   * Good titles are descriptive and between 20 to 60 characters long.
   */
  title: string;

  /**
   * Slug — `slug`
   *
   * Enter a "Publish Date" and "Title" then click the "generate" button. YYYYMMDD-TITLE format.
   */
  slug: { _type: "slug"; current: string };

  /**
   * Publish Date — `datetime`
   *
   * Will be used for sorting content. Avoid changing once published as it will be used to establish the "canonical" date for SEO.
   */
  datePublished: string;

  /**
   * Revision Date — `datetime`
   *
   * Will display as "last revised" in articles.
   */
  lastModified?: string;

  /**
   * Author — `reference`
   *
   *
   */
  author?: SanityReference<Author>;

  /**
   * Tags — `tags`
   *
   * Press enter to add the tag.
   */
  tags?: Tags;

  /**
   * Series — `reference`
   *
   * The card series name that appears at the top of cards. Go to the "Card Series" collection to edit.
   */
  series: SanityReference<Cardseries>;

  /**
   * Color Palette — `string`
   *
   *
   */
  colorpaletteclassname:
    | "--black"
    | "--light-blue"
    | "--dark-blue"
    | "--bronze"
    | "--dark-brown"
    | "--light-gray"
    | "--medium-gray"
    | "--dark-gray"
    | "--light-green"
    | "--dark-green"
    | "--light-pink"
    | "--dark-pink"
    | "--light-purple"
    | "--dark-purple"
    | "--white"
    | "--light-yellow";

  /**
   * Main image — `figure`
   *
   *
   */
  mainimage?: Figure;

  /**
   * Cards — `array`
   *
   *
   */
  cards: Array<
    SanityKeyed<{
      _type: "card";
      /**
       * Body — `cardContent`
       *
       *
       */
      body?: CardContent;

      /**
       * Citation — `string`
       *
       *
       */
      citation?: string;
    }>
  >;

  /**
   * Sources Body — `blockContent`
   *
   *
   */
  body?: BlockContent;

  /**
   * Summary — `text`
   *
   *
   */
  summary?: string;

  /**
   * SEO Settings — `postSeo`
   *
   *
   */
  postSeo?: PostSeo;

  /**
   * Aliases — `array`
   *
   * For legacy content: if you need to establish an internal redirect to an old url.
   */
  aliases?: Array<SanityKeyed<string>>;
}

/**
 * Video Posts
 *
 *
 */
export interface Videoposts extends SanityDocument {
  _type: "videoposts";

  /**
   * Gating Settings — `gatingSettings`
   *
   *
   */
  gatingSettings?: GatingSettings;

  /**
   * Title — `string`
   *
   * Good titles are descriptive and between 20 to 60 characters long.
   */
  title: string;

  /**
   * Slug — `slug`
   *
   * Enter a "Publish Date" and "Title" then click the "generate" button. YYYYMMDD-TITLE format.
   */
  slug: { _type: "slug"; current: string };

  /**
   * Publish Date — `datetime`
   *
   * Will be used for sorting content. Avoid changing once published as it will be used to establish the "canonical" date for SEO.
   */
  datePublished: string;

  /**
   * Revision Date — `datetime`
   *
   * Will display as "last revised" in articles.
   */
  lastModified?: string;

  /**
   * Author — `reference`
   *
   *
   */
  author?: SanityReference<Author>;

  /**
   * Tags — `tags`
   *
   * Press enter to add the tag.
   */
  tags?: Tags;

  /**
   * Featured — `boolean`
   *
   * Marks post as a featured story and pushes it to the top of feeds, but behind breaking
   */
  isFeatured?: boolean;

  /**
   * Breaking Slider — `boolean`
   *
   * Marks post as breaking news and pushes it to the top of feeds, before featured.
   */
  isBreaking?: boolean;

  /**
   * Breaking Dropdown — `boolean`
   *
   * Marks post as breaking and adds dropdown notification to pages.
   */
  isBreakingDropdown?: boolean;

  /**
   * Series — `reference`
   *
   * The video series name that appears in the preview. Go to the "Video Series" collection to edit.
   */
  series?: SanityReference<Videoseries>;

  /**
   * Main Image — `figure`
   *
   *
   */
  mainimage: Figure;

  /**
   * Body — `blockContent`
   *
   *
   */
  body?: BlockContent;

  /**
   * Summary — `text`
   *
   *
   */
  summary?: string;

  /**
   * SEO Settings — `postSeo`
   *
   *
   */
  postSeo?: PostSeo;

  /**
   * Aliases — `array`
   *
   * For legacy content: if you need to establish an internal redirect to an old url.
   */
  aliases?: Array<SanityKeyed<string>>;
}

/**
 * Default SEO
 *
 * Set the default SEO values for the site. Custom SEO settings in pages will override these values. If a particular SEO value cannot be gathered on a page, these values are used.
 */
export interface DefaultSeoSingleton extends SanityDocument {
  _type: "defaultSeoSingleton";

  /**
   * Site Title — `string`
   *
   * (required) Default page title.
   */
  title: string;

  /**
   * Site URL — `url`
   *
   * (required) For reference. Contact developer to modify.
   */
  siteUrl: string;

  /**
   * Site Name — `string`
   *
   * (required) Will be listed in SEO as the site's title. For example: smarthernews.com
   */
  siteName: string;

  /**
   * Site Description — `string`
   *
   * (required)
   */
  siteDescription: string;

  /**
   * Twitter Handle — `string`
   *
   * (required) Example: @smarthernews
   */
  twitterHandle: string;

  /**
   * Locale — `string`
   *
   * (required) For reference. Contact developer to modify.
   */
  locale: string;

  /**
   * Default Image — `image`
   *
   * (required) Fallback image to be used on social media. Overriden by article images.
   */
  defaultImage: {
    _type: "image";
    asset: SanityReference<SanityImageAsset>;
    crop?: SanityImageCrop;
    hotspot?: SanityImageHotspot;

    /**
     * Alt — `string`
     *
     * (required)
     */
    alt: string;
  };

  /**
   * Keywords — `array`
   *
   * (required)
   */
  keywords: Array<SanityKeyed<string>>;

  /**
   * Twitter Card Type — `string`
   *
   * (required)
   */
  twitterCardType: "summary" | "summary_large_image";

  /**
   * Fallback Author — `reference`
   *
   * (required) If no author is specified for an article or page, this author will be used.
   */
  fallbackAuthor: SanityReference<Author>;

  /**
   * Publisher Logo — `image`
   *
   * (required) JSON-LD "publisherLogo".
   */
  publisherLogo: {
    _type: "image";
    asset: SanityReference<SanityImageAsset>;
    crop?: SanityImageCrop;
    hotspot?: SanityImageHotspot;
  };

  /**
   * Square Publisher Logo — `image`
   *
   * (required) Logo must be a perfect square.
   */
  squarePublisherLogo: {
    _type: "image";
    asset: SanityReference<SanityImageAsset>;
    crop?: SanityImageCrop;
    hotspot?: SanityImageHotspot;
  };
}

/**
 * Home Settings
 *
 *
 */
export interface HomeSingleton extends SanityDocument {
  _type: "homeSingleton";

  /**
   * Page Title — `string`
   *
   *
   */
  title: string;
}

/**
 * Notification Rail
 *
 *
 */
export interface NotificationRailSingleton extends SanityDocument {
  _type: "notificationRailSingleton";

  /**
   * Activate — `boolean`
   *
   *
   */
  isActive: boolean;

  /**
   * Content — `link`
   *
   *
   */
  content: Link;
}

/**
 * General Settings
 *
 *
 */
export interface GeneralSettingsSingleton extends SanityDocument {
  _type: "generalSettingsSingleton";

  /**
   * Social Media Links — `socials`
   *
   * (required) SHN's social media links. Appears in places such as the footer.
   */
  socialLinks: Socials;

  /**
   * Share Platforms — `array`
   *
   * (required) Determines which platforms there should be a 'share' button for on the site.
   */
  sharePlatforms: Array<SanityKeyed<string>>;

  /**
   * Site URL — `string`
   *
   * For reference. Contact developer to modify.
   */
  siteUrl: string;

  /**
   * Posts per Page — `number`
   *
   * For pages such as "all posts" and search results, how many articles should be displayed per page.
   */
  postsPerPage: number;

  /**
   * Prerendered Posts — `number`
   *
   * How many pages should be prerendered when the site is deployed. More prerendered pages means more "fast" pages after deployment; however, more prerendered pages mean slower deployments and potentially higher hosting fees.
   */
  prerenderedPosts: number;

  /**
   * Google Analytics GTag ID — `string`
   *
   * The gtag can be found in the analytics embed. Looks like: https://www.googletagmanager.com/gtag/js?id=THIS_IS_THE_GTAG
   */
  googleAnalyticsGtagID?: string;

  /**
   * URL to Mailchimp signup — `url`
   *
   * URL for the Mailchimp signup form (action url). Remember to add your domain in your mailchimp settings to avoid CORS errors.
   */
  mailchimpActionUrl: string;
}

/**
 * Footer Settings
 *
 *
 */
export interface FooterSingleton extends SanityDocument {
  _type: "footerSingleton";

  /**
   * Footer Logo — `figure`
   *
   *
   */
  footerLogo: Figure;

  /**
   * Footer CTA — `object`
   *
   *
   */
  footerCta?: {
    _type: "footerCta";
    /**
     * CTA Link — `link`
     *
     *
     */
    ctaLink?: Link;

    /**
     * CTA text — `text`
     *
     *
     */
    ctaText?: string;
  };

  /**
   * Footer Menu — `array`
   *
   *
   */
  footerNavigation: Array<SanityKeyed<Link>>;

  /**
   * Social Media — `socials`
   *
   *
   */
  socialMedia?: Socials;

  /**
   * Policies — `array`
   *
   *
   */
  policies: Array<SanityKeyed<Link>>;

  /**
   * Copyright Notice — `string`
   *
   *
   */
  copyrightNotice: string;
}

/**
 * Header Settings
 *
 *
 */
export interface HeaderSingleton extends SanityDocument {
  _type: "headerSingleton";

  /**
   * Header Logo — `figure`
   *
   *
   */
  headerLogo: Figure;

  /**
   * Header Menu — `array`
   *
   *
   */
  headerNavigation: Array<SanityKeyed<Link>>;
}

/**
 * Partnerships
 *
 *
 */
export interface PartnershipsSingleton extends SanityDocument {
  _type: "partnershipsSingleton";

  /**
   * Page Title — `string`
   *
   * (required)
   */
  title: string;

  /**
   * Headline — `string`
   *
   * (required)
   */
  supportingTitle: string;

  /**
   * supportingBody — `text`
   *
   * (required)
   */
  supportingBody: string;

  /**
   * Background Image — `image`
   *
   * (required)
   */
  backgroundImage: {
    _type: "image";
    asset: SanityReference<SanityImageAsset>;
    crop?: SanityImageCrop;
    hotspot?: SanityImageHotspot;

    /**
     * Alt — `string`
     *
     * (required)
     */
    alt: string;
  };
}

/**
 * Quick Links
 *
 *
 */
export interface QuickLinksSingleton extends SanityDocument {
  _type: "quickLinksSingleton";

  /**
   * Widgets — `array`
   *
   * Linktree style widget list for quickly listing useful links in one place. If no widgets are active, the page will be hidden from the site. Social media links at bottom of page can be edited in "General Settings".
   */
  widgetList?: Array<
    | SanityKeyed<LinkWidget>
    | SanityKeyed<NewsletterWidget>
    | SanityKeyed<ContributionWidget>
  >;
}

/**
 * Support Us
 *
 *
 */
export interface SupportUsSingleton extends SanityDocument {
  _type: "supportUsSingleton";

  /**
   * Eyebrow — `string`
   *
   *
   */
  eyebrow?: string;

  /**
   * Title — `string`
   *
   * (required)
   */
  title: string;

  /**
   * Description — `text`
   *
   * (required)
   */
  description: string;

  /**
   * Cards — `array`
   *
   * (required)
   */
  cards: Array<
    SanityKeyed<{
      _type: "card";
      /**
       * Title — `string`
       *
       * (required)
       */
      title: string;

      /**
       * Description — `string`
       *
       * (required)
       */
      description: string;

      /**
       * Button Label — `string`
       *
       * (required)
       */
      buttonLabel: string;

      /**
       * Destination — `string`
       *
       * (required)
       */
      destination: "share" | "donate" | "shop" | "partnerships";
    }>
  >;
}

/**
 * Author
 *
 *
 */
export interface Author extends SanityDocument {
  _type: "author";

  /**
   * Name — `string`
   *
   * (required)
   */
  title: string;

  /**
   * Slug — `slug`
   *
   * (required)
   */
  slug: { _type: "slug"; current: string };

  /**
   * Image — `image`
   *
   * (required)
   */
  mainimage: {
    _type: "image";
    asset: SanityReference<SanityImageAsset>;
    crop?: SanityImageCrop;
    hotspot?: SanityImageHotspot;

    /**
     * Alternative text — `string`
     *
     * (required) Important for SEO and accessiblity.
     */
    alt: string;
  };

  /**
   * Sub Title — `string`
   *
   * Small line between blurb and title. Useful for job titles, etc.
   */
  subtitle?: string;

  /**
   * Blurb — `text`
   *
   * Brief blurb about author.
   */
  summary?: string;

  /**
   * Primary Site — `url`
   *
   * (required) This person's main profile site. Could either be a personal website or social media account.
   */
  primarySite: string;

  /**
   * Twitter Handle — `string`
   *
   * Example: @smarthernews
   */
  twitterHandle?: string;
}

/**
 * Card Series
 *
 *
 */
export interface Cardseries extends SanityDocument {
  _type: "cardseries";

  /**
   * Title — `string`
   *
   *
   */
  title: string;

  /**
   * Slug — `slug`
   *
   *
   */
  slug: { _type: "slug"; current: string };
}

/**
 * Video Series
 *
 *
 */
export interface Videoseries extends SanityDocument {
  _type: "videoseries";

  /**
   * Title — `string`
   *
   *
   */
  title: string;

  /**
   * Slug — `slug`
   *
   *
   */
  slug: { _type: "slug"; current: string };
}

export type WidgetStyles = {
  _type: "widgetStyles";
  /**
   * Color — `string`
   *
   * (required) Background color of the widget.
   */
  color: "BLUE_SKY" | "BLUSH" | "LAVENDER" | "MINT" | "WHITE";
};

export type ContributionWidget = {
  _type: "contributionWidget";
  /**
   * Hide from Site — `boolean`
   *
   * If hidden, this item won't appear on the site.
   */
  isHidden?: boolean;

  /**
   * Widget Styles — `widgetStyles`
   *
   * (required) Style options for widget.
   */
  widgetStyles: WidgetStyles;

  /**
   * Label — `string`
   *
   * (required) The title that appears on the button. Should be brief as possible.
   */
  label: string;
};

export type LinkWidget = {
  _type: "linkWidget";
  /**
   * Hide from Site — `boolean`
   *
   * If hidden, this item won't appear on the site.
   */
  isHidden?: boolean;

  /**
   * Widget Styles — `widgetStyles`
   *
   * (required) Style options for widget.
   */
  widgetStyles: WidgetStyles;

  /**
   * Label — `string`
   *
   * (required) The title that appears on the button. Should be brief as possible.
   */
  label: string;

  /**
   * Destination — `url`
   *
   * (required) URL for the link.
   */
  to: string;
};

export type NewsletterWidget = {
  _type: "newsletterWidget";
  /**
   * Hide from Site — `boolean`
   *
   * If hidden, this item won't appear on the site.
   */
  isHidden?: boolean;

  /**
   * Widget Styles — `widgetStyles`
   *
   * (required) Style options for widget.
   */
  widgetStyles: WidgetStyles;

  /**
   * Label — `string`
   *
   * (required) The title that appears on the button. Should be brief as possible.
   */
  label: string;
};

export type BlockContent = Array<
  | SanityKeyed<SanityBlock>
  | SanityKeyed<{
      _type: "image";
      asset: SanityReference<SanityImageAsset>;
      crop?: SanityImageCrop;
      hotspot?: SanityImageHotspot;

      /**
       * Alt — `string`
       *
       *
       */
      alt?: string;
    }>
  | SanityKeyed<Youtube>
  | SanityKeyed<Vimeo>
  | SanityKeyed<InstagramPost>
>;

export type CardContent = Array<SanityKeyed<SanityBlock>>;

export type Figure = {
  _type: "figure";
  asset: SanityReference<SanityImageAsset>;
  crop?: SanityImageCrop;
  hotspot?: SanityImageHotspot;

  /**
   * Alternative text — `string`
   *
   * (required) Important for SEO and accessibility.
   */
  alt: string;

  /**
   * Contain Image — `boolean`
   *
   *
   */
  isContained?: boolean;
};

export type InstagramPost = {
  _type: "instagramPost";
  /**
   * url — `url`
   *
   * Visit an Instagram post in a browser and copy the URL.
   */
  url: string;
};

export type Link = {
  _type: "link";
  /**
   * Label — `string`
   *
   *
   */
  label: string;

  /**
   * Destination — `object`
   *
   * choose one link option.
   */
  destination: {
    _type: "destination";
    /**
     * Page — `string`
     *
     *
     */
    postTypePage?:
      | "quickreads"
      | "quickquotes"
      | "videoposts"
      | "search"
      | "home"
      | "support-us"
      | "support-us/partnerships";

    /**
     * Internal Page Reference — `reference`
     *
     *
     */
    internalPageReference?: SanityReference<
      | Author
      | Quickreads
      | Quickquotes
      | Videoposts
      | Page
      | Videoseries
      | Cardseries
    >;

    /**
     * External Link — `url`
     *
     *
     */
    externalLink?: string;

    /**
     * Is Sponsor — `boolean`
     *
     * Marks external link as a sponsorship link. (adds "sponsor" attribute).
     */
    isSponsor?: boolean;

    /**
     * Is Trusted — `boolean`
     *
     * Marks external link as being to a trusted, such as our shop. (removes "nofollow" attribute).
     */
    isTrusted?: boolean;
  };
};

export type OpenGraph = {
  _type: "openGraph";
  /**
   * Title — `string`
   *
   * Heads up! This will override the page title.
   */
  title?: string;

  /**
   * Description — `text`
   *
   *
   */
  description?: string;

  /**
   * Image — `image`
   *
   * Facebook recommends 1200x630 (will be auto cropped). In some cases, sites will crop the image into a square. Use the hotspot options to control what gets kept when cropped.
   */
  image?: {
    _type: "image";
    asset: SanityReference<SanityImageAsset>;
    crop?: SanityImageCrop;
    hotspot?: SanityImageHotspot;
  };
};

export type PageSeo = {
  _type: "pageSeo";
  /**
   * Do Not Index — `boolean`
   *
   * If on, engines like Google will not show this page in results.
   */
  noIndex?: boolean;

  /**
   * Title — `string`
   *
   * Overrides "Title".
   */
  title?: string;

  /**
   * Description — `text`
   *
   *
   */
  description?: string;

  /**
   * Image — `image`
   *
   * Overrides "Main Image". Facebook recommends 1200x630 (will be auto cropped). In some cases, sites will crop the image into a square. Use the hotspot options to control what gets kept when cropped.
   */
  image?: {
    _type: "image";
    asset: SanityReference<SanityImageAsset>;
    crop?: SanityImageCrop;
    hotspot?: SanityImageHotspot;
  };
};

export type PostSeo = {
  _type: "postSeo";
  /**
   * Seo Schema Type — `string`
   *
   * (required) Determines how engines like Google will interpret the content. "News" for news content, "Article" for non-news content.
   */
  seoSchemaType: "newsArticle" | "article";

  /**
   * Title — `string`
   *
   * Overrides "Title".
   */
  title?: string;

  /**
   * Description — `text`
   *
   *
   */
  description?: string;

  /**
   * Image — `image`
   *
   * Overrides "Main Image". Facebook recommends 1200x630 (will be auto cropped). In some cases, sites will crop the image into a square. Use the hotspot options to control what gets kept when cropped.
   */
  image?: {
    _type: "image";
    asset: SanityReference<SanityImageAsset>;
    crop?: SanityImageCrop;
    hotspot?: SanityImageHotspot;
  };
};

export type Sections = Array<
  | SanityKeyed<ArticleText>
  | SanityKeyed<HeroSplit>
  | SanityKeyed<HeroSimple>
  | SanityKeyed<MailchimpForm>
>;

export type Socials = {
  _type: "socials";
  /**
   * Links — `array`
   *
   *
   */
  links: Array<
    SanityKeyed<{
      _type: "platform";
      /**
       * Title — `string`
       *
       *
       */
      title:
        | "instagram"
        | "twitter"
        | "facebook"
        | "youtube"
        | "medium"
        | "linkedin";

      /**
       * Link — `url`
       *
       *
       */
      link: string;
    }>
  >;
};

export type Vimeo = {
  _type: "vimeo";
  /**
   * Vimeo video URL — `url`
   *
   * Visit an Vimeo in a browser and copy the URL.
   */
  url?: string;
};

export type Youtube = {
  _type: "youtube";
  /**
   * YouTube video URL — `url`
   *
   * Visit Youtube in a browser and copy the URL.
   */
  url?: string;

  /**
   * Alternative text — `string`
   *
   * Important for SEO and accessiblity.
   */
  alt?: string;
};

export type GatingSettings = {
  _type: "gatingSettings";
  /**
   * Tier — `string`
   *
   *
   */
  tier?: "free" | "metered" | "locked";
};

export type ArticleText = {
  _type: "articleText";
  /**
   * Body — `blockContent`
   *
   *
   */
  body: BlockContent;
};

export type HeroSplit = {
  _type: "heroSplit";
  /**
   * Main image — `figure`
   *
   *
   */
  mainimage?: Figure;

  /**
   * Title * — `string`
   *
   *
   */
  title: string;

  /**
   * Eyebrow — `string`
   *
   * Small text that appears above the title. Usually a category or theme term.
   */
  eyebrow?: string;

  /**
   * Summary — `text`
   *
   *
   */
  summary?: string;
};

export type HeroSimple = {
  _type: "heroSimple";
  /**
   * Title * — `string`
   *
   *
   */
  title: string;

  /**
   * Summary — `text`
   *
   *
   */
  summary?: string;
};

export type MailchimpForm = {
  _type: "mailchimpForm";
  /**
   * Eyebrow — `string`
   *
   *
   */
  eyebrow?: string;

  /**
   * Title — `string`
   *
   *
   */
  title: string;

  /**
   * URL to Mailchimp signup — `url`
   *
   * URL for the Mailchimp signup form (action url). Remember to add your domain in your mailchimp settings to avoid CORS errors.
   */
  actionUrl: string;
};

export type Documents =
  | Page
  | Products
  | Quickquotes
  | Quickreads
  | Videoposts
  | DefaultSeoSingleton
  | HomeSingleton
  | NotificationRailSingleton
  | GeneralSettingsSingleton
  | FooterSingleton
  | HeaderSingleton
  | PartnershipsSingleton
  | QuickLinksSingleton
  | SupportUsSingleton
  | Author
  | Cardseries
  | Videoseries;

/**
 * This interface is a stub. It was referenced in your sanity schema but
 * the definition was not actually found. Future versions of
 * sanity-codegen will let you type this explicity.
 */
type Tags = any;
