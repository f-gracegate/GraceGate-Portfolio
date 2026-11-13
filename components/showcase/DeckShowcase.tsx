'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from 'motion/react';
import { ArrowDown } from 'lucide-react';

type DeckCard = {
  src: string;
  alt: string;
  /** card size in px at desktop; scaled down on small screens via CSS var */
  w: number;
  h: number;
  /** collage position relative to the stage centre, in px at desktop */
  x: number;
  y: number;
  fit?: 'contain';
};

// Back-to-front order: the last card sits on top of the deck.
const CARDS: DeckCard[] = [
  { src: '/projects/infra-security.png', alt: 'Infrastructure security dashboard', w: 220, h: 170, x: -300, y: -150 },
  { src: '/designs/mtcrestmark-brand-sheet.webp', alt: 'MTCrestmark brand identity', w: 260, h: 150, x: 330, y: -170, fit: 'contain' },
  { src: '/projects/offensive-security.png', alt: 'Offensive security project', w: 230, h: 175, x: -330, y: 140 },
  { src: '/designs/wynprint-media-logo.webp', alt: 'Wynprint Media logo', w: 220, h: 120, x: 310, y: 190, fit: 'contain' },
  { src: '/designs/chez-amis-flyer-menu.webp', alt: 'Chez Amis menu flyer', w: 190, h: 268, x: 200, y: 10 },
  { src: '/projects/web-mobile-apps.png', alt: 'Web and mobile apps project', w: 210, h: 160, x: -175, y: 205 },
  { src: '/designs/gracegate-store-logo.webp', alt: 'GraceGate Store logo', w: 170, h: 170, x: -200, y: -60, fit: 'contain' },
  { src: '/designs/chez-amis-flyer-celebrity.webp', alt: 'Chez Amis campaign flyer', w: 250, h: 354, x: 0, y: -20 },
];

function useDeckScale() {
  const [s, setS] = useState(1);
  useEffect(() => {
    const update = () => {
      const w = window.innerWidth;
      setS(w < 640 ? 0.42 : w < 1024 ? 0.75 : w < 1400 ? 0.92 : 1);
    };
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);
  return s;
}

function Card({
  card,
  i,
  n,
  t,
  zoom,
  s,
}: {
  card: DeckCard;
  i: number;
  n: number;
  t: MotionValue<number>;
  zoom: MotionValue<number>;
  s: number;
}) {
  // Deck pose: cards overlap side by side, turned away from the viewer.
  const deckX = (i - (n - 1) / 2) * 34;
  const deckZ = i * 18;

  const x = useTransform(t, [0, 1], [deckX, card.x]);
  const y = useTransform(t, [0, 1], [i % 2 ? 8 : -8, card.y]);
  const rotateY = useTransform(t, [0, 1], [-38, 0]);
  const rotateZ = useTransform(t, [0, 1], [0, (i % 3) - 1]);
  const z = useTransform(t, [0, 1], [deckZ, i * 4]);
  // During the zoom-through, cards rush outward from the centre.
  const zx = useTransform(zoom, (v) => v * card.x * 1.6);
  const zy = useTransform(zoom, (v) => v * card.y * 1.6);
  const fx = useTransform([x, zx] as MotionValue<number>[], ([a, b]: number[]) => (a + b) * s);
  const fy = useTransform([y, zy] as MotionValue<number>[], ([a, b]: number[]) => (a + b) * s);

  return (
    <motion.div
      className="absolute left-1/2 top-1/2 overflow-hidden rounded-xl shadow-[0_30px_80px_-20px_rgba(0,0,0,0.9)] ring-1 ring-white/10"
      style={{
        width: card.w * s,
        height: card.h * s,
        marginLeft: (-card.w / 2) * s,
        marginTop: (-card.h / 2) * s,
        x: fx,
        y: fy,
        rotateY,
        rotateZ,
        z,
        zIndex: i,
        background: card.fit ? '#fff' : '#111',
      }}
    >
      <Image
        src={card.src}
        alt={card.alt}
        fill
        sizes="300px"
        className={card.fit ? 'object-contain p-3' : 'object-cover object-top'}
      />
    </motion.div>
  );
}

export default function DeckShowcase() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const scale = useDeckScale();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] });
  const p = useSpring(scrollYProgress, { stiffness: 120, damping: 28, mass: 0.4 });

  // Hovering the deck before scrolling gives a little preview of the spread.
  const hover = useMotionValue(0);
  const hoverS = useSpring(hover, { stiffness: 160, damping: 22 });

  const spread = useTransform(p, [0.02, 0.32], [0, 1], { clamp: true });
  const t = useTransform([spread, hoverS] as MotionValue<number>[], ([s, h]: number[]) =>
    reduce ? 1 : Math.min(1, s + h * 0.28 * (1 - s)),
  );
  const zoom = useTransform(p, [0.42, 0.72], [0, 1], { clamp: true });
  const stageScale = useTransform(p, [0.42, 0.72], [1, 2.6]);
  const stageOpacity = useTransform(p, [0.55, 0.72], [1, 0]);
  const stageBlur = useTransform(p, [0.5, 0.72], ['blur(0px)', 'blur(10px)']);

  const textOpacity = useTransform(p, [0.66, 0.82], [0, 1]);
  const textY = useTransform(p, [0.66, 0.85], [60, 0]);
  const ruler = useTransform(p, [0.74, 0.96], [0, 1]);
  const introOpacity = useTransform(p, [0, 0.12], [1, 0]);

  return (
    <section ref={ref} aria-label="Work showcase" className="relative h-[340vh] bg-ink-950">
      <div className="sticky top-0 h-[100svh] overflow-hidden">
        <div aria-hidden className="absolute left-1/2 top-1/2 h-[60vmin] w-[60vmin] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-700/20 blur-[120px]" />

        {/* Intro caption */}
        <motion.p
          style={{ opacity: introOpacity }}
          className="absolute inset-x-0 top-[14%] z-10 text-center font-mono text-[11px] uppercase tracking-[0.35em] text-white/40"
        >
          Scroll to open the gate
        </motion.p>

        {/* 3D stage */}
        <motion.div
          className="absolute inset-0 [perspective:1600px]"
          style={{ scale: stageScale, opacity: stageOpacity, filter: stageBlur }}
          onPointerEnter={(e) => e.pointerType === 'mouse' && hover.set(1)}
          onPointerLeave={() => hover.set(0)}
        >
          <div className="absolute inset-0 [transform-style:preserve-3d]">
            {CARDS.map((c, i) => (
              <Card key={c.src} card={c} i={i} n={CARDS.length} t={t} zoom={zoom} s={scale} />
            ))}
          </div>
        </motion.div>

        {/* Headline revealed after the zoom-through */}
        <motion.div
          style={{ opacity: textOpacity, y: textY }}
          className="pointer-events-none absolute inset-0 z-20 flex flex-col items-center justify-center px-6 text-center"
        >
          <h2 className="max-w-4xl font-display text-4xl font-semibold leading-[1.05] tracking-tight text-white sm:text-6xl lg:text-7xl">
            Security, software <span className="text-shimmer">&amp; design.</span>
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-sm leading-relaxed text-white/55 sm:text-base">
            One studio for the whole lifecycle — testing what you have, building what you need and designing how it
            looks to the world.
          </p>
          <a
            href="#work"
            className="pointer-events-auto mt-8 inline-flex items-center gap-2 rounded-full border border-brand-400/60 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-500/20"
          >
            See the work <ArrowDown size={15} />
          </a>

          {/* Ruler that draws itself in */}
          <div className="relative mt-16 w-[min(900px,88vw)]">
            <motion.div style={{ scaleX: ruler }} className="h-px origin-center bg-white/25" />
            <motion.div style={{ scaleX: ruler }} className="absolute inset-x-0 top-0 flex origin-center justify-between">
              {Array.from({ length: 9 }).map((_, i) => (
                <span key={i} className={`-mt-2 block w-px bg-white/30 ${i % 2 ? 'h-2' : 'h-4'}`} />
              ))}
            </motion.div>
            <motion.span style={{ opacity: ruler }} className="absolute -left-1 -top-[3px] h-[7px] w-[7px] rounded-full bg-brand-400 shadow-[0_0_10px_#a970ff]" />
            <motion.span style={{ opacity: ruler }} className="absolute -right-1 -top-[3px] h-[7px] w-[7px] rounded-full bg-brand-400 shadow-[0_0_10px_#a970ff]" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
