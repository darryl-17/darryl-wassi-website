'use client';

import { useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import Reveal from './Reveal';

// Le globe 3D (three.js) n'est jamais rendu côté serveur ni chargé au démarrage.
const Globe = dynamic(() => import('./Globe'), {
  ssr: false,
  loading: () => <div className="globe__orb" aria-hidden="true" />,
});

export default function GlobeSection() {
  const ref = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  // Montage paresseux : on n'initialise le canvas 3D qu'à l'approche du viewport.
  useEffect(() => {
    const el = ref.current;
    if (!el || mounted) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setMounted(true);
          io.disconnect();
        }
      },
      { rootMargin: '300px 0px' }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [mounted]);

  return (
    <section className="globe" id="globe">
      <div className="globe__grid" aria-hidden="true" />
      <div className="globe__inner">
        <div className="globe__copy">
          <Reveal>
            <p className="section-index section-index--light">Ancrage &amp; portée</p>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="globe__title">
              Un ancrage camerounais,
              <br />
              une vision <span className="globe__title-accent">sans frontières</span>.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="globe__text">
              Depuis Yaoundé, je construis des projets qui rayonnent au-delà des frontières.
              Explorez le globe : faites-le tourner, zoomez, et retrouvez mon point d&apos;ancrage.
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="globe__hint">
              <span className="globe__hint-dot" /> Glissez pour tourner · molette ou pincez pour zoomer
            </p>
          </Reveal>
        </div>

        <div className="globe__stage" ref={ref}>
          {mounted ? <Globe /> : <div className="globe__orb" aria-hidden="true" />}
        </div>
      </div>
    </section>
  );
}
