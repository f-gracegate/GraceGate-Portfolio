/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { Sparkles, Eye, ArrowRight } from 'lucide-react';
import { HERO_DATA, METRICS_DATA } from '../data';
import FloatingOrbits from './FloatingOrbits';

interface HeroSectionProps {
  onHireMeClick: () => void;
  onViewPortfolioClick: () => void;
  scrollY?: number;
}

export default function HeroSection({
  onHireMeClick,
  onViewPortfolioClick,
  scrollY = 0,
}: HeroSectionProps) {
  return (
    <section className="relative min-h-[calc(100vh-80px)] bg-brand-bg-section text-brand-text-light pt-8 sm:pt-16 pb-12 px-4 sm:px-12 flex flex-col justify-between overflow-hidden transition-colors duration-300">
      
      {/* Absolute glows decoration with parallax */}
      <motion.div 
        style={{ y: scrollY * 0.3 }}
        className="absolute top-[-5%] left-[-10%] w-[450px] h-[450px] bg-purple-600/10 rounded-full blur-[120px] pointer-events-none" 
      />
      <motion.div 
        style={{ y: scrollY * 0.15 }}
        className="absolute right-[5%] top-[10%] w-[500px] h-[500px] bg-violet-500/5 rounded-full blur-[140px] pointer-events-none" 
      />

      {/* Grid Pattern Watermark Background with parallax - using css variables for line colors */}
      <motion.div 
        style={{ y: scrollY * 0.08 }}
        className="absolute inset-0 bg-[linear-gradient(to_right,var(--grid-color)_1px,transparent_1px),linear-gradient(to_bottom,var(--grid-color)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-100 pointer-events-none transition-all duration-300" 
      />

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center w-full z-10 my-auto">
        
        {/* Left Content Column — Bold Typography Focus */}
        <div className="lg:col-span-7 space-y-8 text-left">
          
          <div className="space-y-4">
            {/* Extremely Bold Title Matching Design HTML */}
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className="text-[75px] sm:text-[110px] lg:text-[135px] leading-[0.85] font-black uppercase tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-brand-text-white via-brand-text-white to-purple-500 select-none pb-1"
            >
              Grace<br/>Gate
            </motion.h1>
            
            {/* Split Colored Subtitle */}
            <motion.h2 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15, ease: 'easeOut' }}
              className="text-xs tracking-[0.3em] font-extrabold uppercase text-purple-400"
            >
              {HERO_DATA.tagline}
            </motion.h2>
          </div>

          {/* Description Text with left purple-600 accent line */}
          <motion.p 
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3, ease: 'easeOut' }}
            className="text-sm leading-relaxed max-w-xl text-brand-text-muted border-l-2 border-purple-600 pl-4"
          >
            {HERO_DATA.description}
          </motion.p>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-center gap-4 pt-2">
            <motion.button
              whileHover={{ scale: 1.03, boxShadow: "0 10px 30px -5px rgba(168, 85, 247, 0.4)" }}
              whileTap={{ scale: 0.98 }}
              onClick={onHireMeClick}
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-500 hover:to-violet-500 text-white font-black text-xs tracking-widest uppercase shadow-lg shadow-purple-500/20 flex items-center justify-center space-x-2 transition-all cursor-pointer"
            >
              <span>Get Started</span>
              <ArrowRight size={14} />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.03, boxShadow: "0 10px 30px -5px rgba(168, 85, 247, 0.2)" }}
              whileTap={{ scale: 0.98 }}
              onClick={onViewPortfolioClick}
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-brand-bg-section border border-brand-border text-brand-text-muted hover:text-brand-text-white transition-all flex items-center justify-center space-x-2 font-black text-xs tracking-widest uppercase cursor-pointer"
            >
              <Eye size={14} />
              <span>Portfolio</span>
            </motion.button>
          </div>

          {/* First Order Ribbon bar */}
          <div 
            onClick={onHireMeClick}
            className="p-4 rounded-2xl bg-brand-bg-card border border-brand-border hover:border-purple-500/30 cursor-pointer flex items-center space-x-3 text-xs text-brand-text-light font-bold group transition-all max-w-xl"
          >
            <div className="w-7 h-7 rounded-lg bg-purple-900/50 border border-purple-500/30 flex items-center justify-center text-purple-400 shrink-0 select-none text-sm">
              🔥
            </div>
            <span className="flex-1 group-hover:text-brand-text-white transition-colors">
              {HERO_DATA.ribbon}
            </span>
          </div>
        </div>

        {/* Right Graphic Column */}
        <div className="lg:col-span-5 flex justify-center items-center w-full">
          <FloatingOrbits />
        </div>
      </div>

      {/* 4. Bottom Metrics & Scroll Area */}
      <div className="max-w-7xl mx-auto w-full pt-12 flex flex-col md:flex-row items-center justify-between z-10 border-t border-brand-border-muted gap-8">
        
        {/* Indicators stats metrics */}
        <div className="flex flex-wrap items-center justify-center md:justify-start gap-12 sm:gap-16">
          {METRICS_DATA.map((metric, idx) => {
            const num = (idx + 1).toString().padStart(2, '0');
            return (
              <div key={idx} className="flex items-baseline gap-4 select-none">
                <div className="text-[36px] sm:text-[44px] font-black leading-none text-purple-600 font-sans">
                  {num}
                </div>
                <div>
                  <div className="text-[10px] uppercase tracking-[0.2em] text-brand-text-dim">{metric.label}</div>
                  <div className="text-xs sm:text-sm font-black text-brand-text-white">{metric.value}</div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Pulsing Status Pill (Now located on the bottom right like the mockup) */}
        <div className="flex items-center gap-4 select-none">
          <div className="text-right">
            <div className="text-[10px] uppercase tracking-[0.2em] text-brand-text-dim">Current Status</div>
            <div className="text-xs font-black text-purple-300">Available for Series Projects</div>
          </div>
          <div className="w-10 h-10 rounded-full bg-brand-bg-card border border-brand-border flex items-center justify-center text-purple-400">
            [01]
          </div>
        </div>
      </div>

    </section>
  );
}
