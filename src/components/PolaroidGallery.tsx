'use client';

import { motion } from 'framer-motion';
import { useMemo, useState } from 'react';
import PolaroidModal, { PolaroidMedia } from './PolaroidModal';

export type Polaroid = {
  id: string;
  caption: string;
  description: string;
  image?: string;
  video?: string;
  gradient?: string;
};

const EASE = [0.16, 1, 0.3, 1] as const;

// Position (en %) de chaque polaroid, dispersée autour du centre (50,50).
function positionFor(i: number, n: number) {
  const ang = (-90 + (360 / n) * i) * (Math.PI / 180);
  // Rayons resserrés pour que les polaroids tiennent sans déborder, même en petit.
  const rx = 35 + (i % 2 ? 3 : -3) + (i % 3 === 0 ? -2 : 0);
  const ry = 32 + (i % 2 ? -3 : 4);
  return { x: 50 + Math.cos(ang) * rx, y: 50 + Math.sin(ang) * ry };
}

// Inclinaison de chaque polaroid — toujours non nulle, alternée.
function rotFor(i: number) {
  const base = 6 + (i % 3) * 3;
  return (i % 2 ? 1 : -1) * base;
}

// Courbe (quadratique) du centre vers un polaroid, avec une flèche latérale.
function wire(p: { x: number; y: number }, i: number) {
  const cx = 50, cy = 50;
  const mx = (cx + p.x) / 2, my = (cy + p.y) / 2;
  const dx = p.x - cx, dy = p.y - cy;
  const len = Math.hypot(dx, dy) || 1;
  const bend = (i % 2 ? 1 : -1) * 10;
  const ctrlx = mx + (-dy / len) * bend;
  const ctrly = my + (dx / len) * bend;
  return `M${cx} ${cy} Q${ctrlx.toFixed(2)} ${ctrly.toFixed(2)} ${p.x.toFixed(2)} ${p.y.toFixed(2)}`;
}

export default function PolaroidGallery({ items }: { items: Polaroid[] }) {
  const [active, setActive] = useState<Polaroid | null>(null);
  const positions = useMemo(() => items.map((_, i) => positionFor(i, items.length)), [items]);

  return (
    <>
      <div className="about-web">
        <svg className="about-web__lines" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
          {positions.map((p, i) => (
            <path key={`w${i}`} id={`aw-wire-${i}`} className="aw-wire" d={wire(p, i)} vectorEffect="non-scaling-stroke" />
          ))}
          {positions.map((p, i) => (
            <circle key={`d${i}`} className="aw-dot" r={1.1}>
              <animateMotion dur={`${2.6 + (i % 3) * 0.5}s`} begin={`${i * 0.35}s`} repeatCount="indefinite">
                <mpath href={`#aw-wire-${i}`} />
              </animateMotion>
            </circle>
          ))}
        </svg>

        <span className="about-web__core">MOI</span>

        {items.map((p, i) => (
          <motion.button
            key={p.id}
            type="button"
            className="polar"
            style={
              {
                ['--x' as string]: `${positions[i].x}%`,
                ['--y' as string]: `${positions[i].y}%`,
                ['--rot' as string]: `${rotFor(i)}deg`,
              } as React.CSSProperties
            }
            onClick={() => setActive(p)}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: '0px 0px -6% 0px' }}
            transition={{ duration: 0.7, ease: EASE, delay: 0.1 + (i % 8) * 0.09 }}
            aria-label={`Agrandir : ${p.caption}`}
          >
            <span className="polar__frame">
              <span className="polar__pic">
                <PolaroidMedia p={p} className="polar__media" />
                <span className="polar__grain" aria-hidden="true" />
              </span>
              <span className="polar__cap">{p.caption}</span>
            </span>
          </motion.button>
        ))}
      </div>

      <PolaroidModal active={active} onClose={() => setActive(null)} />
    </>
  );
}
