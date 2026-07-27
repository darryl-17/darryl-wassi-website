'use client';

import { type ReactNode } from 'react';
import Reveal from './Reveal';
import PolaroidGallery, { type Polaroid } from './PolaroidGallery';
import type { TimelineEntry, SectionsContent } from '@/lib/fallback';

type Props = {
  items: TimelineEntry[];
  showCta?: boolean;
  heading?: ReactNode;
  sections?: SectionsContent;
  /** Nom affiché dans le noyau central d'où partent toutes les liaisons. */
  name?: string;
};

export default function Timeline({ items, showCta = false, heading, sections, name }: Props) {
  // Chaque étape devient un polaroïd de la toile (même effet que la page « À propos »).
  const polaroids: Polaroid[] = items.map((item) => ({
    id: item._id,
    caption: [item.year, item.title].filter(Boolean).join(' — '),
    description: [item.place, item.description].filter(Boolean).join(' · '),
    image: item.imageUrl,
    gradient: item.accent,
  }));

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

      <PolaroidGallery items={polaroids} core={name || 'MOI'} />

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
