'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { motion, useScroll, useSpring, useTransform } from 'motion/react';
import { WordReveal } from '../ui/motion';

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
  { src: '/designs/chez-amis-flyer-celebrity.webp', title: 'Chez Amis — Campaign Flyer', tag: 'Flyer design', width: 1414, height: 2000, plane: '#1f8f3f' },
  { src: '/projects/offensive-security.png', title: 'Web Application Vulnerability Review', tag: 'Offensive security', width: 1200, height: 896, plane: '#8b2cf5' },
  { src: '/designs/mtcrestmark-brand-sheet.webp', title: 'MTCrestmark Brand Identity', tag: 'Brand identity', width: 1672, height: 692, plane: '#0f5a35', fit: 'contain' },
  { src: '/projects/web-mobile-apps.png', title: 'Secure FinTech Mobile Wallet', tag: 'Web & mobile', width: 1200, height: 896, plane: '#e2541f' },
  { src: '/designs/wynprint-media-logo.webp', title: 'Wynprint Media Logo', tag: 'Logo design', width: 1886, height: 687, plane: '#e5007e', fit: 'contain' },
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
  const captionOpacity = useTransform(p, [0.35, 0.5, 0.65], [0, 1, 0]);
  const captionX = useTransform(p, [0.35, 0.5, 0.65], [i % 2 ? 30 : -30, 0, i % 2 ? -30 : 30]);

  const portrait = item.height > item.width;
  const contain = item.fit === 'contain';

  return (
    <div ref={ref} className="relative flex h-[85vh] items-center justify-center [perspective:1200px]">
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

      <motion.div
        style={{ opacity: captionOpacity, x: captionX }}
        className={`pointer-events-none absolute bottom-[8%] hidden max-w-[220px] md:block ${i % 2 ? 'left-[6%] text-left' : 'right-[6%] text-right'}`}
      >
        <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-brand-300">{item.tag}</p>
        <p className="mt-2 font-display text-xl font-semibold text-white">{item.title}</p>
      </motion.div>
      <p className="absolute bottom-[4%] text-center font-mono text-[11px] uppercase tracking-[0.2em] text-white/45 md:hidden">
        {item.tag} · {item.title}
      </p>
    </div>
  );
}

export default function TiltWorkList() {
  return (
    <section aria-label="Featured work" className="relative overflow-hidden py-24">
      <div className="container-x text-center">
        <h2 className="font-display text-5xl font-semibold tracking-tight text-white sm:text-7xl">
          <WordReveal text="#Featured-Work" highlight={['#Featured-Work']} />
        </h2>
        <p className="mx-auto mt-5 max-w-md text-sm text-white/45">A few pieces I&apos;m proud of — keep scrolling.</p>
      </div>
      <div className="mt-6">
        {FEATURED.map((item, i) => (
          <TiltItem key={item.src} item={item} i={i} />
        ))}
      </div>
    </section>
  );
}
