# TODO list

## Immediate

## Now

- SEO on all pages. Pull from Sanity.
  - parse description from block text in getStaticProps instead in the component
  - build all seo data in getStaticProps
  - test that it injects on build. Turn off javascript and verify it appears.
- Links
  - All external links should be \_blank
  - All external need no-ref no-index
- Keen Slider needs rebuilding
- Letter to Editor blog
- Robots.txt should block series
- Sitemap.xml should be audited. Looks to not function correctly.
- Consolidate seo schemas into single schema object
- New caption under logo
- Prebuilt page counts from settings
- Payment info page and feature
- Home page singleton in Sanity
- Change dataset back before relaunch
- Make sure vercel and github secrets agree with each other
- "studio/src/components/previews/PreviewArticle.tsx" had preview secret exposed. Patch this in git history.
- Add studio .env to vercel/github secrets
- Add tap prompt to cards. not intuitive currently.
- Pull Google Analytics tag and mailchimp url from CMS
- Cookies popup
- Fix items with missing Slugs
- Older posts break due to missing alt text

## Later

- Breadcrumbs everywhere.
- Cards are totally ADA incompliant -- you can't tab through. They also add a large amount of DOM components. Refactor to fix these issues.
- Cookies/analytics popup / toast component and associated policies. See texas.gov
- Setup periodic backups of dataset
- Cards need ADA flip method
- slider needs hover outline
- Can body of articles be more legible?
- Archive posts older than X
- Custom 404 page
- Custom 500 page (<https://nextjs.org/docs/advanced-features/custom-error-page#500-page>)
- Integrate Sentry

## Add these comment types

- REF

## Content

- config pages
- policy links
- headers

## Resources

- <https://trianglify.netlify.app/>
