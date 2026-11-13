'use client';

import { useCallback, useEffect, useState } from 'react';
import Image from 'next/image';
import { AnimatePresence, motion } from 'motion/react';
import { ArrowUpRight, ChevronLeft, ChevronRight, Maximize2, X } from 'lucide-react';
import { DESIGN_DATA } from '@/lib/data';
import type { DesignItem } from '@/lib/types';
import { useContact } from './Providers';
import { EASE, SectionHeading } from './ui/motion';

// Desktop bento placement; on small screens every card falls back to its natural aspect ratio.
const LAYOUT: Record<string, string> = {
  d1: 'lg:row-span-3',
  d2: 'lg:row-span-3',
  d3: 'lg:row-span-1',
  d4: 'lg:row-span-2',
  d5: 'lg:col-span-3 lg:row-span-2',
};

function Card({ item, index, onOpen }: { item: DesignItem; index: number; onOpen: () => void }) {
  const contain = item.fit === 'contain';
  return (
    <motion.button
      type="button"
      onClick={onOpen}
      initial={{ opacity: 0, y: 40, scale: 0.97 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.8, delay: (index % 3) * 0.1, ease: EASE }}
      className={`group relative block overflow-hidden rounded-3xl border border-white/[0.08] text-left ${
        contain ? 'bg-white' : 'bg-[#eef0ec]'
      }`}
      style={{ aspectRatio: `${item.width} / ${item.height}` }}
      aria-label={`View ${item.title}`}
    >
      <motion.div layoutId={`design-${item.id}`} className="absolute inset-0">
        <Image
          src={item.src}
          alt={`${item.title} for ${item.client}`}
          fill
          sizes={item.id === 'd5' ? '(min-width: 1024px) 1200px, 100vw' : '(min-width: 1024px) 400px, 100vw'}
          className={`transition-transform duration-[1.2s] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.06] ${
            contain ? 'object-contain p-6 sm:p-10' : 'object-contain'
          }`}
        />
      </motion.div>

      {/* Hover overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-ink-950/95 via-ink-950/40 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      <div className="absolute inset-x-0 bottom-0 translate-y-4 p-5 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100 sm:p-6">
        <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-brand-300">{item.client}</p>
        <p className="mt-1.5 font-display text-lg font-semibold leading-snug text-white">{item.title}</p>
      </div>

      <span className="absolute left-4 top-4 rounded-full border border-black/5 bg-ink-950/80 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.18em] text-white/85 backdrop-blur-md">
        {item.type}
      </span>
      <span className="absolute right-4 top-4 grid h-10 w-10 scale-75 place-items-center rounded-full bg-gradient-to-br from-brand-400 to-brand-700 text-white opacity-0 shadow-lg transition-all duration-500 group-hover:scale-100 group-hover:opacity-100">
        <Maximize2 size={16} />
      </span>
    </motion.button>
  );
}

function Lightbox({ index, onClose, onStep }: { index: number; onClose: () => void; onStep: (d: number) => void }) {
  const item = DESIGN_DATA[index];
  const { openContact } = useContact();
  const contain = item.fit === 'contain';

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') onStep(1);
      if (e.key === 'ArrowLeft') onStep(-1);
    };
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [onClose, onStep]);

  return (
    <motion.div
      className="fixed inset-0 z-[80] flex flex-col bg-ink-950/90 backdrop-blur-xl"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      role="dialog"
      aria-modal="true"
      aria-label={item.title}
    >
      <div className="absolute inset-0" onClick={onClose} aria-hidden />

      <div className="relative z-10 flex items-center justify-between px-5 py-4 sm:px-8">
        <span className="font-mono text-xs text-white/50">
          {String(index + 1).padStart(2, '0')} / {String(DESIGN_DATA.length).padStart(2, '0')}
        </span>
        <button
          onClick={onClose}
          aria-label="Close"
          className="grid h-10 w-10 place-items-center rounded-full border border-white/15 text-white/80 transition-all hover:rotate-90 hover:text-white"
        >
          <X size={18} />
        </button>
      </div>

      <div className="pointer-events-none relative z-10 flex min-h-0 flex-1 items-center justify-center px-4 sm:px-20">
        <motion.div
          key={item.id}
          layoutId={`design-${item.id}`}
          className={`pointer-events-auto relative max-w-full overflow-hidden rounded-2xl shadow-2xl shadow-black/60 ${contain ? 'bg-white p-4 sm:p-8' : ''}`}
          transition={{ type: 'spring', stiffness: 220, damping: 30 }}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.25}
          onDragEnd={(_, info) => {
            if (info.offset.x < -80) onStep(1);
            else if (info.offset.x > 80) onStep(-1);
          }}
        >
          <Image
            src={item.src}
            alt={`${item.title} for ${item.client}`}
            width={item.width}
            height={item.height}
            sizes="90vw"
            priority
            draggable={false}
            className="block h-auto max-w-full select-none"
            style={{ width: `min(88vw, calc((100svh - ${contain ? 340 : 280}px) * ${item.width / item.height}))` }}
          />
        </motion.div>

        <button
          onClick={() => onStep(-1)}
          aria-label="Previous design"
          className="pointer-events-auto absolute left-3 top-1/2 hidden h-12 w-12 -translate-y-1/2 place-items-center rounded-full border border-white/15 bg-ink-900/70 text-white/80 transition-colors hover:bg-brand-600 hover:text-white sm:grid sm:left-6"
        >
          <ChevronLeft size={20} />
        </button>
        <button
          onClick={() => onStep(1)}
          aria-label="Next design"
          className="pointer-events-auto absolute right-3 top-1/2 hidden h-12 w-12 -translate-y-1/2 place-items-center rounded-full border border-white/15 bg-ink-900/70 text-white/80 transition-colors hover:bg-brand-600 hover:text-white sm:grid sm:right-6"
        >
          <ChevronRight size={20} />
        </button>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={item.id}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.35, delay: 0.1 }}
          className="relative z-10 mx-auto flex w-full max-w-4xl flex-col gap-4 px-5 py-5 sm:flex-row sm:items-end sm:justify-between sm:px-8 sm:py-7"
        >
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-brand-300">
              {item.type} · {item.client}
            </p>
            <h3 className="mt-1.5 font-display text-xl font-semibold text-white sm:text-2xl">{item.title}</h3>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-white/55">{item.description}</p>
          </div>
          <button
            onClick={() => {
              onClose();
              openContact('UI/UX & Graphic Design (Flyers)');
            }}
            className="group inline-flex shrink-0 items-center gap-1.5 self-start rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-ink-950 sm:self-auto"
          >
            Order a design
            <ArrowUpRight size={15} className="transition-transform group-hover:rotate-45" />
          </button>
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
}

export default function DesignGallery() {
  const [open, setOpen] = useState<number | null>(null);
  const n = DESIGN_DATA.length;
  const close = useCallback(() => setOpen(null), []);
  const step = useCallback((d: number) => setOpen((i) => (i === null ? i : (i + d + n) % n)), [n]);

  return (
    <section id="designs" className="relative scroll-mt-24 py-28 sm:py-36">
      <div aria-hidden className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      <div aria-hidden className="absolute right-[-10%] top-1/3 -z-10 h-[500px] w-[500px] rounded-full bg-brand-700/10 blur-[140px]" />
      <div className="container-x">
        <SectionHeading
          eyebrow="Design portfolio"
          title="Flyers and brand identities made for real clients."
          highlight={['Flyers', 'brand', 'identities']}
          description="A selection of print and digital design work, from campaign flyers to complete logo systems. Tap any piece to view it full size."
        />

        <div className="mt-16 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:auto-rows-[175px] lg:grid-cols-3">
          {DESIGN_DATA.map((item, i) => (
            <div key={item.id} className={`${LAYOUT[item.id] ?? ''} ${item.id === 'd5' ? 'sm:col-span-2' : ''} [&>button]:h-full [&>button]:w-full lg:[&>button]:!aspect-auto`}>
              <Card item={item} index={i} onOpen={() => setOpen(i)} />
            </div>
          ))}
        </div>
      </div>

      <AnimatePresence>{open !== null && <Lightbox index={open} onClose={close} onStep={step} />}</AnimatePresence>
    </section>
  );
}
