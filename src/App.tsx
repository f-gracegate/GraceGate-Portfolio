/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { ArrowUp, MessageSquare } from 'lucide-react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import LogoCloud from './components/LogoCloud';
import ServicesSection from './components/ServicesSection';
import PortfolioSection from './components/PortfolioSection';
import WhyChooseSection from './components/WhyChooseSection';
import TestimonialsSection from './components/TestimonialsSection';
import CTAAndFooter from './components/CTAAndFooter';
import ServiceRequestModal from './components/ServiceRequestModal';

export default function App() {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState('');
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  // Theme support
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    const saved = localStorage.getItem('gracegate_theme');
    if (saved === 'light') return 'light';
    return 'dark'; // Dark mode is our default deep purple theme
  });

  // Track and apply the active theme class on the document root
  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'light') {
      root.classList.add('light');
    } else {
      root.classList.remove('light');
    }
    localStorage.setItem('gracegate_theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  // Monitor vertical scroll heights to toggle back-to-top button
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Scroll triggers utilities
  const scrollToId = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleRequestService = (serviceTitle: string) => {
    setSelectedService(serviceTitle);
    setModalOpen(true);
  };

  const handleGeneralHire = () => {
    setSelectedService('');
    setModalOpen(true);
  };

  return (
    <div className="bg-brand-bg-main font-sans text-brand-text-light min-h-screen relative selection:bg-purple-500/30 selection:text-purple-200 transition-colors duration-300">
      
      {/* 1. Header Navigation Bar */}
      <Navbar 
        onContactClick={handleGeneralHire}
        onServicesClick={() => scrollToId('services-section')}
        onWhyChooseClick={() => scrollToId('why-choose-section')}
        onTestimonialsClick={() => scrollToId('testimonials-section')}
        onPortfolioClick={() => scrollToId('portfolio-section')}
        isDarkMode={theme === 'dark'}
        onToggleTheme={toggleTheme}
      />

      {/* 2. Hero Header Arena */}
      <HeroSection 
        onHireMeClick={handleGeneralHire}
        onViewPortfolioClick={() => scrollToId('portfolio-section')}
        scrollY={scrollY}
      />

      {/* 3. Logo Slider Block */}
      <LogoCloud />

      {/* 4. Complete Services Arena */}
      <ServicesSection onRequestService={handleRequestService} scrollY={scrollY} />

      {/* NEW: Portfolio Projects Showcase with technology/category filters */}
      <PortfolioSection onStartProject={handleRequestService} scrollY={scrollY} />

      {/* 5. Core why choose pillars */}
      <WhyChooseSection onStartProject={handleGeneralHire} />

      {/* 6. Client Star Ratings Feed */}
      <TestimonialsSection />

      {/* 7. Bottom ready banner and links footer */}
      <CTAAndFooter 
        onQuoteClick={handleGeneralHire}
        onServicesClick={() => scrollToId('services-section')}
        onWhyChooseClick={() => scrollToId('why-choose-section')}
        onTestimonialsClick={() => scrollToId('testimonials-section')}
        onPortfolioClick={() => scrollToId('portfolio-section')}
      />

      {/* Interactive Inquiries / Quote Modal */}
      <ServiceRequestModal 
        isOpen={modalOpen} 
        onClose={() => setModalOpen(false)} 
        preselectedService={selectedService} 
      />

      {/* Floating Auxiliary Utility Action Widgets */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col items-center space-y-3">
        {/* Pulsing Active Whatsapp Widget (referenced in image 6) */}
        <a 
          href="https://wa.me/233554057773"
          target="_blank"
          rel="noopener noreferrer"
          className="w-12 h-12 rounded-full bg-green-500 hover:bg-green-400 text-white flex items-center justify-center shadow-lg shadow-green-500/20 active:scale-95 transition-all animate-bounce-subtle cursor-pointer"
          title="Direct Message on WhatsApp"
        >
          <MessageSquare size={20} />
        </a>

        {/* Home Back to Top Trigger (referenced in image 6 footer margin arrow) */}
        {showScrollTop && (
          <button 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="w-10 h-10 rounded-full bg-[#150a26]/90 border border-purple-500/20 hover:border-purple-500/50 hover:bg-purple-900/40 text-purple-400 flex items-center justify-center shadow-xl active:scale-95 transition-all cursor-pointer animate-fade-in"
            title="Scroll To Top"
          >
            <ArrowUp size={16} />
          </button>
        )}
      </div>

    </div>
  );
}
