// multiple page instances
type SerialDocumentName =
    | 'page' 
    | 'quickquotes' 
    | 'quickreads' 
    | 'videoposts' 
    | 'products'

// single page instance
type SingletonDocumentName = 'homeSingleton' | 'partnershipsSingleton' | 'supportUsSingleton'

// taxonomy instance
type TaxonomyDocumentName = 
    | 'author'
    | 'cardseries'
    | 'videoseries'

// provide information but aren't rendered as pages.
type AbstractDocumentName = 
    | 'defaultSeoSingleton'
    | 'footerSingleton'
    | 'generalSettingsSingleton'
    | 'headerSingleton'
    | 'notificationRailSingleton'

// all document names
type DocumentName = SerialDocumentName | SingletonDocumentName | AbstractDocumentName | TaxonomyDocumentName
    

export const DOC_NAMES: Record<DocumentName, string> = {
    author: 'Authors',
    cardseries: 'Card Series',
    page: 'Page',
    quickquotes: 'Quick Quotes',
    quickreads: 'Card Stack',
    videoposts: 'Video Posts',
    products: 'Products',
    defaultSeoSingleton: 'Default SEO',
    footerSingleton: 'Footer',
    generalSettingsSingleton: 'General Settings',
    headerSingleton: 'Header',
    homeSingleton: 'Home Page',
    notificationRailSingleton: 'Notification Rail',
    videoseries: 'Video Series',
    partnershipsSingleton: 'Partnerships',
    supportUsSingleton: 'Support Us'
}

export const DOC_ROUTES: Record<SerialDocumentName | SingletonDocumentName, string> = {
    page: 'info',
    quickquotes: 'quickquotes',
    quickreads: 'quickreads',
    videoposts: 'videoposts',
    products: 'products',
    homeSingleton: '',
    partnershipsSingleton: 'support-us/partnerships',
    supportUsSingleton: 'support-us'
}