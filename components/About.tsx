'use client';

import Image from 'next/image';
import { GraduationCap, ShieldCheck, MapPin } from 'lucide-react';
import { CONTACT, PORTFOLIO_ITEMS, PROFILE, STATS } from '@/lib/data';
import { Counter, Reveal, SectionHeading, SpotlightCard } from './ui/motion';

const FACTS = [
  { icon: ShieldCheck, title: 'Certified Ethical Hacker (CEHv11)', text: 'EC-Council · 2022' },
  { icon: GraduationCap, title: 'BSc Computer Science', text: 'KNUST, Class of 2023' },
  { icon: MapPin, title: `${CONTACT.location} · ${CONTACT.timezone}`, text: PROFILE.availability },
];

export default function About() {

  return (
    <section id="about" className="relative scroll-mt-24 py-28 sm:py-36">
      <div className="container-x grid gap-16 lg:grid-cols-2 lg:items-center">
        <div>
          <SectionHeading
            align="left"
            index="01" eyebrow="About"
            title="I design it, build it, animate it and secure it."
            highlight={['secure']}
            description="I'm Francis Amoako, the designer, developer and ethical hacker behind GraceGate. I create user-centred UI/UX, brand visuals, flyers and motion graphics that grab attention, then ship them as responsive websites and mobile apps that are not just good-looking, but robust and safe."
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
            <div className="mt-4 flex items-center justify-between gap-4 rounded-3xl border border-white/[0.07] bg-ink-900/70 p-5 sm:p-6">
              <div>
                <p className="text-xs text-white/45">Powered by</p>
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
