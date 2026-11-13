'use client';

import { useRef } from 'react';
import { motion, useScroll, useSpring } from 'motion/react';
import { PROCESS_STEPS } from '@/lib/data';
import { EASE, SectionHeading } from './ui/motion';

export default function Process() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 75%', 'end 60%'] });
  const scaleY = useSpring(scrollYProgress, { stiffness: 90, damping: 25 });

  return (
    <section id="process" className="relative scroll-mt-24 py-28 sm:py-36">
      <div className="container-x grid gap-16 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="lg:sticky lg:top-32 lg:self-start">
          <SectionHeading
            align="left"
            index="08" eyebrow="How I work"
            title="How a project runs."
            highlight={['runs.']}
            description="The same four steps for every project, so you always know where things stand."
          />
        </div>

        <div ref={ref} className="relative pl-10 sm:pl-14">
          <div aria-hidden className="absolute bottom-2 left-[11px] top-2 w-px bg-white/[0.08] sm:left-[15px]" />
          <motion.div
            aria-hidden
            style={{ scaleY }}
            className="absolute bottom-2 left-[11px] top-2 w-px origin-top bg-gradient-to-b from-brand-300 via-brand-500 to-brand-700 shadow-[0_0_12px_#8b2cf5] sm:left-[15px]"
          />
          <ol className="space-y-6">
            {PROCESS_STEPS.map((s, i) => (
              <motion.li
                key={s.step}
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.8, delay: i * 0.05, ease: EASE }}
                className="relative"
              >
                <motion.span
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true, margin: '-100px' }}
                  transition={{ type: 'spring', stiffness: 260, damping: 18, delay: 0.2 }}
                  className="absolute -left-10 top-7 grid h-6 w-6 place-items-center rounded-full border border-brand-400/50 bg-ink-950 sm:-left-14 sm:h-8 sm:w-8"
                >
                  <span className="h-2 w-2 rounded-full bg-brand-400 shadow-[0_0_10px_#a970ff]" />
                </motion.span>
                <div className="group rounded-3xl border border-white/[0.07] bg-ink-900/60 p-7 transition-all duration-500 hover:-translate-y-1 hover:border-brand-500/30 hover:bg-ink-800/60">
                  <div className="flex items-baseline gap-4">
                    <span className="font-mono text-sm text-brand-400">{s.step}</span>
                    <h3 className="font-display text-2xl font-semibold text-white">{s.title}</h3>
                  </div>
                  <p className="mt-3 text-[15px] leading-relaxed text-white/50">{s.description}</p>
                </div>
              </motion.li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
