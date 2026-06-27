import type { Metadata } from 'next';
import SmoothScroll from '@/components/SmoothScroll';
import Reveal from '@/components/Reveal';
import Footer from '@/components/Footer';
import { getSiteContent } from '@/sanity/queries';

export const revalidate = 30;
export const metadata: Metadata = {
  title: 'RRYL Media Service — Darryl Wassi',
  description: 'RRYL Media Service — studio de contenu, médias et production. Découvrez nos émissions.',
};

const PLATFORM_ICONS: Record<string, React.ReactNode> = {
  apple: (
    <>
      <rect width="24" height="24" rx="6" fill="#9933CC" />
      <path
        fill="#fff"
        d="M12 5.4a4.4 4.4 0 0 0-2 8.32c.13.07.2.02.18-.13-.02-.14-.07-.4-.1-.56a.3.3 0 0 0-.08-.16 3.36 3.36 0 1 1 4.2 0 .3.3 0 0 0-.08.16c-.03.16-.08.42-.1.56-.02.15.05.2.18.13A4.4 4.4 0 0 0 12 5.4Zm0 2.05a2.35 2.35 0 0 0-1.32 4.3c.1.07.18.02.18-.1l-.02-.5a.27.27 0 0 0-.1-.2 1.46 1.46 0 1 1 2.56-.96c0 .38-.15.73-.4.96a.27.27 0 0 0-.1.2l-.02.5c0 .12.08.17.18.1A2.35 2.35 0 0 0 12 7.45Zm0 2.2a1.16 1.16 0 0 0-1.16 1.2c0 .43.24.63.4 1.36l.3 1.94c.06.42.18.7.46.7s.4-.28.46-.7l.3-1.94c.16-.73.4-.93.4-1.36A1.16 1.16 0 0 0 12 9.65Zm0 5.06c-1.1 0-2 .6-2 1.46 0 .9.9 1.62 2 1.62s2-.72 2-1.62c0-.86-.9-1.46-2-1.46Z"
      />
    </>
  ),
  spotify: (
    <>
      <circle cx="12" cy="12" r="12" fill="#1DB954" />
      <path
        fill="#000"
        d="M17.4 16.1a.75.75 0 0 1-1.03.25c-2.82-1.72-6.37-2.11-10.56-1.16a.75.75 0 1 1-.33-1.46c4.58-1.04 8.5-.59 11.67 1.34.35.22.46.68.25 1.03Zm1.44-3.2a.94.94 0 0 1-1.29.31c-3.23-1.98-8.15-2.56-11.97-1.4a.94.94 0 1 1-.55-1.8c4.37-1.33 9.79-.69 13.5 1.6.44.27.58.85.31 1.29Zm.12-3.34c-3.87-2.3-10.26-2.51-13.96-1.39a1.12 1.12 0 1 1-.65-2.15c4.25-1.29 11.3-1.04 15.76 1.6a1.12 1.12 0 1 1-1.15 1.94Z"
      />
    </>
  ),
  youtube: (
    <>
      <rect y="4" width="24" height="16" rx="4" fill="#FF0000" />
      <path fill="#fff" d="M10 8.5v7l6-3.5z" />
    </>
  ),
};

function PlayLinks({
  apple,
  spotify,
  youtube,
}: {
  apple?: string;
  spotify?: string;
  youtube?: string;
}) {
  const links = [
    { url: apple, key: 'apple', label: 'Apple Podcasts' },
    { url: spotify, key: 'spotify', label: 'Spotify' },
    { url: youtube, key: 'youtube', label: 'YouTube' },
  ].filter((l) => l.url);
  if (!links.length) return null;
  return (
    <div className="showrow__links">
      {links.map((l) => (
        <a
          key={l.key}
          href={l.url}
          target="_blank"
          rel="noopener noreferrer"
          className="showrow__platform"
          aria-label={l.label}
          title={l.label}
        >
          <svg viewBox="0 0 24 24" aria-hidden="true">
            {PLATFORM_ICONS[l.key]}
          </svg>
        </a>
      ))}
    </div>
  );
}

export default async function RrylPage() {
  const { settings, shows } = await getSiteContent();
  const s = settings.sections;

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

      <main className="rrylpage">
        <section className="rrylpage__hero">
          <Reveal>
            <p className="section-index">{s.rrylEyebrow}</p>
          </Reveal>
          <Reveal delay={0.05}>
            <h1 className="rrylpage__title">{s.rrylLogo}</h1>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="rrylpage__tagline">{s.rrylTagline}</p>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="rrylpage__intro">
              {s.rrylPageIntro.split('\n').filter(Boolean).map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>
          </Reveal>
        </section>

        <section className="rrylpage__shows">
          <Reveal>
            <h2 className="section-title">NOS<br /><span>ÉMISSIONS</span></h2>
          </Reveal>

          <div className="showlist">
            {shows.map((show, i) => (
              <Reveal key={show._id} tile as="article" delay={i * 0.06} className="showrow">
                <div
                  className="showrow__art"
                  style={
                    {
                      ['--g' as string]: show.imageUrl
                        ? `url('${show.imageUrl}')`
                        : show.accent || 'linear-gradient(135deg,#1a1a1a,#3a3a3a)',
                    } as React.CSSProperties
                  }
                />
                <div className="showrow__body">
                  <span className="showrow__meta">
                    {[show.category, show.frequency].filter(Boolean).join(' · ')}
                  </span>
                  <h3 className="showrow__title">{show.title}</h3>
                  {show.description && <p className="showrow__desc">{show.description}</p>}
                  <PlayLinks apple={show.appleUrl} spotify={show.spotifyUrl} youtube={show.youtubeUrl} />
                </div>
              </Reveal>
            ))}
          </div>
        </section>
      </main>

      <Footer settings={settings} />
    </>
  );
}
