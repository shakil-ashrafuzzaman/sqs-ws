/**
 * Schema: Accreditation
 * Official certifications and quality marks (SIA, ISO, SafeContractor, etc.)
 */
import { defineField, defineType } from 'sanity'
import { BadgeCheck } from 'lucide-react'

export const accreditation = defineType({
  name: 'accreditation',
  title: 'Accreditations',
  type: 'document',
  icon: BadgeCheck,

  fields: [
    defineField({
      name: 'name',
      title: 'Full Accreditation Name',
      type: 'string',
      description: 'e.g. "SIA Approved Contractor Scheme"',
      validation: (Rule) =>
        Rule.required().min(5).max(120).error('Accreditation name is required.'),
    }),
    defineField({
      name: 'shortName',
      title: 'Short Name / Acronym',
      type: 'string',
      description: 'e.g. "SIA ACS", "ISO 9001", "SafeContractor"',
      validation: (Rule) =>
        Rule.required().max(30).error('Short name is required.'),
    }),
    defineField({
      name: 'logo',
      title: 'Accreditation Logo / Badge',
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
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
      description: 'Brief explanation of what this accreditation means for clients.',
      validation: (Rule) => Rule.max(300),
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
      name: 'issuedBy',
      title: 'Issuing Body',
      type: 'string',
      description: 'e.g. "Security Industry Authority (SIA)"',
      validation: (Rule) => Rule.max(100),
    }),
    defineField({
      name: 'validUntil',
      title: 'Valid Until',
      type: 'date',
      options: { dateFormat: 'DD/MM/YYYY' },
      description: 'Expiry date of this certification (for internal tracking).',
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Lower numbers appear first in the accreditations strip.',
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
      subtitle: 'name',
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
