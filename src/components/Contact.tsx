'use client';

import { motion } from 'framer-motion';
import Reveal from './Reveal';

const lines = ['UNE IDÉE.', 'UN PRODUIT.', 'BÂTISSONS.'];

export default function Contact({ email }: { email: string }) {
  return (
    <section className="contact" id="contact">
      <div className="contact__inner">
        <Reveal>
          <p className="section-index">07 — On construit ensemble ?</p>
        </Reveal>
        <h2 className="contact__title">
          {lines.map((line, i) => (
            <span className="hero__line" key={line}>
              <motion.span
                style={{ display: 'block' }}
                className={i === 2 ? 'accent' : undefined}
                initial={{ y: '110%' }}
                whileInView={{ y: 0 }}
                viewport={{ once: false }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: i * 0.08 }}
              >
                {line}
              </motion.span>
            </span>
          ))}
        </h2>
        <Reveal delay={0.2}>
          <a href={`mailto:${email}`} className="btn btn--solid btn--lg">
            {email} <span className="btn__arrow">→</span>
          </a>
        </Reveal>
      </div>
    </section>
  );
}
