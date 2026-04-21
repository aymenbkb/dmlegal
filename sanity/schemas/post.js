import { defineType, defineField } from 'sanity'

export const postSchema = defineType({
  name: 'post',
  title: 'Blog Post',
  type: 'document',

  // Default ordering: newest first
  orderings: [
    {
      title: 'Publication Date (Newest First)',
      name: 'publishedAtDesc',
      by: [{ field: 'publishedAt', direction: 'desc' }],
    },
  ],

  fields: [
    // ── CORE FIELDS ─────────────────────────────────────────
    defineField({
      name: 'title',
      title: 'Article Title (English)',
      type: 'string',
      description: 'The main headline of the article. Keep it clear and concise.',
      validation: (Rule) => Rule.required().min(5).max(120).error('Title is required (5–120 characters).'),
    }),

    defineField({
      name: 'slug',
      title: 'URL Slug',
      type: 'slug',
      description: 'Auto-generated from the title. Used in the article URL — do not change after publishing.',
      options: {
        source: 'title',
        maxLength: 96,
        slugify: (input) =>
          input
            .toLowerCase()
            .replace(/\s+/g, '-')
            .replace(/[^\w-]/g, '')
            .slice(0, 96),
      },
      validation: (Rule) => Rule.required().error('Slug is required. Click "Generate" next to the field.'),
    }),

    defineField({
      name: 'publishedAt',
      title: 'Publication Date',
      type: 'datetime',
      description: 'When this article was (or will be) published.',
      initialValue: () => new Date().toISOString(),
      options: { dateFormat: 'MMMM D, YYYY', timeFormat: 'HH:mm', calendarTodayLabel: 'Today' },
    }),

    defineField({
      name: 'excerpt',
      title: 'Short Description (Excerpt)',
      type: 'text',
      rows: 3,
      description: 'A 1–2 sentence summary shown on the blog listing page. Max 200 characters.',
      validation: (Rule) => Rule.max(200).warning('Keep the excerpt under 200 characters for best display.'),
    }),

    defineField({
      name: 'mainImage',
      title: 'Cover Image',
      type: 'image',
      description: 'The article\'s hero image. Recommended: 1200×630px, JPG or PNG.',
      options: {
        hotspot: true, // allows editors to set the focal point for cropping
      },
      fields: [
        defineField({
          name: 'alt',
          title: 'Alt Text (for accessibility & SEO)',
          type: 'string',
          description: 'Describe the image for screen readers and search engines.',
        }),
      ],
    }),

    defineField({
      name: 'body',
      title: 'Article Body',
      type: 'array',
      description: 'The full article content. Use the toolbar to format text, add headings, bullet lists, and links.',
      of: [
        {
          type: 'block',
          styles: [
            { title: 'Normal', value: 'normal' },
            { title: 'Heading 2', value: 'h2' },
            { title: 'Heading 3', value: 'h3' },
            { title: 'Heading 4', value: 'h4' },
            { title: 'Quote', value: 'blockquote' },
          ],
          lists: [
            { title: 'Bullet List', value: 'bullet' },
            { title: 'Numbered List', value: 'number' },
          ],
          marks: {
            decorators: [
              { title: 'Bold', value: 'strong' },
              { title: 'Italic', value: 'em' },
              { title: 'Underline', value: 'underline' },
            ],
            annotations: [
              {
                name: 'link',
                type: 'object',
                title: 'External Link',
                fields: [
                  {
                    name: 'href',
                    type: 'url',
                    title: 'URL',
                    validation: (Rule) =>
                      Rule.uri({ scheme: ['http', 'https', 'mailto'] }),
                  },
                  {
                    name: 'blank',
                    type: 'boolean',
                    title: 'Open in new tab?',
                    initialValue: true,
                  },
                ],
              },
            ],
          },
        },
      ],
    }),

    // ── OPTIONAL: CATEGORY ──────────────────────────────────
    defineField({
      name: 'category',
      title: 'Category (Optional)',
      type: 'string',
      description: 'Tag this article with a practice area or topic.',
      options: {
        list: [
          { title: 'Corporate Law', value: 'corporate' },
          { title: 'Immigration', value: 'immigration' },
          { title: 'Real Estate', value: 'real-estate' },
          { title: 'International Trade', value: 'international-trade' },
          { title: 'Dispute Resolution', value: 'dispute-resolution' },
          { title: 'Regulatory & Compliance', value: 'regulatory' },
          { title: 'General', value: 'general' },
        ],
        layout: 'dropdown',
      },
    }),

    // ── OPTIONAL: FRENCH TRANSLATIONS ────────────────────────
    defineField({
      name: 'title_fr',
      title: '🇫🇷 Title (French)',
      type: 'string',
      group: 'translations',
      description: 'French translation of the article title.',
    }),

    defineField({
      name: 'excerpt_fr',
      title: '🇫🇷 Excerpt (French)',
      type: 'text',
      rows: 3,
      group: 'translations',
      description: 'French translation of the short description.',
    }),

    defineField({
      name: 'body_fr',
      title: '🇫🇷 Article Body (French)',
      type: 'array',
      group: 'translations',
      description: 'Full French translation of the article body.',
      of: [{ type: 'block' }],
    }),

    // ── OPTIONAL: ARABIC TRANSLATIONS ────────────────────────
    defineField({
      name: 'title_ar',
      title: '🇦🇪 Title (Arabic)',
      type: 'string',
      group: 'translations',
      description: 'Arabic translation of the article title. Text will display right-to-left.',
    }),

    defineField({
      name: 'excerpt_ar',
      title: '🇦🇪 Excerpt (Arabic)',
      type: 'text',
      rows: 3,
      group: 'translations',
      description: 'Arabic translation of the short description.',
    }),

    defineField({
      name: 'body_ar',
      title: '🇦🇪 Article Body (Arabic)',
      type: 'array',
      group: 'translations',
      description: 'Full Arabic translation of the article body.',
      of: [{ type: 'block' }],
    }),
  ],

  // ── FIELD GROUPS (tab-style UI) ──────────────────────────
  groups: [
    {
      name: 'main',
      title: '📄 Main Content',
      default: true,
    },
    {
      name: 'translations',
      title: '🌐 Translations (FR / AR)',
    },
  ],

  // ── FIELD   GROUP MAPPING ────────────────────────────────
  // (reassign fields to tabs — must list all fields)
  // Sanity v3 groups are declared inline via `group:` on each field above.

  // ── PREVIEW in studio list view ─────────────────────────
  preview: {
    select: {
      title: 'title',
      subtitle: 'publishedAt',
      media: 'mainImage',
      excerpt: 'excerpt',
    },
    prepare({ title, subtitle, media, excerpt }) {
      const date = subtitle
        ? new Date(subtitle).toLocaleDateString('en-GB', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
          })
        : 'No date set'
      return {
        title: title || 'Untitled Post',
        subtitle: `${date}${excerpt ? ' — ' + excerpt.slice(0, 60) + '…' : ''}`,
        media,
      }
    },
  },
})
