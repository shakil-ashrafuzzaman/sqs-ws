/**
 * Sanity Schema Registry for SQS Security
 * All document and object types registered here
 */

// ── Object types (reusable fields) ─────────────────────────────────────────
import { seoFields } from './objects/seoFields'
import { portableText } from './objects/portableText'
import { faqItem } from './objects/faqItem'

// ── Document types ─────────────────────────────────────────────────────────
import { service } from './documents/service'
import { serviceArea } from './documents/serviceArea'
import { blogPost } from './documents/blogPost'
import { industry } from './documents/industry'
import { testimonial } from './documents/testimonial'
import { faq } from './documents/faq'
import { teamMember } from './documents/teamMember'
import { career } from './documents/career'
import { caseStudy } from './documents/caseStudy'
import { certification } from './documents/certification'
import { contactInfo } from './documents/contactInfo'
import { siteSettings } from './documents/siteSettings'

export const schemaTypes = [
  // Objects (registered first — documents may reference them)
  seoFields,
  portableText,
  faqItem,

  // Documents
  service,
  serviceArea,
  blogPost,
  industry,
  testimonial,
  faq,
  teamMember,
  career,
  caseStudy,
  certification,
  contactInfo,
  siteSettings,
]
