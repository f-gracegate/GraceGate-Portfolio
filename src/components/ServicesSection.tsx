/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { CheckCircle2, ShieldAlert, Activity, Cpu, Search, Lock, ShieldCheck, Globe, Palette } from 'lucide-react';
import { motion } from 'motion/react';
import { SERVICES_DATA } from '../data';
import { ServiceItem } from '../types';

interface ServicesSectionProps {
  onRequestService: (serviceTitle: string) => void;
  scrollY?: number;
}

// Icon mapper for dynamic icon string representation
function getServiceIcon(iconName: string, className: string = "w-6 h-6") {
  switch (iconName) {
    case 'ShieldAlert': return <ShieldAlert className={`${className} text-rose-450 text-red-000 text-red-400`} />;
    case 'Activity': return <Activity className={`${className} text-emerald-400`} />;
    case 'Cpu': return <Cpu className={`${className} text-amber-400`} />;
    case 'Search': return <Search className={`${className} text-blue-400`} />;
    case 'Lock': return <Lock className={`${className} text-purple-400`} />;
    case 'Globe': return <Globe className={`${className} text-cyan-400`} />;
    case 'Palette': return <Palette className={`${className} text-pink-400`} />;
    default: return <ShieldCheck className={`${className} text-purple-400`} />;
  }
}

export default function ServicesSection({ onRequestService, scrollY = 0 }: ServicesSectionProps) {
  const websiteDesignServices = SERVICES_DATA.filter(s => s.category === 'web-design');
  const digitalMarketingServices = SERVICES_DATA.filter(s => s.category === 'digital-marketing');

  return (
    <section id="services-section" className="py-24 px-4 sm:px-12 bg-brand-bg-section relative overflow-hidden transition-colors duration-300">
      {/* Absolute floating lights with parallax */}
      <motion.div 
        style={{ y: scrollY * 0.12 }}
        className="absolute top-[10%] right-[-10%] w-[350px] h-[350px] bg-purple-600/5 rounded-full blur-[120px] pointer-events-none" 
      />
      <motion.div 
        style={{ y: scrollY * -0.06 }}
        className="absolute bottom-[20%] left-[-10%] w-[400px] h-[400px] bg-violet-500/5 rounded-full blur-[140px] pointer-events-none" 
      />

      <div className="max-w-7xl mx-auto space-y-20">
        {/* Header Block with Sleek Bold Typography Accent Line */}
        <div className="space-y-4 max-w-3xl">
          <h2 className="text-xs tracking-[0.5em] uppercase font-bold text-purple-400">SERVICES ARENA</h2>
          <div className="h-[1px] w-full bg-gradient-to-r from-purple-500 to-transparent opacity-30 my-4"></div>
          
          <h1 className="text-4xl sm:text-6xl font-black uppercase tracking-tight text-brand-text-white select-none">
            Professional Services
          </h1>

          <p className="text-sm leading-relaxed text-brand-text-muted border-l-2 border-purple-600 pl-4 max-w-2xl">
            Blending Certified Ethical Hacker foundations with premium web development, secure cross-platform mobile apps, interactive UI/UX prototyping, and high-impact graphic designs such as marketing flyers.
          </p>
        </div>

        {/* 1. Website Design Services Category */}
        <div className="space-y-8">
          <div className="flex items-center space-x-4">
            <span className="text-xs font-mono text-purple-500">[CH.01]</span>
            <span className="text-xs tracking-[0.3em] font-extrabold uppercase text-brand-text-light">SYSTEM AUDITING &amp; SECURE WEB/MOBILE CREATION</span>
          </div>
          <div className="h-[1px] w-full bg-brand-border-muted/30"></div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {websiteDesignServices.map((service: ServiceItem, idx) => (
              <ServiceCard 
                key={service.id} 
                service={service} 
                index={idx + 1}
                onTrigger={() => onRequestService(service.title)} 
              />
            ))}
          </div>
        </div>

        {/* 2. Digital Marketing Services Category */}
        <div className="space-y-8 pt-12">
          <div className="flex items-center space-x-4">
            <span className="text-xs font-mono text-purple-500">[CH.02]</span>
            <span className="text-xs tracking-[0.3em] font-extrabold uppercase text-brand-text-light">INFRASTRUCTURE SECRETS, LOGS &amp; FLYER BRANDING</span>
          </div>
          <div className="h-[1px] w-full bg-brand-border-muted/30"></div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {digitalMarketingServices.map((service: ServiceItem, idx) => (
              <ServiceCard 
                key={service.id} 
                service={service} 
                index={idx + websiteDesignServices.length + 1}
                onTrigger={() => onRequestService(service.title)} 
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// Separate ServiceCard for clean code separation
interface ServiceCardProps {
  key?: string;
  service: ServiceItem;
  index: number;
  onTrigger: () => void;
}

function ServiceCard({ service, index, onTrigger }: ServiceCardProps) {
  const chapterStr = index.toString().padStart(2, '0');
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, delay: (index % 3) * 0.1, ease: 'easeOut' }}
      className="bg-brand-bg-card border border-brand-border hover:border-purple-500/40 rounded-3xl p-6 sm:p-8 flex flex-col justify-between space-y-6 hover:bg-brand-bg-card-hover transition-colors duration-300 group shadow-sm"
    >
      <div className="space-y-5">
        
        {/* Monospace Indicator Badge and Icon Row */}
        <div className="flex items-center justify-between">
          <span className="text-xs font-mono text-purple-500 tracking-wider">[{chapterStr}]</span>
          
          <div className="w-10 h-10 rounded-xl bg-brand-bg-card border border-brand-border text-purple-400 flex items-center justify-center group-hover:bg-purple-600 group-hover:text-white group-hover:border-purple-400 transition-all duration-300">
            {getServiceIcon(service.iconName, "w-4 h-4")}
          </div>
        </div>

        {/* Title & Description */}
        <div className="space-y-2">
          <h3 className="text-lg font-bold text-brand-text-white uppercase tracking-tight group-hover:text-brand-text-white transition-colors">
            {service.title}
          </h3>
          <p className="text-xs sm:text-sm text-brand-text-muted leading-relaxed">
            {service.description}
          </p>
        </div>

        {/* Feature Checklist */}
        <ul className="space-y-2.5 pt-2">
          {service.features.map((feature, idx) => (
            <li key={idx} className="flex items-start space-x-2 text-xs text-brand-text-light font-medium">
              <CheckCircle2 size={14} className="text-purple-500 shrink-0 mt-0.5" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Trigger button */}
      <button
        onClick={onTrigger}
        className="w-full py-3 px-4 rounded-xl border border-brand-border text-purple-400 hover:text-brand-text-white hover:bg-purple-600/20 hover:border-purple-500/40 text-xs font-bold tracking-widest uppercase transition-all cursor-pointer"
      >
        <span>Request Service ↗</span>
      </button>
    </motion.div>
  );
}
