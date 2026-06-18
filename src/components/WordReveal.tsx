'use client';

import { motion, type Variants } from 'framer-motion';

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.025 } },
};
const word: Variants = {
  hidden: { opacity: 0.14 },
  show: { opacity: 1 },
};

type Props = { text: string; className?: string };

/** Reveals a sentence word-by-word as it enters the viewport. */
export default function WordReveal({ text, className }: Props) {
  const words = text.trim().split(/\s+/);
  return (
    <motion.h2
      className={className}
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: false, amount: 0.4 }}
    >
      {words.map((w, i) => (
        <motion.span
          key={i}
          className="word"
          variants={word}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          {w}
          {i < words.length - 1 ? ' ' : ''}
        </motion.span>
      ))}
    </motion.h2>
  );
}
