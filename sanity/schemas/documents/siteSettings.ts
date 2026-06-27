/**
 * Schema: Site Settings (Singleton)
 * Global website configuration — SEO defaults, logos, GA4 tag
 */
import { defineField, defineType } from 'sanity'
import { Settings } from 'lucide-react'

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  icon: Settings,
  // Singleton — only one document of this type should exist
  __experimental_actions: ['update', 'publish'],

  groups: [
    { name: 'general', title: 'General', default: true },
    { name: 'branding', title: 'Logos & Branding' },
    { name: 'seo', title: 'Default SEO' },
    { name: 'analytics', title: 'Analytics & Tracking' },
    { name: 'homepage', title: 'Homepage Hero' },
  ],

  fields: [
    // ── General ────────────────────────────────────────────────────
    defineField({
      name: 'siteName',
      title: 'Site Name',
      type: 'string',
      group: 'general',
      initialValue: 'SQS Security',
      validation: (Rule) => Rule.required().max(60),
    }),
    defineField({
      name: 'tagline',
      title: 'Tagline',
      type: 'string',
      group: 'general',
      initialValue: 'Protecting People, Property & Business',
      validation: (Rule) => Rule.required().max(100),
    }),
    defineField({
      name: 'siteUrl',
      title: 'Live Site URL',
      type: 'url',
      group: 'general',
      initialValue: 'https://sqssecurity.co.uk',
      validation: (Rule) => Rule.required(),
    }),

    // ── Homepage Hero ─────────────────────────────────────────────
    defineField({
      name: 'heroVideo',
      title: 'Hero Background Video',
      type: 'file',
      group: 'homepage',
      description: 'Upload an MP4 video for the homepage background. If provided, this will be used instead of the image.',
      options: {
        accept: 'video/mp4,video/webm',
      },
    }),
    defineField({
      name: 'heroImage',
      title: 'Hero Background Image',
      type: 'image',
      group: 'homepage',
      description: 'Upload a background image to use if no video is provided.',
      options: { hotspot: true },
    }),

    // ── Branding ─────────────────────────────────────────────────
    defineField({
      name: 'logoMain',
      title: 'Primary Logo (Dark Background)',
      type: 'image',
      group: 'branding',
      description: 'Full horizontal logo — Navy and Gold. Used in header.',
      options: { hotspot: false },
      fields: [defineField({ name: 'alt', title: 'Alt Text', type: 'string', initialValue: 'SQS Security Logo' })],
    }),
    defineField({
      name: 'logoWhite',
      title: 'White / Reversed Logo',
      type: 'image',
      group: 'branding',
      description: 'All-white version for dark navy backgrounds.',
      options: { hotspot: false },
      fields: [defineField({ name: 'alt', title: 'Alt Text', type: 'string', initialValue: 'SQS Security Logo' })],
    }),
    defineField({
      name: 'logoIcon',
      title: 'Shield Icon Only',
      type: 'image',
      group: 'branding',
      description: 'Square icon — used for favicon and social media profile images.',
      options: { hotspot: false },
      fields: [defineField({ name: 'alt', title: 'Alt Text', type: 'string', initialValue: 'SQS Security Shield' })],
    }),
    defineField({
      name: 'favicon',
      title: 'Favicon (ICO/SVG/PNG)',
      type: 'file',
      group: 'branding',
      options: { accept: '.ico,.svg,.png' },
    }),

    // ── Default SEO ───────────────────────────────────────────────
    defineField({
      name: 'defaultSeoTitle',
      title: 'Default SEO Title Pattern',
      type: 'string',
      group: 'seo',
      description: 'Used when a page has no custom meta title. e.g. "{Page Title} | SQS Security"',
      initialValue: '{Page Title} | SQS Security – Professional UK Security Services',
      validation: (Rule) => Rule.max(70),
    }),
    defineField({
      name: 'defaultMetaDescription',
      title: 'Default Meta Description',
      type: 'text',
      rows: 3,
      group: 'seo',
      description: 'Fallback description when a page has no custom meta description.',
      initialValue:
        'SQS Security provides professional security services across the UK including manned guarding, mobile patrols, CCTV monitoring, key holding and alarm response. Based in Southampton.',
      validation: (Rule) => Rule.max(160),
    }),
    defineField({
      name: 'defaultOgImage',
      title: 'Default Open Graph Image',
      type: 'image',
      group: 'seo',
      description: 'Fallback OG image (1200×630px). Used when a page has no custom OG image.',
      options: { hotspot: true },
      fields: [
        defineField({
          name: 'alt',
          title: 'Alt Text',
          type: 'string',
          initialValue: 'SQS Security – Professional UK Security Services',
        }),
      ],
    }),

    // ── Analytics ─────────────────────────────────────────────────
    defineField({
      name: 'ga4MeasurementId',
      title: 'Google Analytics 4 Measurement ID',
      type: 'string',
      group: 'analytics',
      description: 'Format: G-XXXXXXXXXX',
      validation: (Rule) =>
        Rule.regex(/^G-[A-Z0-9]{8,12}$/, { name: 'GA4 ID format' }).warning(
          'GA4 Measurement ID should start with "G-" followed by alphanumeric characters.',
        ),
    }),
    defineField({
      name: 'googleSearchConsoleVerification',
      title: 'Google Search Console Verification Code',
      type: 'string',
      group: 'analytics',
      description: 'The content value from the verification meta tag.',
    }),
  ],

  preview: {
    prepare() {
      return {
        title: '⚙️ SQS Security – Site Settings',
        subtitle: 'sqssecurity.co.uk',
      }
    },
  },
})
