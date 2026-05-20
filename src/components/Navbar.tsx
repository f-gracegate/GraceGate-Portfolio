/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { Linkedin, Compass, Instagram, Facebook, Menu, X, Sun, Moon } from 'lucide-react';

interface NavbarProps {
  onContactClick: () => void;
  onServicesClick: () => void;
  onWhyChooseClick: () => void;
  onTestimonialsClick: () => void;
  onPortfolioClick: () => void;
  isDarkMode: boolean;
  onToggleTheme: () => void;
}

export default function Navbar({
  onContactClick,
  onServicesClick,
  onWhyChooseClick,
  onTestimonialsClick,
  onPortfolioClick,
  isDarkMode,
  onToggleTheme,
}: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-brand-bg-section/90 backdrop-blur-md border-b border-brand-border px-4 py-3 sm:px-8 sm:py-4 transition-all duration-300">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Brand Logo */}
        <div className="flex items-center space-x-2">
          <span className="text-xl font-black tracking-widest font-sans uppercase text-brand-text-white">
            Grace<span className="bg-gradient-to-r from-purple-400 to-violet-500 bg-clip-text text-transparent">Gate</span>
          </span>
        </div>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center space-x-8 text-[11px] tracking-[0.22em] font-semibold uppercase text-brand-text-light">
          <button 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} 
            className="hover:text-brand-text-white transition-colors cursor-pointer"
          >
            Home
          </button>
          <button 
            onClick={onWhyChooseClick} 
            className="hover:text-brand-text-white transition-colors cursor-pointer"
          >
            About
          </button>
          <button 
            onClick={onServicesClick} 
            className="hover:text-brand-text-white transition-colors cursor-pointer"
          >
            Services
          </button>
          <button 
            onClick={onPortfolioClick} 
            className="hover:text-brand-text-white transition-colors cursor-pointer"
          >
            Portfolio
          </button>
          <button 
            onClick={onTestimonialsClick} 
            className="hover:text-brand-text-white transition-colors cursor-pointer"
          >
            Reviews
          </button>
          
          {/* Theme Toggle Button - Desktop */}
          <button
            onClick={onToggleTheme}
            className="p-2 rounded-full hover:bg-white/10 text-brand-text-light hover:text-brand-text-white transition-all transform hover:scale-110 active:scale-95 cursor-pointer flex items-center justify-center border border-brand-border"
            title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            aria-label="Toggle Theme"
          >
            {isDarkMode ? <Sun size={14} className="text-amber-400" /> : <Moon size={14} className="text-purple-500" />}
          </button>

          <button 
            onClick={onContactClick} 
            className="px-4.5 py-2 rounded-full bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-500 hover:to-violet-500 text-white font-bold text-[10px] tracking-widest uppercase shadow-md shadow-purple-500/20 hover:shadow-purple-500/30 transition-all transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
          >
            Hire Me ↗
          </button>
        </div>

        {/* Socials + Call to Action */}
        <div className="hidden lg:flex items-center space-x-6">
          <div className="flex items-center space-x-4 text-purple-450 text-brand-text-muted">
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-brand-text-white transition-colors">
              <Linkedin size={17} />
            </a>
            <a href="https://behance.net" target="_blank" rel="noopener noreferrer" className="hover:text-brand-text-white transition-colors">
              <Compass size={17} />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-brand-text-white transition-colors">
              <Instagram size={17} />
            </a>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-brand-text-white transition-colors">
              <Facebook size={17} />
            </a>
          </div>
        </div>

        {/* Mobile menu indicator */}
        <div className="flex items-center space-x-3 md:hidden">
          {/* Theme Toggle Button - Mobile Header */}
          <button
            onClick={onToggleTheme}
            className="p-2 rounded-full hover:bg-white/10 text-brand-text-light hover:text-brand-text-white transition-colors cursor-pointer flex items-center justify-center border border-brand-border/40"
            title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            aria-label="Toggle Theme"
          >
            {isDarkMode ? <Sun size={14} className="text-amber-400" /> : <Moon size={14} className="text-indigo-600" />}
          </button>

          <button
            onClick={onContactClick}
            className="px-4 py-1.5 rounded-full bg-purple-600 text-white font-bold text-[10px] tracking-widest uppercase cursor-pointer"
          >
            Hire Me
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="text-brand-text-muted hover:text-brand-text-white transition-colors cursor-pointer"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden mt-3 bg-brand-bg-section border border-brand-border rounded-2xl p-4 absolute left-4 right-4 z-50 shadow-2xl backdrop-blur-lg">
          <div className="flex flex-col space-y-3 text-[11px] tracking-widest font-bold uppercase text-brand-text-light">
            <button 
              onClick={() => { window.scrollTo({ top: 0, behavior: 'smooth' }); setMobileMenuOpen(false); }} 
              className="text-left py-2 hover:text-brand-text-white border-b border-brand-border"
            >
              Home
            </button>
            <button 
              onClick={() => { onWhyChooseClick(); setMobileMenuOpen(false); }} 
              className="text-left py-2 hover:text-brand-text-white border-b border-brand-border"
            >
              About
            </button>
            <button 
              onClick={() => { onServicesClick(); setMobileMenuOpen(false); }} 
              className="text-left py-2 hover:text-brand-text-white border-b border-brand-border"
            >
              Services
            </button>
            <button 
              onClick={() => { onPortfolioClick(); setMobileMenuOpen(false); }} 
              className="text-left py-2 hover:text-brand-text-white border-b border-brand-border"
            >
              Portfolio
            </button>
            <button 
              onClick={() => { onTestimonialsClick(); setMobileMenuOpen(false); }} 
              className="text-left py-2 hover:text-brand-text-white border-b border-brand-border"
            >
              Reviews
            </button>
            <button 
              onClick={() => { onContactClick(); setMobileMenuOpen(false); }} 
              className="text-left py-2 hover:text-brand-text-white flex items-center gap-2"
            >
              <span className="w-2.5 h-2.5 rounded-full bg-purple-500 animate-pulse"></span>
              Contact Me
            </button>
            
            <div className="flex items-center space-x-4 pt-2 text-purple-400 justify-center">
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                <Linkedin size={20} />
              </a>
              <a href="https://behance.net" target="_blank" rel="noopener noreferrer">
                <Compass size={20} />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                <Instagram size={20} />
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                <Facebook size={20} />
              </a>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
