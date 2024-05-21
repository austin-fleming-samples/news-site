import { clientConfig } from "@cms/utils/clientConfig";
import imageUrlBuilder from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";

// TODO: check how this works with preview
const builder = imageUrlBuilder(clientConfig);

export const getImage = (source: SanityImageSource) => builder.image(source);

export const urlFor = (source: SanityImageSource) => getImage(source).url();
