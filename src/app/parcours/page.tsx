import type { Metadata } from 'next';
import SmoothScroll from '@/components/SmoothScroll';
import Timeline from '@/components/Timeline';
import Footer from '@/components/Footer';
import { getSiteContent } from '@/sanity/queries';

export const revalidate = 30;

export const metadata: Metadata = {
  title: 'Le parcours — Darryl Wassi',
  description: "Le parcours complet de Darryl Wassi, année par année.",
};

export default async function ParcoursPage() {
  const { settings, timeline } = await getSiteContent();

  return (
    <>
      <SmoothScroll />
      <header className="subnav">
        <a href="/" className="subnav__back" aria-label="Retour à l'accueil">
          <span aria-hidden="true">←</span> Accueil
        </a>
        <a href="/" className="subnav__brand">          <span className="nav__name">DARRYL WASSI</span>
        </a>
      </header>

      <main>
        <Timeline
          items={timeline}
          heading={
            <h2 className="section-title section-title--xl">
              LE PARCOURS<br />
              <span>COMPLET</span>
            </h2>
          }
        />
      </main>

      <Footer settings={settings} />
    </>
  );
}
