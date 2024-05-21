import { groq } from 'next-sanity';

export const linkFragment = groq`{
    ...,
    destination {
        ...,
        internalPageReference->
    }
}`;
