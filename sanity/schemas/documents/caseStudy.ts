/**
 * Schema: Case Study
 * Security deployment success stories
 */
import { defineField, defineType } from 'sanity'
import { Award } from 'lucide-react'

export const caseStudy = defineType({
  name: 'caseStudy',
  title: 'Case Studies',
  type: 'document',
  icon: Award,

  groups: [
    { name: 'content', title: 'Case Study Content', default: true },
    { name: 'seo', title: 'SEO' },
  ],

  fields: [
    defineField({
      name: 'title',
      title: 'Case Study Title',
      type: 'string',
      group: 'content',
      validation: (Rule) =>
        Rule.required().min(10).max(100).error('Title is required.'),
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
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'client',
      title: 'Client Name',
      type: 'string',
      group: 'content',
      description: 'Use a pseudonym if the client prefers confidentiality.',
      validation: (Rule) => Rule.max(100),
    }),
    defineField({
      name: 'industry',
      title: 'Industry Sector',
      type: 'reference',
      to: [{ type: 'industry' }],
      group: 'content',
    }),
    defineField({
      name: 'service',
      title: 'Primary Service Used',
      type: 'reference',
      to: [{ type: 'service' }],
      group: 'content',
    }),
    defineField({
      name: 'mainImage',
      title: 'Feature Image',
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
    defineField({
      name: 'challenge',
      title: 'The Challenge',
      type: 'text',
      rows: 4,
      group: 'content',
      description: 'What security problem did the client face?',
      validation: (Rule) =>
        Rule.required()
          .min(50)
          .max(800)
          .error('Challenge description is required (50–800 characters).'),
    }),
    defineField({
      name: 'solution',
      title: 'Our Solution',
      type: 'portableText',
      group: 'content',
      description: 'How did SQS Security address the challenge?',
    }),
    defineField({
      name: 'results',
      title: 'Key Results / Outcomes',
      type: 'array',
      group: 'content',
      of: [{ type: 'string' }],
      description: 'Bullet-point outcomes (e.g., "90% reduction in theft incidents").',
      validation: (Rule) =>
        Rule.required().min(1).max(8).error('Include at least one result.'),
    }),
    defineField({
      name: 'testimonial',
      title: 'Client Testimonial',
      type: 'reference',
      to: [{ type: 'testimonial' }],
      group: 'content',
      description: 'Link an existing testimonial from this client.',
    }),
    defineField({
      name: 'featured',
      title: 'Featured on Homepage',
      type: 'boolean',
      group: 'content',
      description: 'Show this case study in the homepage case studies section.',
      initialValue: false,
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
      client: 'client',
      media: 'mainImage',
    },
    prepare({ title, client, media }) {
      return {
        title,
        subtitle: client ? `Client: ${client}` : 'Anonymous client',
        media,
      }
    },
  },
})
