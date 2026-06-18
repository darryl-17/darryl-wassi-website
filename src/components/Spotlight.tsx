import Reveal from './Reveal';
import WordReveal from './WordReveal';
import type { SectionsContent } from '@/lib/fallback';

export default function Spotlight({ sections }: { sections: SectionsContent }) {
  return (
    <section className="spotlight" id="spotlight">
      <div className="spotlight__bg" />
      <div className="spotlight__inner">
        <div className="spotlight__head">
          <Reveal>
            <p className="section-index section-index--light">{sections.spotlightEyebrow}</p>
          </Reveal>
          <Reveal delay={0.05}>
            <div className="spotlight__logo">{sections.spotlightLogo}</div>
          </Reveal>
          <WordReveal
            text={sections.spotlightTagline}
            className="spotlight__tagline"
          />
          <Reveal delay={0.1}>
            <p className="spotlight__copy">{sections.spotlightCopy}</p>
          </Reveal>
          <Reveal delay={0.15}>
            <a href={sections.spotlightUrl} className="btn btn--solid" target="_blank" rel="noopener noreferrer">
              Découvrir {sections.spotlightLogo} <span className="btn__arrow">→</span>
            </a>
          </Reveal>
        </div>

        <div className="spotlight__gallery">
          {[0, 1, 2, 3].map((i) => {
            const img = sections.spotlightImageUrls?.[i];
            return (
              <Reveal
                key={i}
                tile
                as="div"
                className={`spotlight__viz spotlight__viz--${i + 1}${img ? ' has-img' : ''}`}
                delay={i * 0.08}
              >
                <span
                  style={img ? ({ ['--viz-img' as string]: `url('${img}')` } as React.CSSProperties) : undefined}
                />
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
