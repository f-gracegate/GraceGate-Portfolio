'use client';

import { useCallback, useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ChevronLeft, ChevronRight, Quote, Star } from 'lucide-react';
import { TESTIMONIALS_DATA } from '@/lib/data';
import { SectionHeading } from './ui/motion';

export default function Testimonials() {
  const [[index, dir], setState] = useState<[number, number]>([0, 1]);
  const [paused, setPaused] = useState(false);
  const n = TESTIMONIALS_DATA.length;

  const go = useCallback((d: number) => setState(([i]) => [(i + d + n) % n, d]), [n]);

  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => go(1), 6500);
    return () => clearInterval(t);
  }, [go, paused]);

  const t = TESTIMONIALS_DATA[index];

  return (
    <section id="testimonials" className="relative scroll-mt-24 overflow-hidden py-28 sm:py-36">
      <div aria-hidden className="absolute left-1/2 top-1/2 -z-10 h-[500px] w-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-700/10 blur-[140px]" />
      <div className="container-x">
        <SectionHeading eyebrow="Testimonials" title="Trusted by the teams I've worked with." highlight={['Trusted']} />

        <div
          className="relative mx-auto mt-16 max-w-4xl"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <div className="relative overflow-hidden rounded-[2rem] border border-white/[0.08] bg-ink-900/70 px-6 py-12 backdrop-blur sm:px-16 sm:py-16">
            <Quote aria-hidden className="absolute left-6 top-6 text-brand-500/15 sm:left-10 sm:top-10" size={90} strokeWidth={1} />
            <div className="relative min-h-[260px] sm:min-h-[220px]">
              <AnimatePresence mode="wait" custom={dir}>
                <motion.figure
                  key={t.id}
                  custom={dir}
                  variants={{
                    enter: (d: number) => ({ opacity: 0, x: d * 60, filter: 'blur(8px)' }),
                    center: { opacity: 1, x: 0, filter: 'blur(0px)' },
                    exit: (d: number) => ({ opacity: 0, x: d * -60, filter: 'blur(8px)' }),
                  }}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                  drag="x"
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.2}
                  onDragEnd={(_, info) => {
                    if (info.offset.x < -80) go(1);
                    else if (info.offset.x > 80) go(-1);
                  }}
                  className="cursor-grab text-center active:cursor-grabbing"
                >
                  <div className="flex justify-center gap-1">
                    {Array.from({ length: t.rating }).map((_, i) => (
                      <motion.span
                        key={i}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.15 + i * 0.06, type: 'spring', stiffness: 400 }}
                      >
                        <Star size={16} className="fill-amber-400 text-amber-400" />
                      </motion.span>
                    ))}
                  </div>
                  <blockquote className="mt-7 font-display text-xl font-medium leading-relaxed text-white/90 sm:text-2xl">
                    &ldquo;{t.text}&rdquo;
                  </blockquote>
                  <figcaption className="mt-9 flex items-center justify-center gap-4">
                    <span className="grid h-12 w-12 place-items-center rounded-full bg-gradient-to-br from-brand-400 to-brand-800 font-display text-sm font-semibold text-white">
                      {t.initials}
                    </span>
                    <span className="text-left">
                      <span className="block font-semibold text-white">{t.author}</span>
                      <span className="block text-sm text-white/45">{t.role}</span>
                    </span>
                  </figcaption>
                </motion.figure>
              </AnimatePresence>
            </div>
          </div>

          <div className="mt-8 flex items-center justify-center gap-5">
            <button
              onClick={() => go(-1)}
              aria-label="Previous testimonial"
              className="grid h-11 w-11 place-items-center rounded-full border border-white/10 text-white/70 transition-all hover:border-brand-400/50 hover:bg-brand-500/10 hover:text-white"
            >
              <ChevronLeft size={18} />
            </button>
            <div className="flex gap-2">
              {TESTIMONIALS_DATA.map((x, i) => (
                <button
                  key={x.id}
                  onClick={() => setState([i, i > index ? 1 : -1])}
                  aria-label={`Show testimonial ${i + 1}`}
                  className="relative h-1.5 w-8 overflow-hidden rounded-full bg-white/10"
                >
                  {i === index && (
                    <motion.span
                      key={`${index}-${paused}`}
                      className="absolute inset-y-0 left-0 rounded-full bg-brand-400"
                      initial={{ width: paused ? '100%' : '0%' }}
                      animate={{ width: '100%' }}
                      transition={{ duration: paused ? 0 : 6.5, ease: 'linear' }}
                    />
                  )}
                </button>
              ))}
            </div>
            <button
              onClick={() => go(1)}
              aria-label="Next testimonial"
              className="grid h-11 w-11 place-items-center rounded-full border border-white/10 text-white/70 transition-all hover:border-brand-400/50 hover:bg-brand-500/10 hover:text-white"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
