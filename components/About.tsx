'use client';

import Image from 'next/image';
import { motion, useScroll, useTransform } from 'motion/react';
import { useRef } from 'react';
import { GraduationCap, ShieldCheck, MapPin } from 'lucide-react';
import { CONTACT, PORTFOLIO_ITEMS, STATS } from '@/lib/data';
import { Counter, Reveal, SectionHeading, SpotlightCard } from './ui/motion';

const FACTS = [
  { icon: ShieldCheck, title: 'EC-Council CEHv11', text: 'Certified Ethical Hacker' },
  { icon: GraduationCap, title: 'BSc Computer Science', text: 'KNUST, Class of 2023' },
  { icon: MapPin, title: CONTACT.location, text: 'Working with clients worldwide' },
];

export default function About() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const rotate = useTransform(scrollYProgress, [0, 1], [-20, 20]);

  return (
    <section id="about" className="relative scroll-mt-24 py-28 sm:py-36">
      <div ref={ref} className="container-x grid gap-16 lg:grid-cols-2 lg:items-center">
        <div>
          <SectionHeading
            align="left"
            eyebrow="About"
            title="Security-first thinking, applied to everything I build."
            highlight={['Security-first']}
            description="I'm Grace Francis — the analyst behind GraceGate. I help teams find weaknesses before attackers do, then design and ship secure web, mobile and brand experiences that hold up under pressure."
          />
          <div className="mt-10 space-y-3">
            {FACTS.map(({ icon: Icon, title, text }, i) => (
              <Reveal key={title} delay={0.1 + i * 0.08}>
                <div className="flex items-center gap-4 rounded-2xl border border-white/[0.06] bg-white/[0.02] p-4 transition-colors hover:border-brand-500/30 hover:bg-brand-500/[0.04]">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-brand-500/25 to-brand-800/25 text-brand-300 ring-1 ring-inset ring-brand-400/20">
                    <Icon size={19} />
                  </span>
                  <div>
                    <p className="font-medium text-white">{title}</p>
                    <p className="text-sm text-white/45">{text}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        <div className="relative">
          <motion.div
            aria-hidden
            style={{ rotate }}
            className="absolute -inset-10 -z-10 rounded-full bg-[conic-gradient(from_90deg,transparent,rgba(139,44,245,0.25),transparent_40%)] blur-3xl"
          />
          <div className="grid grid-cols-2 gap-4">
            {STATS.map((s) => (s.label === 'Portfolio pieces' ? { ...s, value: PORTFOLIO_ITEMS.length } : s)).map((s, i) => (
              <Reveal key={s.label} delay={i * 0.1}>
                <SpotlightCard className="p-6 sm:p-8">
                  <Counter
                    to={s.value}
                    suffix={s.suffix}
                    className="block font-display text-4xl font-semibold tracking-tight text-white sm:text-5xl"
                  />
                  <p className="mt-3 text-sm text-white/45">{s.label}</p>
                </SpotlightCard>
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.4}>
            <div className="border-spin mt-4 flex items-center justify-between gap-4 rounded-3xl bg-ink-900/80 p-5 sm:p-6">
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-white/40">Powered by</p>
                <p className="mt-1 font-display text-lg font-semibold text-white">GraceGate Technologies</p>
              </div>
              <Image
                src="/brand/gracegate-technologies-light.png"
                alt="GraceGate Technologies"
                width={1116}
                height={685}
                className="h-14 w-auto"
              />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
