'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';
import { PRICING, PRICING_TIERS, type PricingKey } from '@/lib/data';
import { useContact } from './Providers';
import { EASE, SectionHeading } from './ui/motion';

const KEYS = Object.keys(PRICING) as PricingKey[];

export default function Pricing() {
  const { openContact } = useContact();
  const [tab, setTab] = useState<PricingKey>('websites');
  const card = PRICING[tab];

  return (
    <section id="pricing" className="relative scroll-mt-24 py-28 sm:py-36">
      <div aria-hidden className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      <div className="container-x">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            align="left"
            index="06"
            eyebrow="Pricing"
            title="Rate card 2026."
            highlight={['2026.']}
            description="Starting prices in Ghana cedis. The final quote depends on project size and timeline."
          />
          <div role="tablist" aria-label="Price list" className="flex w-fit gap-1 rounded-full border border-white/10 p-1">
            {KEYS.map((k) => (
              <button
                key={k}
                role="tab"
                aria-selected={tab === k}
                onClick={() => setTab(k)}
                className={`rounded-full px-5 py-2.5 text-sm font-medium transition-colors ${
                  tab === k ? 'bg-white text-ink-950' : 'text-white/60 hover:text-white'
                }`}
              >
                {PRICING[k].label}
              </button>
            ))}
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={tab}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.35, ease: EASE }}
            className="mt-12"
          >
            {/* Desktop / tablet: table */}
            <div className="hidden overflow-hidden rounded-3xl border border-white/[0.08] md:block">
              <table className="w-full text-left">
                <caption className="sr-only">{card.label} prices by client type</caption>
                <thead>
                  <tr className="border-b border-white/[0.08] bg-white/[0.03] text-sm text-white/50">
                    <th scope="col" className="px-6 py-4 font-medium">Package</th>
                    {PRICING_TIERS.map((t) => (
                      <th key={t} scope="col" className="px-6 py-4 text-right font-medium">
                        {t}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {card.packages.map((p) => (
                    <tr key={p.name} className="border-b border-white/[0.06] last:border-0 transition-colors hover:bg-white/[0.02]">
                      <th scope="row" className="px-6 py-5 font-normal">
                        <span className="block font-display text-lg font-semibold text-white">{p.name}</span>
                        <span className="mt-0.5 block text-sm text-white/45">{p.detail}</span>
                      </th>
                      {p.prices.map((price, i) => (
                        <td
                          key={i}
                          className={`px-6 py-5 text-right font-display text-lg font-semibold tabular-nums ${
                            i === 2 ? 'text-brand-300' : 'text-white'
                          } ${price === 'Quote' ? 'text-base font-medium text-brand-300' : ''}`}
                        >
                          {price}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Phones: one card per package */}
            <ul className="space-y-3 md:hidden">
              {card.packages.map((p) => (
                <li key={p.name} className="rounded-2xl border border-white/[0.08] p-5">
                  <p className="font-display text-lg font-semibold text-white">{p.name}</p>
                  <p className="mt-0.5 text-sm text-white/45">{p.detail}</p>
                  <dl className="mt-4 space-y-2 border-t border-white/[0.06] pt-4 text-sm">
                    {PRICING_TIERS.map((t, i) => (
                      <div key={t} className="flex items-baseline justify-between">
                        <dt className="text-white/50">{t}</dt>
                        <dd className={`font-display font-semibold tabular-nums ${i === 2 ? 'text-brand-300' : 'text-white'}`}>
                          {p.prices[i]}
                        </dd>
                      </div>
                    ))}
                  </dl>
                </li>
              ))}
            </ul>

            <div className="mt-5 grid gap-5 md:grid-cols-2">
              {card.extras.map((box) => (
                <div key={box.title} className="rounded-3xl border border-white/[0.08] p-6">
                  <h3 className="font-display text-base font-semibold text-white">{box.title}</h3>
                  <dl className="mt-4 space-y-3 text-sm">
                    {box.items.map(([k, v]) => (
                      <div key={k} className="flex items-baseline justify-between gap-4">
                        <dt className="text-white/60">{k}</dt>
                        <dd className="shrink-0 font-semibold tabular-nums text-white">{v}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              ))}
            </div>

            <div className="mt-8 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm text-white/50">{card.terms.join(' · ')}</p>
              <button
                onClick={() => openContact(card.service)}
                className="group inline-flex w-fit items-center gap-2 rounded-full bg-brand-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-500"
              >
                Get a free quote
                <ArrowUpRight size={16} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </button>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
