'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import type { SiteSettings } from '@/lib/fallback';

const EASE = [0.16, 1, 0.3, 1] as const;

export default function Hero({ settings }: { settings: SiteSettings }) {
  const ref = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const mediaY = useTransform(scrollYProgress, [0, 1], ['0%', '22%']);
  const mediaScale = useTransform(scrollYProgress, [0, 1], [1.05, 1.15]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  // Name split over two lines (Freight-style static title, bottom-left).
  const nameLines = settings.name.split(' ');
  // True once the main hero video has its first frame ready → crossfade from placeholder.
  const [videoReady, setVideoReady] = useState(false);

  const placeholderVideo = settings.heroPlaceholderVideoUrl;
  const placeholderImage = settings.heroPlaceholderImageUrl;
  const hasPlaceholder = Boolean(settings.heroVideoUrl && (placeholderVideo || placeholderImage));

  // Force the hero video to autoplay on every device (React doesn't reliably set
  // the `muted` DOM property, which mobile browsers require to allow autoplay).
  // When the first frame is ready, reveal the video (fade out the placeholder).
  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;
    el.muted = true;
    el.defaultMuted = true;
    const tryPlay = () => el.play().catch(() => {});
    tryPlay();
    const onReady = () => {
      tryPlay();
      setVideoReady(true);
    };
    if (el.readyState >= 2) setVideoReady(true);
    el.addEventListener('loadeddata', onReady);
    el.addEventListener('canplay', onReady);
    el.addEventListener('playing', onReady);
    return () => {
      el.removeEventListener('loadeddata', onReady);
      el.removeEventListener('canplay', onReady);
      el.removeEventListener('playing', onReady);
    };
  }, [settings.heroVideoUrl]);

  return (
    <section className="hero" id="hero" ref={ref}>
      <motion.div className="hero__media" style={{ y: mediaY, scale: mediaScale }}>
        {settings.heroVideoUrl ? (
          <video
            ref={videoRef}
            className="hero__video"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            {...({ 'webkit-playsinline': 'true' } as any)}
          >
            <source src={settings.heroVideoUrl} type="video/mp4" />
          </video>
        ) : null}

        {hasPlaceholder && (
          <div className={`hero__placeholder${videoReady ? ' is-hidden' : ''}`} aria-hidden="true">
            {placeholderVideo ? (
              <video autoPlay muted loop playsInline preload="auto">
                <source src={placeholderVideo} type="video/mp4" />
              </video>
            ) : (
              <div className="hero__placeholder-img" style={{ backgroundImage: `url('${placeholderImage}')` }} />
            )}
          </div>
        )}

        <div className="hero__grid-overlay" />
        <div className="hero__vignette" />
      </motion.div>

      <motion.div className="hero__content hero__content--freight" style={{ opacity: contentOpacity }}>
        <motion.div
          className="hero__crumb"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.8, ease: EASE }}
        >
          <span className="hero__crumb-label">＋ Accueil</span>
          <span className="hero__hairline" aria-hidden="true" />
        </motion.div>

        <div className="hero__row">
          <h1 className="hero__name" aria-label={settings.name}>
            {nameLines.map((line, i) => (
              <span className="hero__line" key={line + i}>
                <motion.span
                  style={{ display: 'block' }}
                  initial={{ y: '110%' }}
                  animate={{ y: 0 }}
                  transition={{ duration: 1.1, ease: EASE, delay: 0.15 + i * 0.1 }}
                >
                  {line}
                  {i === 0 && nameLines.length > 1 ? ',' : ''}
                </motion.span>
              </span>
            ))}
          </h1>

          <motion.div
            className="hero__aside"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 1, ease: EASE }}
          >
            <p>
              <span className="hero__aside-glyph" aria-hidden="true">↳</span>
              {settings.quote}
            </p>
            <a href="/contact" className="btn btn--solid">
              Me contacter <span className="btn__arrow">→</span>
            </a>
          </motion.div>
        </div>
      </motion.div>

      <a href="#manifeste" className="hero__scroll" aria-label="Défiler vers le bas">
        <span>Scroll</span>
        <svg className="hero__scroll-arrow" width="16" height="34" viewBox="0 0 16 34" fill="none" aria-hidden="true">
          <path d="M8 0v30M1 23l7 8 7-8" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      </a>
    </section>
  );
}
