import { defineType, defineField } from 'sanity'

export const packageItem = defineType({
  name: 'package',
  title: 'Packages',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Package Name',
      type: 'string',
      description: 'e.g., "Level 1", "Level 2"',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'title',
      title: 'Package Title',
      type: 'string',
      description: 'Full description title',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'price',
      title: 'Price',
      type: 'string',
      description: 'e.g., "$299" or "$85-120"',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'period',
      title: 'Price Period',
      type: 'string',
      description: 'e.g., "/month" or "/session"',
    }),
    defineField({
      name: 'commitment',
      title: 'Commitment',
      type: 'string',
      description: 'e.g., "3 month commitment"',
    }),
    defineField({
      name: 'features',
      title: 'Features',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'List of what\'s included',
    }),
    defineField({
      name: 'popular',
      title: 'Most Popular?',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Lower numbers appear first',
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'price',
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



