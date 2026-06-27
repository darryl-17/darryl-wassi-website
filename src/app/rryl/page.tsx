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
      <defs>
        <linearGradient id="ap-podcast" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#822CBE" />
          <stop offset="1" stopColor="#D7308A" />
        </linearGradient>
      </defs>
      <rect width="24" height="24" rx="5.4" fill="url(#ap-podcast)" />
      <path
        fill="#fff"
        d="M12 12.6c1.27 0 2.3 1.02 2.3 2.27 0 .55-.2 1.78-.45 2.6-.2.64-.37 1.07-.6 1.34-.27.3-.66.49-1.25.49s-.98-.18-1.25-.49c-.23-.27-.4-.7-.6-1.34-.25-.82-.45-2.05-.45-2.6 0-1.25 1.03-2.27 2.3-2.27Zm0-1.07a1.97 1.97 0 1 1 0-3.93 1.97 1.97 0 0 1 0 3.93Z"
      />
      <path
        fill="#fff"
        d="M12 4.6a6.6 6.6 0 0 0-3.18 12.38c.18.1.36-.07.32-.27l-.13-.62a.4.4 0 0 0-.16-.24A5.27 5.27 0 1 1 15.15 11a5.27 5.27 0 0 1-1.84 4.86.4.4 0 0 0-.16.24l-.13.62c-.04.2.14.37.32.27A6.6 6.6 0 0 0 12 4.6Z"
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
