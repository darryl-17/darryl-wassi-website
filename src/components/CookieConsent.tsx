'use client';

import { useEffect, useState } from 'react';
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';

type Consent = 'accepted' | 'refused' | null;
const KEY = 'cookie-consent';

/** Lien « Gérer les cookies » (footer) — rouvre la bannière de consentement. */
export function CookieSettingsLink() {
  return (
    <button
      type="button"
      className="footer__cookies-link"
      onClick={() => window.dispatchEvent(new Event('open-cookie-settings'))}
    >
      Gérer les cookies
    </button>
  );
}

export default function CookieConsent() {
  const [consent, setConsent] = useState<Consent>(null);
  const [open, setOpen] = useState(false);

  // Lire le choix existant au montage (évite tout décalage SSR / hydration).
  useEffect(() => {
    let stored: Consent = null;
    try {
      stored = localStorage.getItem(KEY) as Consent;
    } catch {
      stored = null;
    }
    if (stored === 'accepted' || stored === 'refused') setConsent(stored);
    else setOpen(true);

    // Permet de rouvrir la bannière depuis le lien « Gérer les cookies » du footer.
    const reopen = () => setOpen(true);
    window.addEventListener('open-cookie-settings', reopen);
    return () => window.removeEventListener('open-cookie-settings', reopen);
  }, []);

  const choose = (value: 'accepted' | 'refused') => {
    try {
      localStorage.setItem(KEY, value);
    } catch {
      /* stockage indisponible : on continue quand même */
    }
    setConsent(value);
    setOpen(false);
  };

  return (
    <>
      {/* Mesure d'audience chargée UNIQUEMENT après consentement explicite. */}
      {consent === 'accepted' && (
        <>
          <Analytics />
          <SpeedInsights />
        </>
      )}

      {open && (
        <div className="cookie" role="dialog" aria-live="polite" aria-label="Consentement aux cookies">
          <div className="cookie__inner">
            <p className="cookie__text">
              Ce site utilise des cookies de <strong>mesure d&apos;audience</strong> pour comprendre comment
              il est utilisé et l&apos;améliorer. Aucune donnée n&apos;est vendue. Vous pouvez accepter ou
              refuser — voir notre{' '}
              <a href="/confidentialite">politique de confidentialité</a>.
            </p>
            <div className="cookie__actions">
              <button type="button" className="cookie__btn cookie__btn--refuse" onClick={() => choose('refused')}>
                Refuser
              </button>
              <button type="button" className="cookie__btn cookie__btn--accept" onClick={() => choose('accepted')}>
                Accepter
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
