import S from '@sanity/desk-tool/structure-builder';
import { PreviewArticle } from '../components/previews/PreviewArticle';
import { contentList } from './contentList';
import { settingsList } from './settingsList';
import { taxonomiesList } from './taxonomiesList';

/* 
BUG: TODO: For some mind-melting reason,
this is bypassed when an article is pulled up via the seachbar,
but not when navigated to via the desk.
*/
export const getDefaultDocumentNode = ({ schemaType }: { schemaType: any }) => {

  if (schemaType === 'quickreads' || schemaType === 'videoposts' || schemaType === 'quickquotes' || schemaType === 'editorsBlog') {
    return S.document().views([
      S.view.form(),
      S.view.component(PreviewArticle).title('Preview')
    ]);
  }
};

export default () =>
  S.list()
    .title('Content')
    .items([
      ...contentList,
      S.divider(),
      ...taxonomiesList,
      S.divider(),
      ...settingsList
    ]);