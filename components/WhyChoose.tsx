'use client';

import { motion } from 'motion/react';
import { Activity, CheckCircle, Code, Cpu, Layers, Shield, type LucideIcon } from 'lucide-react';
import { WHY_CHOOSE_DATA } from '@/lib/data';
import { EASE, SectionHeading, SpotlightCard } from './ui/motion';

const ICONS: Record<string, LucideIcon> = { Shield, Cpu, Activity, Code, CheckCircle, Layers };


export default function WhyChoose() {
  return (
    <section id="why" className="relative scroll-mt-24 bg-ink-900/30 py-28 sm:py-36">
      <div aria-hidden className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      <div className="container-x">
        <SectionHeading
          eyebrow="Why GraceGate"
          title="The depth of a specialist, the range of a builder."
          highlight={['specialist,', 'builder.']}
        />
        <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {WHY_CHOOSE_DATA.map((w, i) => {
            const Icon = ICONS[w.iconName] ?? Shield;
            return (
              <motion.div
                key={w.title}
                initial={{ opacity: 0, scale: 0.94, y: 30 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.7, delay: i * 0.07, ease: EASE }}
              >
                <SpotlightCard tilt={false} className="h-full p-7">
                  <div className="flex h-full flex-col gap-6">
                    <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl border border-brand-400/20 bg-brand-500/10 text-brand-300 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6">
                      <Icon size={21} />
                    </span>
                    <div>
                      <h3 className="font-display text-lg font-semibold text-white">{w.title}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-white/50">{w.description}</p>
                    </div>
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
