import { defineField, defineType } from 'sanity';

export const subscriber = defineType({
  name: 'subscriber',
  title: 'Abonné (newsletter)',
  type: 'document',
  fields: [
    defineField({ name: 'name', title: 'Nom', type: 'string' }),
    defineField({ name: 'email', title: 'Email', type: 'string' }),
    defineField({ name: 'createdAt', title: 'Inscrit le', type: 'datetime' }),
  ],
  orderings: [{ title: 'Plus récent', name: 'recent', by: [{ field: 'createdAt', direction: 'desc' }] }],
  preview: { select: { title: 'email', subtitle: 'name' } },
});
