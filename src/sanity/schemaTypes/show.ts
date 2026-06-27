import { defineField, defineType } from 'sanity';

export const show = defineType({
  name: 'show',
  title: 'Émission (RRYL Media)',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Titre de l’émission', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'category', title: 'Catégorie', type: 'string', description: 'Ex : Histoire, Entrepreneuriat, Livres' }),
    defineField({ name: 'frequency', title: 'Fréquence', type: 'string', description: 'Ex : Deux fois par mois' }),
    defineField({ name: 'description', title: 'Description', type: 'text', rows: 3 }),
    defineField({ name: 'image', title: 'Pochette / visuel', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'accent', title: 'Dégradé de repli', type: 'string' }),
    defineField({ name: 'appleUrl', title: 'Lien Apple Podcasts', type: 'url' }),
    defineField({ name: 'spotifyUrl', title: 'Lien Spotify', type: 'url' }),
    defineField({ name: 'youtubeUrl', title: 'Lien YouTube', type: 'url' }),
    defineField({ name: 'order', title: 'Ordre', type: 'number', initialValue: 0 }),
  ],
  orderings: [{ title: 'Ordre', name: 'order', by: [{ field: 'order', direction: 'asc' }] }],
  preview: { select: { title: 'title', subtitle: 'category' } },
});
