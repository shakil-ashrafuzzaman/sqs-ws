/**
 * Reusable SEO fields object — included in Services, Service Areas, Blog, Industries
 */
import { defineField, defineType } from 'sanity'

export const seoFields = defineType({
  name: 'seoFields',
  title: 'SEO Settings',
  type: 'object',
  fields: [
    defineField({
      name: 'metaTitle',
      title: 'Meta Title',
      type: 'string',
      description: 'Ideal length: 50–60 characters. Appears in browser tab and Google results.',
      validation: (Rule) =>
        Rule.max(60).warning('Meta title should be under 60 characters for best SEO results.'),
    }),
    defineField({
      name: 'metaDescription',
      title: 'Meta Description',
      type: 'text',
      rows: 3,
      description: 'Ideal length: 120–160 characters. Appears as the search snippet in Google.',
      validation: (Rule) =>
        Rule.max(160).warning('Meta description should be under 160 characters.'),
    }),
    defineField({
      name: 'ogImage',
      title: 'Open Graph Image',
      type: 'image',
      description: 'Recommended size: 1200×630px. Used for social media sharing previews.',
      options: { hotspot: true },
      fields: [
        defineField({
          name: 'alt',
          title: 'Alt Text',
          type: 'string',
          validation: (Rule) => Rule.required().error('Alt text is required for accessibility.'),
        }),
      ],
    }),
    defineField({
      name: 'noIndex',
      title: 'Hide from search engines (noindex)',
      type: 'boolean',
      description: 'Enable to prevent this page from appearing in search results.',
      initialValue: false,
    }),
  ],
})
