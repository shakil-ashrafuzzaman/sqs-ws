/**
 * Schema: Service Area
 * Local SEO landing pages targeting UK cities
 * e.g. /security-company-southampton
 */
import { defineField, defineType } from 'sanity'
import { MapPin } from 'lucide-react'

export const serviceArea = defineType({
  name: 'serviceArea',
  title: 'Service Areas',
  type: 'document',
  icon: MapPin,

  groups: [
    { name: 'location', title: 'Location Details', default: true },
    { name: 'content', title: 'Page Content' },
    { name: 'seo', title: 'SEO' },
  ],

  fields: [
    defineField({
      name: 'locationName',
      title: 'City / Location Name',
      type: 'string',
      group: 'location',
      validation: (Rule) =>
        Rule.required()
          .min(2)
          .max(60)
          .error('Location name is required.'),
    }),
    defineField({
      name: 'slug',
      title: 'URL Slug',
      type: 'slug',
      group: 'location',
      description: 'Auto-generated. Final URL: /security-company-{slug}',
      options: {
        source: (doc) => `security-company-${doc.locationName}`,
        maxLength: 96,
        slugify: (input) =>
          input
            .toLowerCase()
            .replace(/\s+/g, '-')
            .replace(/[^a-z0-9-]/g, ''),
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'region',
      title: 'UK Region',
      type: 'string',
      group: 'location',
      options: {
        list: [
          { title: 'South East England', value: 'south-east' },
          { title: 'London', value: 'london' },
          { title: 'South West England', value: 'south-west' },
          { title: 'East of England', value: 'east' },
          { title: 'East Midlands', value: 'east-midlands' },
          { title: 'West Midlands', value: 'west-midlands' },
          { title: 'North West England', value: 'north-west' },
          { title: 'North East England', value: 'north-east' },
          { title: 'Yorkshire and the Humber', value: 'yorkshire' },
          { title: 'Scotland', value: 'scotland' },
          { title: 'Wales', value: 'wales' },
        ],
      },
    }),
    defineField({
      name: 'heroHeading',
      title: 'Hero Heading',
      type: 'string',
      group: 'content',
      description: 'e.g. "Professional Security Services in Southampton"',
      validation: (Rule) =>
        Rule.required().max(100).error('Hero heading is required.'),
    }),
    defineField({
      name: 'localDescription',
      title: 'Local Area Description',
      type: 'text',
      rows: 5,
      group: 'content',
      description: 'Unique content describing SQS Security\'s presence and coverage in this area.',
      validation: (Rule) =>
        Rule.required()
          .min(100)
          .max(1000)
          .error('Local description is required (100–1000 characters).'),
    }),
    defineField({
      name: 'body',
      title: 'Full Page Content',
      type: 'portableText',
      group: 'content',
    }),
    defineField({
      name: 'servicesOffered',
      title: 'Services Available in This Area',
      type: 'array',
      group: 'content',
      of: [{ type: 'reference', to: [{ type: 'service' }] }],
      validation: (Rule) =>
        Rule.required().min(1).error('Select at least one service offered in this area.'),
    }),
    defineField({
      name: 'localTestimonials',
      title: 'Local Client Testimonials',
      type: 'array',
      group: 'content',
      of: [{ type: 'reference', to: [{ type: 'testimonial' }] }],
      validation: (Rule) => Rule.max(5).warning('Show up to 5 testimonials per area page.'),
    }),
    defineField({
      name: 'faqs',
      title: 'Local FAQs',
      type: 'array',
      group: 'content',
      of: [{ type: 'faqItem' }],
      description: 'Area-specific FAQs (e.g. response times, coverage questions).',
      validation: (Rule) => Rule.max(8),
    }),
    defineField({
      name: 'mainImage',
      title: 'Hero / Banner Image',
      type: 'image',
      group: 'content',
      options: { hotspot: true },
      fields: [
        defineField({
          name: 'alt',
          title: 'Alt Text',
          type: 'string',
          validation: (Rule) => Rule.required(),
        }),
      ],
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
      title: 'locationName',
      subtitle: 'region',
      media: 'mainImage',
    },
    prepare({ title, subtitle, media }) {
      return {
        title: `📍 ${title}`,
        subtitle: subtitle ?? 'No region set',
        media,
      }
    },
  },
})
