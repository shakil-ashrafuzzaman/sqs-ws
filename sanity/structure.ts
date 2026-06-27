/**
 * Custom Sanity Studio sidebar structure for SQS Security
 * Groups documents into logical sections for easy content management
 */
import type { StructureResolver } from 'sanity/structure'
import {
  Shield,
  MapPin,
  Building2,
  FileText,
  Star,
  HelpCircle,
  User,
  Briefcase,
  Award,
  BadgeCheck,
  Phone,
  Settings,
} from 'lucide-react'

export const structure: StructureResolver = (S) =>
  S.list()
    .title('SQS Security CMS')
    .items([
      // ── Singletons ─────────────────────────────────────────────
      S.listItem()
        .title('Site Settings')
        .icon(Settings)
        .child(
          S.document()
            .schemaType('siteSettings')
            .documentId('siteSettings')
            .title('Site Settings'),
        ),
      S.listItem()
        .title('Contact Information')
        .icon(Phone)
        .child(
          S.document()
            .schemaType('contactInfo')
            .documentId('contactInfo')
            .title('Contact Information'),
        ),
      S.divider(),

      // ── Security Services ──────────────────────────────────────
      S.listItem()
        .title('Security Services')
        .icon(Shield)
        .child(S.documentTypeList('service').title('All Security Services')),

      S.listItem()
        .title('Service Areas (Local SEO)')
        .icon(MapPin)
        .child(S.documentTypeList('serviceArea').title('UK Service Areas')),

      S.listItem()
        .title('Industries')
        .icon(Building2)
        .child(S.documentTypeList('industry').title('Industries Served')),

      S.divider(),

      // ── Content ────────────────────────────────────────────────
      S.listItem()
        .title('Blog Posts')
        .icon(FileText)
        .child(S.documentTypeList('blogPost').title('All Blog Posts')),

      S.listItem()
        .title('Case Studies')
        .icon(Award)
        .child(S.documentTypeList('caseStudy').title('All Case Studies')),

      S.listItem()
        .title('Testimonials')
        .icon(Star)
        .child(S.documentTypeList('testimonial').title('All Testimonials')),

      S.listItem()
        .title('FAQs')
        .icon(HelpCircle)
        .child(S.documentTypeList('faq').title('All FAQs')),

      S.divider(),

      // ── People & Compliance ────────────────────────────────────
      S.listItem()
        .title('Team Members')
        .icon(User)
        .child(S.documentTypeList('teamMember').title('Team Members')),

      S.listItem()
        .title('Careers / Vacancies')
        .icon(Briefcase)
        .child(S.documentTypeList('career').title('All Vacancies')),

      S.listItem()
        .title('Accreditations')
        .icon(BadgeCheck)
        .child(S.documentTypeList('accreditation').title('Accreditations & Certifications')),
    ])
