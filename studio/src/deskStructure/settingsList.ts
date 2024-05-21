import S from "@sanity/desk-tool/structure-builder";
import { CgToolbarBottom, CgToolbarTop } from "react-icons/cg";
import {
  FcAdvertising,
  FcAutomatic,
  FcFinePrint,
  FcEngineering,
  FcHome,
} from "react-icons/fc";

const settings = S.listItem()
  .title("Site Settings")
  .icon(FcAutomatic)
  .child(
    S.list()
      .title("Site Settings")
      .items([
        S.listItem()
          .title('General Settings')
          .icon(FcEngineering)
          .child(
            S.editor()
              .id("generalSettings")
              .schemaType("generalSettingsSingleton")
              .documentId("general-settings")
              .title('General Settings')
          ),
        S.listItem()
          .title('Notification Rail')
          .icon(FcAdvertising)
          .child(
            S.editor()
              .id("notificationRail")
              .schemaType("notificationRailSingleton")
              .documentId("notification-rail")
              .title('Notification Rail')
          ),
        S.listItem()
          .title('Header Settings')
          .icon(CgToolbarTop)
          .child(
            S.editor()
              .id("headerSettings")
              .schemaType("headerSingleton")
              .documentId("header-singleton")
              .title('Header Settings')
          ),
        S.listItem()
          .title('Footer Settings')
          .icon(CgToolbarBottom)
          .child(
            S.editor()
              .id("footerSettings")
              .schemaType("footerSingleton")
              .documentId("footer-singleton")
              .title('Footer Settings')
          ),
        // TODO: provide homepage configurator
        // TODO: [future] allow setting order and count of sections
        /* S.listItem()
          .title(DOC_NAMES["homeSingleton"])
          .icon(FcHome)
          .child(
            S.editor()
              .id("homePageSettings")
              .schemaType("homeSingleton")
              .documentId("home-settings")
              .title(DOC_NAMES["homeSingleton"])
          ), */
        S.listItem()
          .title('Default SEO')
          .icon(FcFinePrint)
          .child(
            S.editor()
              .id("defaultSeo")
              .schemaType("defaultSeoSingleton")
              .documentId("default-seo")
              .title('Default SEO')
          ),
        S.listItem()
          .title('Partnerships')
          .icon(FcFinePrint)
          .child(
            S.editor()
              .id("partnerships")
              .schemaType("partnershipsSingleton")
              .documentId("13e8d67c-318c-47de-b37f-6fe88c39278a")
              .title('Partnerships')
          ),
          S.listItem()
          .title('Support Us')
          .icon(FcFinePrint)
          .child(
            S.editor()
              .id("supportus")
              .schemaType("supportUsSingleton")
              .documentId("5a913eb8-b363-4bc9-bbd0-6fafe21e1bf2")
              .title('Support Us')
          ),
      ])
  );

export const settingsList = [settings];
