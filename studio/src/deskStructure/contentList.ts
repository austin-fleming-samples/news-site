import S from "@sanity/desk-tool/structure-builder"
import { BsFillChatQuoteFill } from 'react-icons/bs'
import { FaFileVideo, FaListUl } from 'react-icons/fa'
import { FcLibrary, FcShop, FcTemplate } from 'react-icons/fc'
import { GiCardRandom } from 'react-icons/gi'



const articles = S.listItem().title('Articles').icon(FcLibrary).child(
  S.list().title('Articles').items([
    S.listItem().title('Card Stacks').icon(GiCardRandom).child(
      S.documentList()
        .title('Quick Reads')
        .filter("_type == 'quickreads'")
        .menuItems(S.documentTypeList("quickreads").getMenuItems())
    ),
    S.listItem().title('Quick Quotes').icon(BsFillChatQuoteFill).child(
      S.documentList()
        .title('Quick Quotes')
        .filter("_type == 'quickquotes'")
        .menuItems(S.documentTypeList("quickquotes").getMenuItems())
    ),
    S.listItem().title('Video Posts').icon(FaFileVideo).child(
      S.documentList()
        .title('Video Posts')
        .filter("_type == 'videoposts'")
        .menuItems(S.documentTypeList("videoposts").getMenuItems())
    ),
    /* S.listItem().title(DOC_NAMES['supportUsSingleton']).child(
      S.documentList()
        .title(DOC_NAMES['supportUsSingleton'])
        .filter("_type == 'supportUsSingleton'")
        .menuItems(S.documentTypeList("supportUsSingleton").getMenuItems())
    ), */
    /* S.listItem().title(DOC_NAMES['partnershipsSingleton']).icon(FaFileVideo).child(
      S.documentList()
        .title(DOC_NAMES['partnershipsSingleton'])
        .filter("_type == 'partnershipsSingleton'")
        .menuItems(S.documentTypeList("partnershipsSingleton").getMenuItems())
    ), */
    /* S.listItem().title(DOC_NAMES['editorsBlog']).icon(GiQuillInk).child(
      S.documentList()
        .title(DOC_NAMES['editorsBlog'])
        .filter("_type == 'editorsBlog'")
        .menuItems(S.documentTypeList("editorsBlog").getMenuItems())
    ) */
  ])
)



const pages = S.listItem().title('Page').icon(FcTemplate).child(
  S.documentList().title('Page').filter("_type == 'page'")
)

const products = S.listItem().title('Products').icon(FcShop).child(
  S.documentList().title('Products').filter("_type == 'products'")
)

const quickLinks = S.listItem()
.title('Quick Links')
.icon(FaListUl)
.child(
  S.editor()
    .id("quickLinks")
    .schemaType("quickLinksSingleton")
    .documentId("quick-links")
    .title('Quick Links')
)

export const contentList = [
  articles,
  quickLinks,
  pages,
  products
]
