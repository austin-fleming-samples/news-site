import { FcShop } from 'react-icons/fc'
import { asyncSlugIsUniqueAcrossDocuments, getSlugSource } from "../../lib/schemaHelpers"

const INITIAL_VALUES = {
  title: '_Untitled'
}

export default {
  name: 'products',
  title: 'Products',
  type: 'document',
  icon: FcShop,
  fields: [
    {
      name: 'title',
      title: 'Product Title',
      type: 'string',
      codegen: { required: true },
      validation: (Rule: any) => [
        Rule.required().error('"Title" is missing.'),
        Rule.custom((value: string) => (
          value.includes(INITIAL_VALUES.title)
            ? '"Title" must be a custom value. Please replace placeholder.'
            : true
        )).error(),
        Rule.custom((value: string) => (
          value[0] === '_'
            ? '"Title" starts with an underscore (_). Consider removing underscore.'
            : true
        )).warning()
      ]
    },
    // TODO: [relaunch] test that this slugifies correctly.
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: getSlugSource,
        isUnique: asyncSlugIsUniqueAcrossDocuments
      },
      codegen: { required: true },
      validation: (Rule: any) =>
        Rule.required().error(
          'Add a title and click "generate" to produce slug, or type in a custom slug (lowercase letters, numbers, and dashes only.)'
        )
    },
    {
      name: 'priority',
      title: 'Priority',
      type: 'number',
      description: 'Can be used to order products. 0 comes before 1.'
    },
    {
      name: 'storeLink',
      title: 'Shop Link',
      description:
        'URL of the product page on woocommerce. When someone clicks on a preview card, this is where they will be taken. Looks like: https://example.com/product-name',
      type: 'url',
      codegen: { required: true },
      validation: (Rule: any) =>
        Rule.required().error(
          '"Shop Link" is missing or invalid. Should be "https://smarthernews.com/product" format. It is necessary to direct customers to the online store.'
        )
    },
    {
      name: 'price',
      title: 'Product Price',
      description: 'Format as: $10.29',
      type: 'string',
      codegen: { required: true },
      validation: (Rule: any) => Rule.required().error('"Price" is missing.')
    },
    {
      name: 'discountedFromPrice',
      title: 'Discounted From',
      description:
        'If you want a crossed out "original price" in front of the current price (Product Price field above), you can specify it here. Format as: $10.29',
      type: 'string'
    },
    {
      name: 'datePublished',
      title: 'Publish Date',
      type: 'datetime',
      description:
        'Will be used for sorting content. Avoid changing once published as it will be used to establish the "canonical" date for SEO.',
      codegen: { required: true },
      validation: (Rule: any) => Rule.required().error('"Publish Date" is missing.')
    },
    {
      name: 'productSeries',
      title: 'Product Series',
      description:
        'For if you want a series such as "home" or "fitness" displayed on the preview card.',
      type: 'string'
    },
    {
      name: 'mainimage',
      title: 'Product Image',
      type: 'image',
      codegen: { required: true },
      validation: (Rule: any) => Rule.required().error('"Product Image" is missing.'),
      options: {
        hotspot: true
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative text',
          description: 'Important for SEO and accessiblity.',
          options: {
            isHighlighted: true
          },
          validation: (Rule: any) => Rule.required().warning('"Alt" for "Product Image" is missing.')
        }
      ]
    },
    {
      name: 'summary',
      title: 'Summary',
      type: 'text',
      description: 'Appears on preview cards and used for SEO description. Aim for 50-160 characters.',
      validation: (Rule: any) => [
        Rule.max(180).warning(
          'Best to keep around 160 characters. Google cuts descriptions to around this length'
        ),
        Rule.required().warning('"Summary" is missing. Consider adding for SEO benefits.')
      ]
    }
  ],
  preview: {
    select: {
      title: 'title',
      series: 'productSeries',
      image: 'mainimage',
      id: '_id'
    },
    prepare({
      title,
      series,
      image,
      id
    }: {
      id: string,
      image: any,
      series: string,
      title: string
    }) {

      const postTitle = title || 'no title'
      const status = id ? (id.includes('drafts') ? '<DRAFT> ' : '') : ''
      const displaySeries = series || 'no series'

      return {
        title: status + postTitle,
        subtitle: displaySeries,
        media: image
      }
    }
  }
}
