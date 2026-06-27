/**
 * Schema: Contact Info (Singleton)
 * SQS Security headquarters and contact details
 */
import { defineField, defineType } from 'sanity'
import { Phone } from 'lucide-react'

export const contactInfo = defineType({
  name: 'contactInfo',
  title: 'Contact Information',
  type: 'document',
  icon: Phone,
  // Singleton — only one document of this type should exist
  __experimental_actions: ['update', 'publish'],

  fieldsets: [
    { name: 'address', title: 'Registered Address' },
    { name: 'phones', title: 'Telephone Numbers' },
    { name: 'online', title: 'Online & Social' },
    { name: 'company', title: 'Company Details' },
    { name: 'geo', title: 'Geolocation (for JSON-LD)' },
  ],

  fields: [
    // ── Address ──────────────────────────────────────────────────
    defineField({
      name: 'addressLine1',
      title: 'Address Line 1',
      type: 'string',
      fieldset: 'address',
      initialValue: '86 Brintons Road',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'addressLine2',
      title: 'Address Line 2',
      type: 'string',
      fieldset: 'address',
    }),
    defineField({
      name: 'city',
      title: 'City',
      type: 'string',
      fieldset: 'address',
      initialValue: 'Southampton',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'county',
      title: 'County',
      type: 'string',
      fieldset: 'address',
      initialValue: 'Hampshire',
    }),
    defineField({
      name: 'postcode',
      title: 'Postcode',
      type: 'string',
      fieldset: 'address',
      validation: (Rule) =>
        Rule.required()
          .regex(
            /^[A-Z]{1,2}[0-9][0-9A-Z]?\s?[0-9][A-Z]{2}$/i,
            { name: 'UK postcode' },
          )
          .error('Enter a valid UK postcode.'),
    }),
    defineField({
      name: 'country',
      title: 'Country',
      type: 'string',
      fieldset: 'address',
      initialValue: 'United Kingdom',
      readOnly: true,
    }),

    // ── Phones ───────────────────────────────────────────────────
    defineField({
      name: 'phone',
      title: 'Main Phone Number',
      type: 'string',
      fieldset: 'phones',
      description: 'Displayed in header and footer.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'emergencyPhone',
      title: '24/7 Emergency Phone Number',
      type: 'string',
      fieldset: 'phones',
      description: 'Displayed prominently in the emergency CTA bar.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'whatsapp',
      title: 'WhatsApp Number (optional)',
      type: 'string',
      fieldset: 'phones',
    }),

    // ── Online ────────────────────────────────────────────────────
    defineField({
      name: 'email',
      title: 'General Email',
      type: 'string',
      fieldset: 'online',
      initialValue: 'info@sqssecurity.co.uk',
      validation: (Rule) =>
        Rule.required().email().error('A valid email address is required.'),
    }),
    defineField({
      name: 'websiteUrl',
      title: 'Website URL',
      type: 'url',
      fieldset: 'online',
      initialValue: 'https://sqssecurity.co.uk',
    }),
    defineField({
      name: 'googleMapsUrl',
      title: 'Google Maps Link',
      type: 'url',
      fieldset: 'online',
    }),
    defineField({
      name: 'linkedIn',
      title: 'LinkedIn URL',
      type: 'url',
      fieldset: 'online',
    }),
    defineField({
      name: 'twitter',
      title: 'X / Twitter URL',
      type: 'url',
      fieldset: 'online',
    }),
    defineField({
      name: 'facebook',
      title: 'Facebook URL',
      type: 'url',
      fieldset: 'online',
    }),

    // ── Company ───────────────────────────────────────────────────
    defineField({
      name: 'companyNumber',
      title: 'Companies House Number',
      type: 'string',
      fieldset: 'company',
      description: 'UK Companies House registration number.',
    }),
    defineField({
      name: 'vatNumber',
      title: 'VAT Number',
      type: 'string',
      fieldset: 'company',
      description: 'Format: GB XXXXXXXXX',
    }),
    defineField({
      name: 'openingHours',
      title: 'Office Opening Hours',
      type: 'string',
      fieldset: 'company',
      description: 'e.g. "Monday–Friday: 08:00–18:00 | 24/7 Emergency Line Available"',
    }),

    // ── Geolocation ───────────────────────────────────────────────
    defineField({
      name: 'latitude',
      title: 'Latitude',
      type: 'number',
      fieldset: 'geo',
      description: 'Decimal format (e.g. 50.9097)',
    }),
    defineField({
      name: 'longitude',
      title: 'Longitude',
      type: 'number',
      fieldset: 'geo',
      description: 'Decimal format (e.g. -1.4044)',
    }),
  ],

  preview: {
    prepare() {
      return {
        title: '📞 SQS Security – Contact Information',
        subtitle: '86 Brintons Road, Southampton',
      }
    },
  },
})
