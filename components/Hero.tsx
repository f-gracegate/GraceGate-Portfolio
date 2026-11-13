'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'motion/react';
import { ArrowDown, ArrowUpRight } from 'lucide-react';
import { HERO_DATA, METRICS_DATA } from '@/lib/data';
import { useContact } from './Providers';
import { EASE } from './ui/motion';

export default function Hero() {
  const { openContact } = useContact();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const yVisual = useTransform(scrollYProgress, [0, 1], [0, -60]);

  return (
    <section id="top" ref={ref} className="relative isolate overflow-hidden pb-20 pt-32 sm:pt-40 lg:min-h-[100svh]">
      {/* One quiet gradient instead of animated blobs */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_80%_60%_at_15%_0%,rgba(116,20,224,0.28),transparent_60%)]"
      />

      <div className="container-x grid items-center gap-14 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
        <div>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE }}
            className="flex items-center gap-2.5 text-sm text-white/60"
          >
            <span className="h-2 w-2 rounded-full bg-emerald-400" />
            Available for new projects
          </motion.p>

          <h1 className="mt-7 font-display text-[2.6rem] font-semibold leading-[1.02] tracking-[-0.035em] text-white sm:text-6xl lg:text-[4.6rem]">
            {['Design it. Build it.', 'Animate it.', 'Secure it.'].map((line, i) => (
              <span key={line} className="block overflow-hidden pb-[0.08em]">
                <motion.span
                  className={`block ${i === 2 ? 'text-brand-400' : ''}`}
                  initial={{ y: '105%' }}
                  animate={{ y: 0 }}
                  transition={{ delay: 0.1 + i * 0.1, duration: 0.9, ease: EASE }}
                >
                  {line}
                </motion.span>
              </span>
            ))}
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45, duration: 0.7, ease: EASE }}
            className="mt-7 max-w-xl text-base leading-relaxed text-white/60 sm:text-lg"
          >
            {HERO_DATA.description}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55, duration: 0.7, ease: EASE }}
            className="mt-10 flex flex-wrap items-center gap-3"
          >
            <button
              onClick={() => openContact()}
              className="group inline-flex items-center gap-2 rounded-full bg-brand-600 px-7 py-4 text-sm font-semibold text-white transition-colors hover:bg-brand-500"
            >
              Start a project
              <ArrowUpRight size={17} className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </button>
            <a
              href="#work"
              className="group inline-flex items-center gap-2 rounded-full border border-white/15 px-7 py-4 text-sm font-semibold text-white/85 transition-colors hover:border-white/30 hover:text-white"
            >
              View my work
              <ArrowDown size={16} className="transition-transform duration-300 group-hover:translate-y-0.5" />
            </a>
          </motion.div>

          <motion.dl
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.8 }}
            className="mt-14 grid max-w-lg grid-cols-3 divide-x divide-white/[0.08] border-y border-white/[0.08]"
          >
            {METRICS_DATA.map((m) => (
              <div key={m.label} className="px-4 py-4 first:pl-0">
                <dt className="font-display text-xl font-semibold text-white sm:text-2xl">{m.value}</dt>
                <dd className="mt-1 text-xs leading-snug text-white/45">{m.label}</dd>
              </div>
            ))}
          </motion.dl>
        </div>

        {/* Real work instead of decoration */}
        <motion.figure
          style={{ y: yVisual }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 1, ease: EASE }}
          className="relative mx-auto w-full max-w-[460px]"
        >
          <div className="overflow-hidden rounded-2xl border border-white/10 shadow-[0_40px_100px_-30px_rgba(0,0,0,0.9)]">
            <Image
              src="/designs/gracegate-technologies-promo-flyer.webp"
              alt="Websites & Motion Graphics promo flyer designed for GraceGate Technologies"
              width={1600}
              height={1600}
              priority
              sizes="(min-width: 1024px) 460px, 90vw"
              className="h-auto w-full"
            />
          </div>
          <figcaption className="mt-4 flex items-center justify-between text-sm text-white/45">
            <span>Promo flyer · GraceGate Technologies</span>
            <a href="#work" className="text-white/70 underline-offset-4 hover:text-white hover:underline">
              See more work
            </a>
          </figcaption>
        </motion.figure>
      </div>
    </section>
  );
}
