/**
 * Schema: FAQ (Standalone document)
 * Global FAQs not tied to a specific service
 */
import { defineField, defineType } from 'sanity'
import { HelpCircle } from 'lucide-react'

export const faq = defineType({
  name: 'faq',
  title: 'FAQs',
  type: 'document',
  icon: HelpCircle,

  fields: [
    defineField({
      name: 'question',
      title: 'Question',
      type: 'string',
      validation: (Rule) =>
        Rule.required()
          .min(10)
          .max(200)
          .error('Question is required (10–200 characters).'),
    }),
    defineField({
      name: 'answer',
      title: 'Answer',
      type: 'text',
      rows: 5,
      validation: (Rule) =>
        Rule.required()
          .min(20)
          .max(1500)
          .error('Answer is required (20–1500 characters).'),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'General', value: 'general' },
          { title: 'Services', value: 'services' },
          { title: 'Pricing & Contracts', value: 'pricing' },
          { title: 'Licensing & Compliance', value: 'compliance' },
          { title: 'Response Times', value: 'response' },
          { title: 'Recruitment', value: 'recruitment' },
        ],
      },
      validation: (Rule) => Rule.required().error('Category is required.'),
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Lower numbers appear first.',
      initialValue: 99,
    }),
    defineField({
      name: 'featured',
      title: 'Show on Homepage',
      type: 'boolean',
      description: 'Include this FAQ in the homepage FAQ section.',
      initialValue: false,
    }),
  ],

  preview: {
    select: {
      title: 'question',
      subtitle: 'category',
    },
    prepare({ title, subtitle }) {
      return {
        title: `❓ ${title}`,
        subtitle: subtitle ?? 'Uncategorised',
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
