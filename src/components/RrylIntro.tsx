import Reveal from './Reveal';
import type { Show, SectionsContent } from '@/lib/fallback';

export default function RrylIntro({ shows, sections }: { shows: Show[]; sections: SectionsContent }) {
  // Quelques visuels en fond (les pochettes des émissions), faiblement visibles.
  const backdrop = shows.slice(0, 6);

  return (
    <section className="rryl" id="rryl">
      <div className="rryl__backdrop" aria-hidden="true">
        {backdrop.map((s, i) => (
          <div
            key={s._id}
            className="rryl__tile"
            style={
              {
                ['--g' as string]: s.imageUrl
                  ? `url('${s.imageUrl}')`
                  : s.accent || 'linear-gradient(135deg,#1a1a1a,#3a3a3a)',
                ['--d' as string]: `${(i % 3) * 0.12}s`,
              } as React.CSSProperties
            }
          />
        ))}
      </div>

      <div className="rryl__inner">
        <Reveal>
          <p className="section-index">{sections.rrylEyebrow}</p>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="rryl__logo">{sections.rrylLogo}</h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="rryl__tagline">{sections.rrylTagline}</p>
        </Reveal>
        <Reveal delay={0.15}>
          <p className="rryl__text">{sections.rrylText}</p>
        </Reveal>
        <Reveal delay={0.2}>
          <a href="/rryl" className="btn btn--solid btn--lg">
            {sections.rrylCtaLabel} <span className="btn__arrow">→</span>
          </a>
        </Reveal>
      </div>
    </section>
  );
}
