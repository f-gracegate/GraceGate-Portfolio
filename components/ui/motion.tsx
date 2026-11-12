'use client';

import { useEffect, useRef, useState } from 'react';
import {
  animate,
  motion,
  useInView,
  useMotionTemplate,
  useMotionValue,
  useSpring,
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
  title,
  highlight,
  description,
  align = 'center',
}: {
  eyebrow: string;
  title: string;
  highlight?: string[];
  description?: string;
  align?: 'center' | 'left';
}) {
  const center = align === 'center';
  return (
    <div className={`flex flex-col gap-5 ${center ? 'items-center text-center' : 'items-start text-left'}`}>
      <Reveal y={12}>
        <span className="eyebrow">
          <span className="h-1.5 w-1.5 rounded-full bg-brand-400 shadow-[0_0_10px_#a970ff]" />
          {eyebrow}
        </span>
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

/** Button/link that is gently pulled toward the cursor. */
export function Magnetic({ children, strength = 0.35, className }: { children: React.ReactNode; strength?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useSpring(0, { stiffness: 200, damping: 15, mass: 0.3 });
  const y = useSpring(0, { stiffness: 200, damping: 15, mass: 0.3 });

  return (
    <motion.div
      ref={ref}
      style={{ x, y }}
      className={`inline-block ${className ?? ''}`}
      onPointerMove={(e) => {
        if (e.pointerType !== 'mouse' || !ref.current) return;
        const r = ref.current.getBoundingClientRect();
        x.set((e.clientX - (r.left + r.width / 2)) * strength);
        y.set((e.clientY - (r.top + r.height / 2)) * strength);
      }}
      onPointerLeave={() => {
        x.set(0);
        y.set(0);
      }}
    >
      {children}
    </motion.div>
  );
}

/** Card with a radial spotlight that follows the cursor and a subtle 3D tilt. */
export function SpotlightCard({
  children,
  className = '',
  tilt = true,
}: {
  children: React.ReactNode;
  className?: string;
  tilt?: boolean;
}) {
  const mx = useMotionValue(-400);
  const my = useMotionValue(-400);
  const rx = useSpring(0, { stiffness: 150, damping: 18 });
  const ry = useSpring(0, { stiffness: 150, damping: 18 });
  const bg = useMotionTemplate`radial-gradient(420px circle at ${mx}px ${my}px, rgba(139,44,245,0.16), transparent 65%)`;
  const border = useMotionTemplate`radial-gradient(260px circle at ${mx}px ${my}px, rgba(201,166,255,0.55), transparent 70%)`;

  return (
    <motion.div
      style={{ rotateX: rx, rotateY: ry, transformPerspective: 1000 }}
      onPointerMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        const px = e.clientX - r.left;
        const py = e.clientY - r.top;
        mx.set(px);
        my.set(py);
        if (tilt && e.pointerType === 'mouse') {
          ry.set(((px / r.width) - 0.5) * 7);
          rx.set(-((py / r.height) - 0.5) * 7);
        }
      }}
      onPointerLeave={() => {
        mx.set(-400);
        my.set(-400);
        rx.set(0);
        ry.set(0);
      }}
      className={`group relative overflow-hidden rounded-3xl border border-white/[0.07] bg-ink-900/70 ${className}`}
    >
      {/* cursor-following border highlight */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-[inherit] p-px opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background: border,
          WebkitMask: 'linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)',
          WebkitMaskComposite: 'xor',
          maskComposite: 'exclude',
        }}
      />
      <motion.div aria-hidden className="pointer-events-none absolute inset-0" style={{ background: bg }} />
      <div className="relative h-full">{children}</div>
    </motion.div>
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
