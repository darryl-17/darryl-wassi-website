import Reveal from './Reveal';
import type { NewsEntry, SectionsContent } from '@/lib/fallback';

export default function News({ news, sections }: { news: NewsEntry[]; sections: SectionsContent }) {
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

      <div className="news__grid">
        {news.map((n, i) => (
          <Reveal
            key={n._id}
            tile
            as="article"
            delay={i * 0.06}
            className={`news-card${n.featured ? ' news-card--feature' : ''}`}
          >
            <div
              className="news-card__img"
              style={
                {
                  ['--g' as string]: n.imageUrl
                    ? `url('${n.imageUrl}')`
                    : n.accent || 'linear-gradient(135deg,#11203f,#1144ff)',
                } as React.CSSProperties
              }
            />
            <div className="news-card__body">
              {n.meta && <span className="news-card__meta">{n.meta}</span>}
              <h3 className="news-card__title">{n.title}</h3>
              {n.excerpt && <p className="news-card__excerpt">{n.excerpt}</p>}
              <a
                href={n.url || '#'}
                className="news-card__link"
                {...(n.url ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
              >
                {n.ctaLabel || 'Lire'} →
              </a>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
