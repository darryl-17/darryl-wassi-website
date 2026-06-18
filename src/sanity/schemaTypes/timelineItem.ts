import { defineField, defineType } from 'sanity';

export const timelineItem = defineType({
  name: 'timelineItem',
  title: 'Étape du parcours',
  type: 'document',
  fields: [
    defineField({ name: 'year', title: 'Année', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'title', title: 'Titre de l’étape', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'place', title: 'Lieu', type: 'string' }),
    defineField({ name: 'description', title: 'Description', type: 'text', rows: 3 }),
    defineField({ name: 'image', title: 'Photo', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'accent', title: 'Dégradé de repli', type: 'string' }),
    defineField({ name: 'order', title: 'Ordre', type: 'number', initialValue: 0 }),
  ],
  orderings: [{ title: 'Ordre', name: 'order', by: [{ field: 'order', direction: 'asc' }] }],
  preview: { select: { title: 'title', subtitle: 'year' } },
});
