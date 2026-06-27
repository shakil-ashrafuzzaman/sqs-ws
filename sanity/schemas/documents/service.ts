/**
 * Schema: Service
 * Represents each security service offered by SQS Security
 * (Manned Guarding, Mobile Patrols, CCTV Monitoring, Key Holding, etc.)
 */
import { defineField, defineType } from 'sanity'
import { Shield } from 'lucide-react'

export const service = defineType({
  name: 'service',
  title: 'Security Services',
  type: 'document',
  icon: Shield,

  groups: [
    { name: 'content', title: 'Content', default: true },
    { name: 'features', title: 'Features & FAQs' },
    { name: 'seo', title: 'SEO' },
  ],

  fields: [
    // ── Core fields ──────────────────────────────────────────────
    defineField({
      name: 'title',
      title: 'Service Name',
      type: 'string',
      group: 'content',
      validation: (Rule) =>
        Rule.required()
          .min(3)
          .max(80)
          .error('Service name is required (3–80 characters).'),
    }),
    defineField({
      name: 'slug',
      title: 'URL Slug',
      type: 'slug',
      group: 'content',
      options: {
        source: 'title',
        maxLength: 96,
        slugify: (input) =>
          input.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, ''),
      },
      validation: (Rule) => Rule.required().error('A URL slug is required.'),
    }),
    defineField({
      name: 'excerpt',
      title: 'Short Description',
      type: 'text',
      rows: 2,
      group: 'content',
      description: 'A concise summary used in service cards and directory listings (max 180 characters).',
      validation: (Rule) =>
        Rule.required()
          .max(180)
          .error('Short description is required and must be under 180 characters.'),
    }),
    defineField({
      name: 'icon',
      title: 'Icon Name',
      type: 'string',
      group: 'content',
      description: 'Lucide icon name (e.g., "shield", "eye", "key"). See lucide.dev for full list.',
      options: {
        list: [
          { title: '🛡 Shield (Manned Guarding)', value: 'shield' },
          { title: '🚗 Car (Mobile Patrols)', value: 'car' },
          { title: '📷 Camera (CCTV)', value: 'camera' },
          { title: '🔑 Key (Key Holding)', value: 'key' },
          { title: '🔔 Bell (Alarm Response)', value: 'bell' },
          { title: '🏗 Building (Construction)', value: 'building-2' },
          { title: '🛒 ShoppingBag (Retail)', value: 'shopping-bag' },
          { title: '⚓ Anchor (Maritime)', value: 'anchor' },
          { title: '🎤 Mic (Event)', value: 'mic' },
          { title: '💼 Briefcase (Corporate)', value: 'briefcase' },
        ],
      },
    }),
    defineField({
      name: 'mainImage',
      title: 'Main Image',
      type: 'image',
      group: 'content',
      options: { hotspot: true },
      fields: [
        defineField({
          name: 'alt',
          title: 'Alt Text',
          type: 'string',
          validation: (Rule) => Rule.required().error('Alt text is required.'),
        }),
      ],
    }),
    defineField({
      name: 'body',
      title: 'Full Description (Rich Text)',
      type: 'portableText',
      group: 'content',
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      group: 'content',
      description: 'Lower numbers appear first in the services listing.',
      initialValue: 99,
    }),

    // ── Features & FAQs ──────────────────────────────────────────
    defineField({
      name: 'features',
      title: 'Key Features / Benefits',
      type: 'array',
      group: 'features',
      of: [{ type: 'string' }],
      description: 'Add bullet points highlighting what this service includes.',
      validation: (Rule) => Rule.max(10).warning('Keep features to 10 items or fewer.'),
    }),
    defineField({
      name: 'faqs',
      title: 'Service FAQs',
      type: 'array',
      group: 'features',
      of: [{ type: 'faqItem' }],
      validation: (Rule) => Rule.max(10).warning('Include up to 10 FAQs per service.'),
    }),
    defineField({
      name: 'relatedServices',
      title: 'Related Services',
      type: 'array',
      group: 'features',
      of: [
        {
          type: 'reference',
          to: [{ type: 'service' }],
        },
      ],
      validation: (Rule) => Rule.max(4).warning('Limit to 4 related services.'),
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
      title: 'title',
      subtitle: 'excerpt',
      media: 'mainImage',
    },
    prepare({ title, subtitle, media }) {
      return { title, subtitle, media }
    },
  },

  orderings: [
    {
      title: 'Display Order',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
    {
      title: 'Name A–Z',
      name: 'titleAsc',
      by: [{ field: 'title', direction: 'asc' }],
    },
  ],
})
