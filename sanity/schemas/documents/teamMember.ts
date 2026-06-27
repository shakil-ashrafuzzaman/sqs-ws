/**
 * Schema: Team Member
 * SQS Security staff profiles with SIA license tracking
 */
import { defineField, defineType } from 'sanity'
import { User } from 'lucide-react'

export const teamMember = defineType({
  name: 'teamMember',
  title: 'Team Members',
  type: 'document',
  icon: User,

  fields: [
    defineField({
      name: 'name',
      title: 'Full Name',
      type: 'string',
      validation: (Rule) =>
        Rule.required().min(2).max(100).error('Full name is required.'),
    }),
    defineField({
      name: 'slug',
      title: 'URL Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
        slugify: (input) =>
          input.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, ''),
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'role',
      title: 'Job Title / Role',
      type: 'string',
      validation: (Rule) =>
        Rule.required().max(80).error('Role/job title is required.'),
    }),
    defineField({
      name: 'department',
      title: 'Department',
      type: 'string',
      options: {
        list: [
          { title: 'Operations', value: 'operations' },
          { title: 'Management', value: 'management' },
          { title: 'Control Room', value: 'control-room' },
          { title: 'Field Operations', value: 'field' },
          { title: 'HR & Recruitment', value: 'hr' },
          { title: 'Business Development', value: 'business-development' },
          { title: 'Administration', value: 'administration' },
        ],
      },
    }),
    defineField({
      name: 'photo',
      title: 'Profile Photo',
      type: 'image',
      options: { hotspot: true },
      fields: [
        defineField({
          name: 'alt',
          title: 'Alt Text',
          type: 'string',
        }),
      ],
    }),
    defineField({
      name: 'bio',
      title: 'Biography',
      type: 'text',
      rows: 4,
      validation: (Rule) => Rule.max(500).warning('Keep bio under 500 characters.'),
    }),
    defineField({
      name: 'siaLicenseNumber',
      title: 'SIA Licence Number',
      type: 'string',
      description: 'Security Industry Authority (SIA) licence number. Format: XXXX-XXXX-XXXX-XXXX',
      validation: (Rule) =>
        Rule.regex(
          /^[0-9]{4}-[0-9]{4}-[0-9]{4}-[0-9]{4}$/,
          { name: 'SIA format', invert: false },
        ).warning('SIA licence should be in XXXX-XXXX-XXXX-XXXX format.'),
    }),
    defineField({
      name: 'siaLicenseType',
      title: 'SIA Licence Type',
      type: 'string',
      options: {
        list: [
          { title: 'Door Supervisor', value: 'door-supervisor' },
          { title: 'Security Guard', value: 'security-guard' },
          { title: 'CCTV Operator (Public Space)', value: 'cctv-operator' },
          { title: 'Vehicle Immobiliser', value: 'vehicle-immobiliser' },
          { title: 'Cash & Valuables in Transit', value: 'cash-transit' },
          { title: 'Close Protection', value: 'close-protection' },
          { title: 'Key Holder', value: 'key-holder' },
        ],
      },
    }),
    defineField({
      name: 'linkedIn',
      title: 'LinkedIn Profile URL',
      type: 'url',
      validation: (Rule) =>
        Rule.uri({ scheme: ['https'] })
          .warning('LinkedIn URL must be a valid HTTPS link.'),
    }),
    defineField({
      name: 'email',
      title: 'Contact Email',
      type: 'string',
      description: 'Internal use only — not displayed publicly.',
    }),
    defineField({
      name: 'featured',
      title: 'Show on About/Team Page',
      type: 'boolean',
      description: 'Display this team member on the public team section.',
      initialValue: false,
    }),
  ],

  preview: {
    select: {
      title: 'name',
      subtitle: 'role',
      media: 'photo',
    },
  },
})
