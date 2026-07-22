import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import SmoothScroll from '@/components/SmoothScroll';
import Reveal from '@/components/Reveal';
import SubNav from '@/components/SubNav';
import PlatformLinks from '@/components/PlatformLinks';
import Footer from '@/components/Footer';
import { getSiteContent } from '@/sanity/queries';
import { slugify } from '@/lib/slug';
import type { Show } from '@/lib/fallback';

export const revalidate = 30;

export async function generateStaticParams() {
  const { shows } = await getSiteContent();
  return shows.map((s) => ({ slug: slugify(s.title) }));
}

async function findShow(slug: string): Promise<Show | undefined> {
  const { shows } = await getSiteContent();
  return shows.find((s) => slugify(s.title) === slug);
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const show = await findShow(params.slug);
  if (!show) return { title: 'Émission — RRYL Media Service' };
  return {
    title: `${show.title} — RRYL Media Service`,
    description: show.description?.slice(0, 155) || `${show.title}, une émission RRYL Media Service.`,
  };
}

/** Construit l'URL d'un lecteur intégré (Spotify prioritaire, sinon Apple). */
function embedFor(show: Show): { src: string; height: number } | null {
  if (show.spotifyUrl) {
    const m = show.spotifyUrl.match(/show\/([A-Za-z0-9]+)/);
    if (m) return { src: `https://open.spotify.com/embed/show/${m[1]}?utm_source=generator`, height: 520 };
  }
  if (show.appleUrl) {
    const src = show.appleUrl.replace('podcasts.apple.com', 'embed.podcasts.apple.com');
    return { src, height: 450 };
  }
  return null;
}

export default async function ShowPage({ params }: { params: { slug: string } }) {
  const { settings } = await getSiteContent();
  const show = await findShow(params.slug);
  if (!show) notFound();

  const embed = embedFor(show);
  const paragraphs = (show.description || '').split('\n').map((p) => p.trim()).filter(Boolean);

  return (
    <>
      <SmoothScroll />
      <SubNav overHero />

      <main className="showpage">
        <section
          className="showhero"
          style={
            {
              ['--g' as string]: show.imageUrl
                ? `url('${show.imageUrl}')`
                : show.accent || 'linear-gradient(135deg,#0a2a16,#3a3a40)',
            } as React.CSSProperties
          }
        >
          <div className="showhero__overlay" aria-hidden="true" />
          <div className="showhero__content">
            {show.category && <p className="showhero__eyebrow">{show.category}</p>}
            <h1 className="showhero__title">{show.title}</h1>
            {show.frequency && <p className="showhero__freq">{show.frequency}</p>}
          </div>
        </section>

        <section className="showbody">
          <div className="showbody__inner">
            <div className="showbody__intro">
              <Reveal>
                <p className="section-index">À propos de l’émission</p>
              </Reveal>
              {paragraphs.length > 0 && (
                <Reveal delay={0.05}>
                  <div className="showbody__desc">
                    {paragraphs.map((p, i) => (
                      <p key={i}>{p}</p>
                    ))}
                  </div>
                </Reveal>
              )}
              <Reveal delay={0.1}>
                <div className="showbody__links">
                  <span className="showbody__links-label">Écouter sur</span>
                  <PlatformLinks
                    apple={show.appleUrl}
                    spotify={show.spotifyUrl}
                    youtube={show.youtubeUrl}
                    className="showrow__links"
                  />
                </div>
              </Reveal>
            </div>

            {embed && (
              <Reveal delay={0.05}>
                <div className="showbody__player">
                  <h2 className="showbody__player-title">Épisodes — écoutez ici</h2>
                  <iframe
                    className="showbody__iframe"
                    src={embed.src}
                    height={embed.height}
                    width="100%"
                    frameBorder="0"
                    loading="lazy"
                    allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                    allowFullScreen
                    title={`Épisodes de ${show.title}`}
                  />
                </div>
              </Reveal>
            )}
          </div>

          <div className="showbody__back">
            <a href="/rryl" className="btn btn--ghost">
              <span aria-hidden="true">←</span> Toutes les émissions
            </a>
          </div>
        </section>
      </main>

      <Footer settings={settings} />
    </>
  );
}
