'use client';

import { ArrowUpRight, MessageCircle, Phone } from 'lucide-react';
import { CONTACT } from '@/lib/data';
import { useContact } from './Providers';
import { WordReveal } from './ui/motion';

export default function CTA() {
  const { openContact } = useContact();

  return (
    <section className="relative py-20 sm:py-28">
      <div className="container-x">
        <div
          className="relative overflow-hidden rounded-[2rem] border border-white/[0.08] bg-[linear-gradient(160deg,#1a0f33_0%,#0a0714_70%)] px-6 py-20 text-center sm:px-16 sm:py-24"
        >

          <p className="text-sm font-medium text-brand-300">Let&apos;s work together</p>
          <h2 className="mx-auto mt-6 max-w-3xl font-display text-4xl font-semibold leading-[1.05] tracking-tight text-white sm:text-6xl">
            <WordReveal text="Got a project in mind?" highlight={['mind?']} />
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-white/55 sm:text-lg">
            Tell me what you need, whether it&apos;s a flyer, a website or a security check, and I&apos;ll get back to you with a plan and a quote.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <button
                onClick={() => openContact()}
                className="group inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 text-sm font-semibold text-ink-950 transition-colors hover:bg-white/90"
              >
                Get an estimate
                <ArrowUpRight size={17} className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </button>
              <a
                href={CONTACT.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-white/15 px-8 py-4 text-sm font-semibold text-white transition-colors hover:border-white/30"
              >
                <MessageCircle size={17} />
                Chat on WhatsApp
              </a>
              <a
                href={CONTACT.phoneHref}
                aria-label={`Call ${CONTACT.phone}`}
                className="inline-flex items-center gap-2 rounded-full border border-white/15 px-8 py-4 text-sm font-semibold text-white transition-colors hover:border-white/30"
              >
                <Phone size={17} />
                Call {CONTACT.phone}
              </a>
          </div>
        </div>
      </div>
    </section>
  );
}
