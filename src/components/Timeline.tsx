'use client';

import { useRef, useState, type ReactNode } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import Reveal from './Reveal';
import PolaroidModal, { PolaroidMedia, type PolaroidContent } from './PolaroidModal';
import type { TimelineEntry, SectionsContent } from '@/lib/fallback';

const EASE = [0.16, 1, 0.3, 1] as const;

/** Inclinaison alternée de chaque polaroïd du parcours. */
function rotFor(i: number) {
  const base = 3 + (i % 3) * 1.5;
  return (i % 2 ? 1 : -1) * base;
}

function Pin() {
  return (
    <svg width="11" height="14" viewBox="0 0 12 14" fill="currentColor" aria-hidden="true">
      <path d="M6 0C2.7 0 0 2.7 0 6c0 4.2 6 8 6 8s6-3.8 6-8c0-3.3-2.7-6-6-6Zm0 8.2A2.2 2.2 0 1 1 6 3.8a2.2 2.2 0 0 1 0 4.4Z" />
    </svg>
  );
}

type Props = {
  items: TimelineEntry[];
  showCta?: boolean;
  heading?: ReactNode;
  sections?: SectionsContent;
};

export default function Timeline({ items, showCta = false, heading, sections }: Props) {
  const trackRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: trackRef, offset: ['start 0.6', 'end 0.7'] });
  const scaleY = useSpring(scrollYProgress, { stiffness: 90, damping: 30, mass: 0.4 });
  // Polaroïd agrandi en modale (même effet que la page « À propos »).
  const [active, setActive] = useState<PolaroidContent | null>(null);

  return (
    <section className="timeline" id="parcours">
      <div className="timeline__head">
        <Reveal>
          <p className="section-index">{sections?.timelineEyebrow ?? "03 — D'où je viens"}</p>
        </Reveal>
        <Reveal delay={0.05}>
          {heading ?? (
            <h2 className="section-title section-title--xl">
              {sections?.timelineTitle ?? 'LE'}<br />{sections?.timelineTitleAccent ?? 'PARCOURS'}
            </h2>
          )}
        </Reveal>
      </div>

      <div className="tl2" ref={trackRef}>
        <div className="tl2__line" />
        <motion.div className="tl2__fill" style={{ scaleY, height: '100%' }} />

        {items.map((item, i) => (
          <motion.div
            key={item._id}
            className={`tl2__item ${i % 2 === 1 ? 'tl2__item--imgright' : 'tl2__item--imgleft'}`}
            initial={{ opacity: 0, y: 44 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: '0px 0px -12% 0px' }}
            transition={{ duration: 0.8, ease: EASE }}
          >
            {/* Côté image (alterné gauche/droite) — polaroïd cliquable */}
            <div className="tl2__media">
              <button
                type="button"
                className="polar polar--flow"
                style={{ ['--rot' as string]: `${rotFor(i)}deg` } as React.CSSProperties}
                onClick={() =>
                  setActive({
                    caption: `${item.year} — ${item.title}`,
                    description: [item.place, item.description].filter(Boolean).join(' · '),
                    image: item.imageUrl,
                    gradient: item.accent,
                  })
                }
                aria-label={`Agrandir : ${item.title}`}
              >
                <span className="polar__frame">
                  <span className="polar__pic">
                    <PolaroidMedia
                      p={{ caption: item.title, image: item.imageUrl, gradient: item.accent }}
                      className="polar__media"
                    />
                    <span className="polar__grain" aria-hidden="true" />
                  </span>
                  <span className="polar__cap">{item.year}</span>
                </span>
              </button>
            </div>

            {/* Côté texte (opposé à l'image) */}
            <div className="tl2__text">
              <h3 className="tl2__title">{item.title}</h3>
              {item.place && (
                <span className="tl2__place">
                  <Pin /> {item.place}
                </span>
              )}
              {item.description && <p className="tl2__desc">{item.description}</p>}
            </div>

            {/* Année au centre, sur la ligne */}
            <span className="tl2__year">{item.year}</span>
          </motion.div>
        ))}
      </div>

      {showCta && (
        <Reveal>
          <div className="tl2__cta">
            <a href="/parcours" className="btn btn--solid btn--lg">
              Voir parcours complet <span className="btn__arrow">→</span>
            </a>
          </div>
        </Reveal>
      )}

      <PolaroidModal active={active} onClose={() => setActive(null)} />
    </section>
  );
}
