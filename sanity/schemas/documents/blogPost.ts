/**
 * Schema: Blog Post
 * News, security guides, and company updates
 */
import { defineField, defineType } from 'sanity'
import { FileText } from 'lucide-react'
import { format } from 'date-fns'

export const blogPost = defineType({
  name: 'blogPost',
  title: 'Blog Posts',
  type: 'document',
  icon: FileText,

  groups: [
    { name: 'content', title: 'Content', default: true },
    { name: 'meta', title: 'Publication Details' },
    { name: 'seo', title: 'SEO' },
  ],

  fields: [
    defineField({
      name: 'title',
      title: 'Post Title',
      type: 'string',
      group: 'content',
      validation: (Rule) =>
        Rule.required()
          .min(10)
          .max(100)
          .error('Title is required (10–100 characters).'),
    }),
    defineField({
      name: 'slug',
      title: 'URL Slug',
      type: 'slug',
      group: 'content',
      options: {
        source: 'title',
        maxLength: 96,
        slugify: (input) =>
          input.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, ''),
      },
      validation: (Rule) => Rule.required().error('A slug is required.'),
    }),
    defineField({
      name: 'excerpt',
      title: 'Excerpt / Summary',
      type: 'text',
      rows: 3,
      group: 'content',
      description: 'A brief summary displayed on the blog listing page (max 220 characters).',
      validation: (Rule) =>
        Rule.required()
          .max(220)
          .error('Excerpt is required and must be under 220 characters.'),
    }),
    defineField({
      name: 'featuredImage',
      title: 'Featured Image',
      type: 'image',
      group: 'content',
      options: { hotspot: true },
      fields: [
        defineField({
          name: 'alt',
          title: 'Alt Text',
          type: 'string',
          validation: (Rule) => Rule.required().error('Alt text required.'),
        }),
      ],
    }),
    defineField({
      name: 'body',
      title: 'Article Content',
      type: 'portableText',
      group: 'content',
    }),

    // ── Publication Meta ──────────────────────────────────────────
    defineField({
      name: 'author',
      title: 'Author',
      type: 'reference',
      to: [{ type: 'teamMember' }],
      group: 'meta',
    }),
    defineField({
      name: 'publishedAt',
      title: 'Publish Date',
      type: 'datetime',
      group: 'meta',
      initialValue: () => new Date().toISOString(),
      validation: (Rule) => Rule.required().error('Publish date is required.'),
    }),
    defineField({
      name: 'categories',
      title: 'Categories',
      type: 'array',
      group: 'meta',
      of: [{ type: 'reference', to: [{ type: 'industry' }] }],
      description: 'Tag this post with relevant industries (e.g. Corporate Security, Retail).',
      validation: (Rule) => Rule.max(4).warning('Limit to 4 categories per post.'),
    }),
    defineField({
      name: 'featured',
      title: 'Featured Post',
      type: 'boolean',
      group: 'meta',
      description: 'Enable to pin this post to the top of the blog listing page.',
      initialValue: false,
    }),

    // ── SEO ──────────────────────────────────────────────────────
    defineField({
      name: 'seo',
      title: 'SEO Settings',
      type: 'seoFields',
      group: 'seo',
    }),
  ],

  preview: {
    select: {
      title: 'title',
      author: 'author.name',
      date: 'publishedAt',
      media: 'featuredImage',
    },
    prepare({ title, author, date, media }) {
      const formattedDate = date
        ? format(new Date(date), 'dd MMM yyyy')
        : 'Unpublished'
      return {
        title,
        subtitle: `By ${author ?? 'Unknown'} · ${formattedDate}`,
        media,
      }
    },
  },

  orderings: [
    {
      title: 'Newest First',
      name: 'publishedAtDesc',
      by: [{ field: 'publishedAt', direction: 'desc' }],
    },
    {
      title: 'Oldest First',
      name: 'publishedAtAsc',
      by: [{ field: 'publishedAt', direction: 'asc' }],
    },
  ],
})
