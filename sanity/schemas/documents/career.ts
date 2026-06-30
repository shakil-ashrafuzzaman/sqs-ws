/**
 * Schema: Career
 * Active job listings for SQS Security
 */
import { defineField, defineType } from 'sanity'
import { Briefcase } from 'lucide-react'

export const career = defineType({
  name: 'career',
  title: 'Current Opportunities',
  type: 'document',
  icon: Briefcase,

  fields: [
    defineField({
      name: 'title',
      title: 'Job Title',
      type: 'string',
      validation: (Rule) =>
        Rule.required().min(5).max(100).error('Job title is required.'),
    }),
    defineField({
      name: 'slug',
      title: 'URL Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
        slugify: (input) =>
          input.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, ''),
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'department',
      title: 'Department',
      type: 'string',
      options: {
        list: [
          { title: 'Security Operations', value: 'security-operations' },
          { title: 'CCTV & Monitoring', value: 'cctv-monitoring' },
          { title: 'Management & Leadership', value: 'management' },
          { title: 'HR & Recruitment', value: 'hr' },
          { title: 'Business Development', value: 'business-development' },
          { title: 'Administration', value: 'administration' },
        ],
      },
      validation: (Rule) => Rule.required().error('Department is required.'),
    }),
    defineField({
      name: 'location',
      title: 'Work Location',
      type: 'string',
      description: 'e.g. "Southampton HQ", "London (Site-based)", "Remote"',
      validation: (Rule) => Rule.required().max(100),
    }),
    defineField({
      name: 'type',
      title: 'Employment Type',
      type: 'string',
      options: {
        list: [
          { title: 'Full Time', value: 'full-time' },
          { title: 'Part Time', value: 'part-time' },
          { title: 'Contract', value: 'contract' },
          { title: 'Zero Hours', value: 'zero-hours' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'salary',
      title: 'Salary / Rate',
      type: 'string',
      description: 'e.g. "£28,000–£32,000 per annum" or "£12.50–£15.00 per hour"',
    }),
    defineField({
      name: 'description',
      title: 'Job Description',
      type: 'portableText',
      validation: (Rule) => Rule.required().error('Job description is required.'),
    }),
    defineField({
      name: 'requirements',
      title: 'Requirements',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Key requirements for this role (e.g., "Valid SIA Door Supervisor Licence").',
      validation: (Rule) => Rule.min(1).max(15).error('Include at least one requirement.'),
    }),
    defineField({
      name: 'closingDate',
      title: 'Application Closing Date',
      type: 'date',
      options: { dateFormat: 'DD/MM/YYYY' },
    }),
    defineField({
      name: 'active',
      title: 'Vacancy Active',
      type: 'boolean',
      description: 'Uncheck to hide this vacancy from the careers page.',
      initialValue: true,
      validation: (Rule) => Rule.required(),
    }),
  ],

  preview: {
    select: {
      title: 'title',
      subtitle: 'location',
      active: 'active',
    },
    prepare({ title, subtitle, active }) {
      return {
        title: `${active ? '🟢' : '🔴'} ${title}`,
        subtitle: subtitle ?? 'No location',
      }
    },
  },
})
