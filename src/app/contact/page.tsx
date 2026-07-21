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

// Vrais logos de marque (SVG), rendus en badge type icône d'application.
const WhatsAppIcon = (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.372-.025-.521-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

const InstagramIcon = (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069M12 0C8.741 0 8.332.014 7.052.072 2.695.272.273 2.69.073 7.052.014 8.332 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.332 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.668-.072-4.948-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0m0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324M12 16a4 4 0 110-8 4 4 0 010 8m6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881" />
  </svg>
);

const GmailIcon = (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path fill="#4285F4" d="M1.636 21.818h3.819V12.91L0 8.727v11.455c0 .904.732 1.636 1.636 1.636z" />
    <path fill="#34A853" d="M18.545 21.818h3.819A1.636 1.636 0 0 0 24 20.182V8.727l-5.455 4.182z" />
    <path fill="#FBBC04" d="M18.545 3.818v9.091L24 8.727V4.636c0-2.023-2.31-3.178-3.927-1.964z" />
    <path fill="#EA4335" d="M5.455 12.909V3.818L12 8.727l6.545-4.909v9.091L12 17.818z" />
    <path fill="#C5221F" d="M0 4.636v4.091l5.455 4.182V3.818L3.927 2.672C2.309 1.458 0 2.613 0 4.636z" />
  </svg>
);

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
              className={`ccard ccard--whatsapp${waLink ? '' : ' ccard--off'}`}
              href={waLink || '#'}
              {...(waLink ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
            >
              <span className="ccard__head">
                <span className="ccard__badge">{WhatsAppIcon}</span>
                <span className="ccard__kind">WhatsApp</span>
              </span>
              <span className="ccard__title">Discuter en direct</span>
              <span className="ccard__msg">« {MESSAGE.trim()}… »</span>
              <span className="ccard__cta">
                {waLink ? 'Ouvrir WhatsApp' : 'Numéro à configurer'} <span aria-hidden="true">→</span>
              </span>
            </a>

            <a
              className={`ccard ccard--instagram${igLink ? '' : ' ccard--off'}`}
              href={igLink || '#'}
              {...(igLink ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
            >
              <span className="ccard__head">
                <span className="ccard__badge">{InstagramIcon}</span>
                <span className="ccard__kind">Instagram</span>
              </span>
              <span className="ccard__title">M&apos;envoyer un DM</span>
              <span className="ccard__msg">À copier : « {MESSAGE.trim()}… »</span>
              <span className="ccard__cta">
                {igLink ? 'Ouvrir Instagram' : 'Compte à configurer'} <span aria-hidden="true">→</span>
              </span>
            </a>

            <a className="ccard ccard--email" href={mailLink}>
              <span className="ccard__head">
                <span className="ccard__badge">{GmailIcon}</span>
                <span className="ccard__kind">Email</span>
              </span>
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
