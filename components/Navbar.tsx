'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'motion/react';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import { NAV_LINKS } from '@/lib/data';
import { useContact } from './Providers';
import { Magnetic } from './ui/motion';

export default function Navbar() {
  const { openContact } = useContact();
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState('');
  const [mobileOpen, setMobileOpen] = useState(false);

  useMotionValueEvent(scrollY, 'change', (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setScrolled(y > 24);
    setHidden(y > prev && y > 400 && !mobileOpen);
  });

  // Highlight the nav item of the section currently in view
  useEffect(() => {
    const els = NAV_LINKS.map((l) => document.getElementById(l.id)).filter(Boolean) as HTMLElement[];
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => e.isIntersecting && setActive(e.target.id));
      },
      { rootMargin: '-45% 0px -50% 0px' },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
  }, [mobileOpen]);

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: hidden ? -110 : 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: hidden ? 0 : 0.05 }}
        className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-6 sm:pt-4"
      >
        <nav
          className={`mx-auto flex max-w-6xl items-center justify-between rounded-2xl px-4 py-2.5 transition-all duration-500 sm:px-5 ${
            scrolled
              ? 'border border-white/[0.08] bg-ink-900/70 shadow-[0_8px_40px_-12px_rgba(0,0,0,0.8)] backdrop-blur-xl'
              : 'border border-transparent'
          }`}
        >
          <a href="#top" className="group flex items-center gap-2.5" aria-label="GraceGate — back to top">
            <motion.span whileHover={{ rotate: -12, scale: 1.08 }} transition={{ type: 'spring', stiffness: 300 }}>
              <Image src="/brand/gracegate-mark.png" alt="" width={44} height={28} priority className="h-7 w-auto" />
            </motion.span>
            <span className="font-display text-lg font-semibold tracking-tight text-white">GraceGate</span>
          </a>

          <ul className="isolate hidden items-center gap-1 md:flex">
            {NAV_LINKS.map((l) => (
              <li key={l.id}>
                <a
                  href={`#${l.id}`}
                  className={`relative block rounded-full px-4 py-2 text-sm transition-colors ${
                    active === l.id ? 'text-white' : 'text-white/55 hover:text-white'
                  }`}
                >
                  {active === l.id && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 -z-10 rounded-full border border-white/10 bg-white/[0.06]"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                  {l.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            <Magnetic className="hidden sm:inline-block">
              <button
                onClick={() => openContact()}
                className="group relative inline-flex items-center gap-1.5 overflow-hidden rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-ink-950 transition-shadow hover:shadow-[0_0_30px_-4px_rgba(169,112,255,0.8)]"
              >
                <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-brand-300 via-white to-brand-300 transition-transform duration-700 group-hover:translate-x-full" />
                <span className="relative">Hire me</span>
                <ArrowUpRight size={16} className="relative transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </button>
            </Magnetic>
            <button
              onClick={() => setMobileOpen((v) => !v)}
              className="grid h-10 w-10 place-items-center rounded-full border border-white/10 text-white md:hidden"
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileOpen}
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={mobileOpen ? 'x' : 'menu'}
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {mobileOpen ? <X size={18} /> : <Menu size={18} />}
                </motion.span>
              </AnimatePresence>
            </button>
          </div>
        </nav>
      </motion.header>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ clipPath: 'circle(0% at 100% 0%)' }}
            animate={{ clipPath: 'circle(150% at 100% 0%)' }}
            exit={{ clipPath: 'circle(0% at 100% 0%)' }}
            transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-40 flex flex-col justify-center bg-ink-950/95 px-8 backdrop-blur-2xl md:hidden"
          >
            <ul className="space-y-2">
              {NAV_LINKS.map((l, i) => (
                <motion.li
                  key={l.id}
                  initial={{ opacity: 0, x: 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.15 + i * 0.06, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                >
                  <a
                    href={`#${l.id}`}
                    onClick={() => setMobileOpen(false)}
                    className="flex items-baseline gap-4 py-2 font-display text-4xl font-semibold text-white/90"
                  >
                    <span className="font-mono text-xs text-brand-400">0{i + 1}</span>
                    {l.label}
                  </a>
                </motion.li>
              ))}
            </ul>
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              onClick={() => {
                setMobileOpen(false);
                openContact();
              }}
              className="mt-10 inline-flex w-fit items-center gap-2 rounded-full bg-gradient-to-r from-brand-500 to-brand-700 px-6 py-3.5 text-sm font-semibold text-white"
            >
              Start a project <ArrowUpRight size={16} />
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
