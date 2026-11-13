'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import Image from 'next/image';
import { AnimatePresence, LayoutGroup, motion } from 'motion/react';
import { ArrowUpRight, ChevronLeft, ChevronRight, Maximize2, Play, X } from 'lucide-react';
import { CATEGORY_SERVICE, PORTFOLIO_ITEMS } from '@/lib/data';
import { PORTFOLIO_CATEGORIES, type PortfolioItem } from '@/lib/types';
import { useContact } from './Providers';
import { EASE, SectionHeading } from './ui/motion';

type Filter = 'All' | (typeof PORTFOLIO_CATEGORIES)[number];
const FILTERS: Filter[] = ['All', ...PORTFOLIO_CATEGORIES];

const DESIGN_CATEGORIES = new Set(['Flyers', 'Logos & Branding', 'Motion Graphics']);

/** Muted, looping preview; React doesn't render `muted` on the server, which can block autoplay. */
function PreviewVideo({ item, className }: { item: PortfolioItem; className: string }) {
  return (
    <video
      src={item.video}
      poster={item.src}
      autoPlay
      muted
      loop
      playsInline
      preload="metadata"
      aria-label={`${item.title} for ${item.client}`}
      ref={(el) => {
        if (el && !el.muted) {
          el.muted = true;
          el.play().catch(() => {});
        }
      }}
      className={className}
    />
  );
}

function Card({ item, index, onOpen }: { item: PortfolioItem; index: number; onOpen: () => void }) {
  const contain = item.fit === 'contain';
  const portrait = item.height > item.width;

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 30, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2 } }}
      transition={{ duration: 0.55, delay: Math.min(index, 8) * 0.04, ease: EASE }}
      className="h-full"
    >
      <button
        type="button"
        onClick={onOpen}
        aria-label={`View ${item.title}`}
        className="group flex h-full w-full flex-col overflow-hidden rounded-3xl border border-white/[0.07] bg-ink-900/70 text-left transition-colors hover:border-brand-500/40"
      >
        <motion.div
          layoutId={`portfolio-${item.id}`}
          className={`relative aspect-[4/3] overflow-hidden ${contain || item.video ? 'bg-white' : portrait ? 'bg-[#eef0ec]' : 'bg-ink-800'}`}
        >
          {item.video ? (
            <PreviewVideo
              item={item}
              className="h-full w-full object-contain transition-transform duration-[1.2s] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.05]"
            />
          ) : (
            <Image
              src={item.src}
              alt={`${item.title} for ${item.client}`}
              fill
              sizes="(min-width: 1024px) 400px, (min-width: 640px) 50vw, 100vw"
              className={`transition-transform duration-[1.2s] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.05] ${
                contain ? 'object-contain p-8' : 'object-cover object-top'
              }`}
            />
          )}
          <div className="absolute inset-0 bg-ink-950/0 transition-colors duration-500 group-hover:bg-ink-950/25" />
          <span className="absolute right-4 top-4 grid h-10 w-10 scale-75 place-items-center rounded-full bg-white text-ink-950 opacity-0 shadow-lg transition-all duration-500 group-hover:scale-100 group-hover:opacity-100">
            <Maximize2 size={16} />
          </span>
          {item.video && (
            <span className="absolute left-4 top-4 flex items-center gap-1.5 rounded-full bg-ink-950/80 px-3 py-1.5 text-[11px] font-medium text-white backdrop-blur-md">
              <Play size={11} className="fill-white" /> Play with sound
            </span>
          )}
        </motion.div>

        <div className="flex flex-1 flex-col p-5 sm:p-6">
          <div className="flex items-center justify-between gap-3">
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-brand-300">{item.tag}</span>
            <span className="truncate text-[11px] text-white/35">{item.client}</span>
          </div>
          <h3 className="mt-2 font-display text-lg font-semibold leading-snug text-white">{item.title}</h3>
          {item.technologies && (
            <div className="mt-auto flex flex-wrap gap-1.5 pt-4">
              {item.technologies.map((t) => (
                <span key={t} className="rounded-md border border-white/[0.07] bg-white/[0.03] px-2 py-1 text-[11px] text-white/55">
                  {t}
                </span>
              ))}
            </div>
          )}
        </div>
      </button>
    </motion.article>
  );
}

function Lightbox({
  items,
  index,
  onClose,
  onStep,
}: {
  items: PortfolioItem[];
  index: number;
  onClose: () => void;
  onStep: (d: number) => void;
}) {
  const item = items[index];
  const { openContact } = useContact();
  const contain = item.fit === 'contain';
  const isDesign = DESIGN_CATEGORIES.has(item.category);
  const width = `min(88vw, calc((100svh - ${contain ? 340 : 290}px) * ${item.width / item.height}))`;

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
          {item.category} · {String(index + 1).padStart(2, '0')} / {String(items.length).padStart(2, '0')}
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
          layoutId={`portfolio-${item.id}`}
          className={`pointer-events-auto relative max-w-full overflow-hidden rounded-2xl shadow-2xl shadow-black/60 ${contain ? 'bg-white p-4 sm:p-8' : ''}`}
          transition={{ type: 'spring', stiffness: 220, damping: 30 }}
          drag={item.video ? false : 'x'}
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.25}
          onDragEnd={(_, info) => {
            if (info.offset.x < -80) onStep(1);
            else if (info.offset.x > 80) onStep(-1);
          }}
        >
          {item.video ? (
            <video
              key={item.video}
              src={item.video}
              poster={item.src}
              autoPlay
              controls
              playsInline
              loop
              aria-label={`${item.title} for ${item.client}`}
              className="block h-auto max-w-full bg-white"
              style={{ width }}
            />
          ) : (
            <Image
              src={item.src}
              alt={`${item.title} for ${item.client}`}
              width={item.width}
              height={item.height}
              sizes="90vw"
              priority
              draggable={false}
              className="block h-auto max-w-full select-none"
              style={{ width }}
            />
          )}
        </motion.div>

        <button
          onClick={() => onStep(-1)}
          aria-label="Previous item"
          className="pointer-events-auto absolute left-3 top-1/2 hidden h-12 w-12 -translate-y-1/2 place-items-center rounded-full border border-white/15 bg-ink-900/70 text-white/80 transition-colors hover:bg-brand-600 hover:text-white sm:left-6 sm:grid"
        >
          <ChevronLeft size={20} />
        </button>
        <button
          onClick={() => onStep(1)}
          aria-label="Next item"
          className="pointer-events-auto absolute right-3 top-1/2 hidden h-12 w-12 -translate-y-1/2 place-items-center rounded-full border border-white/15 bg-ink-900/70 text-white/80 transition-colors hover:bg-brand-600 hover:text-white sm:right-6 sm:grid"
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
              {item.tag} · {item.client}
            </p>
            <h3 className="mt-1.5 font-display text-xl font-semibold text-white sm:text-2xl">{item.title}</h3>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-white/55">{item.description}</p>
          </div>
          <button
            onClick={() => {
              onClose();
              openContact(CATEGORY_SERVICE[item.category]);
            }}
            className="group inline-flex shrink-0 items-center gap-1.5 self-start rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-ink-950 sm:self-auto"
          >
            {isDesign ? 'Order a design' : 'Start a similar project'}
            <ArrowUpRight size={15} className="transition-transform group-hover:rotate-45" />
          </button>
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
}

export default function Work() {
  const [filter, setFilter] = useState<Filter>('All');
  const [open, setOpen] = useState<number | null>(null);

  const items = useMemo(
    () => (filter === 'All' ? PORTFOLIO_ITEMS : PORTFOLIO_ITEMS.filter((p) => p.category === filter)),
    [filter],
  );
  const counts = useMemo(() => {
    const c: Record<string, number> = { All: PORTFOLIO_ITEMS.length };
    PORTFOLIO_ITEMS.forEach((p) => (c[p.category] = (c[p.category] ?? 0) + 1));
    return c;
  }, []);

  const close = useCallback(() => setOpen(null), []);
  const step = useCallback(
    (d: number) => setOpen((i) => (i === null ? i : (i + d + items.length) % items.length)),
    [items.length],
  );

  return (
    <section id="work" className="relative scroll-mt-24 bg-ink-900/30 py-28 sm:py-36">
      <div aria-hidden className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      <div className="container-x">
        <SectionHeading
          eyebrow="Portfolio"
          title="Selected work across design, development and security."
          highlight={['design,', 'development', 'security.']}
          description="Flyers, brand identities, websites, motion graphics and security engagements. Filter by discipline and open any piece to view it in full."
        />

        <LayoutGroup>
          <div className="mt-12 flex justify-center">
            <div
              role="tablist"
              aria-label="Portfolio categories"
              className="isolate flex max-w-full gap-1 overflow-x-auto rounded-full border border-white/[0.08] bg-white/[0.02] p-1.5 [scrollbar-width:none]"
            >
              {FILTERS.map((c) => (
                <button
                  key={c}
                  role="tab"
                  aria-selected={filter === c}
                  onClick={() => setFilter(c)}
                  className={`relative flex items-center gap-2 whitespace-nowrap rounded-full px-4 py-2 text-sm transition-colors ${
                    filter === c ? 'text-white' : 'text-white/50 hover:text-white/80'
                  }`}
                >
                  {filter === c && (
                    <motion.span
                      layoutId="work-filter"
                      className="absolute inset-0 -z-10 rounded-full bg-gradient-to-r from-brand-500 to-brand-700 shadow-[0_4px_20px_-4px_rgba(139,44,245,0.8)]"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span className="relative">{c}</span>
                  <span
                    className={`relative rounded-full px-1.5 font-mono text-[10px] ${
                      filter === c ? 'bg-white/20 text-white' : 'bg-white/[0.06] text-white/40'
                    }`}
                  >
                    {counts[c] ?? 0}
                  </span>
                </button>
              ))}
            </div>
          </div>

          <motion.div layout className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            <AnimatePresence mode="popLayout">
              {items.map((p, i) => (
                <Card key={p.id} item={p} index={i} onOpen={() => setOpen(i)} />
              ))}
            </AnimatePresence>
          </motion.div>
        </LayoutGroup>
      </div>

      <AnimatePresence>
        {open !== null && items[open] && <Lightbox items={items} index={open} onClose={close} onStep={step} />}
      </AnimatePresence>
    </section>
  );
}
