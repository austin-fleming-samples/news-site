/* @ts-ignore */
import createSchema from 'part:@sanity/base/schema-creator'
/* @ts-ignore */
import schemaTypes from 'all:part:@sanity/base/schema-type'


// Import custom types
// OBJECTS
import blockContent from './objects/blockContent'
import cardContent from './objects/cardContent'
import figure from './objects/figure'
import instagramPost from './objects/instagramPost'
import link from './objects/link'
import openGraph from './objects/openGraph'
import pageSeo from './objects/pageSeo'
import postSeo from './objects/postSeo'
import sections from './objects/sections'
import socials from './objects/socials'
import vimeo from './objects/vimeo'
import youtube from './objects/youtube'
import gatingSettings from './objects/gatingSettings'

const objectSchemas = [
  blockContent,
  cardContent,
  figure,
  instagramPost,
  link,
  openGraph,
  pageSeo,
  postSeo,
  sections,
  socials,
  vimeo,
  youtube,
  gatingSettings
]

// Quick Link Widgets
import widgetStyles from './quickLinkWidgets/widgetStyles'
import contributionWidget from './quickLinkWidgets/contributionWidget'
import linkWidget from './quickLinkWidgets/linkWidget'
import newsletterWidget from './quickLinkWidgets/newsletterWidget'

const quickLinkWidgetSchemas = [
  widgetStyles,
  contributionWidget,
  linkWidget,
  newsletterWidget
]

// TAXONOMIES
import author from './taxonomy/author'
import cardseries from './taxonomy/cardSeries'
import videoseries from './taxonomy/videoSeries'

const taxonomySchemas = [
  author,
  cardseries,
  videoseries
]

// CONTENT
/* import editorsBlog from './documents/editorsBlog' */
import page from './documents/page'
import products from './documents/products'
import quickquotes from './documents/quickQuotes'
import quickreads from './documents/quickreads'
import videoposts from './documents/videoPosts'

const documentSchemas = [
  /* editorsBlog, */
  page,
  products,
  quickquotes,
  quickreads,
  videoposts,
]

// SINGLETONS
import homeSingleton from './documentSingletons/homeSingleton'
import notificationRailSingleton from './documentSingletons/notificationRailSingleton'
import footerSingleton from './documentSingletons/footerSingleton'
import headerSingleton from './documentSingletons/headerSingleton'
import defaultSeoSingleton from './documentSingletons/defaultSeoSingleton'
import generalSettingsSingleton from './documentSingletons/generalSettingsSingleton'
import partnershipsSingleton from './documentSingletons/partnershipsSingleton'
import quickLinksSingleton from './documentSingletons/quickLinksSingleton'
import supportUsSingleton from './documentSingletons/supportUsSingleton'

const singletonSchemas = [
  defaultSeoSingleton,
  homeSingleton,
  notificationRailSingleton,
  generalSettingsSingleton,
  footerSingleton,
  headerSingleton,
  partnershipsSingleton,
  quickLinksSingleton,
  supportUsSingleton
]

// PAGE SECTIONS
import articleText from './sections/articleText'
import heroSimple from './sections/heroSimple'
import heroSplit from './sections/heroSplit'
import mailchimpForm from './sections/mailchimpForm'


const pageSections = [
  articleText,
  heroSplit,
  heroSimple,
  mailchimpForm
]

export default createSchema({
  name: 'contentItems',
  types: schemaTypes.concat([
    ...quickLinkWidgetSchemas,
    ...documentSchemas,
    ...objectSchemas,
    ...singletonSchemas,
    ...taxonomySchemas,
    ...pageSections
  ])
})
