import React from "react";
import { IframePreview } from "./IframePreview";

const SANITY_STUDIO_PREVIEW_SECRET =
  "C6E93FD9059D542463237752DB209F7133F2BAEA9C2AC36A195419C03241BE8EAF60C356B2519303C376E0D7EE40E176FC2DE2441AEA6B3F64C8CDEA96AFADB6";
const SANITY_STUDIO_PRODUCTION_URL = "https://smarthernews.com";
const SANITY_STUDIO_DEV_URL = "http://localhost:3000";

export const PreviewArticle = (props: any) => {
  if (!props?.document?.displayed)
    return <div>Begin building the article to start the preview.</div>;

  const { displayed } = props.document;

  if (!displayed?.slug?.current) {
    return (
      <div
        style={{
          width: "100%",
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignContent: "center",
          textAlign: "center",
        }}
      >
        <p>{'"Slug" is required before post can be previewed.'}</p>
      </div>
    );
  }

  const path = `api/previewposts?secret=${SANITY_STUDIO_PREVIEW_SECRET}&slug=${displayed.slug.current}&type=${displayed._type}`;

  const url =
    process.env.NODE_ENV === "production"
      ? `${SANITY_STUDIO_PRODUCTION_URL}/${path}`
      : `${SANITY_STUDIO_DEV_URL}/${path}`;

  if (!displayed) {
    return <div>No content found to preview.</div>;
  }

  return <IframePreview src={url} />;
};
