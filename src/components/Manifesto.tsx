'use client';

import { motion, useScroll, useSpring, useTransform, useVelocity } from 'framer-motion';
import type { SiteSettings } from '@/lib/fallback';
import Reveal from './Reveal';

const BARS = [38, 64, 50, 88, 44, 72, 58, 96, 48, 80, 42, 68, 56, 90, 46, 74, 52, 84];
const EASE = [0.16, 1, 0.3, 1] as const;

export default function Manifesto({ settings }: { settings: SiteSettings }) {
  // Portrait sways horizontally with scroll direction, settling back to 0.
  // Scroll down → comes from the right (+x) ; scroll up → from the left (−x).
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const xInput = useTransform(scrollVelocity, [-1500, 0, 1500], [-55, 0, 55]);
  const x = useSpring(xInput, { stiffness: 150, damping: 22, mass: 0.4 });

  return (
    <section className="about" id="manifeste">
      <div className="about__inner">
        <div className="about__col">
          <Reveal>
            <p className="section-index">{settings.sections.aboutEyebrow}</p>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="about__text">
              {settings.name} ; <span className="hl">développeur</span>,{' '}
              <span className="hl">créateur de contenu</span>,{' '}
              <span className="hl">entrepreneur</span> et{' '}
              <span className="hl">bâtisseur du numérique</span> — je transforme des idées en
              produits réels, depuis le Cameroun, pour l&apos;Afrique et le monde.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <a href="#parcours" className="about__link">
              À propos de moi <span aria-hidden="true">→</span>
            </a>
          </Reveal>
        </div>

        <motion.div
          className="about__media"
          style={{ x }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: false, margin: '0px 0px -8% 0px' }}
          transition={{ duration: 1, ease: EASE }}
        >
          <div
            className="about__photo"
            style={
              {
                ['--g' as string]: settings.heroPosterUrl
                  ? `url('${settings.heroPosterUrl}')`
                  : 'linear-gradient(150deg,#202024,#3a3a40)',
              } as React.CSSProperties
            }
          />
          <motion.div
            className="about__bars"
            aria-hidden="true"
            initial="hidden"
            whileInView="show"
            viewport={{ once: false, amount: 0.5 }}
            variants={{ show: { transition: { staggerChildren: 0.04 } } }}
          >
            {BARS.map((h, i) => (
              <motion.span
                key={i}
                style={{ height: `${h}%` }}
                variants={{ hidden: { opacity: 0, scaleY: 0 }, show: { opacity: 1, scaleY: 1 } }}
                transition={{ duration: 0.5, ease: EASE }}
              />
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
