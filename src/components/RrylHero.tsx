'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const EASE = [0.16, 1, 0.3, 1] as const;

export default function RrylHero({ logo, imageUrl }: { logo: string; imageUrl?: string }) {
  const words = logo.toUpperCase().split(' ').filter(Boolean);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (words.length < 2) return;
    const id = setInterval(() => setIndex((v) => (v + 1) % words.length), 3000);
    return () => clearInterval(id);
  }, [words.length]);

  return (
    <section className="rhero">
      {imageUrl && (
        <div className="rhero__bg" style={{ backgroundImage: `url('${imageUrl}')` }} aria-hidden="true" />
      )}
      <div className="rhero__overlay" aria-hidden="true" />

      <div className="rhero__content">
        <h1 className="rhero__title" aria-label={logo}>
          <AnimatePresence>
            <motion.span
              key={words[index]}
              className="rhero__cycle"
              aria-hidden="true"
              initial={{ opacity: 0, y: 60, filter: 'blur(10px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: -60, filter: 'blur(10px)' }}
              transition={{ duration: 0.8, ease: EASE }}
            >
              {words[index]}
            </motion.span>
          </AnimatePresence>
        </h1>
      </div>

      <div className="rhero__scroll" aria-hidden="true">
        <span>Scroll</span>
        <svg width="16" height="34" viewBox="0 0 16 34" fill="none">
          <path d="M8 0v30M1 23l7 8 7-8" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      </div>
    </section>
  );
}
