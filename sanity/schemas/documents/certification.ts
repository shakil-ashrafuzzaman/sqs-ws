import { defineField, defineType } from 'sanity'
import { BadgeCheck } from 'lucide-react'

export const certification = defineType({
  name: 'certification',
  title: 'Certifications',
  type: 'document',
  icon: BadgeCheck,

  fields: [
    defineField({
      name: 'name',
      title: 'Full Certification Name',
      type: 'string',
      description: 'e.g. "SIA Approved Contractor Scheme"',
      validation: (Rule) =>
        Rule.required().min(3).max(120).error('Certification name is required.'),
    }),
    defineField({
      name: 'shortName',
      title: 'Short Name / Acronym',
      type: 'string',
      description: 'e.g. "SIA", "ISO 9001", "ISO 14001"',
      validation: (Rule) =>
        Rule.required().max(30).error('Short name is required.'),
    }),
    defineField({
      name: 'description',
      title: 'Subtitle / Description',
      type: 'string',
      description: 'e.g. "Approved Contractor", "Quality Assured", "Environmental"',
      validation: (Rule) => Rule.required().max(100).error('Subtitle is required.'),
    }),
    defineField({
      name: 'logo',
      title: 'Certification Logo / Badge (Optional)',
      type: 'image',
      options: { hotspot: false },
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
      name: 'verificationUrl',
      title: 'Verification URL',
      type: 'url',
      description: 'Link to the official verification/registry page.',
      validation: (Rule) =>
        Rule.uri({ scheme: ['http', 'https'] }),
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Lower numbers appear first in the certifications strip.',
      initialValue: 99,
    }),
    defineField({
      name: 'showOnHomepage',
      title: 'Show on Homepage',
      type: 'boolean',
      description: 'Display this badge in the trust indicators strip on the homepage.',
      initialValue: true,
    }),
  ],

  preview: {
    select: {
      title: 'shortName',
      subtitle: 'description',
      media: 'logo',
    },
    prepare({ title, subtitle, media }) {
      return {
        title: `✅ ${title}`,
        subtitle,
        media,
      }
    },
  },

  orderings: [
    {
      title: 'Display Order',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
  ],
})
