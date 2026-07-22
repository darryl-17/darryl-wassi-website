import type { Metadata } from 'next';
import SmoothScroll from '@/components/SmoothScroll';
import Reveal from '@/components/Reveal';
import RrylHero from '@/components/RrylHero';
import SubNav from '@/components/SubNav';
import PlatformLinks from '@/components/PlatformLinks';
import Footer from '@/components/Footer';
import { getSiteContent } from '@/sanity/queries';
import { slugify } from '@/lib/slug';

export const revalidate = 30;
export const metadata: Metadata = {
  title: 'RRYL Media Service — Darryl Wassi',
  description: 'RRYL Media Service — studio de contenu, médias et production. Découvrez nos émissions.',
};

export default async function RrylPage() {
  const { settings, shows } = await getSiteContent();
  const s = settings.sections;

  return (
    <>
      <SmoothScroll />
      <SubNav overHero />

      <main className="rrylpage">
        <RrylHero logo={s.rrylLogo} imageUrl={s.rrylHeroImageUrl || undefined} />

        {/* Présentation (structure de l'image 2) */}
        <section className="rpres">
          <div className="rpres__backdrop" aria-hidden="true">
            {shows.slice(0, 6).map((sh) => (
              <div
                key={sh._id}
                className="rpres__tile"
                style={
                  {
                    ['--g' as string]: sh.imageUrl
                      ? `url('${sh.imageUrl}')`
                      : sh.accent || 'linear-gradient(135deg,#1a1a1a,#3a3a3a)',
                  } as React.CSSProperties
                }
              />
            ))}
          </div>
          <div className="rpres__inner">
            <Reveal>
              <h2 className="rpres__title">
                <span className="accent">{s.rrylLogo}</span> {s.rrylPageLead}
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="rpres__body">
                {s.rrylPageIntro.split('\n').filter(Boolean).map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        <section className="rrylpage__shows">
          <Reveal>
            <h2 className="section-title">NOS<br /><span>ÉMISSIONS</span></h2>
          </Reveal>

          <div className="showlist">
            {shows.map((show, i) => {
              const href = `/rryl/${slugify(show.title)}`;
              return (
                <Reveal key={show._id} tile as="article" delay={i * 0.06} className="showrow">
                  <a
                    href={href}
                    className="showrow__art"
                    aria-label={`Ouvrir l'émission ${show.title}`}
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
                    <h3 className="showrow__title">
                      <a href={href}>{show.title}</a>
                    </h3>
                    {show.description && <p className="showrow__desc">{show.description}</p>}
                    <div className="showrow__actions">
                      <a href={href} className="btn btn--solid showrow__cta">
                        Écouter l&apos;émission <span className="btn__arrow">→</span>
                      </a>
                      <PlatformLinks apple={show.appleUrl} spotify={show.spotifyUrl} youtube={show.youtubeUrl} />
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </section>
      </main>

      <Footer settings={settings} />
    </>
  );
}
