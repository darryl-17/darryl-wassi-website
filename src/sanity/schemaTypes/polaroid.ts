import { defineField, defineType } from 'sanity';

export const polaroid = defineType({
  name: 'polaroid',
  title: 'Polaroid (page À propos)',
  type: 'document',
  fields: [
    defineField({
      name: 'caption',
      title: 'Légende (sous le polaroid)',
      type: 'string',
      description: 'Texte court affiché sous la photo.',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description complète (au clic)',
      type: 'text',
      rows: 4,
      description: "S'affiche quand on agrandit le polaroid.",
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: { hotspot: true },
      description: "La photo du polaroid. Sert aussi d'aperçu si une vidéo est ajoutée.",
    }),
    defineField({
      name: 'video',
      title: 'Vidéo (optionnelle)',
      type: 'file',
      options: { accept: 'video/mp4' },
      description: 'MP4 léger. Si renseignée, elle est lue en boucle à la place de l’image.',
    }),
    defineField({
      name: 'order',
      title: 'Ordre',
      type: 'number',
      initialValue: 0,
      description: "Détermine la position dans la constellation (du plus petit au plus grand).",
    }),
  ],
  orderings: [{ title: 'Ordre', name: 'order', by: [{ field: 'order', direction: 'asc' }] }],
  preview: {
    select: { title: 'caption', media: 'image' },
  },
});
