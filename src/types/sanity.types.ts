/**
 * Sanity CMS TypeScript types for SQS Security
 * These are generated/maintained types matching the Sanity schema definitions
 */

export interface SanityImage {
  _type: 'image';
  asset: {
    _ref: string;
    _type: 'reference';
  };
  alt?: string;
  hotspot?: {
    x: number;
    y: number;
    height: number;
    width: number;
  };
  crop?: {
    top: number;
    bottom: number;
    left: number;
    right: number;
  };
}

export interface SanitySlug {
  _type: 'slug';
  current: string;
}

export interface SeoFields {
  metaTitle?: string;
  metaDescription?: string;
  ogImage?: SanityImage;
  noIndex?: boolean;
}

export interface SanityService {
  _id: string;
  _type: 'service';
  title: string;
  slug: SanitySlug;
  excerpt: string;
  description: string;
  icon?: string;
  mainImage?: SanityImage;
  features?: string[];
  body?: unknown[]; // Portable Text
  faqs?: SanityFaq[];
  relatedServices?: SanityService[];
  seo?: SeoFields;
  order?: number;
}

export interface SanityServiceArea {
  _id: string;
  _type: 'serviceArea';
  locationName: string;
  slug: SanitySlug;
  region: string;
  localDescription: string;
  servicesOffered?: SanityService[];
  localTestimonials?: SanityTestimonial[];
  faqs?: SanityFaq[];
  seo?: SeoFields;
}

export interface SanityBlogPost {
  _id: string;
  _type: 'blogPost';
  title: string;
  slug: SanitySlug;
  author?: SanityTeamMember;
  featuredImage?: SanityImage;
  publishedAt: string;
  excerpt: string;
  body?: unknown[]; // Portable Text
  categories?: SanityIndustry[];
  readingTime?: number;
  seo?: SeoFields;
}

export interface SanityIndustry {
  _id: string;
  _type: 'industry';
  name: string;
  slug: SanitySlug;
  description: string;
  icon?: string;
  mainImage?: SanityImage;
  body?: unknown[]; // Portable Text
  relatedServices?: SanityService[];
  seo?: SeoFields;
}

export interface SanityTestimonial {
  _id: string;
  _type: 'testimonial';
  clientName: string;
  clientTitle?: string;
  company?: string;
  companyLogo?: SanityImage;
  rating: 1 | 2 | 3 | 4 | 5;
  quote: string;
  service?: SanityService;
  location?: string;
  featured?: boolean;
}

export interface SanityFaq {
  _key: string;
  question: string;
  answer: string;
  category?: string;
}

export interface SanityTeamMember {
  _id: string;
  _type: 'teamMember';
  name: string;
  slug: SanitySlug;
  role: string;
  bio?: string;
  photo?: SanityImage;
  siaLicenseNumber?: string;
  linkedIn?: string;
  featured?: boolean;
}

export interface SanityCareer {
  _id: string;
  _type: 'career';
  title: string;
  slug: SanitySlug;
  department: string;
  location: string;
  type: 'full-time' | 'part-time' | 'contract';
  description?: unknown[]; // Portable Text
  requirements?: string[];
  salary?: string;
  closingDate?: string;
  active: boolean;
}

export interface SanityCaseStudy {
  _id: string;
  _type: 'caseStudy';
  title: string;
  slug: SanitySlug;
  client?: string;
  industry?: SanityIndustry;
  service?: SanityService;
  challenge?: string;
  solution?: unknown[]; // Portable Text
  results?: string[];
  mainImage?: SanityImage;
  featured?: boolean;
  seo?: SeoFields;
}

export interface SanityAccreditation {
  _id: string;
  _type: 'accreditation';
  name: string;
  shortName: string;
  logo?: SanityImage;
  verificationUrl?: string;
  description?: string;
  order?: number;
}

export interface SanityContactInfo {
  _id: string;
  _type: 'contactInfo';
  email: string;
  emergencyEmail?: string;
  phone: string;
  emergencyPhone: string;
  address: {
    line1: string;
    line2?: string;
    city: string;
    county: string;
    postcode: string;
    country: string;
  };
  companyNumber?: string;
  vatNumber?: string;
  googleMapsUrl?: string;
  latitude?: number;
  longitude?: number;
  openingHours?: string;
}

export interface SanitySiteSettings {
  _id: string;
  _type: 'siteSettings';
  siteName: string;
  tagline: string;
  defaultSeoTitle?: string;
  defaultMetaDescription?: string;
  defaultOgImage?: SanityImage;
  logoMain?: SanityImage;
  logoWhite?: SanityImage;
  logoIcon?: SanityImage;
  favicon?: SanityImage;
  ga4MeasurementId?: string;
  socialLinks?: {
    platform: string;
    url: string;
  }[];
}
