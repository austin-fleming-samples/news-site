import * as codegen from './codegen';

/*
OBJECTS
*/
type Tag = {
  label: string;
  value: string;
};
export type Tags = Tag[];

// TODO: expand
export type Author = codegen.Author;

export type EditorsBlog = codegen.EditorsBlog;
// TODO: expand
export type BlockContent = codegen.BlockContent;

export type Link = Omit<codegen.Link, 'destination'> & {
  destination: {
    _type: codegen.Link['destination']['_type'];
    externalLink?: codegen.Link['destination']['externalLink'];
    internalPageReference?:
      | codegen.Quickreads
      | codegen.Quickquotes
      | codegen.Videoposts
      | codegen.Page;
    postTypePage?: codegen.Link['destination']['postTypePage'];
  };
};

export type Socials = codegen.Socials;

export type CardContent = codegen.CardContent;

/*
SECTIONS
*/

export type ArticleText = Omit<codegen.ArticleText, 'body'> & {
  body: BlockContent;
};

export type Sections = Array<codegen.HeroSplit | codegen.HeroSimple | ArticleText>;

export type HeroSplit = codegen.HeroSplit; // TODO: may need projection
export type HeroSimple = codegen.HeroSimple; // TODO: may need projection

/*
DOCUMENTS
*/
export type DefaultSeoSingleton = codegen.DefaultSeoSingleton;

export type NotificationRailSingleton = codegen.NotificationRailSingleton;

export type FooterSingleton = codegen.FooterSingleton;

export type HeaderSingleton = codegen.HeaderSingleton;

/* export type SettingsSingleton = Omit<codegen.SettingsSingleton, 'headerNavigation' | 'footerNavigation' | 'footerCta' | 'policies'> & {
    footerCta?: {
        _type: "footerCta",
        ctaLink?: Link,
        ctaText?:string
    },
    footerNavigation: Link[],
    headerNavigation: Link[],
    policies: Link[]
} */

export type Quickreads = Omit<codegen.Quickreads, 'series' | 'author' | 'body'> & {
  author?: Author;
  body?: BlockContent;
  series: codegen.Cardseries;
  tags?: Tags;
};

export type Quickquotes = Omit<codegen.Quickquotes, 'author' | 'body'> & {
  author?: Author;
  body?: BlockContent;
  tags?: Tags;
};

export type Videoposts = Omit<codegen.Videoposts, 'series' | 'author' | 'body'> & {
  author?: Author;
  body?: BlockContent;
  series?: codegen.Videoseries;
  tags?: Tags;
};

export type Videoseries = codegen.Videoseries;

export type Cardseries = codegen.Cardseries;

export type Page = Omit<codegen.Page, 'sections'> & {
  sections: Sections;
};

export type Products = codegen.Products;
/*
HELPERS
*/
export type SeriesType = 'cardseries' | 'videoseries' | null;

export type PostPageTypes = Videoposts | Quickreads | Quickquotes | Author;

export type PageTypes = Videoposts | Quickreads | Quickquotes | Author | Page | Products;
