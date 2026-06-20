import { defineField, defineType } from 'sanity';

export const newsItem = defineType({
  name: 'newsItem',
  title: 'Actualité / Story',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Titre', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'meta', title: 'Étiquette', type: 'string', description: 'Ex : Distinction · Replit Buildathon' }),
    defineField({ name: 'excerpt', title: 'Extrait', type: 'text', rows: 2 }),
    defineField({ name: 'image', title: 'Image', type: 'image', options: { hotspot: true } }),
    defineField({
      name: 'video',
      title: 'Vidéo (optionnelle)',
      type: 'file',
      options: { accept: 'video/mp4' },
      description: "MP4 léger (< 5 Mo). Si renseignée, elle est lue automatiquement quand la publication est au centre de l'écran. L'image ci-dessus sert d'aperçu.",
    }),
    defineField({ name: 'url', title: 'Lien de redirection', type: 'url', description: 'Où mène le bouton « Lire » (post LinkedIn, Substack, article…).' }),
    defineField({
      name: 'source',
      title: 'Source',
      type: 'string',
      options: { list: ['Studio', 'LinkedIn', 'Substack'], layout: 'radio' },
      initialValue: 'Studio',
    }),
    defineField({ name: 'ctaLabel', title: 'Texte du bouton', type: 'string', options: { list: ['Lire', 'En savoir plus'] }, initialValue: 'Lire' }),
    defineField({ name: 'accent', title: 'Dégradé de repli', type: 'string' }),
    defineField({ name: 'featured', title: 'Mise en avant (grande carte)', type: 'boolean', initialValue: false }),
    defineField({ name: 'order', title: 'Ordre', type: 'number', initialValue: 0 }),
  ],
  orderings: [{ title: 'Ordre', name: 'order', by: [{ field: 'order', direction: 'asc' }] }],
});
