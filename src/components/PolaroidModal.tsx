'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useEffect } from 'react';

const EASE = [0.16, 1, 0.3, 1] as const;

/** Contenu affichable dans un cadre polaroïd (image, vidéo ou dégradé de repli). */
export type PolaroidContent = {
  caption: string;
  description?: string;
  image?: string;
  video?: string;
  gradient?: string;
};

/** Média d'un polaroïd : vidéo, image ou dégradé de repli. */
export function PolaroidMedia({ p, className }: { p: PolaroidContent; className: string }) {
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

/** Modale d'agrandissement d'un polaroïd (fermeture par Échap, clic dehors ou bouton). */
export default function PolaroidModal({
  active,
  onClose,
}: {
  active: PolaroidContent | null;
  onClose: () => void;
}) {
  useEffect(() => {
    if (!active) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
    };
  }, [active, onClose]);

  return (
    <AnimatePresence>
      {active && (
        <motion.div
          className="polar-modal"
          onClick={onClose}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <motion.div
            className="polar-modal__card"
            onClick={(e) => e.stopPropagation()}
            initial={{ opacity: 0, scale: 0.85, y: 24, rotate: -2 }}
            animate={{ opacity: 1, scale: 1, y: 0, rotate: -1.5 }}
            exit={{ opacity: 0, scale: 0.9, y: 12 }}
            transition={{ duration: 0.4, ease: EASE }}
          >
            <button type="button" className="polar-modal__close" onClick={onClose} aria-label="Fermer">
              ✕
            </button>
            <span className="polar-modal__frame">
              <span className="polar-modal__pic">
                <PolaroidMedia p={active} className="polar-modal__media" />
                <span className="polar-modal__grain" aria-hidden="true" />
              </span>
              <span className="polar-modal__cap">{active.caption}</span>
            </span>
            {active.description && <p className="polar-modal__desc">{active.description}</p>}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
