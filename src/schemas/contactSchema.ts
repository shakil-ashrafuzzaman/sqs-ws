import { z } from 'zod';

/**
 * Zod validation schema for the contact form
 * Used by both the API endpoint and client-side validation
 */
export const contactSchema = z.object({
  name: z
    .string({ required_error: 'Full name is required.' })
    .min(2, 'Name must be at least 2 characters.')
    .max(100, 'Name must be under 100 characters.')
    .trim(),

  email: z
    .string({ required_error: 'Email address is required.' })
    .email('Please enter a valid email address.')
    .max(254, 'Email address is too long.')
    .trim()
    .toLowerCase(),

  phone: z
    .string()
    .regex(
      /^(\+44|0)(1|2|3|7|8)\d{8,9}$/,
      'Please enter a valid UK phone number.',
    )
    .optional()
    .or(z.literal('')),

  service: z
    .enum([
      'manned-guarding',
      'mobile-patrols',
      'cctv-monitoring',
      'key-holding',
      'alarm-response',
      'construction-security',
      'retail-security',
      'maritime-security',
      'event-security',
      'corporate-security',
      'other',
    ])
    .optional(),

  message: z
    .string({ required_error: 'Message is required.' })
    .min(20, 'Please provide a message of at least 20 characters.')
    .max(2000, 'Message must be under 2000 characters.')
    .trim(),

  /** Honeypot — must remain empty to pass bot detection */
  website: z.string().max(0, 'Bot detected.').optional(),
});

export type ContactFormData = z.infer<typeof contactSchema>;
