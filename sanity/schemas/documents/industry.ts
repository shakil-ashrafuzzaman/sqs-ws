/**
 * Schema: Industry
 * Sector-specific security pages (Construction, Retail, Maritime, etc.)
 */
import { defineField, defineType } from 'sanity'
import { Building2 } from 'lucide-react'

export const industry = defineType({
  name: 'industry',
  title: 'Industries',
  type: 'document',
  icon: Building2,

  groups: [
    { name: 'content', title: 'Content', default: true },
    { name: 'seo', title: 'SEO' },
  ],

  fields: [
    defineField({
      name: 'name',
      title: 'Industry Name',
      type: 'string',
      group: 'content',
      validation: (Rule) =>
        Rule.required().min(3).max(80).error('Industry name is required.'),
    }),
    defineField({
      name: 'slug',
      title: 'URL Slug',
      type: 'slug',
      group: 'content',
      options: {
        source: 'name',
        maxLength: 96,
        slugify: (input) =>
          input.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, ''),
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Short Description',
      type: 'text',
      rows: 3,
      group: 'content',
      validation: (Rule) =>
        Rule.required()
          .max(200)
          .error('Short description required (max 200 characters).'),
    }),
    defineField({
      name: 'icon',
      title: 'Icon Name',
      type: 'string',
      group: 'content',
      description: 'Lucide icon name for display in cards.',
      options: {
        list: [
          { title: '🏗 Construction', value: 'hard-hat' },
          { title: '🚛 Logistics', value: 'truck' },
          { title: '🛒 Retail', value: 'shopping-cart' },
          { title: '🏥 Healthcare', value: 'cross' },
          { title: '⚓ Maritime', value: 'anchor' },
          { title: '🎓 Education', value: 'graduation-cap' },
          { title: '💼 Corporate', value: 'briefcase' },
        ],
      },
    }),
    defineField({
      name: 'mainImage',
      title: 'Industry Banner Image',
      type: 'image',
      group: 'content',
      options: { hotspot: true },
      fields: [
        defineField({
          name: 'alt',
          type: 'string',
          title: 'Alt Text',
          validation: (Rule) => Rule.required(),
        }),
      ],
    }),
    defineField({
      name: 'heroHeading',
      title: 'Hero Heading',
      type: 'string',
      group: 'content',
      description: 'e.g. "Expert Security for the Construction Sector"',
      validation: (Rule) =>
        Rule.required().max(100).error('Hero heading is required.'),
    }),
    defineField({
      name: 'challenges',
      title: 'Industry Security Challenges',
      type: 'array',
      group: 'content',
      of: [{ type: 'string' }],
      description: 'Key risks/challenges that this industry faces (e.g., theft, trespassing).',
      validation: (Rule) => Rule.min(1).max(8).error('List at least one challenge.'),
    }),
    defineField({
      name: 'body',
      title: 'Full Page Content',
      type: 'portableText',
      group: 'content',
    }),
    defineField({
      name: 'relatedServices',
      title: 'Recommended Security Services',
      type: 'array',
      group: 'content',
      of: [{ type: 'reference', to: [{ type: 'service' }] }],
      validation: (Rule) => Rule.max(6),
    }),
    defineField({
      name: 'complianceInfo',
      title: 'Compliance & Regulation Notes',
      type: 'text',
      rows: 4,
      group: 'content',
      description: 'Industry-specific legal/regulatory security requirements (e.g., BS7858).',
    }),

    // ── SEO ──────────────────────────────────────────────────────
    defineField({
      name: 'seo',
      title: 'SEO Settings',
      type: 'seoFields',
      group: 'seo',
    }),
  ],

  preview: {
    select: {
      title: 'name',
      subtitle: 'description',
      media: 'mainImage',
    },
  },
})
