'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'motion/react';
import { ArrowDown, ArrowUpRight, ShieldCheck, Bug, Radar, Lock } from 'lucide-react';
import { HERO_DATA, METRICS_DATA } from '@/lib/data';
import { useContact } from './Providers';
import { EASE, Magnetic } from './ui/motion';

const TERMINAL_LINES = [
  { p: '$', t: 'nmap -sV -T4 target.local', c: 'text-white/80' },
  { p: '>', t: '22/tcp   open  ssh      OpenSSH 8.9', c: 'text-white/45' },
  { p: '>', t: '443/tcp  open  https    nginx 1.24', c: 'text-white/45' },
  { p: '$', t: 'audit --owasp-top10 --report', c: 'text-white/80' },
  { p: '✓', t: '0 critical · 2 medium · remediation ready', c: 'text-emerald-400/90' },
];

function Terminal() {
  const [shown, setShown] = useState(0);
  useEffect(() => {
    if (shown >= TERMINAL_LINES.length) {
      const reset = setTimeout(() => setShown(0), 3800);
      return () => clearTimeout(reset);
    }
    const t = setTimeout(() => setShown((s) => s + 1), shown === 0 ? 2200 : 750);
    return () => clearTimeout(t);
  }, [shown]);

  return (
    <div className="glass w-[290px] rounded-2xl p-4 shadow-2xl shadow-black/50 sm:w-[330px]">
      <div className="mb-3 flex items-center gap-1.5">
        <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
        <span className="ml-auto font-mono text-[10px] text-white/30">gracegate@kali</span>
      </div>
      <div className="min-h-[118px] space-y-1.5 font-mono text-[11px] leading-relaxed">
        {TERMINAL_LINES.slice(0, shown).map((l, i) => (
          <motion.div
            key={`${i}-${shown > i}`}
            initial={{ opacity: 0, x: -6 }}
            animate={{ opacity: 1, x: 0 }}
            className={`flex gap-2 ${l.c}`}
          >
            <span className="text-brand-400">{l.p}</span>
            <span className="truncate">{l.t}</span>
          </motion.div>
        ))}
        <span className="inline-block h-3.5 w-1.5 animate-blink bg-brand-400 align-middle" />
      </div>
    </div>
  );
}

const CHIPS = [
  { icon: ShieldCheck, label: 'CEHv11 Certified', className: 'left-[-4%] top-[14%]', delay: 0 },
  { icon: Bug, label: 'Pen Testing', className: 'right-[-2%] top-[6%]', delay: 0.8 },
  { icon: Radar, label: 'Threat Analysis', className: 'right-[-6%] bottom-[30%]', delay: 1.6 },
  { icon: Lock, label: 'Secure Apps', className: 'left-[2%] bottom-[22%]', delay: 2.4 },
];

export default function Hero() {
  const { openContact } = useContact();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const yText = useTransform(scrollYProgress, [0, 1], [0, 140]);
  const yVisual = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const scaleVisual = useTransform(scrollYProgress, [0, 1], [1, 0.88]);

  // Content waits for the preloader to leave
  const d = 1.75;

  return (
    <section id="top" ref={ref} className="noise relative isolate min-h-[100svh] overflow-hidden pt-28 sm:pt-32">
      {/* Background */}
      <div aria-hidden className="absolute inset-0 -z-10">
        <div className="grid-bg absolute inset-0 [mask-image:radial-gradient(ellipse_70%_60%_at_50%_30%,#000_30%,transparent_75%)]" />
        <div className="absolute -left-[10%] top-[-10%] h-[600px] w-[600px] animate-aurora rounded-full bg-brand-600/25 blur-[140px]" />
        <div className="absolute right-[-15%] top-[10%] h-[520px] w-[520px] animate-aurora rounded-full bg-brand-800/40 blur-[130px] [animation-delay:-6s]" />
        <div className="absolute bottom-[-20%] left-[30%] h-[400px] w-[700px] animate-aurora rounded-full bg-fuchsia-700/10 blur-[120px] [animation-delay:-12s]" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-ink-950" />
      </div>

      <div className="container-x grid items-center gap-14 pb-20 lg:grid-cols-[1.1fr_0.9fr] lg:gap-8">
        <motion.div style={{ y: yText, opacity }} className="relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: d, duration: 0.7, ease: EASE }}
          >
            <span className="eyebrow">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
              </span>
              Available for new projects
            </span>
          </motion.div>

          <h1 className="mt-7 font-display text-[2.6rem] font-semibold leading-[1.02] tracking-[-0.035em] text-white sm:text-6xl lg:text-[4.6rem]">
            {['Securing systems.', 'Building products', 'that last.'].map((line, i) => (
              <span key={line} className="block overflow-hidden pb-[0.08em]">
                <motion.span
                  className={`block ${i === 2 ? 'text-shimmer' : ''}`}
                  initial={{ y: '105%', rotate: 3 }}
                  animate={{ y: 0, rotate: 0 }}
                  transition={{ delay: d + 0.1 + i * 0.12, duration: 1, ease: EASE }}
                >
                  {line}
                </motion.span>
              </span>
            ))}
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: d + 0.5, duration: 0.8, ease: EASE }}
            className="mt-7 max-w-xl text-base leading-relaxed text-white/55 sm:text-lg"
          >
            {HERO_DATA.description}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: d + 0.65, duration: 0.8, ease: EASE }}
            className="mt-10 flex flex-wrap items-center gap-3"
          >
            <Magnetic>
              <button
                onClick={() => openContact()}
                className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-gradient-to-r from-brand-500 to-brand-700 px-7 py-4 text-sm font-semibold text-white shadow-[0_10px_40px_-10px_rgba(139,44,245,0.9)] transition-shadow hover:shadow-[0_10px_50px_-6px_rgba(139,44,245,1)]"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-brand-400 to-brand-600 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                <span className="relative">Start a project</span>
                <ArrowUpRight size={17} className="relative transition-transform duration-300 group-hover:rotate-45" />
              </button>
            </Magnetic>
            <Magnetic>
              <a
                href="#work"
                className="group inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/[0.03] px-7 py-4 text-sm font-semibold text-white/85 backdrop-blur transition-colors hover:border-white/25 hover:bg-white/[0.07] hover:text-white"
              >
                View my work
                <ArrowDown size={16} className="transition-transform duration-300 group-hover:translate-y-0.5" />
              </a>
            </Magnetic>
          </motion.div>

          <motion.dl
            initial="hidden"
            animate="show"
            variants={{ show: { transition: { staggerChildren: 0.1, delayChildren: d + 0.85 } } }}
            className="mt-14 grid max-w-lg grid-cols-3 divide-x divide-white/[0.08] border-y border-white/[0.08]"
          >
            {METRICS_DATA.map((m) => (
              <motion.div
                key={m.label}
                variants={{ hidden: { opacity: 0, y: 14 }, show: { opacity: 1, y: 0 } }}
                className="px-4 py-4 first:pl-0"
              >
                <dt className="font-display text-xl font-semibold text-white sm:text-2xl">{m.value}</dt>
                <dd className="mt-1 text-[10px] uppercase leading-snug tracking-[0.14em] text-white/40">{m.label}</dd>
              </motion.div>
            ))}
          </motion.dl>
        </motion.div>

        {/* Visual */}
        <motion.div style={{ y: yVisual, scale: scaleVisual }} className="relative mx-auto aspect-square w-full max-w-[520px]">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: d - 0.2, duration: 1.4, ease: EASE }}
            className="absolute inset-0"
          >
            {/* Orbit rings */}
            <div className="absolute inset-[4%] animate-spin-slower rounded-full border border-dashed border-white/[0.08]" />
            <div className="absolute inset-[16%] animate-spin-slow rounded-full border border-brand-500/20 [animation-direction:reverse]">
              <span className="absolute left-1/2 top-0 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-400 shadow-[0_0_16px_4px_rgba(169,112,255,0.7)]" />
            </div>
            <div className="absolute inset-[28%] animate-spin-slow rounded-full border border-white/[0.06]">
              <span className="absolute bottom-0 left-1/2 h-2 w-2 -translate-x-1/2 translate-y-1/2 rounded-full bg-white shadow-[0_0_14px_3px_rgba(255,255,255,0.5)]" />
            </div>
            <div className="absolute inset-[30%] rounded-full bg-brand-600/30 blur-[70px]" />

            {/* Logo mark */}
            <motion.div
              animate={{ y: [0, -14, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute inset-0 grid place-items-center"
            >
              <Image
                src="/brand/gracegate-mark.png"
                alt="GraceGate logo mark"
                width={728}
                height={469}
                priority
                className="w-[44%] drop-shadow-[0_20px_60px_rgba(139,44,245,0.55)]"
              />
            </motion.div>
          </motion.div>

          {/* Floating chips */}
          {CHIPS.map(({ icon: Icon, label, className, delay }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: d + 0.4 + i * 0.12, type: 'spring', stiffness: 200, damping: 16 }}
              className={`absolute ${className} hidden sm:block`}
            >
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay }}
                className="glass flex items-center gap-2 rounded-full px-3.5 py-2 text-xs font-medium text-white/85 shadow-lg shadow-black/30"
              >
                <Icon size={14} className="text-brand-300" />
                {label}
              </motion.div>
            </motion.div>
          ))}

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: d + 0.9, duration: 0.9, ease: EASE }}
            className="absolute -bottom-6 left-1/2 -translate-x-1/2 sm:left-auto sm:right-0 sm:translate-x-0"
          >
            <Terminal />
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll cue */}
      <motion.a
        href="#about"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: d + 1.4 }}
        className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-white/35 lg:flex"
        aria-label="Scroll down"
      >
        Scroll
        <span className="relative h-10 w-[1px] overflow-hidden bg-white/10">
          <motion.span
            className="absolute inset-x-0 top-0 h-4 bg-brand-400"
            animate={{ y: [-16, 40] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
          />
        </span>
      </motion.a>
    </section>
  );
}
