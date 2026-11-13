'use client';

import { motion } from 'motion/react';
import { ArrowUpRight, Check, Clapperboard, Globe, Palette, PenTool, ShieldCheck, Smartphone, type LucideIcon } from 'lucide-react';
import { SERVICES_DATA } from '@/lib/data';
import { useContact } from './Providers';
import { EASE, SectionHeading, SpotlightCard } from './ui/motion';

const ICONS: Record<string, LucideIcon> = { PenTool, Globe, Smartphone, Palette, Clapperboard, ShieldCheck };

export default function Services() {
  const { openContact } = useContact();

  return (
    <section id="services" className="relative scroll-mt-24 py-28 sm:py-36">
      <div aria-hidden className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      <div className="container-x">
        <SectionHeading
          index="03" eyebrow="Services"
          title="What I can do for you."
          highlight={['you.']}
          description="Six services, one person to talk to: design, development, motion and security."
        />

        <div className="mt-16 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {SERVICES_DATA.map((s, i) => {
            const Icon = ICONS[s.iconName] ?? Palette;
            return (
              <motion.div
                key={s.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.8, delay: (i % 3) * 0.1, ease: EASE }}
              >
                <SpotlightCard className="flex h-full flex-col p-7">
                  <div className="flex h-full flex-col">
                    <div className="flex items-start justify-between">
                      <motion.span
                        whileHover={{ rotate: 8, scale: 1.08 }}
                        className="text-brand-400"
                      >
                        <Icon size={26} strokeWidth={1.6} />
                      </motion.span>
                      <span className="font-mono text-xs text-white/25">0{i + 1}</span>
                    </div>
                    <h3 className="mt-7 font-display text-xl font-semibold leading-snug text-white">{s.title}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-white/50">{s.description}</p>
                    <ul className="mt-6 hidden space-y-2.5 border-t border-white/[0.06] pt-6 sm:block">
                      {s.features.slice(0, 4).map((f) => (
                        <li key={f} className="flex gap-2.5 text-[13px] leading-snug text-white/65">
                          <Check size={14} className="mt-0.5 shrink-0 text-brand-400" />
                          {f}
                        </li>
                      ))}
                    </ul>
                    <button
                      onClick={() => openContact(s.title)}
                      className="mt-auto flex items-center gap-1.5 pt-8 text-sm font-semibold text-brand-300 transition-colors hover:text-white"
                    >
                      Request this service
                      <ArrowUpRight size={15} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </button>
                  </div>
                </SpotlightCard>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
