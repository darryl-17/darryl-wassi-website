'use client';

import { useEffect, useState } from 'react';

/**
 * En-tête des pages internes.
 * `overHero` = la page a un hero image/vidéo : l'en-tête est alors transparent
 * en haut (texte blanc) puis retrouve son fond au scroll, comme la nav d'accueil.
 */
export default function SubNav({ overHero = false }: { overHero?: boolean }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    if (!overHero) return;
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [overHero]);

  const cls = `subnav${overHero ? ' is-hero' : ''}${overHero && scrolled ? ' is-scrolled' : ''}`;

  return (
    <header className={cls}>
      <a href="/" className="subnav__back" aria-label="Retour à l'accueil">
        <span aria-hidden="true">←</span> Accueil
      </a>
      <a href="/" className="subnav__brand">
        <span className="nav__name">DARRYL WASSI</span>
      </a>
    </header>
  );
}
