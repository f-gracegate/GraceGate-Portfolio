/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Linkedin, Compass, Instagram, Facebook, Mail, Phone, ExternalLink, MessageSquareText, Sparkles, Check, Server } from 'lucide-react';
import { saveContactMessage, ContactMessage } from '../supabase';

interface CTAAndFooterProps {
  onQuoteClick: () => void;
  onServicesClick: () => void;
  onWhyChooseClick: () => void;
  onTestimonialsClick: () => void;
  onPortfolioClick: () => void;
}

export default function CTAAndFooter({
  onQuoteClick,
  onServicesClick,
  onWhyChooseClick,
  onTestimonialsClick,
  onPortfolioClick,
}: CTAAndFooterProps) {
  // Mini contact form directly inside footer
  const [footerName, setFooterName] = useState('');
  const [footerEmail, setFooterEmail] = useState('');
  const [footerMsg, setFooterMsg] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [isLocal, setIsLocal] = useState(false);

  // General bottom form handler
  const handleQuickContact = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!footerName || !footerEmail || !footerMsg) return;

    setLoading(true);
    const payload: ContactMessage = {
      name: footerName,
      email: footerEmail,
      message: footerMsg,
    };

    const res = await saveContactMessage(payload);
    setLoading(false);
    if (res.success) {
      setSuccess(true);
      setIsLocal(res.isLocalFallback);
      // Reset
      setFooterName('');
      setFooterEmail('');
      setFooterMsg('');
      setTimeout(() => setSuccess(false), 5500);
    }
  };

  return (
    <footer id="footer-section" className="bg-brand-bg-section text-brand-text-light pt-24 pb-8 px-4 sm:px-12 relative overflow-hidden border-t border-brand-border transition-colors duration-300">
      
      {/* 1. Large CTA Box: Ready to Start */}
      <div className="max-w-5xl mx-auto bg-brand-bg-card border border-brand-border rounded-[2.5rem] p-8 sm:p-12 lg:p-14 text-center space-y-6 relative overflow-hidden shadow-2xl mb-20 transition-colors duration-300">
        <div className="absolute top-[0%] left-[0%] w-[300px] h-[300px] bg-purple-500/10 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-[0%] right-[0%] w-[250px] h-[250px] bg-violet-600/10 rounded-full blur-[90px] pointer-events-none" />

        <div className="flex items-center justify-center space-x-2 text-purple-400">
          <Sparkles size={14} />
          <span className="text-xs font-mono tracking-[0.3em] font-bold uppercase text-purple-400">READY TO COLLABORATE?</span>
        </div>

        <h3 className="text-3xl sm:text-5xl font-black text-brand-text-white uppercase tracking-tight max-w-2xl mx-auto leading-none">
          Let's Build Something Dynamic
        </h3>

        <p className="text-sm leading-relaxed text-brand-text-muted max-w-lg mx-auto">
          Turn your layout goals into high-converting digital presence. Let's discuss your project parameters today — no strings, just execution.
        </p>

        {/* Action triggers */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4 shrink-0">
          <button
            onClick={onQuoteClick}
            className="w-full sm:w-auto px-8 py-4 rounded-full bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-500 hover:to-violet-500 text-white font-black text-xs tracking-widest uppercase shadow-xl shadow-purple-500/20 transition-all hover:scale-105 active:scale-100 cursor-pointer"
          >
            Get estimate ↗
          </button>
          
          <a
            href="https://wa.me/233554057773"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-8 py-4 rounded-full bg-brand-bg-section border border-brand-border text-brand-text-muted hover:text-brand-text-white hover:border-brand-border hover:bg-brand-bg-card-hover transition-all flex items-center justify-center space-x-2 text-xs font-black tracking-widest uppercase cursor-pointer"
          >
            <MessageSquareText size={14} />
            <span>WhatsApp</span>
          </a>
        </div>
      </div>

      {/* 2. Primary Columns Block */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 border-b border-brand-border pb-16">
        
        {/* Brand & Socials Info — Spans 5 columns */}
        <div className="lg:col-span-5 space-y-6">
          <span className="text-xl font-black uppercase tracking-widest text-brand-text-white block">
            Grace<span className="bg-gradient-to-r from-purple-400 to-violet-400 bg-clip-text text-transparent">Gate</span>
          </span>

          <p className="text-sm text-brand-text-muted leading-relaxed max-w-sm">
            Cybersecurity graduate from Kwame Nkrumah University of Science and Technology (KNUST). Specializing in penetration testing, vulnerability assessment, secure enterprise routing, and CEHv11 audit frameworks.
          </p>

          <div className="flex items-center space-x-3 pt-2">
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-brand-bg-card border border-brand-border hover:border-purple-500/40 text-purple-400 hover:text-brand-text-white flex items-center justify-center transition-all">
              <Linkedin size={16} />
            </a>
            <a href="https://behance.net" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-brand-bg-card border border-brand-border hover:border-purple-500/40 text-purple-400 hover:text-brand-text-white flex items-center justify-center transition-all">
              <Compass size={16} />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-brand-bg-card border border-brand-border hover:border-purple-500/40 text-purple-400 hover:text-brand-text-white flex items-center justify-center transition-all">
              <Instagram size={16} />
            </a>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-brand-bg-card border border-brand-border hover:border-purple-500/40 text-purple-400 hover:text-brand-text-white flex items-center justify-center transition-all">
              <Facebook size={16} />
            </a>
          </div>
        </div>

        {/* Footer Navigation Tabs — Spans 4 Columns */}
        <div className="lg:col-span-3 grid grid-cols-2 gap-6">
          <div className="space-y-4">
            <h4 className="text-[10px] font-bold tracking-[0.25em] uppercase text-purple-400">Quick Links</h4>
            <ul className="space-y-2 text-xs uppercase tracking-wide text-brand-text-light">
              <li>
                <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="hover:text-brand-text-white transition-colors cursor-pointer text-left">
                  Home
                </button>
              </li>
              <li>
                <button onClick={onWhyChooseClick} className="hover:text-brand-text-white transition-colors cursor-pointer text-left">
                  About
                </button>
              </li>
              <li>
                <button onClick={onServicesClick} className="hover:text-brand-text-white transition-colors cursor-pointer text-left">
                  Services
                </button>
              </li>
              <li>
                <button onClick={onPortfolioClick} className="hover:text-brand-text-white transition-colors cursor-pointer text-left">
                  Portfolio
                </button>
              </li>
              <li>
                <button onClick={onTestimonialsClick} className="hover:text-brand-text-white transition-colors cursor-pointer text-left">
                  Reviews
                </button>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="text-[10px] font-bold tracking-[0.25em] uppercase text-purple-400">Services</h4>
            <ul className="space-y-2 text-xs uppercase tracking-wide text-brand-text-light">
              <li>
                <button onClick={onServicesClick} className="hover:text-brand-text-white transition-colors cursor-pointer text-left">
                  Penetration Testing
                </button>
              </li>
              <li>
                <button onClick={onServicesClick} className="hover:text-brand-text-white transition-colors cursor-pointer text-left">
                  Web &amp; Mobile Apps
                </button>
              </li>
              <li>
                <button onClick={onServicesClick} className="hover:text-brand-text-white transition-colors cursor-pointer text-left">
                  UI/UX Design
                </button>
              </li>
              <li>
                <button onClick={onServicesClick} className="hover:text-brand-text-white transition-colors cursor-pointer text-left">
                  Graphic Flyers &amp; Branding
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Live Message Form — Spans 4 columns */}
        <div className="lg:col-span-4 space-y-4">
          <h4 className="text-[10px] font-bold tracking-[0.25em] uppercase text-purple-400">Quick Queries</h4>
          
          {success ? (
            <div className="p-4 bg-purple-950/40 border border-purple-500/20 rounded-2xl text-[11px] leading-relaxed text-purple-200 space-y-2">
              <div className="flex items-center space-x-1.5 text-purple-400 font-bold">
                <Check size={14} />
                <span>Message Received!</span>
              </div>
              <p>Thanks for getting in touch. I will answer your questions promptly.</p>
              {isLocal && (
                <div className="text-[9px] text-gray-500 flex items-center space-x-1 border-t border-purple-950/50 pt-1.5 mt-1">
                  <Server size={10} />
                  <span>Logged in local memory fallback</span>
                </div>
              )}
            </div>
          ) : (
            <form onSubmit={handleQuickContact} className="space-y-2.5">
              <input
                type="text"
                required
                className="w-full bg-brand-bg-card border border-brand-border hover:border-purple-500/30 focus:border-purple-500 rounded-xl px-3.5 py-2.5 text-brand-text-white text-xs outline-none transition-all placeholder:text-purple-400/40 bg-opacity-40"
                placeholder="YOUR NAME"
                value={footerName}
                onChange={(e) => setFooterName(e.target.value)}
              />
              <input
                type="email"
                required
                className="w-full bg-brand-bg-card border border-brand-border hover:border-purple-500/30 focus:border-purple-500 rounded-xl px-3.5 py-2.5 text-brand-text-white text-xs outline-none transition-all placeholder:text-purple-400/40 bg-opacity-40"
                placeholder="YOUR EMAIL"
                value={footerEmail}
                onChange={(e) => setFooterEmail(e.target.value)}
              />
              <textarea
                required
                rows={2}
                className="w-full bg-brand-bg-card border border-brand-border hover:border-purple-500/30 focus:border-purple-500 rounded-xl px-3.5 py-2.5 text-brand-text-white text-xs outline-none transition-all resize-none placeholder:text-purple-400/40 bg-opacity-40"
                placeholder="PROPOSAL DETAIL..."
                value={footerMsg}
                onChange={(e) => setFooterMsg(e.target.value)}
              />
              <button
                type="submit"
                disabled={loading}
                className="w-full py-2.5 bg-brand-bg-card border border-brand-border hover:bg-purple-600 hover:text-white text-purple-300 text-xs font-bold rounded-xl tracking-widest uppercase transition-all cursor-pointer disabled:opacity-50"
              >
                {loading ? 'Sending...' : 'SEND QUERY ↗'}
              </button>
            </form>
          )}

          <div className="space-y-2 pt-1.5">
            <div className="flex items-center space-x-2.5 text-xs text-brand-text-light">
              <Mail size={14} className="text-purple-400" />
              <a href="mailto:gracefrancis0895@gmail.com" className="hover:text-brand-text-white transition-colors">
                gracefrancis0895@gmail.com
              </a>
            </div>
            <div className="flex items-center space-x-2.5 text-xs text-brand-text-light">
              <Phone size={14} className="text-purple-400" />
              <span>+233 55 405 7773</span>
            </div>
          </div>
        </div>

      </div>

      {/* 3. Bottom Credits Footer */}
      <div className="max-w-7xl mx-auto pt-8 flex flex-col sm:flex-row items-center justify-between text-[11px] font-mono tracking-wider text-purple-400 uppercase space-y-4 sm:space-y-0">
        <div>
          <span>© 2026 GraceGate Studio. Accra, Ghana</span>
        </div>
        
        <div className="flex items-center space-x-4">
          <a href="https://supabase.com" target="_blank" rel="noopener noreferrer" className="hover:text-white flex items-center space-x-1.5 transition-colors">
            <span>Supabase Cloud Integration</span>
            <ExternalLink size={11} />
          </a>
        </div>
      </div>

    </footer>
  );
}
