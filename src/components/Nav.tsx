'use client';

import { useEffect, useState } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';

const primaryLinks = [
  { href: '#hero', label: 'Accueil' },
  { href: '#manifeste', label: 'Histoire' },
  { href: '#ventures', label: 'Projets' },
  { href: '#parcours', label: 'Parcours' },
  { href: '#spotlight', label: 'Lingua Afrika' },
  { href: '#news', label: 'Actualités' },
];

const secondaryLinks = [
  { href: '/contact', label: 'Me contacter' },
];

const links = [...primaryLinks, ...secondaryLinks];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState('');
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.3 });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
  }, [open]);

  useEffect(() => {
    const ids = ['hero', ...links.map((l) => l.href.slice(1))];
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: '-45% 0px -45% 0px' }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  return (
    <>
      <motion.div className="scroll-progress" style={{ scaleX, width: '100%' }} />

      <header className={`nav${scrolled ? ' is-scrolled' : ''}${open ? ' is-menu-open' : ''}`}>
        <a href="/" className="nav__brand" aria-label="Darryl Wassi — accueil">
          <span className="nav__name">DARRYL WASSI</span>
        </a>
        <nav className="nav__links">
          <a href="#manifeste">Histoire</a>
          <a href="#ventures">Projets</a>
          <a href="#parcours">Parcours</a>
          <a href="/contact" className="nav__cta">Me contacter</a>
        </nav>
        <button
          className={`nav__burger${open ? ' open' : ''}`}
          aria-label="Menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span /><span /><span />
        </button>
      </header>

      {open && (
        <motion.div
          className="mobile-menu"
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="mobile-menu__group">
            {primaryLinks.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className={active === l.href.slice(1) ? 'is-active' : undefined}
                onClick={() => setOpen(false)}
              >
                {l.label}
              </a>
            ))}
          </div>
          <div className="mobile-menu__group mobile-menu__group--secondary">
            {secondaryLinks.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className={active === l.href.slice(1) ? 'is-active' : undefined}
                onClick={() => setOpen(false)}
              >
                {l.label}
              </a>
            ))}
          </div>
        </motion.div>
      )}
    </>
  );
}
