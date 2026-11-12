'use client';

import { useState } from 'react';
import Image from 'next/image';
import { AnimatePresence, motion } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';
import { PORTFOLIO_DATA } from '@/lib/data';
import type { ProjectItem } from '@/lib/types';
import { useContact } from './Providers';
import { EASE, SectionHeading } from './ui/motion';

const CATEGORIES = ['All', 'Offensive Security', 'Defensive Security', 'Infrastructure Security', 'Web/Mobile Apps', 'UX/UI & Flyers'] as const;

const IMAGES: Record<string, string> = {
  'Offensive Security': '/projects/offensive-security.png',
  'Defensive Security': '/projects/defensive-security.png',
  'Infrastructure Security': '/projects/infra-security.png',
  'Web/Mobile Apps': '/projects/web-mobile-apps.png',
  'UX/UI & Flyers': '/projects/ux-ui-flyers.png',
};

function ProjectCard({ p, index, onClick }: { p: ProjectItem; index: number; onClick: () => void }) {
  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 30, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.94, transition: { duration: 0.25 } }}
      transition={{ duration: 0.6, delay: index * 0.05, ease: EASE }}
      className="group relative flex flex-col overflow-hidden rounded-3xl border border-white/[0.07] bg-ink-900/70 transition-colors hover:border-brand-500/35"
    >
      <div className="relative aspect-[16/10] overflow-hidden">
        <Image
          src={IMAGES[p.category] ?? IMAGES['Defensive Security']}
          alt={`${p.category} — ${p.title}`}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-[1.2s] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink-900 via-ink-900/30 to-transparent" />
        <div className="absolute inset-0 bg-brand-700/0 mix-blend-color transition-colors duration-700 group-hover:bg-brand-700/40" />
        <span className="absolute left-4 top-4 rounded-full border border-white/15 bg-black/40 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.18em] text-white/80 backdrop-blur-md">
          {p.category}
        </span>
        <motion.span
          className="absolute right-4 top-4 grid h-10 w-10 place-items-center rounded-full bg-white text-ink-950 opacity-0 transition-all duration-500 group-hover:rotate-45 group-hover:opacity-100"
          aria-hidden
        >
          <ArrowUpRight size={18} />
        </motion.span>
      </div>
      <div className="flex flex-1 flex-col p-6">
        <p className="font-mono text-[11px] uppercase tracking-[0.15em] text-brand-300/80">{p.client}</p>
        <h3 className="mt-2 font-display text-lg font-semibold leading-snug text-white">{p.title}</h3>
        <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-white/50">{p.description}</p>
        <div className="mt-auto flex flex-wrap gap-1.5 pt-5">
          {p.technologies.map((t) => (
            <span key={t} className="rounded-md border border-white/[0.07] bg-white/[0.03] px-2 py-1 text-[11px] text-white/55">
              {t}
            </span>
          ))}
        </div>
      </div>
      <button onClick={onClick} className="absolute inset-0" aria-label={`Start a similar project to ${p.title}`} />
    </motion.article>
  );
}

export default function Work() {
  const { openContact } = useContact();
  const [cat, setCat] = useState<string>('All');
  const items = PORTFOLIO_DATA.filter((p) => cat === 'All' || p.category === cat);

  return (
    <section id="work" className="relative scroll-mt-24 bg-ink-900/30 py-28 sm:py-36">
      <div aria-hidden className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      <div className="container-x">
        <SectionHeading
          eyebrow="Selected work"
          title="Engagements, builds and designs."
          highlight={['builds']}
          description="A cross-section of security assessments, infrastructure hardening, product engineering and design work."
        />

        <div className="mt-12 flex justify-center">
          <div className="isolate flex max-w-full gap-1 overflow-x-auto rounded-full border border-white/[0.08] bg-white/[0.02] p-1.5 [scrollbar-width:none]">
            {CATEGORIES.map((c) => (
              <button
                key={c}
                onClick={() => setCat(c)}
                className={`relative whitespace-nowrap rounded-full px-4 py-2 text-sm transition-colors ${
                  cat === c ? 'text-white' : 'text-white/50 hover:text-white/80'
                }`}
              >
                {cat === c && (
                  <motion.span
                    layoutId="work-filter"
                    className="absolute inset-0 -z-10 rounded-full bg-gradient-to-r from-brand-500 to-brand-700 shadow-[0_4px_20px_-4px_rgba(139,44,245,0.8)]"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
                <span className="relative">{c}</span>
              </button>
            ))}
          </div>
        </div>

        <motion.div layout className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {items.map((p, i) => (
              <ProjectCard key={p.id} p={p} index={i} onClick={() => openContact(p.title)} />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
