'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { motion, useScroll, useSpring, useTransform } from 'motion/react';
import { SectionHeading } from '../ui/motion';

type Featured = {
  src: string;
  title: string;
  tag: string;
  width: number;
  height: number;
  /** colour of the plane the piece rests on */
  plane: string;
  fit?: 'contain';
};

const FEATURED: Featured[] = [
  { src: '/designs/chez-amis-flyer-celebrity.webp', title: 'Chez Amis — Campaign Flyer', tag: 'Flyer Design', width: 1414, height: 2000, plane: '#1f8f3f' },
  { src: '/designs/mtcrestmark-brand-sheet.webp', title: 'MTCrestmark Brand Identity', tag: 'Brand Identity', width: 1672, height: 692, plane: '#0f5a35', fit: 'contain' },
  { src: '/projects/gracegate-portfolio-site.webp', title: 'GraceGate Portfolio Website', tag: 'Websites & Apps', width: 1440, height: 900, plane: '#7414e0' },
];

function TiltItem({ item, i }: { item: Featured; i: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const p = useSpring(scrollYProgress, { stiffness: 140, damping: 26, mass: 0.3 });

  // Tipped back on entry, flat at centre, tipping forward as it leaves.
  const rotateX = useTransform(p, [0, 0.5, 1], [58, 0, -40]);
  const planeRotate = useTransform(p, [0, 0.5, 1], [62, 6, -30]);
  const y = useTransform(p, [0, 1], [80, -80]);
  const opacity = useTransform(p, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const captionOpacity = useTransform(p, [0.3, 0.45, 0.6, 0.75], [0, 1, 1, 0]);
  const captionX = useTransform(p, [0.3, 0.45, 0.6, 0.75], [i % 2 ? 24 : -24, 0, 0, i % 2 ? -24 : 24]);

  const portrait = item.height > item.width;
  const contain = item.fit === 'contain';

  return (
    <div ref={ref} className="relative flex h-[72vh] min-h-[460px] flex-col items-center justify-center [perspective:1200px]">
      <motion.div style={{ y, opacity }} className="relative [transform-style:preserve-3d]">
        {/* Coloured plane behind the piece */}
        <motion.div
          aria-hidden
          className="absolute left-1/2 top-[58%] h-[46%] w-[130%] -translate-x-1/2 rounded-2xl"
          style={{ rotateX: planeRotate, background: item.plane, transformOrigin: '50% 100%' }}
        />
        <motion.div
          style={{ rotateX, transformOrigin: '50% 100%' }}
          className={`relative overflow-hidden rounded-2xl shadow-[0_40px_80px_-30px_rgba(0,0,0,0.9)] ${contain ? 'bg-white' : 'bg-ink-800'}`}
        >
          <Image
            src={item.src}
            alt={item.title}
            width={item.width}
            height={item.height}
            sizes="(min-width: 768px) 520px, 80vw"
            className={`block h-auto ${portrait ? 'w-[min(300px,62vw)]' : 'w-[min(540px,80vw)]'} ${contain ? 'p-6' : ''}`}
          />
        </motion.div>
      </motion.div>

      <motion.div style={{ opacity: captionOpacity, x: captionX }} className="mt-10 text-center">
        <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-brand-300">{item.tag}</p>
        <p className="mt-2 font-display text-lg font-semibold text-white sm:text-xl">{item.title}</p>
      </motion.div>
    </div>
  );
}

export default function TiltWorkList() {
  return (
    <section aria-label="Featured work" className="relative overflow-hidden pb-12 pt-28 sm:pt-36">
      <div aria-hidden className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      <div className="container-x">
        <SectionHeading
          eyebrow="Featured"
          title="Highlights from recent work."
          highlight={['Highlights']}
          description="Three pieces across design, branding and product — the full portfolio follows below."
        />
      </div>
      <div className="mt-4">
        {FEATURED.map((item, i) => (
          <TiltItem key={item.src} item={item} i={i} />
        ))}
      </div>
    </section>
  );
}
