'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import type { SectionsContent } from '@/lib/fallback';

type Status = 'idle' | 'loading' | 'ok' | 'error';

export default function Newsletter({ sections }: { sections: SectionsContent }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<Status>('idle');

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus('loading');
    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email }),
      });
      const data = await res.json();
      if (data.ok) {
        setStatus('ok');
        setName('');
        setEmail('');
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  }

  return (
    <section className="newsletter newsletter--accent" id="newsletter">
      <motion.div
        className="newsletter__inner"
        initial={{ opacity: 0, y: 36 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, margin: '0px 0px -10% 0px' }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      >
        <h2 className="newsletter__title">{sections.newsletterTitle}</h2>
        <p className="newsletter__lead">{sections.newsletterLead}</p>

        {status === 'ok' ? (
          <p className="newsletter__success">Merci ! Vous êtes bien inscrit·e. 🟢</p>
        ) : (
          <form className="newsletter__form" onSubmit={onSubmit}>
            <input
              className="newsletter__input"
              type="text"
              placeholder="Votre nom"
              value={name}
              onChange={(e) => setName(e.target.value)}
              autoComplete="name"
            />
            <input
              className="newsletter__input"
              type="email"
              placeholder="Votre email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
            />
            <button className="btn btn--lg newsletter__btn" type="submit" disabled={status === 'loading'}>
              {status === 'loading' ? 'Envoi…' : "S'inscrire"} <span className="btn__arrow">→</span>
            </button>
            {status === 'error' && (
              <p className="newsletter__error">Une erreur est survenue. Réessayez.</p>
            )}
          </form>
        )}
      </motion.div>
    </section>
  );
}
