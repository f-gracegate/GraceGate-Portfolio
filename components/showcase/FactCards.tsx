'use client';

import { useCallback, useEffect, useId, useRef, useState } from 'react';
import Image from 'next/image';
import { animate, motion, useMotionTemplate, useMotionValue, useSpring } from 'motion/react';
import { EASE, SectionHeading } from '../ui/motion';

/* ---------- 1. Dot grid that lights up around the cursor ---------- */

const COLS = 7;
const ROWS = 6;

function DotGridCard() {
  const ref = useRef<HTMLDivElement>(null);
  const [pt, setPt] = useState<{ x: number; y: number } | null>(null);
  const frame = useRef(0);

  const onMove = useCallback((e: React.PointerEvent) => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    const x = e.clientX - r.left;
    const y = e.clientY - r.top;
    cancelAnimationFrame(frame.current);
    frame.current = requestAnimationFrame(() => setPt({ x, y }));
  }, []);

  useEffect(() => () => cancelAnimationFrame(frame.current), []);

  return (
    <div className="flex h-full flex-col rounded-3xl border border-white/[0.07] bg-ink-900 p-7">
      <p className="font-display text-2xl font-semibold leading-snug text-white sm:text-[1.7rem]">
        Security is 20% tools, 80% mindset.
      </p>
      <div
        ref={ref}
        onPointerMove={onMove}
        onPointerLeave={() => setPt(null)}
        className="relative mt-6 grid flex-1 touch-none gap-2 py-2"
        style={{ gridTemplateColumns: `repeat(${COLS}, minmax(0, 1fr))` }}
        aria-hidden
      >
        {Array.from({ length: COLS * ROWS }).map((_, i) => {
          const col = i % COLS;
          const row = Math.floor(i / COLS);
          // Offset every other row for a honeycomb feel
          const offset = row % 2 ? 0.5 : 0;
          let glow = 0;
          if (pt && ref.current) {
            const w = ref.current.clientWidth / COLS;
            const h = ref.current.clientHeight / ROWS;
            const cx = (col + 0.5 + offset) * w;
            const cy = (row + 0.5) * h;
            const d = Math.hypot(cx - pt.x, cy - pt.y);
            glow = Math.max(0, 1 - d / (w * 2.4));
          }
          return (
            <span
              key={i}
              className="aspect-square rounded-full transition-[background-color,transform,box-shadow] duration-300 ease-out"
              style={{
                transform: `translateX(${offset * 100}%) scale(${0.82 + glow * 0.18})`,
                backgroundColor: glow > 0.05 ? `rgba(139, 44, 245, ${0.25 + glow * 0.75})` : 'rgba(255,255,255,0.06)',
                boxShadow: glow > 0.5 ? `0 0 ${glow * 18}px rgba(169,112,255,${glow * 0.7})` : 'none',
              }}
            />
          );
        })}
      </div>
      <p className="mt-6 font-display text-xl font-semibold text-white/90">#Fact</p>
    </div>
  );
}

/* ---------- 2. Image that ripples on hover (SVG displacement) ---------- */

function RippleCard() {
  const id = useId().replace(/:/g, '');
  const mapRef = useRef<SVGFEDisplacementMapElement>(null);
  const turbRef = useRef<SVGFETurbulenceElement>(null);

  const run = (to: number) => {
    animate(mapRef.current?.scale.baseVal ?? 0, to, {
      duration: to ? 0.9 : 0.6,
      ease: EASE,
      onUpdate: (v) => mapRef.current?.setAttribute('scale', String(v)),
    });
  };

  // Gentle drift of the noise, only while hovered
  const raf = useRef(0);
  const drift = (on: boolean) => {
    cancelAnimationFrame(raf.current);
    if (!on) return;
    let t = 0;
    const tick = () => {
      t += 0.02;
      turbRef.current?.setAttribute('baseFrequency', `0.004 ${0.09 + Math.sin(t) * 0.02}`);
      raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);
  };
  useEffect(() => () => cancelAnimationFrame(raf.current), []);

  return (
    <div
      className="group flex h-full flex-col overflow-hidden rounded-3xl border border-white/[0.07] bg-ink-900"
      onPointerEnter={() => {
        run(38);
        drift(true);
      }}
      onPointerLeave={() => {
        run(0);
        drift(false);
      }}
    >
      <svg className="absolute h-0 w-0" aria-hidden>
        <filter id={`ripple-${id}`}>
          <feTurbulence ref={turbRef} type="fractalNoise" baseFrequency="0.004 0.09" numOctaves="1" seed="3" />
          <feDisplacementMap ref={mapRef} in="SourceGraphic" scale="0" xChannelSelector="R" yChannelSelector="G" />
        </filter>
      </svg>
      <div className="relative aspect-[4/3] overflow-hidden">
        <div className="absolute inset-[-4%]" style={{ filter: `url(#ripple-${id})` }}>
          <Image
            src="/projects/defensive-security.png"
            alt="Threat monitoring dashboard"
            fill
            sizes="(min-width: 1024px) 33vw, 100vw"
            className="object-cover transition-transform duration-[1.2s] group-hover:scale-105"
          />
        </div>
        <div className="pointer-events-none absolute inset-0 bg-[repeating-linear-gradient(0deg,rgba(0,0,0,0.18)_0px,rgba(0,0,0,0.18)_1px,transparent_1px,transparent_4px)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      </div>
      <div className="grid flex-1 grid-cols-2 gap-x-4 gap-y-5 p-7">
        <div>
          <p className="font-display text-lg font-semibold text-white">Security</p>
          <p className="mt-1 font-mono text-xs text-white/45">Kali · Burp · Nmap</p>
        </div>
        <div>
          <p className="font-display text-lg font-semibold text-white">Build &amp; design</p>
          <p className="mt-1 font-mono text-xs text-white/45">Next.js · Flutter · Figma</p>
        </div>
        <p className="col-span-2 self-end font-display text-lg font-semibold text-white">
          Location: <span className="font-sans text-sm font-normal text-white/50">Accra, Ghana</span>
        </p>
      </div>
    </div>
  );
}

/* ---------- 3. Frame that follows the cursor and reveals a sharp image ---------- */

function FrameCard() {
  const box = 150;
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 220, damping: 24 });
  const sy = useSpring(y, { stiffness: 220, damping: 24 });
  const clip = useMotionTemplate`inset(${sy}px calc(100% - ${sx}px - ${box}px) calc(100% - ${sy}px - ${box}px) ${sx}px round 14px)`;
  const ref = useRef<HTMLDivElement>(null);

  // Start the frame in the middle of the card
  useEffect(() => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    x.set(r.width / 2 - box / 2);
    y.set(r.height * 0.32 - box / 2);
  }, [x, y]);

  return (
    <div
      ref={ref}
      onPointerMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        x.set(Math.min(Math.max(e.clientX - r.left - box / 2, 8), r.width - box - 8));
        y.set(Math.min(Math.max(e.clientY - r.top - box / 2, 8), r.height - box - 8));
      }}
      className="relative flex h-full min-h-[420px] cursor-crosshair flex-col justify-end overflow-hidden rounded-3xl bg-gradient-to-br from-brand-500 via-brand-700 to-brand-800 p-7"
    >
      {/* Soft background silhouette */}
      <div className="pointer-events-none absolute inset-0 grid place-items-center">
        <Image src="/brand/gracegate-mark.png" alt="" width={728} height={469} className="w-[78%] opacity-30 blur-[8px] brightness-0" />
      </div>
      {/* Sharp version revealed inside the frame */}
      <motion.div className="pointer-events-none absolute inset-0 grid place-items-center bg-white/10" style={{ clipPath: clip }}>
        <Image src="/brand/gracegate-mark.png" alt="" width={728} height={469} className="w-[78%] brightness-0 invert" />
      </motion.div>
      <motion.div
        aria-hidden
        className="pointer-events-none absolute left-0 top-0 rounded-[14px] border border-white/80"
        style={{ x: sx, y: sy, width: box, height: box }}
      >
        <span className="absolute left-1/2 top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white shadow-[0_0_12px_white]" />
      </motion.div>
      <p className="relative font-display text-2xl font-semibold leading-snug text-white sm:text-[1.7rem]">
        What&apos;s a gate without the right key?
      </p>
    </div>
  );
}

/* ---------- Section ---------- */

export default function FactCards() {
  const cards = [DotGridCard, RippleCard, FrameCard];
  return (
    <section aria-label="About GraceGate in three cards" className="relative py-20 sm:py-28">
      <div className="container-x">
        <SectionHeading align="left" eyebrow="Beyond the code" title="How I think about the work." highlight={['think']} />
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {cards.map((C, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 60, filter: 'blur(12px)' }}
              whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 1, delay: i * 0.15, ease: EASE }}
              className="relative"
            >
              <C />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
