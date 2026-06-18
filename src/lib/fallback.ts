// ============================================================
// Contenu de démonstration — utilisé tant que Sanity n'est pas
// connecté, ou comme repli si une section est vide dans le CMS.
// ============================================================

export type Venture = {
  _id: string;
  title: string;
  tag?: string;
  description?: string;
  url?: string;
  cta?: string;
  size?: 'normal' | 'large' | 'wide';
  accent?: string;
  imageUrl?: string;
  hoverImageUrl?: string;
  hoverVideoUrl?: string;
};

export type TimelineEntry = {
  _id: string;
  year: string;
  title: string;
  place?: string;
  description?: string;
  accent?: string;
  imageUrl?: string;
};

export type NewsEntry = {
  _id: string;
  title: string;
  meta?: string;
  excerpt?: string;
  url?: string;
  accent?: string;
  featured?: boolean;
  imageUrl?: string;
  source?: string;
  ctaLabel?: string;
};

export type SectionsContent = {
  aboutEyebrow: string;
  venturesEyebrow: string;
  venturesTitle: string;
  venturesTitleAccent: string;
  timelineEyebrow: string;
  timelineTitle: string;
  timelineTitleAccent: string;
  spotlightEyebrow: string;
  spotlightLogo: string;
  spotlightTagline: string;
  spotlightCopy: string;
  spotlightUrl: string;
  spotlightImageUrls: string[];
  newsEyebrow: string;
  newsTitle: string;
  newsTitleAccent: string;
  newsletterTitle: string;
  newsletterLead: string;
};

export type SiteSettings = {
  name: string;
  tagline: string;
  location: string;
  quote: string;
  manifesto: string;
  email: string;
  heroVideoUrl?: string;
  heroPosterUrl?: string;
  whatsapp?: string;
  instagram?: string;
  substackUrl?: string;
  linkedinUrl?: string;
  socials: { label: string; url: string }[];
  sections: SectionsContent;
};

export type SiteContent = {
  settings: SiteSettings;
  ventures: Venture[];
  timeline: TimelineEntry[];
  news: NewsEntry[];
};

export const fallbackContent: SiteContent = {
  settings: {
    name: 'Darryl Wassi',
    tagline: 'The Digital Builder',
    location: 'Yaoundé · Douala · Cameroun',
    quote: "I don't just imagine things — I build them.",
    manifesto:
      "Darryl Wassi — développeur, créateur de contenu, entrepreneur et bâtisseur du numérique. Je transforme des idées en produits réels, depuis le Cameroun, pour l'Afrique et le monde.",
    email: 'darrylwassi@gmail.com',
    socials: [
      { label: 'LinkedIn', url: '#' },
      { label: 'Instagram', url: '#' },
      { label: 'TikTok', url: '#' },
      { label: 'Snapchat', url: '#' },
      { label: 'Pinterest', url: '#' },
      { label: 'YouTube', url: '#' },
    ],
    sections: {
      aboutEyebrow: '01 — À propos',
      venturesEyebrow: '02 — Ce que je construis',
      venturesTitle: 'VENTURES',
      venturesTitleAccent: '& PRODUITS',
      timelineEyebrow: "03 — D'où je viens",
      timelineTitle: 'LE',
      timelineTitleAccent: 'PARCOURS',
      spotlightEyebrow: '04 — Projet phare',
      spotlightLogo: 'LINGUA AFRIKA',
      spotlightTagline: 'Aucune langue ne devrait disparaître faute de technologie.',
      spotlightCopy:
        "Lingua Afrika construit l'infrastructure de données et les modèles fondamentaux pour apporter l'IA linguistique à 200 millions de locuteurs africains francophones — des voix qu'aucun grand modèle ne comprend aujourd'hui. Plus de 98% des langues africaines sont invisibles pour l'IA ; nous changeons cela, de l'Ewondo au Wolof, du Fulfulde au Lingala. Un moteur de données open-source, des modèles pensés pour le mobile hors ligne, et de vrais produits — dans leurs propres langues.",
      spotlightUrl: 'https://lingua-afrika--darrylwassi.replit.app/',
      spotlightImageUrls: [],
      newsEyebrow: '05 — News & Stories',
      newsTitle: 'ACTUALITÉS',
      newsTitleAccent: '& CONTENUS',
      newsletterTitle: 'RESTONS CONNECTÉS',
      newsletterLead:
        'Remplissez le formulaire ci-dessous pour rester informé·e des dernières actualités, idées et projets de Darryl Wassi.',
    },
  },
  ventures: [
    { _id: 'v1', title: 'Lingua Afrika', tag: 'IA · Plateforme', description: "Traduction par IA des langues d'Afrique centrale.", url: '#spotlight', cta: 'Découvrir', size: 'large', accent: 'linear-gradient(135deg,#0a1a3f,#1144ff)' },
    { _id: 'v2', title: 'RRYL Media Service', tag: 'Média · Studio', description: 'Contenu, branding & production.', url: '#', cta: 'Voir', size: 'normal', accent: 'linear-gradient(135deg,#1a1a1a,#3a3a3a)' },
    { _id: 'v3', title: 'SwiftPOS', tag: 'SaaS · Retail', description: 'Point de vente moderne pour commerces africains.', url: '#', cta: 'Voir', size: 'normal', accent: 'linear-gradient(135deg,#06231d,#0c7a5a)' },
    { _id: 'v4', title: 'FinTrack', tag: 'FinTech', description: 'Gestion financière intelligente & accessible.', url: '#', cta: 'Voir', size: 'normal', accent: 'linear-gradient(135deg,#2a1003,#c2410c)' },
    { _id: 'v5', title: 'EduBridge Africa', tag: 'EdTech', description: 'Connecter les apprenants africains au savoir numérique.', url: '#', cta: 'Voir', size: 'wide', accent: 'linear-gradient(135deg,#1a0a2e,#7c3aed)' },
  ],
  timeline: [
    { _id: 't1', year: '1998', title: 'Les origines', place: 'Cameroun', description: "Naissance d'une curiosité. Très tôt, l'envie de comprendre comment les choses fonctionnent — et de les recréer.", accent: 'linear-gradient(135deg,#11203f,#1144ff)' },
    { _id: 't2', year: '2016', title: 'Premières lignes de code', place: 'Yaoundé', description: "Débuts dans le web et la création numérique. Les nuits passées à apprendre le développement, l'autodidacte qui s'arme.", accent: 'linear-gradient(135deg,#1a1a1a,#444)' },
    { _id: 't3', year: '2019', title: 'Premiers projets', place: 'Yaoundé · Douala', description: "Des sites, des applications, des clients. La preuve qu'une idée peut devenir un produit réel — et qu'on peut en vivre.", accent: 'linear-gradient(135deg,#06231d,#0c7a5a)' },
    { _id: 't4', year: '2021', title: 'RRYL Media Service', place: 'Cameroun', description: "Fondation de mon studio : contenu, branding et production digitale. Une marque qui construit d'autres marques.", accent: 'linear-gradient(135deg,#2a1003,#c2410c)' },
    { _id: 't5', year: '2023', title: 'IT Manager & full-stack', place: 'Douala', description: 'Direction de systèmes et d’équipes techniques. Le développeur devient architecte — du code aux infrastructures.', accent: 'linear-gradient(135deg,#1a0a2e,#7c3aed)' },
    { _id: 't6', year: '2025', title: 'Lingua Afrika', place: 'Afrique centrale', description: "Co-fondation d'une plateforme IA pour traduire et préserver les langues d'Afrique centrale. La technologie au service de l'identité.", accent: 'linear-gradient(135deg,#0a1a3f,#1144ff)' },
  ],
  news: [
    { _id: 'n1', title: 'Top 10% Builder au Replit Buildathon', meta: 'Distinction · Replit Buildathon', excerpt: "Reconnu parmi les meilleurs bâtisseurs d'un hackathon mondial. La preuve qu'on peut construire depuis l'Afrique et viser le sommet.", url: '#', featured: true, accent: 'linear-gradient(135deg,#0a1a3f,#1144ff)' },
    { _id: 'n2', title: 'Lingua Afrika entre en bêta', meta: 'Lancement', excerpt: "Les premières langues d'Afrique centrale rejoignent la plateforme.", url: '#', accent: 'linear-gradient(135deg,#06231d,#0c7a5a)' },
    { _id: 'n3', title: 'RRYL Media franchit un cap', meta: 'Studio', excerpt: "Retour sur une année de marques accompagnées et de contenus livrés.", url: '#', accent: 'linear-gradient(135deg,#2a1003,#c2410c)' },
    { _id: 'n4', title: "Construire pour l'Afrique, vraiment", meta: 'Article', excerpt: 'Mes convictions sur le numérique conçu par et pour le continent.', url: '#', accent: 'linear-gradient(135deg,#1a0a2e,#7c3aed)' },
  ],
};
