import type { Metadata } from 'next';
import SmoothScroll from '@/components/SmoothScroll';
import Footer from '@/components/Footer';
import PolaroidGallery, { type Polaroid } from '@/components/PolaroidGallery';
import { getSiteContent, getPolaroids } from '@/sanity/queries';

export const revalidate = 30;
export const metadata: Metadata = {
  title: 'À propos — Darryl Wassi',
  description: 'Quelques instants, souvenirs et projets — la personne derrière les projets.',
};

export default async function AProposPage() {
  const [{ settings }, studioPolaroids] = await Promise.all([getSiteContent(), getPolaroids()]);

  // Contenu de démonstration — utilisé tant qu'aucun polaroid n'est créé dans le Studio.
  // Chaque polaroid accepte : image (url), video (url .mp4) OU gradient (repli), caption, description.
  const placeholders: Polaroid[] = [
    {
      id: 'p1',
      caption: 'Moi, aujourd’hui',
      description:
        "Développeur dans l'âme, curieux par nature. Chaque projet est une nouvelle occasion d'apprendre, de créer et d'améliorer.",
      image: settings.heroPosterUrl,
      gradient: 'linear-gradient(150deg,#0a2a16,#90ee90)',
    },
    {
      id: 'p2',
      caption: 'Les débuts',
      description:
        'Là où tout a commencé — une idée, un ordinateur, et l’envie de transformer les problèmes en solutions concrètes.',
      gradient: 'linear-gradient(135deg,#0e3a1f,#7ad97a)',
    },
    {
      id: 'p3',
      caption: 'Créer, encore',
      description:
        'Bâtir des outils et des expériences qui rapprochent les idées de la réalité — un projet à la fois.',
      gradient: 'linear-gradient(135deg,#0a2412,#90ee90)',
    },
    {
      id: 'p4',
      caption: 'Le terrain',
      description:
        'Sur le terrain, au contact des vrais besoins. La technologie n’a de valeur que lorsqu’elle résout un vrai problème.',
      gradient: 'linear-gradient(135deg,#12401f,#a8f0a8)',
    },
    {
      id: 'p5',
      caption: 'Les coulisses',
      description:
        'Derrière chaque projet, des heures d’essais, d’erreurs et d’ajustements. Grandir sans jamais cesser de chercher mieux.',
      gradient: 'linear-gradient(135deg,#0a2a16,#68c168)',
    },
    {
      id: 'p6',
      caption: 'La vision',
      description:
        'Une vision simple mais exigeante : rapprocher les idées de la réalité, depuis le Cameroun, pour l’Afrique et le monde.',
      gradient: 'linear-gradient(135deg,#0e3a1f,#90ee90)',
    },
  ];

  // Priorité au contenu du Studio ; sinon, contenu de démonstration.
  const polaroids = studioPolaroids.length ? studioPolaroids : placeholders;

  return (
    <>
      <SmoothScroll />
      <header className="subnav">
        <a href="/" className="subnav__back" aria-label="Retour à l'accueil">
          <span aria-hidden="true">←</span> Accueil
        </a>
        <a href="/" className="subnav__brand">
          <span className="nav__name">DARRYL WASSI</span>
        </a>
      </header>

      <main className="apropos">
        <div className="apropos__head">
          <p className="apropos__lead">
            Chaque histoire a un <span className="hl">début</span>.
          </p>
        </div>

        <PolaroidGallery items={polaroids} />
      </main>

      <Footer settings={settings} />
    </>
  );
}
