'use client';

import { motion, type Variants } from 'framer-motion';
import type { ReactNode } from 'react';

const variants: Variants = {
  hidden: { opacity: 0, y: 34 },
  show: { opacity: 1, y: 0 },
};

const tileVariants: Variants = {
  hidden: { opacity: 0, y: 50, scale: 0.985 },
  show: { opacity: 1, y: 0, scale: 1 },
};

type Props = {
  children: ReactNode;
  delay?: number;
  tile?: boolean;
  className?: string;
  as?: 'div' | 'li' | 'span' | 'section' | 'article';
};

/** Scroll-reveal wrapper powered by Framer Motion. */
export default function Reveal({ children, delay = 0, tile = false, className, as = 'div' }: Props) {
  const MotionTag = motion[as] as typeof motion.div;
  return (
    <MotionTag
      className={className}
      variants={tile ? tileVariants : variants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: false, margin: '0px 0px -8% 0px' }}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay }}
    >
      {children}
    </MotionTag>
  );
}
