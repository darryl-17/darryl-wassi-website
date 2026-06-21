'use client';

import { useRef, type ReactNode } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import Reveal from './Reveal';
import type { TimelineEntry, SectionsContent } from '@/lib/fallback';

const EASE = [0.16, 1, 0.3, 1] as const;

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
            {/* Côté image (alterné gauche/droite) */}
            <div className="tl2__media">
              <div
                className="tl2__photo"
                style={
                  {
                    ['--g' as string]: item.imageUrl
                      ? `url('${item.imageUrl}')`
                      : item.accent || 'linear-gradient(135deg,#11203f,#1144ff)',
                  } as React.CSSProperties
                }
              />
            </div>

            {/* Côté texte (avec image floutée en fond — toujours présente pour une
                structure homogène : image floutée choisie, sinon la photo, sinon le dégradé) */}
            <div className="tl2__text">
              <div
                className="tl2__blur"
                aria-hidden="true"
                style={{
                  backgroundImage: item.blurImageUrl
                    ? `url('${item.blurImageUrl}')`
                    : item.imageUrl
                      ? `url('${item.imageUrl}')`
                      : item.accent || 'linear-gradient(135deg,#11203f,#1144ff)',
                }}
              />
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
    </section>
  );
}
