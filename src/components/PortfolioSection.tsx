/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ExternalLink, Layers, Sparkles, Filter, Code2, Cpu } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data';
import { ProjectItem } from '../types';

// Category Mockup Images
import offensiveSecurityImg from '../assets/images/offensive_security_1779313665244.png';
import defensiveSecurityImg from '../assets/images/defensive_security_1779313682700.png';
import infraSecurityImg from '../assets/images/infra_security_1779313700884.png';
import webMobileAppsImg from '../assets/images/web_mobile_apps_1779313715625.png';
import uxUiFlyersImg from '../assets/images/ux_ui_flyers_1779313731745.png';

interface PortfolioSectionProps {
  onStartProject: (projectTitle: string) => void;
  scrollY?: number;
}

export default function PortfolioSection({ onStartProject, scrollY = 0 }: PortfolioSectionProps) {
  // Filter settings states
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedTech, setSelectedTech] = useState<string>('All');

  // Available Filter Controls list
  const categories = ['All', 'Offensive Security', 'Defensive Security', 'Infrastructure Security', 'Web/Mobile Apps', 'UX/UI & Flyers'];
  const technologies = ['All', 'Nmap', 'Wireshark', 'Python', 'React', 'Flutter', 'Figma', 'Flyers', 'Branding'];

  // Match criteria for current filters (Unified logic)
  const filteredProjects = PORTFOLIO_DATA.filter((project) => {
    const matchesCategory = selectedCategory === 'All' || project.category === selectedCategory;
    const matchesTech = selectedTech === 'All' || project.technologies.some(t => 
      t.toLowerCase().includes(selectedTech.toLowerCase())
    );
    return matchesCategory && matchesTech;
  });

  // Category image resolver
  const getCategoryMockupImage = (category: string) => {
    switch (category) {
      case 'Offensive Security': return offensiveSecurityImg;
      case 'Defensive Security': return defensiveSecurityImg;
      case 'Infrastructure Security': return infraSecurityImg;
      case 'Web/Mobile Apps': return webMobileAppsImg;
      case 'UX/UI & Flyers': return uxUiFlyersImg;
      default: return defensiveSecurityImg;
    }
  };

  return (
    <section id="portfolio-section" className="py-24 px-4 sm:px-12 bg-brand-bg-section relative overflow-hidden border-t border-brand-border transition-colors duration-300">
      
      {/* Absolute glow design element with parallax effect */}
      <motion.div 
        style={{ y: scrollY * 0.15 }}
        className="absolute left-[15%] top-[15%] w-[450px] h-[450px] bg-purple-600/5 rounded-full blur-[130px] pointer-events-none" 
      />
      
      <div className="max-w-7xl mx-auto z-10 relative">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16 space-y-4">
          <div className="flex items-center space-x-2 text-purple-400 select-none">
            <Sparkles size={14} className="animate-pulse" />
            <h2 className="text-xs tracking-[0.5em] uppercase font-bold">RECENT BUILD RECORDS</h2>
          </div>
          <div className="h-[1px] w-full bg-gradient-to-r from-purple-500 to-transparent opacity-30 my-4"></div>
          
          <h1 className="text-4xl sm:text-6xl font-black uppercase tracking-tight text-brand-text-white select-none">
            Portfolio Showcase
          </h1>

          <p className="text-sm leading-relaxed text-brand-text-muted border-l-2 border-purple-600 pl-4 max-w-2xl">
            Explore case studies and web layout results built with pristine standards. Transition seamlessly across technologies to verify our aesthetic design consistency.
          </p>
        </div>

        {/* Filter Toolbar Shell */}
        <div className="bg-brand-bg-card border border-brand-border rounded-3xl p-6 sm:p-8 mb-12 space-y-6 shadow-sm transition-colors duration-300">
          
          {/* Header of Filters */}
          <div className="flex items-center space-x-2 text-purple-400">
            <Filter size={14} />
            <span className="text-[10px] tracking-[0.2em] font-mono uppercase font-bold">Filter Controls</span>
          </div>

          {/* Filtering Layout Row: Category */}
          <div className="flex flex-col gap-3">
            <span className="text-xs font-bold text-brand-text-light uppercase tracking-wider font-mono">
              [CATEGORY]
            </span>
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    selectedCategory === cat
                      ? 'bg-purple-600 text-white shadow-md shadow-purple-500/20'
                      : 'bg-brand-bg-card border border-brand-border text-brand-text-muted hover:text-brand-text-white hover:border-purple-500/40'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Filtering Layout Row: Technology */}
          <div className="flex flex-col gap-3 pt-2">
            <span className="text-xs font-bold text-brand-text-light uppercase tracking-wider font-mono">
              [TECHNICAL ENGINE]
            </span>
            <div className="flex flex-wrap gap-2">
              {technologies.map((tech) => (
                <button
                  key={tech}
                  onClick={() => setSelectedTech(tech)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    selectedTech === tech
                      ? 'bg-purple-600 text-white shadow-md shadow-purple-500/20'
                      : 'bg-brand-bg-card border border-brand-border text-brand-text-muted hover:text-brand-text-white hover:border-purple-500/40'
                  }`}
                >
                  {tech === 'All' ? 'All Tech' : tech}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Dynamic Interactive Portfolio Grid with Layout Animation */}
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 min-h-[400px]"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <motion.div
                layout
                key={project.id}
                initial={{ opacity: 0, scale: 0.9, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 15 }}
                whileHover={{ 
                  y: -10, 
                  boxShadow: '0 20px 40px -15px rgba(139, 92, 246, 0.15)'
                }}
                transition={{ duration: 0.4, ease: 'easeOut' }}
                className="bg-brand-bg-card border border-brand-border hover:border-purple-500/50 rounded-3xl p-5 sm:p-6 flex flex-col justify-between space-y-5 hover:bg-brand-bg-card-hover transition-all duration-300 group"
              >
                {/* Project Mockup Canvas Visualizer (Referencing image asset mock style) */}
                <div className="relative aspect-video rounded-2xl overflow-hidden border border-brand-border group-hover:border-purple-500/40 transition-all duration-300 select-none flex flex-col justify-between p-4 bg-brand-bg-section/80">
                  {/* Category Mockup Image Background */}
                  <img
                    src={getCategoryMockupImage(project.category)}
                    alt={`${project.category} Mockup`}
                    referrerPolicy="no-referrer"
                    className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:opacity-60 group-hover:scale-110 transition-all duration-700 ease-out pointer-events-none"
                  />
                  {/* Subtle layout protective gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-bg-section/95 via-brand-bg-section/55 to-brand-bg-section/20 group-hover:via-brand-bg-section/45 transition-colors duration-300 pointer-events-none" />
                  
                  {/* Dynamic interactive glow that follows general center on hover */}
                  <div className="absolute -inset-10 bg-gradient-to-tr from-purple-500/0 via-purple-500/10 to-violet-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none blur-xl" />

                  {/* Browser Chrome Visual Header mock */}
                  <div className="flex items-center justify-between w-full border-b border-brand-border/40 pb-2 z-10 transition-all duration-300 group-hover:border-purple-500/25">
                    <div className="flex space-x-1.5">
                      <span className="w-2 h-2 rounded-full bg-red-500/40 group-hover:bg-red-500/60 transition-colors" />
                      <span className="w-2 h-2 rounded-full bg-amber-500/40 group-hover:bg-amber-500/60 transition-colors" />
                      <span className="w-2 h-2 rounded-full bg-emerald-500/40 group-hover:bg-emerald-500/60 transition-colors" />
                    </div>
                    <span className="text-[8px] font-mono text-brand-text-dim lowercase tracking-wide border border-brand-border/30 group-hover:border-purple-500/20 px-2 py-0.5 rounded-md bg-brand-bg-section/70 backdrop-blur-sm group-hover:bg-purple-950/40 transition-colors">
                      https://{project.client.toLowerCase().replace(/\s+/g, '')}.com
                    </span>
                  </div>

                  <div className="flex flex-col items-center justify-center py-4 z-10 text-center space-y-1 relative">
                    {/* Floating status tag that appears on hover */}
                    <div className="absolute -top-4 opacity-0 group-hover:opacity-100 group-hover:-top-3 transition-all duration-300">
                      <span className="text-[8px] font-mono tracking-widest font-extrabold uppercase text-purple-300 bg-purple-900/60 border border-purple-500/30 px-1.5 py-0.5 rounded-md bg-opacity-70">
                        active build
                      </span>
                    </div>

                    <span className="text-xl font-black text-brand-text-white tracking-tight uppercase group-hover:scale-105 transition-transform duration-300 drop-shadow-md">
                      {project.client}
                    </span>
                    <span className="text-[10px] font-mono text-purple-400 uppercase tracking-widest bg-purple-950/80 border border-purple-900/40 group-hover:border-purple-500/40 px-3 py-1 rounded-full backdrop-blur-sm transition-all duration-300">
                      {project.category}
                    </span>
                  </div>

                  {/* Tech stack items row */}
                  <div className="flex flex-wrap gap-1.5 z-10 w-full pt-2">
                    {project.technologies.map((t, index) => (
                      <motion.span 
                        key={t} 
                        whileHover={{ 
                          scale: 1.05, 
                          color: '#f8fafc',
                          borderColor: 'rgba(168, 85, 247, 0.6)',
                          backgroundColor: 'rgba(88, 28, 135, 0.4)' 
                        }}
                        className="text-[8px] font-mono uppercase bg-brand-bg-section/90 border border-brand-border/40 text-brand-text-dim px-2 py-0.5 rounded-md backdrop-blur-sm transition-colors duration-200 cursor-default"
                      >
                        {t}
                      </motion.span>
                    ))}
                  </div>
                </div>

                {/* Info and detail section */}
                <div className="space-y-4 flex-1 flex flex-col justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-bold text-brand-text-white uppercase tracking-tight group-hover:text-purple-300 transition-colors duration-300">
                        {project.title}
                      </h3>
                      <ExternalLink size={14} className="text-brand-text-dim/60 group-hover:text-purple-400 group-hover:rotate-12 transition-all duration-300" />
                    </div>
                    <p className="text-xs sm:text-sm text-brand-text-muted leading-relaxed group-hover:text-brand-text-light transition-colors duration-300">
                      {project.description}
                    </p>
                    <div className="pt-2">
                      <span className="inline-block text-[10px] font-mono text-purple-300 bg-purple-950/30 border border-purple-900/40 px-2.5 py-1 rounded-md group-hover:border-purple-500/30 transition-all duration-300">
                        <span className="text-brand-text-dim group-hover:text-purple-400 transition-colors mr-1">STACK:</span>
                        {project.technologies.join(', ')}
                      </span>
                    </div>
                  </div>

                  {/* Actions Bar inside card component */}
                  <div className="pt-2">
                    <motion.button
                      whileTap={{ scale: 0.98 }}
                      whileHover={{ 
                        scale: 1.01,
                        backgroundColor: 'rgba(147, 51, 234, 0.12)'
                      }}
                      onClick={() => onStartProject(`Portfolio Request: ${project.title} (${project.client})`)}
                      className="w-full py-3 px-4 rounded-xl border border-brand-border text-brand-text-muted hover:text-brand-text-white hover:border-purple-500/50 text-[10px] font-bold tracking-widest uppercase transition-all cursor-pointer bg-transparent"
                    >
                      Request Similar Service ↗
                    </motion.button>
                  </div>
                </div>

              </motion.div>
            ))}
          </AnimatePresence>

          {/* Zero Projects Fallback state */}
          {filteredProjects.length === 0 && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="col-span-1 md:col-span-2 lg:col-span-3 py-16 text-center space-y-4 border border-brand-border-muted bg-brand-bg-card rounded-3xl"
            >
              <div className="mx-auto w-12 h-12 rounded-full border border-brand-border flex items-center justify-center text-purple-500">
                <Layers size={20} />
              </div>
              <h4 className="text-sm font-bold uppercase text-brand-text-white font-mono tracking-widest">[NO_RECORDS_FOUND]</h4>
              <p className="text-xs text-brand-text-muted max-w-sm mx-auto">
                No archived builds found matching {selectedCategory === 'All' ? 'any category' : selectedCategory} and {selectedTech === 'All' ? 'any tech' : selectedTech}. Adjust filter queries to reload.
              </p>
              <button
                onClick={() => { setSelectedCategory('All'); setSelectedTech('All'); }}
                className="px-4 py-2 border border-purple-500 text-purple-400 hover:bg-purple-600 hover:text-white rounded-xl text-xs font-bold uppercase transition-all cursor-pointer"
              >
                Clear Active Filters
              </button>
            </motion.div>
          )}

        </motion.div>

      </div>
    </section>
  );
}
