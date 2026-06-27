/**
 * Schema: Testimonial
 * Client reviews linked to specific services
 */
import { defineField, defineType } from 'sanity'
import { Star } from 'lucide-react'

export const testimonial = defineType({
  name: 'testimonial',
  title: 'Testimonials',
  type: 'document',
  icon: Star,

  fields: [
    defineField({
      name: 'clientName',
      title: 'Client Full Name',
      type: 'string',
      validation: (Rule) =>
        Rule.required().min(2).max(80).error('Client name is required.'),
    }),
    defineField({
      name: 'clientTitle',
      title: 'Job Title / Role',
      type: 'string',
      description: 'e.g. "Facilities Manager", "Site Director"',
      validation: (Rule) => Rule.max(80),
    }),
    defineField({
      name: 'company',
      title: 'Company Name',
      type: 'string',
      validation: (Rule) => Rule.max(100),
    }),
    defineField({
      name: 'companyLogo',
      title: 'Company Logo',
      type: 'image',
      options: { hotspot: false },
      fields: [
        defineField({
          name: 'alt',
          title: 'Alt Text',
          type: 'string',
        }),
      ],
    }),
    defineField({
      name: 'rating',
      title: 'Star Rating',
      type: 'number',
      options: {
        list: [
          { title: '⭐⭐⭐⭐⭐ — Excellent (5)', value: 5 },
          { title: '⭐⭐⭐⭐ — Good (4)', value: 4 },
          { title: '⭐⭐⭐ — Average (3)', value: 3 },
        ],
      },
      initialValue: 5,
      validation: (Rule) =>
        Rule.required().min(3).max(5).error('Rating must be 3, 4, or 5 stars.'),
    }),
    defineField({
      name: 'quote',
      title: 'Testimonial Quote',
      type: 'text',
      rows: 4,
      validation: (Rule) =>
        Rule.required()
          .min(30)
          .max(500)
          .error('Quote is required (30–500 characters).'),
    }),
    defineField({
      name: 'service',
      title: 'Associated Service',
      type: 'reference',
      to: [{ type: 'service' }],
      description: 'Which SQS service does this testimonial relate to?',
    }),
    defineField({
      name: 'location',
      title: 'Client Location',
      type: 'string',
      description: 'e.g. "Southampton", "London"',
      validation: (Rule) => Rule.max(60),
    }),
    defineField({
      name: 'featured',
      title: 'Featured on Homepage',
      type: 'boolean',
      description: 'Show this testimonial prominently on the homepage carousel.',
      initialValue: false,
    }),
  ],

  preview: {
    select: {
      title: 'clientName',
      subtitle: 'company',
      media: 'companyLogo',
    },
    prepare({ title, subtitle, media }) {
      return {
        title: `⭐ ${title}`,
        subtitle: subtitle ?? 'No company',
        media,
      }
    },
  },
})
