'use client';

import { useEffect, useRef } from 'react';
import Reveal from './Reveal';
import type { Venture, SectionsContent } from '@/lib/fallback';

export default function Ventures({ ventures, sections }: { ventures: Venture[]; sections: SectionsContent }) {
  const gridRef = useRef<HTMLDivElement>(null);

  // Sur tactile (mobile/tablette), pas de survol : on active le projet au centre
  // de l'écran pendant le défilement (image principale → vidéo/visuel au survol).
  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;
    const touch = window.matchMedia('(hover: none), (pointer: coarse), (max-width: 1024px)');
    if (!touch.matches) return; // sur desktop, on garde le survol natif

    const tiles = Array.from(grid.querySelectorAll<HTMLElement>('.venture'));
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          const tile = e.target as HTMLElement;
          const video = tile.querySelector('video');
          if (e.isIntersecting) {
            tile.classList.add('is-active');
            video?.play().catch(() => {});
          } else {
            tile.classList.remove('is-active');
            video?.pause();
          }
        });
      },
      // « Ligne » au centre vertical de l'écran : un projet devient actif
      // uniquement quand il croise ce centre pendant le scroll.
      { rootMargin: '-45% 0px -45% 0px', threshold: 0 }
    );
    tiles.forEach((t) => obs.observe(t));
    return () => obs.disconnect();
  }, [ventures]);

  return (
    <section className="ventures" id="ventures">
      <div className="ventures__head">
        <Reveal>
          <p className="section-index">{sections.venturesEyebrow}</p>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="section-title">
            {sections.venturesTitle}<br />
            <span>{sections.venturesTitleAccent}</span>
          </h2>
        </Reveal>
      </div>

      <div className="ventures__grid" ref={gridRef}>
        {ventures.map((v, i) => (
          <Reveal key={v._id} tile delay={i * 0.05} as="div" className="venture">
            <div
              className="venture__bg"
              style={
                {
                  ['--accent-img' as string]: v.imageUrl
                    ? `url('${v.imageUrl}')`
                    : v.accent || 'linear-gradient(135deg,#11203f,#1144ff)',
                } as React.CSSProperties
              }
            />

            {(v.hoverVideoUrl || v.hoverImageUrl) && (
              <div className="venture__hover">
                {v.hoverVideoUrl ? (
                  <video className="venture__video" autoPlay muted loop playsInline poster={v.imageUrl}>
                    <source src={v.hoverVideoUrl} type="video/mp4" />
                  </video>
                ) : (
                  <div
                    className="venture__hoverimg"
                    style={{ backgroundImage: `url('${v.hoverImageUrl}')` }}
                  />
                )}
              </div>
            )}

            <div className="venture__inner">
              <span className="venture__arrow" aria-hidden="true">
                <svg width="36" height="20" viewBox="0 0 36 20" fill="none">
                  <path d="M0 10h33M25 2l9 8-9 8" stroke="currentColor" strokeWidth="2" />
                </svg>
              </span>
              <h3 className="venture__title">{v.title}</h3>
            </div>

            <a href={v.url || '#'} className="venture__link" aria-label={v.title} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
