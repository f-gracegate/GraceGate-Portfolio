'use client';

import Image from 'next/image';
import { motion } from 'motion/react';
import { ArrowUpRight, Ghost, Mail, MessageCircle, Phone } from 'lucide-react';
import { CONTACT, NAV_LINKS, SERVICES_DATA } from '@/lib/data';
import { useContact } from './Providers';

// Social profiles go here once available; for now, direct contact channels.
const SOCIALS = [
  { icon: MessageCircle, href: CONTACT.whatsapp, label: 'WhatsApp' },
  { icon: Ghost, href: CONTACT.snapchat, label: `Snapchat @${CONTACT.snapchatHandle}` },
  { icon: Mail, href: `mailto:${CONTACT.email}`, label: 'Email' },
  { icon: Phone, href: CONTACT.phoneHref, label: 'Call' },
];

export default function Footer() {
  const { openContact } = useContact();
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden border-t border-white/[0.06] pt-20">
      <div className="container-x grid gap-12 pb-16 md:grid-cols-2 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <Image src="/brand/gracegate-logo-light.png" alt="GraceGate" width={1066} height={679} className="h-20 w-auto" />
          <p className="mt-6 max-w-sm text-sm leading-relaxed text-white/45">
            The studio of Francis Amoako: UI/UX and graphic design, websites and mobile apps, motion graphics and
            cybersecurity, built with security in from day one.
          </p>
          <div className="mt-6 flex gap-2">
            {SOCIALS.map(({ icon: Icon, href, label }) => (
              <motion.a
                key={label}
                href={href}
                target={href.startsWith('http') ? '_blank' : undefined}
                rel="noopener noreferrer"
                aria-label={label}
                whileHover={{ y: -3 }}
                className="grid h-10 w-10 place-items-center rounded-full border border-white/10 text-white/60 transition-colors hover:border-brand-400/50 hover:bg-brand-500/10 hover:text-white"
              >
                <Icon size={16} />
              </motion.a>
            ))}
          </div>
        </div>

        <div className="lg:col-span-2">
          <h4 className="font-mono text-[11px] uppercase tracking-[0.22em] text-white/35">Navigate</h4>
          <ul className="mt-5 space-y-3 text-sm">
            {NAV_LINKS.map((l) => (
              <li key={l.id}>
                <a href={`#${l.id}`} className="text-white/60 transition-colors hover:text-white">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:col-span-3">
          <h4 className="font-mono text-[11px] uppercase tracking-[0.22em] text-white/35">Services</h4>
          <ul className="mt-5 space-y-3 text-sm">
            {SERVICES_DATA.map((s) => (
              <li key={s.id}>
                <button onClick={() => openContact(s.title)} className="text-left text-white/60 transition-colors hover:text-white">
                  {s.title}
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:col-span-2">
          <h4 className="font-mono text-[11px] uppercase tracking-[0.22em] text-white/35">Contact</h4>
          <ul className="mt-5 space-y-3 text-sm">
            <li>
              <a href={`mailto:${CONTACT.email}`} className="flex items-start gap-2 break-all text-white/60 transition-colors hover:text-white">
                <Mail size={15} className="mt-0.5 shrink-0 text-brand-400" />
                {CONTACT.email}
              </a>
            </li>
            <li>
              <a href={CONTACT.phoneHref} className="flex items-center gap-2 text-white/60 transition-colors hover:text-white">
                <Phone size={15} className="shrink-0 text-brand-400" />
                {CONTACT.phone}
              </a>
            </li>
                      <li>
              <a
                href={CONTACT.snapchat}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-white/60 transition-colors hover:text-white"
              >
                <Ghost size={15} className="shrink-0 text-brand-400" />@{CONTACT.snapchatHandle}
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Powered by */}
      <div className="container-x">
        <div className="flex flex-col items-center justify-between gap-6 rounded-3xl border border-white/[0.07] bg-gradient-to-r from-brand-800/20 via-ink-900/60 to-brand-800/20 p-6 sm:flex-row sm:p-8">
          <div className="flex items-center gap-5">
            <Image
              src="/brand/gracegate-technologies-light.png"
              alt="GraceGate Technologies"
              width={1116}
              height={685}
              className="h-16 w-auto"
            />
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/40">Powered by</p>
              <p className="mt-1 font-display text-lg font-semibold text-white">GraceGate Technologies</p>
            </div>
          </div>
          <button
            onClick={() => openContact()}
            className="group inline-flex items-center gap-1.5 text-sm font-semibold text-brand-300 transition-colors hover:text-white"
          >
            Partner with us
            <ArrowUpRight size={15} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </button>
        </div>
      </div>

      <div className="container-x flex flex-col items-center justify-between gap-3 py-8 text-xs text-white/35 sm:flex-row">
        <p>© {year} GraceGate. All rights reserved.</p>
        <p>{CONTACT.location}</p>
      </div>

      {/* Giant wordmark */}
      <div aria-hidden className="pointer-events-none select-none overflow-hidden">
        <motion.p
          initial={{ y: '40%', opacity: 0 }}
          whileInView={{ y: '0%', opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="-mb-[0.22em] bg-gradient-to-b from-brand-500/25 via-brand-700/10 to-transparent bg-clip-text text-center font-display text-[19vw] font-bold leading-none tracking-[-0.06em] text-transparent"
        >
          GraceGate
        </motion.p>
      </div>
    </footer>
  );
}
