import S from "@sanity/desk-tool/structure-builder"
import { FaFileVideo } from 'react-icons/fa'
import { FcBusinesswoman, FcMindMap } from 'react-icons/fc'
import { GiCardRandom } from 'react-icons/gi'


const authors = S.listItem().title('Author').icon(FcBusinesswoman).child(
  S.documentList().title('Author').schemaType('author').filter("_type == 'author'")
)

const categories = S.listItem().title('Categories').icon(FcMindMap).child(
  S.list().title('Categories').items([
    S.listItem().title('Card Series').icon(GiCardRandom).child(
      S.documentList().title('Card Series').filter("_type == 'cardseries'")
    ),
    S.listItem().title('Video Series').icon(FaFileVideo).child(
      S.documentList().title('Video Series').filter("_type == 'videoseries'")
    )
  ])
)


export const taxonomiesList = [authors, categories]

