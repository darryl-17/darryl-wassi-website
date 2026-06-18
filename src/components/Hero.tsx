'use client';

import { AnimatePresence, motion, useScroll, useTransform } from 'framer-motion';
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

  // Two words from the full name; cycle every 3 seconds.
  const parts = settings.name.toUpperCase().split(' ');
  const words = parts.length >= 2 ? parts : [settings.name.toUpperCase(), settings.tagline.toUpperCase()];
  const [index, setIndex] = useState(0);
  // True once the main hero video has its first frame ready → crossfade from placeholder.
  const [videoReady, setVideoReady] = useState(false);

  const placeholderVideo = settings.heroPlaceholderVideoUrl;
  const placeholderImage = settings.heroPlaceholderImageUrl;
  const hasPlaceholder = Boolean(settings.heroVideoUrl && (placeholderVideo || placeholderImage));

  useEffect(() => {
    const id = setInterval(() => setIndex((v) => (v + 1) % words.length), 3000);
    return () => clearInterval(id);
  }, [words.length]);

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

      <motion.div className="hero__content" style={{ opacity: contentOpacity }}>
        <h1 className="hero__title" aria-label={settings.name}>
          <AnimatePresence>
            <motion.span
              key={words[index]}
              className="hero__cycle"
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
