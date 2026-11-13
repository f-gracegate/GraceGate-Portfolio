'use client';

import { motion, useScroll, useTransform } from 'motion/react';
import { useRef } from 'react';
import { ArrowUpRight, MessageCircle, Phone } from 'lucide-react';
import { CONTACT } from '@/lib/data';
import { useContact } from './Providers';
import { Magnetic, WordReveal } from './ui/motion';

export default function CTA() {
  const { openContact } = useContact();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const scale = useTransform(scrollYProgress, [0, 0.45], [0.9, 1]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 90]);

  return (
    <section className="relative py-20 sm:py-28">
      <div className="container-x">
        <motion.div
          ref={ref}
          style={{ scale }}
          className="border-spin noise relative overflow-hidden rounded-[2.5rem] bg-ink-900 px-6 py-20 text-center sm:px-16 sm:py-28"
        >
          <motion.div
            aria-hidden
            style={{ rotate }}
            className="absolute left-1/2 top-1/2 -z-10 h-[900px] w-[900px] -translate-x-1/2 -translate-y-1/2 bg-[conic-gradient(from_0deg,rgba(139,44,245,0.35),transparent_25%,rgba(61,10,140,0.5)_50%,transparent_75%,rgba(139,44,245,0.35))] blur-[80px]"
          />
          <div aria-hidden className="grid-bg absolute inset-0 -z-10 opacity-60 [mask-image:radial-gradient(ellipse_at_center,#000,transparent_70%)]" />

          <p className="font-mono text-xs uppercase tracking-[0.3em] text-brand-300">Let&apos;s work together</p>
          <h2 className="mx-auto mt-6 max-w-3xl font-display text-4xl font-semibold leading-[1.05] tracking-tight text-white sm:text-6xl">
            <WordReveal text="Have a system to secure or a product to build?" highlight={['secure', 'build?']} />
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-white/55 sm:text-lg">
            Tell me what you&apos;re working on. You&apos;ll get a clear plan, honest timelines and a fast reply.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Magnetic>
              <button
                onClick={() => openContact()}
                className="group inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 text-sm font-semibold text-ink-950 transition-shadow hover:shadow-[0_0_50px_-5px_rgba(201,166,255,0.9)]"
              >
                Get an estimate
                <ArrowUpRight size={17} className="transition-transform duration-300 group-hover:rotate-45" />
              </button>
            </Magnetic>
            <Magnetic>
              <a
                href={CONTACT.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-8 py-4 text-sm font-semibold text-white backdrop-blur transition-colors hover:border-white/30 hover:bg-white/[0.08]"
              >
                <MessageCircle size={17} />
                Chat on WhatsApp
              </a>
            </Magnetic>
            <Magnetic>
              <a
                href={CONTACT.phoneHref}
                aria-label={`Call ${CONTACT.phone}`}
                className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-8 py-4 text-sm font-semibold text-white backdrop-blur transition-colors hover:border-white/30 hover:bg-white/[0.08]"
              >
                <Phone size={17} />
                Call {CONTACT.phone}
              </a>
            </Magnetic>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
