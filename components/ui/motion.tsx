'use client';

import { useEffect, useRef, useState } from 'react';
import {
  animate,
  motion,
  useInView,
  type HTMLMotionProps,
} from 'motion/react';

export const EASE = [0.22, 1, 0.36, 1] as const;

/** Fades + lifts content in when it scrolls into view. */
export function Reveal({
  children,
  delay = 0,
  y = 28,
  className,
  ...rest
}: { delay?: number; y?: number } & HTMLMotionProps<'div'>) {
  return (
    <motion.div
      initial={{ opacity: 0, y, filter: 'blur(6px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.8, delay, ease: EASE }}
      className={className}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

/** Splits a heading into words that rise in one after another. */
export function WordReveal({
  text,
  className,
  delay = 0,
  highlight = [],
}: {
  text: string;
  className?: string;
  delay?: number;
  highlight?: string[];
}) {
  const words = text.split(' ');
  return (
    <span className={className} aria-label={text}>
      {words.map((w, i) => (
        <span key={i} className="inline-block overflow-hidden pb-[0.12em] align-bottom" aria-hidden>
          <motion.span
            className={`inline-block ${highlight.some((h) => h.replace(/[.,?]/g, '') === w.replace(/[.,?]/g, '')) ? 'text-shimmer' : ''}`}
            initial={{ y: '110%' }}
            whileInView={{ y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: delay + i * 0.06, ease: EASE }}
          >
            {w}
            {i < words.length - 1 ? ' ' : ''}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

/** Section heading block shared by every section. */
export function SectionHeading({
  eyebrow,
  index,
  title,
  highlight,
  description,
  align = 'center',
}: {
  eyebrow: string;
  /** Section number shown before the label, e.g. "03" */
  index?: string;
  title: string;
  highlight?: string[];
  description?: string;
  align?: 'center' | 'left';
}) {
  const center = align === 'center';
  return (
    <div className={`flex flex-col gap-5 ${center ? 'items-center text-center' : 'items-start text-left'}`}>
      <Reveal y={12}>
        <p className="flex items-center gap-3 text-sm text-white/55">
          {index && <span className="font-display font-semibold text-brand-400">{index}</span>}
          <span aria-hidden className="h-px w-8 bg-white/25" />
          <span>{eyebrow}</span>
        </p>
      </Reveal>
      <h2
        className={`font-display text-3xl font-semibold leading-[1.08] tracking-tight text-white sm:text-5xl ${center ? 'max-w-3xl' : 'max-w-2xl'}`}
      >
        <WordReveal text={title} highlight={highlight} />
      </h2>
      {description && (
        <Reveal delay={0.15}>
          <p className={`text-base leading-relaxed text-white/55 sm:text-lg ${center ? 'mx-auto max-w-2xl' : 'max-w-xl'}`}>
            {description}
          </p>
        </Reveal>
      )}
    </div>
  );
}

/** Inline wrapper kept for layout compatibility (the cursor-pull effect was removed). */
export function Magnetic({ children, className }: { children: React.ReactNode; strength?: number; className?: string }) {
  return <div className={`inline-block ${className ?? ''}`}>{children}</div>;
}

/** Plain card with a quiet hover state (no tilt, no cursor spotlight). */
export function SpotlightCard({
  children,
  className = '',
}: {
  children: React.ReactNode;
  className?: string;
  tilt?: boolean;
}) {
  return (
    <div
      className={`group relative overflow-hidden rounded-3xl border border-white/[0.07] bg-ink-900/70 transition-colors duration-300 hover:border-white/15 ${className}`}
    >
      <div className="relative h-full">{children}</div>
    </div>
  );
}

/** Number that counts up the first time it enters the viewport. */
export function Counter({ to, suffix = '', className }: { to: number; suffix?: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });
  const [val, setVal] = useState(0);

  useEffect(() => {
    if (!inView) return;
    // Years shouldn't count from zero — start close to the target.
    const from = to > 1000 ? to - 25 : 0;
    const controls = animate(from, to, {
      duration: 1.8,
      ease: EASE,
      onUpdate: (v) => setVal(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, to]);

  return (
    <span ref={ref} className={className}>
      {val}
      {suffix}
    </span>
  );
}
