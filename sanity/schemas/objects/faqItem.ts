/**
 * Reusable FAQ item object — embedded inside Services, Service Areas, and global FAQs
 */
import { defineField, defineType } from 'sanity'
import { HelpCircle } from 'lucide-react'

export const faqItem = defineType({
  name: 'faqItem',
  title: 'FAQ Item',
  type: 'object',
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
          .error('Question is required and must be between 10–200 characters.'),
    }),
    defineField({
      name: 'answer',
      title: 'Answer',
      type: 'text',
      rows: 4,
      validation: (Rule) =>
        Rule.required()
          .min(20)
          .max(1000)
          .error('Answer is required and must be between 20–1000 characters.'),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'General', value: 'general' },
          { title: 'Manned Guarding', value: 'manned-guarding' },
          { title: 'Mobile Patrols', value: 'mobile-patrols' },
          { title: 'CCTV Monitoring', value: 'cctv-monitoring' },
          { title: 'Key Holding', value: 'key-holding' },
          { title: 'Alarm Response', value: 'alarm-response' },
          { title: 'Event Security', value: 'event-security' },
          { title: 'Maritime Security', value: 'maritime-security' },
          { title: 'Pricing & Contracts', value: 'pricing' },
          { title: 'Compliance & Licensing', value: 'compliance' },
        ],
      },
    }),
  ],
  preview: {
    select: { title: 'question', subtitle: 'category' },
  },
})
