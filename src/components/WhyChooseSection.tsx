/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { CheckCircle, Clock, MessageSquare, Shield, Cpu, Sparkles } from 'lucide-react';
import { WHY_CHOOSE_DATA } from '../data';
import { WhyChooseItem } from '../types';

interface WhyChooseSectionProps {
  onStartProject: () => void;
}

// Icon mapper for dynamic WhyChoose items
function getWhyChooseIcon(iconName: string, className: string = "w-5 h-5 text-purple-400") {
  switch (iconName) {
    case 'CheckCircle': return <CheckCircle className={className} />;
    case 'Clock': return <Clock className={className} />;
    case 'MessageSquare': return <MessageSquare className={className} />;
    case 'Shield': return <Shield className={className} />;
    case 'Cpu': return <Cpu className={className} />;
    case 'Sparkles': return <Sparkles className={className} />;
    default: return <CheckCircle className={className} />;
  }
}

export default function WhyChooseSection({ onStartProject }: WhyChooseSectionProps) {
  return (
    <section id="why-choose-section" className="py-24 px-4 sm:px-12 bg-brand-bg-section border-t border-brand-border relative overflow-hidden transition-colors duration-300">
      {/* Background neon radial glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-purple-900/5 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        {/* Left Side: Content Box */}
        <div className="lg:col-span-5 space-y-6">
          <h2 className="text-xs tracking-[0.5em] uppercase font-bold text-purple-400">WHY CHOOSE ME</h2>
          <div className="h-[1px] w-full bg-gradient-to-r from-purple-500 to-transparent opacity-30 my-4"></div>

          <h1 className="text-4xl sm:text-5xl font-black uppercase text-brand-text-white tracking-tight leading-none">
            Proactive Defenses
          </h1>

          <p className="text-sm leading-relaxed text-brand-text-muted border-l-2 border-purple-600 pl-4">
            Applying Certified Ethical Hacker (CEHv11) competencies and rigorous BSc Computer Science training to secure networks, model active exploits, and devise defensive remediations.
          </p>

          <div className="pt-4">
            <button
              onClick={onStartProject}
              className="py-3.5 px-8 rounded-full bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-500 hover:to-violet-500 text-white font-bold text-xs tracking-widest uppercase shadow-lg shadow-purple-500/20 transition-all hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
            >
              Request Assessment ↗
            </button>
          </div>
        </div>

        {/* Right Side: Features Grid */}
        <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
          {WHY_CHOOSE_DATA.map((item: WhyChooseItem, idx: number) => {
            const numStr = (idx + 1).toString().padStart(2, '0');
            return (
              <div 
                key={idx} 
                className="bg-brand-bg-card border border-brand-border p-6 rounded-3xl space-y-4 hover:border-purple-500/40 hover:bg-brand-bg-card-hover transition-all duration-300 shadow-sm group"
              >
                {/* Feature Icon Header and Monospace label */}
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono text-purple-500 font-bold">[{numStr}]</span>
                  
                  <div className="w-10 h-10 rounded-xl bg-brand-bg-card border border-brand-border flex items-center justify-center shadow-inner group-hover:bg-purple-900/50 group-hover:border-purple-500/40 transition-all">
                    {getWhyChooseIcon(item.iconName)}
                  </div>
                </div>

                {/* Title & Description */}
                <div className="space-y-1">
                  <h4 className="text-base font-bold uppercase tracking-tight text-brand-text-white group-hover:text-purple-300 transition-colors">
                    {item.title}
                  </h4>
                  <p className="text-xs sm:text-sm text-brand-text-muted leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
