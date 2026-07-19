'use client';

import { useEffect, useRef } from 'react';
import Reveal from './Reveal';
import type { NewsEntry, SectionsContent } from '@/lib/fallback';

function NewsCard({ n, hidden }: { n: NewsEntry; hidden?: boolean }) {
  return (
    <article className={`news-card${n.featured ? ' news-card--feature' : ''}`} aria-hidden={hidden || undefined}>
      <div
        className="news-card__img"
        style={
          {
            ['--g' as string]: n.imageUrl
              ? `url('${n.imageUrl}')`
              : n.accent || 'linear-gradient(135deg,#11203f,#1144ff)',
          } as React.CSSProperties
        }
      >
        {n.videoUrl && (
          <video className="news-card__video" autoPlay muted loop playsInline preload="metadata" poster={n.imageUrl}>
            <source src={n.videoUrl} />
          </video>
        )}
      </div>
      <div className="news-card__body">
        {n.meta && <span className="news-card__meta">{n.meta}</span>}
        <h3 className="news-card__title">{n.title}</h3>
        {n.excerpt && <p className="news-card__excerpt">{n.excerpt}</p>}
        <a
          href={n.url || '#'}
          className="news-card__link"
          tabIndex={hidden ? -1 : undefined}
          {...(n.url ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
        >
          {n.ctaLabel || 'Lire'} →
        </a>
      </div>
    </article>
  );
}

export default function News({ news, sections }: { news: NewsEntry[]; sections: SectionsContent }) {
  const trackRef = useRef<HTMLDivElement>(null);

  // Les vidéos des cartes tournent en continu dans le marquee (muettes, en boucle).
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    track.querySelectorAll('video').forEach((v) => {
      v.muted = true;
      v.playsInline = true;
      v.play().catch(() => {});
    });
  }, [news]);

  return (
    <section className="news" id="news">
      <div className="news__head">
        <Reveal>
          <p className="section-index">{sections.newsEyebrow}</p>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="section-title">
            {sections.newsTitle}<br />
            <span>{sections.newsTitleAccent}</span>
          </h2>
        </Reveal>
      </div>

      {/* Marquee horizontal infini (façon Newsroom de Freight) — pause au survol */}
      <div className="news__viewport">
        <div className="news__track" ref={trackRef}>
          {[0, 1].map((dup) =>
            news.map((n) => <NewsCard key={`${dup}-${n._id}`} n={n} hidden={dup === 1} />)
          )}
        </div>
      </div>
    </section>
  );
}
