import type { Metadata } from 'next';
import SmoothScroll from '@/components/SmoothScroll';
import Footer from '@/components/Footer';
import { getSiteContent } from '@/sanity/queries';

export const revalidate = 30;
export const metadata: Metadata = {
  title: 'Me contacter — Darryl Wassi',
  description: 'Contactez Darryl Wassi par WhatsApp, Instagram ou email.',
};

const MESSAGE =
  "Bonjour Darryl, je vous écris depuis votre site web. J'aimerais échanger avec vous à propos de ";

export default async function ContactPage() {
  const { settings } = await getSiteContent();

  const waDigits = (settings.whatsapp || '').replace(/\D/g, '');
  const waLink = waDigits ? `https://wa.me/${waDigits}?text=${encodeURIComponent(MESSAGE)}` : null;

  const mailLink = `mailto:${settings.email}?subject=${encodeURIComponent(
    'Prise de contact — via le site'
  )}&body=${encodeURIComponent(MESSAGE)}`;

  const igRaw = settings.instagram || '';
  const igHandle = igRaw
    .replace(/^@/, '')
    .replace(/^https?:\/\/(www\.)?instagram\.com\//, '')
    .replace(/\/.*$/, '');
  const igLink = igHandle ? `https://instagram.com/${igHandle}` : null;

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

      <main className="contactpage">
        <div className="contactpage__inner">
          <h1 className="contactpage__title">
            ME<br />CONTACTER
          </h1>
          <p className="contactpage__lead">
            Un projet, une idée, une collaboration ? Choisissez votre canal — un message est déjà
            pré-rempli pour vous.
          </p>

          <div className="contactpage__grid">
            <a
              className={`ccard${waLink ? '' : ' ccard--off'}`}
              href={waLink || '#'}
              {...(waLink ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
            >
              <span className="ccard__kind">WhatsApp</span>
              <span className="ccard__title">Discuter en direct</span>
              <span className="ccard__msg">« {MESSAGE.trim()}… »</span>
              <span className="ccard__cta">
                {waLink ? 'Ouvrir WhatsApp' : 'Numéro à configurer'} <span aria-hidden="true">→</span>
              </span>
            </a>

            <a
              className={`ccard${igLink ? '' : ' ccard--off'}`}
              href={igLink || '#'}
              {...(igLink ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
            >
              <span className="ccard__kind">Instagram</span>
              <span className="ccard__title">M&apos;envoyer un DM</span>
              <span className="ccard__msg">À copier : « {MESSAGE.trim()}… »</span>
              <span className="ccard__cta">
                {igLink ? 'Ouvrir Instagram' : 'Compte à configurer'} <span aria-hidden="true">→</span>
              </span>
            </a>

            <a className="ccard" href={mailLink}>
              <span className="ccard__kind">Email</span>
              <span className="ccard__title">Écrire un email</span>
              <span className="ccard__msg">Sujet et message déjà préparés.</span>
              <span className="ccard__cta">
                {settings.email} <span aria-hidden="true">→</span>
              </span>
            </a>
          </div>
        </div>
      </main>

      <Footer settings={settings} />
    </>
  );
}
