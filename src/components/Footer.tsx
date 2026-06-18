import type { SiteSettings } from '@/lib/fallback';

const SOCIAL_ICONS: Record<string, React.ReactNode> = {
  linkedin: (
    <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3 9h4v12H3zM9 9h3.8v1.7h.05c.53-1 1.83-2.05 3.77-2.05 4.03 0 4.78 2.65 4.78 6.1V21h-4v-5.5c0-1.3-.02-3-1.83-3-1.83 0-2.11 1.43-2.11 2.9V21H9z" />
  ),
  x: (
    <path d="M18.9 2.5h3.3l-7.2 8.2L23.5 21.5h-6.6l-5.2-6.8-5.9 6.8H2.5l7.7-8.8L1.9 2.5h6.8l4.7 6.2zm-1.2 17h1.8L7.1 4.4H5.2z" />
  ),
  substack: (
    <path d="M3.5 3.5h17v2.6h-17zm0 4.8h17V21l-8.5-4.8L3.5 21zm0 4.8h17v2.6h-17z" />
  ),
  instagram: (
    <path d="M12 2.2c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.41a3.7 3.7 0 0 1-1.38-.9 3.7 3.7 0 0 1-.9-1.38c-.16-.42-.36-1.06-.41-2.23C2.21 15.58 2.2 15.2 2.2 12s.01-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.23-.41C8.42 2.21 8.8 2.2 12 2.2zm0 1.8c-3.15 0-3.5.01-4.74.07-1.14.05-1.76.24-2.17.4-.55.21-.94.47-1.35.88-.41.41-.67.8-.88 1.35-.16.41-.35 1.03-.4 2.17C2.21 10.1 2.2 10.45 2.2 12s.01 1.9.07 3.14c.05 1.14.24 1.76.4 2.17.21.55.47.94.88 1.35.41.41.8.67 1.35.88.41.16 1.03.35 2.17.4 1.24.06 1.59.07 4.74.07s3.5-.01 4.74-.07c1.14-.05 1.76-.24 2.17-.4.55-.21.94-.47 1.35-.88.41-.41.67-.8.88-1.35.16-.41.35-1.03.4-2.17.06-1.24.07-1.59.07-3.14s-.01-1.9-.07-3.14c-.05-1.14-.24-1.76-.4-2.17a3.6 3.6 0 0 0-.88-1.35 3.6 3.6 0 0 0-1.35-.88c-.41-.16-1.03-.35-2.17-.4C15.5 4.01 15.15 4 12 4zm0 3.06A4.94 4.94 0 1 1 12 16.94 4.94 4.94 0 0 1 12 7.06zm0 1.8a3.14 3.14 0 1 0 0 6.28 3.14 3.14 0 0 0 0-6.28zm5.14-.95a1.15 1.15 0 1 1 0 2.3 1.15 1.15 0 0 1 0-2.3z" />
  ),
  youtube: (
    <path d="M23 12s0-3.2-.4-4.7c-.23-.83-.9-1.5-1.74-1.72C19.3 5.2 12 5.2 12 5.2s-7.3 0-8.86.38c-.83.22-1.5.89-1.73 1.72C1 8.8 1 12 1 12s0 3.2.4 4.7c.23.83.9 1.5 1.73 1.72C4.7 18.8 12 18.8 12 18.8s7.3 0 8.86-.38a2.45 2.45 0 0 0 1.74-1.72C23 15.2 23 12 23 12zM9.8 15V9l5.2 3z" />
  ),
};

export default function Footer({ settings }: { settings: SiteSettings }) {
  return (
    <footer className="footer">
      <div className="footer__top">
        <a className="footer__brand" href="/" aria-label="Retour à l'accueil">
          <span className="footer__name">{settings.name.toUpperCase()}</span>
          <span className="footer__tag">{settings.tagline}</span>
        </a>
        <nav className="footer__socials" aria-label="Réseaux sociaux">
          {settings.socials.map((s) => {
            const icon = SOCIAL_ICONS[s.label.toLowerCase().replace(/[^a-z]/g, '')];
            return (
              <a key={s.label} href={s.url} target="_blank" rel="noopener noreferrer" aria-label={s.label} title={s.label}>
                {icon ? (
                  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    {icon}
                  </svg>
                ) : (
                  s.label
                )}
              </a>
            );
          })}
        </nav>
      </div>
      <div className="footer__bottom">
        <span>© {settings.name} 2026</span>
        <nav className="footer__legal" aria-label="Liens légaux">
          <a href="/mentions-legales">Mentions légales</a>
          <a href="/confidentialite">Confidentialité</a>
        </nav>
      </div>
    </footer>
  );
}
