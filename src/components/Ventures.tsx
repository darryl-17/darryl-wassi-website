import Reveal from './Reveal';
import type { Venture, SectionsContent } from '@/lib/fallback';

export default function Ventures({ ventures, sections }: { ventures: Venture[]; sections: SectionsContent }) {
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

      <div className="ventures__grid">
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
