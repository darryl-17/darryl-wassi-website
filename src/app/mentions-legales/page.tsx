import type { Metadata } from 'next';
import SmoothScroll from '@/components/SmoothScroll';
import Footer from '@/components/Footer';
import { getSiteContent } from '@/sanity/queries';

export const revalidate = 30;
export const metadata: Metadata = {
  title: 'Mentions légales — Darryl Wassi',
  description: 'Mentions légales du site de Darryl Wassi.',
};

export default async function MentionsLegalesPage() {
  const { settings } = await getSiteContent();

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

      <main className="legalpage">
        <div className="legalpage__inner">
          <h1 className="legalpage__title">Mentions<br />légales</h1>
          <p className="legalpage__updated">Dernière mise à jour — juin 2026</p>

          <h2>Éditeur du site</h2>
          <p>
            Ce site est édité à titre personnel par <strong>{settings.name}</strong> — {settings.tagline}.
            <br />
            Contact : <a href={`mailto:${settings.email}`}>{settings.email}</a>
            <br />
            {settings.location}
          </p>

          <h2>Directeur de la publication</h2>
          <p>{settings.name}.</p>

          <h2>Hébergement</h2>
          <p>
            Le site est hébergé par <strong>Vercel Inc.</strong>, 340 S Lemon Ave #4133, Walnut, CA 91789,
            États-Unis — <a href="https://vercel.com" target="_blank" rel="noopener noreferrer">vercel.com</a>.
          </p>

          <h2>Propriété intellectuelle</h2>
          <p>
            L'ensemble des contenus présents sur ce site (textes, images, vidéos, logos, éléments graphiques)
            est, sauf mention contraire, la propriété de {settings.name}. Toute reproduction, représentation,
            modification ou diffusion, totale ou partielle, sans autorisation préalable est interdite et
            constituerait une contrefaçon.
          </p>

          <h2>Responsabilité</h2>
          <p>
            Les informations diffusées sur ce site sont fournies à titre indicatif. {settings.name} s'efforce
            d'en assurer l'exactitude mais ne saurait être tenu responsable des erreurs, omissions ou des
            conséquences liées à leur utilisation. Le site peut contenir des liens vers des sites tiers dont
            le contenu n'engage pas la responsabilité de l'éditeur.
          </p>

          <h2>Contact</h2>
          <p>
            Pour toute question relative aux présentes mentions légales, écrivez à{' '}
            <a href={`mailto:${settings.email}`}>{settings.email}</a>.
          </p>
        </div>
      </main>

      <Footer settings={settings} />
    </>
  );
}
