'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export type Polaroid = {
  id: string;
  caption: string;
  description: string;
  image?: string;
  video?: string;
  gradient?: string;
};

const EASE = [0.16, 1, 0.3, 1] as const;
// Rotations et petits décalages pour un éparpillement naturel façon photos posées.
const ROT = [-6, 4, -3, 7, -5, 2, -4, 6, -2, 5];

function Media({ p, className }: { p: Polaroid; className: string }) {
  if (p.video) {
    return (
      <video className={className} autoPlay muted loop playsInline preload="metadata" poster={p.image}>
        <source src={p.video} type="video/mp4" />
      </video>
    );
  }
  if (p.image) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img className={className} src={p.image} alt={p.caption} loading="lazy" />;
  }
  return (
    <span
      className={className}
      style={{ background: p.gradient || 'linear-gradient(135deg,#0a2a16,#90ee90)' }}
      aria-hidden="true"
    />
  );
}

export default function PolaroidGallery({ items }: { items: Polaroid[] }) {
  const [active, setActive] = useState<Polaroid | null>(null);

  // Fermeture au clavier + verrouillage du scroll quand un polaroid est ouvert.
  useEffect(() => {
    if (!active) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setActive(null);
    document.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
    };
  }, [active]);

  return (
    <>
      <div className="polar-scatter">
        {items.map((p, i) => (
          <motion.button
            key={p.id}
            type="button"
            className="polar"
            style={{ ['--rot' as string]: `${ROT[i % ROT.length]}deg` }}
            onClick={() => setActive(p)}
            initial={{ opacity: 0, y: 40, rotate: 0 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '0px 0px -6% 0px' }}
            transition={{ duration: 0.7, ease: EASE, delay: (i % 8) * 0.06 }}
            aria-label={`Agrandir : ${p.caption}`}
          >
            <span className="polar__frame">
              <Media p={p} className="polar__media" />
              <span className="polar__cap">{p.caption}</span>
            </span>
          </motion.button>
        ))}
      </div>

      <AnimatePresence>
        {active && (
          <motion.div
            className="polar-modal"
            onClick={() => setActive(null)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              className="polar-modal__card"
              onClick={(e) => e.stopPropagation()}
              initial={{ opacity: 0, scale: 0.85, y: 24 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 12 }}
              transition={{ duration: 0.4, ease: EASE }}
            >
              <button
                type="button"
                className="polar-modal__close"
                onClick={() => setActive(null)}
                aria-label="Fermer"
              >
                ✕
              </button>
              <span className="polar-modal__frame">
                <Media p={active} className="polar-modal__media" />
                <span className="polar-modal__cap">{active.caption}</span>
              </span>
              <p className="polar-modal__desc">{active.description}</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
