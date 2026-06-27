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
    { url: apple, label: 'Apple Podcasts' },
    { url: spotify, label: 'Spotify' },
    { url: youtube, label: 'YouTube' },
  ].filter((l) => l.url);
  if (!links.length) return null;
  return (
    <div className="showrow__links">
      {links.map((l) => (
        <a key={l.label} href={l.url} target="_blank" rel="noopener noreferrer" className="showrow__link">
          {l.label} <span aria-hidden="true">→</span>
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
            <p className="rrylpage__intro">{s.rrylPageIntro}</p>
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
