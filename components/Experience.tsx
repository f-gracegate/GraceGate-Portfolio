'use client';

import { motion } from 'motion/react';
import { Award, BadgeCheck, GraduationCap, Sparkles } from 'lucide-react';
import { ACTIVITIES, CERTIFICATIONS, EDUCATION, EXPERIENCE } from '@/lib/data';
import { EASE, Reveal, SectionHeading } from './ui/motion';

export default function Experience() {
  return (
    <section id="experience" className="relative scroll-mt-24 py-28 sm:py-36">
      <div aria-hidden className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      <div className="container-x">
        <SectionHeading
          eyebrow="Experience"
          title="Where design craft meets engineering depth."
          highlight={['design', 'engineering']}
          description="Freelance design and development, security work in national service, and enterprise networking at KNUST."
        />

        <div className="mt-16 grid gap-10 lg:grid-cols-[1.35fr_1fr] lg:gap-12">
          {/* Timeline */}
          <ol className="relative space-y-5 border-l border-white/[0.08] pl-8 sm:pl-10">
            {EXPERIENCE.map((job, i) => (
              <motion.li
                key={job.role}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.8, delay: i * 0.08, ease: EASE }}
                className="relative"
              >
                <span className="absolute -left-[41px] top-7 grid h-5 w-5 place-items-center rounded-full border border-brand-400/50 bg-ink-950 sm:-left-[49px]">
                  <span className="h-2 w-2 rounded-full bg-brand-400 shadow-[0_0_10px_#a970ff]" />
                </span>
                <div className="rounded-3xl border border-white/[0.07] bg-ink-900/60 p-6 transition-colors duration-500 hover:border-brand-500/30 sm:p-7">
                  <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4">
                    <h3 className="font-display text-lg font-semibold text-white sm:text-xl">{job.role}</h3>
                    <span className="shrink-0 font-mono text-xs text-white/40">{job.period}</span>
                  </div>
                  <p className="mt-1 text-sm font-medium text-brand-300">{job.org}</p>
                  <ul className="mt-4 space-y-2">
                    {job.points.map((pt) => (
                      <li key={pt} className="flex gap-2.5 text-sm leading-relaxed text-white/55">
                        <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-brand-400" />
                        {pt}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.li>
            ))}
          </ol>

          {/* Credentials */}
          <div className="space-y-5">
            <Reveal>
              <div className="rounded-3xl border border-white/[0.07] bg-ink-900/60 p-6 sm:p-7">
                <h3 className="flex items-center gap-2.5 font-display text-lg font-semibold text-white">
                  <BadgeCheck size={19} className="text-brand-400" /> Certifications
                </h3>
                <ul className="mt-5 space-y-4">
                  {CERTIFICATIONS.map((c) => (
                    <li key={c.title} className="flex gap-3.5">
                      <span className="mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-brand-500/10 text-brand-300 ring-1 ring-inset ring-brand-400/20">
                        <Award size={16} />
                      </span>
                      <div>
                        <p className="font-medium text-white">{c.title}</p>
                        <p className="text-sm text-white/45">
                          {c.issuer}
                          {c.year ? ` · ${c.year}` : ''}
                        </p>
                        {c.detail && <p className="mt-0.5 font-mono text-[11px] text-white/35">{c.detail}</p>}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="rounded-3xl border border-white/[0.07] bg-ink-900/60 p-6 sm:p-7">
                <h3 className="flex items-center gap-2.5 font-display text-lg font-semibold text-white">
                  <GraduationCap size={19} className="text-brand-400" /> Education
                </h3>
                <p className="mt-4 font-medium text-white">{EDUCATION.degree}</p>
                <p className="text-sm text-white/45">
                  {EDUCATION.school} · {EDUCATION.year}
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.2}>
              <div className="rounded-3xl border border-white/[0.07] bg-ink-900/60 p-6 sm:p-7">
                <h3 className="flex items-center gap-2.5 font-display text-lg font-semibold text-white">
                  <Sparkles size={19} className="text-brand-400" /> Activities
                </h3>
                <ul className="mt-4 space-y-2">
                  {ACTIVITIES.map((a) => (
                    <li key={a} className="text-sm text-white/55">
                      {a}
                    </li>
                  ))}
                </ul>
                <p className="mt-5 border-t border-white/[0.06] pt-4 text-xs text-white/35">References available upon request.</p>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
