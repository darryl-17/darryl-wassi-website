import { defineField, defineType } from 'sanity';

export const venture = defineType({
  name: 'venture',
  title: 'Projet / Venture',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Titre', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'tag', title: 'Catégorie (tag)', type: 'string', description: 'Ex : IA · Plateforme' }),
    defineField({ name: 'description', title: 'Description courte', type: 'string' }),
    defineField({ name: 'image', title: 'Image principale', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'hoverVideo', title: 'Vidéo au survol (optionnel)', type: 'file', options: { accept: 'video/*' }, description: 'S’affiche quand on passe la souris sur la tuile.' }),
    defineField({ name: 'hoverImage', title: 'Image au survol (optionnel)', type: 'image', options: { hotspot: true }, description: 'Utilisée si aucune vidéo de survol.' }),
    defineField({ name: 'url', title: 'Lien', type: 'string', description: 'URL externe ou ancre (#spotlight)' }),
    defineField({ name: 'cta', title: 'Texte du bouton', type: 'string', initialValue: 'Découvrir' }),
    defineField({
      name: 'size',
      title: 'Taille de la tuile',
      type: 'string',
      options: { list: ['normal', 'large', 'wide'], layout: 'radio' },
      initialValue: 'normal',
    }),
    defineField({ name: 'accent', title: 'Dégradé de repli', type: 'string', description: 'Ex : linear-gradient(135deg,#0a1a3f,#1144ff)' }),
    defineField({ name: 'order', title: 'Ordre', type: 'number', initialValue: 0 }),
  ],
  orderings: [{ title: 'Ordre', name: 'order', by: [{ field: 'order', direction: 'asc' }] }],
});
