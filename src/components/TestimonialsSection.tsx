/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Star, Check, Sparkles } from 'lucide-react';
import { TESTIMONIALS_DATA } from '../data';
import { TestimonialItem } from '../types';

export default function TestimonialsSection() {
  const [testimonials, setTestimonials] = useState<TestimonialItem[]>([]);
  
  // Form submission state
  const [rating, setRating] = useState<number>(5);
  const [hoveredRating, setHoveredRating] = useState<number | null>(null);
  const [text, setText] = useState<string>('');
  const [author, setAuthor] = useState<string>('');
  const [role, setRole] = useState<string>('');
  const [initials, setInitials] = useState<string>('');
  const [success, setSuccess] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const [loading, setLoading] = useState<boolean>(true);

  // Load from static and localStorage on mount
  useEffect(() => {
    let isMounted = true;
    setLoading(true);

    const fetchTestimonials = async () => {
      // Simulate fetch delay from Supabase/device storage
      await new Promise((resolve) => setTimeout(resolve, 800));

      if (!isMounted) return;

      const saved = localStorage.getItem('gracegate_testimonials');
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          setTestimonials([...TESTIMONIALS_DATA, ...parsed]);
        } catch (e) {
          setTestimonials(TESTIMONIALS_DATA);
        }
      } else {
        setTestimonials(TESTIMONIALS_DATA);
      }
      setLoading(false);
    };

    fetchTestimonials();

    return () => {
      isMounted = false;
    };
  }, []);

  // Sync initials field gracefully when the author name changes
  const handleAuthorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setAuthor(val);
    if (val) {
      const parts = val.trim().split(/\s+/);
      const computedInitials = parts
        .map((p) => p[0])
        .join('')
        .slice(0, 2)
        .toUpperCase();
      setInitials(computedInitials);
    } else {
      setInitials('');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!text.trim()) {
      setError('Please provide a quote/review text.');
      return;
    }
    if (!author.trim()) {
      setError('Please provide your name.');
      return;
    }
    if (!role.trim()) {
      setError('Please provide your organization or role.');
      return;
    }
    if (!initials.trim()) {
      setError('Please provide your initials.');
      return;
    }

    const newTestimonial: TestimonialItem = {
      id: `custom-${Date.now()}`,
      rating,
      text: text.trim(),
      author: author.trim(),
      role: role.trim(),
      initials: initials.trim().toUpperCase().slice(0, 3)
    };

    try {
      const currentSavedStr = localStorage.getItem('gracegate_testimonials');
      const currentSaved = currentSavedStr ? JSON.parse(currentSavedStr) : [];
      const updatedSaved = [...currentSaved, newTestimonial];
      localStorage.setItem('gracegate_testimonials', JSON.stringify(updatedSaved));

      // Update state live immediately
      setTestimonials([...TESTIMONIALS_DATA, ...updatedSaved]);
      
      // Clear form & trigger success screen
      setText('');
      setAuthor('');
      setRole('');
      setInitials('');
      setRating(5);
      setSuccess(true);
      
      // Clear message after timeout
      setTimeout(() => setSuccess(false), 5000);
    } catch (err) {
      setError('Failed to save to device storage.');
    }
  };

  return (
    <section id="testimonials-section" className="py-24 px-4 sm:px-12 bg-brand-bg-section relative overflow-hidden transition-colors duration-300">
      {/* Absolute glow design element */}
      <div className="absolute top-[-10%] left-[10%] w-[350px] h-[350px] bg-purple-600/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto space-y-20">
        
        {/* Section Title with bold tracking and divider line */}
        <div className="space-y-4 max-w-3xl">
          <h2 className="text-xs tracking-[0.5em] uppercase font-bold text-purple-400">CLIENT SERIES FEEDBACK</h2>
          <div className="h-[1px] w-full bg-gradient-to-r from-purple-500 to-transparent opacity-30 my-4"></div>

          <h1 className="text-4xl sm:text-6xl font-black uppercase text-brand-text-white tracking-tight leading-none">
            Kind Words
          </h1>

          <p className="text-sm leading-relaxed text-brand-text-muted border-l-2 border-purple-600 pl-4 max-w-2xl">
            Vouched feedback and recommendations from academic laboratory instructors, institutional supervisors, and IT directors highlighting my defensive security competence and technical support.
          </p>
        </div>

        {/* Master Multi-Column Layout: Feed + Dynamic Submission Block */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Column 1: Feed Container — Spans 7 columns on large desktop view */}
          <div className="lg:col-span-7 space-y-6">
            <div className="flex justify-between items-center pb-2">
              <span className="text-[10px] tracking-[0.25em] font-sans font-bold uppercase text-purple-400">
                TRUSTED LOG FEED ({loading ? '...' : testimonials.length})
              </span>
              <span className="text-xs text-brand-text-dim font-mono">[LIVE_RECORDS]</span>
            </div>
            
            {loading ? (
              <div className="flex flex-col items-center justify-center py-20 px-4 border border-dashed border-purple-900/30 rounded-3xl bg-[#110926]/10 text-center space-y-4">
                <div className="w-10 h-10 rounded-full border-2 border-purple-500 border-t-transparent animate-spin" />
                <span className="text-xs font-mono text-purple-400 tracking-widest uppercase animate-pulse">
                  Loading testimonials...
                </span>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {testimonials.map((item, idx) => (
                  <TestimonialCard key={item.id} review={item} index={idx + 1} />
                ))}
              </div>
            )}
          </div>

          {/* Column 2: Review Submission Form — Spans 5 columns */}
          <div className="lg:col-span-5 bg-brand-bg-card border border-brand-border rounded-3xl p-6 sm:p-8 space-y-6 relative overflow-hidden transition-colors duration-300">
            <div className="absolute top-0 right-0 w-[150px] h-[150px] bg-purple-500/5 rounded-full blur-[60px] pointer-events-none" />
            
            <div className="space-y-2">
              <div className="flex items-center space-x-2 text-purple-400">
                <Sparkles size={14} className="animate-pulse" />
                <span className="text-[10px] tracking-[0.3em] font-bold uppercase">SHARE YOUR EXPERIENCE</span>
              </div>
              <h3 className="text-2xl font-black text-brand-text-white uppercase tracking-tight">Add Testimonial</h3>
              <p className="text-xs text-brand-text-muted leading-relaxed">
                Your partnership fuels our build cycle. Submit your ratings and reviews to be featured in the trusted client section live.
              </p>
            </div>

            {success && (
              <div className="p-4 bg-green-950/35 border border-green-500/25 rounded-2xl text-[11px] leading-relaxed text-green-200">
                <div className="flex items-center space-x-1.5 text-green-400 font-bold uppercase tracking-wider mb-1">
                  <Check size={14} />
                  <span>Submission Successful</span>
                </div>
                Your quote has been appended to the feedback database and is now on review. Thank you!
              </div>
            )}

            {error && (
              <div className="p-4 bg-red-950/45 border border-red-500/20 rounded-2xl text-[11px] leading-relaxed text-red-300">
                <span className="font-bold">Error:</span> {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              
              {/* Interactive SVG Star Selector Box */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold tracking-widest text-purple-400 uppercase block">
                  Select Rating
                </label>
                <div className="flex items-center space-x-1 bg-brand-bg-card border border-brand-border rounded-xl p-3 max-w-max">
                  {[1, 2, 3, 4, 5].map((starVal) => {
                    const isActive = hoveredRating !== null ? starVal <= hoveredRating : starVal <= rating;
                    return (
                      <button
                        type="button"
                        key={starVal}
                        className="cursor-pointer text-purple-900 hover:scale-110 transition-transform p-0.5 focus:outline-none"
                        onClick={() => setRating(starVal)}
                        onMouseEnter={() => setHoveredRating(starVal)}
                        onMouseLeave={() => setHoveredRating(null)}
                      >
                        <Star
                          size={18}
                          fill={isActive ? '#a855f7' : 'transparent'}
                          stroke={isActive ? '#a855f7' : '#3c2b66'}
                          className="transition-colors"
                        />
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Quote text / description textarea */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold tracking-widest text-purple-400 uppercase block">
                  Quote text / Feedback
                </label>
                <textarea
                  required
                  rows={3}
                  className="w-full bg-brand-bg-card border border-brand-border hover:border-purple-500/30 focus:border-purple-500 rounded-xl px-3.5 py-3 text-brand-text-white text-xs outline-none transition-all resize-none placeholder:text-purple-400/40 bg-opacity-40"
                  placeholder="Review / Description of services and campaign outcome details..."
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                />
              </div>

              {/* Grid block for Author Name & Initials */}
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-4">
                
                <div className="sm:col-span-8 space-y-1.5">
                  <label className="text-[10px] font-bold tracking-widest text-purple-400 uppercase block">
                    Author Full Name
                  </label>
                  <input
                    type="text"
                    required
                    className="w-full bg-brand-bg-card border border-brand-border hover:border-purple-500/30 focus:border-purple-500 rounded-xl px-3.5 py-2.5 text-brand-text-white text-xs outline-none transition-all placeholder:text-purple-400/40 bg-opacity-40"
                    placeholder="e.g. Elena Rostova"
                    value={author}
                    onChange={handleAuthorChange}
                  />
                </div>

                <div className="sm:col-span-4 space-y-1.5">
                  <label className="text-[10px] font-bold tracking-widest text-purple-400 uppercase block">
                    Initials
                  </label>
                  <input
                    type="text"
                    required
                    maxLength={3}
                    className="w-full bg-brand-bg-card border border-brand-border hover:border-purple-500/30 focus:border-purple-500 rounded-xl px-3.5 py-2.5 text-brand-text-white text-xs outline-none font-mono text-center tracking-widest transition-all placeholder:text-purple-400/40 bg-opacity-40"
                    placeholder="Init."
                    value={initials}
                    onChange={(e) => setInitials(e.target.value)}
                  />
                </div>

              </div>

              {/* Designation Role or Company */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold tracking-widest text-purple-400 uppercase block">
                  Role / Organization & Location
                </label>
                <input
                  type="text"
                  required
                  className="w-full bg-brand-bg-card border border-brand-border hover:border-purple-500/30 focus:border-purple-500 rounded-xl px-3.5 py-2.5 text-brand-text-white text-xs outline-none transition-all placeholder:text-purple-400/40 bg-opacity-40"
                  placeholder="e.g. Managing Director, Alpha Inc · UK"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                />
              </div>

              {/* Submit trigger button */}
              <button
                type="submit"
                className="w-full mt-2 py-3.5 bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-500 hover:to-violet-500 text-white font-black text-xs tracking-widest uppercase rounded-xl transition-all shadow-md shadow-purple-500/10 cursor-pointer hover:-translate-y-0.5"
              >
                SUBMIT FEEDBACK ↗
              </button>

            </form>
          </div>

        </div>

      </div>
    </section>
  );
}

// Independent TestimonialCard
interface TestimonialCardProps {
  key?: string;
  review: TestimonialItem;
  index: number;
}

function TestimonialCard({ review, index }: TestimonialCardProps) {
  const codeStr = index.toString().padStart(2, '0');
  
  return (
    <div className="bg-brand-bg-card border border-brand-border rounded-3xl p-6 sm:p-8 space-y-6 flex flex-col justify-between hover:bg-brand-bg-card-hover hover:border-purple-500/40 transition-all duration-300 relative group shadow-sm">
      {/* Quote Icon watermark replaced with beautiful monospace identifier */}
      <span className="absolute top-6 right-6 text-purple-900/30 font-mono text-xs select-none">
        [{codeStr}]
      </span>

      <div className="space-y-4">
        {/* Rating Stars with high precision styling */}
        <div className="flex items-center space-x-1">
          {[...Array(review.rating)].map((_, i) => (
            <Star key={i} size={13} fill="#a855f7" stroke="#a855f7" />
          ))}
        </div>

        {/* Testimonial Quote */}
        <p className="text-sm sm:text-base text-brand-text-muted leading-relaxed italic">
          "{review.text}"
        </p>
      </div>

      {/* Author Info */}
      <div className="flex items-center space-x-3.5 pt-4 border-t border-brand-border-muted">
        {/* Name Initials Badge */}
        <div className="w-9 h-9 rounded-full bg-brand-bg-card border border-brand-border text-purple-400 font-bold text-xs tracking-wider flex items-center justify-center">
          {review.initials}
        </div>
        <div>
          <h4 className="text-xs font-black uppercase text-brand-text-white tracking-wider">{review.author}</h4>
          <span className="text-[10px] uppercase font-mono text-purple-400">{review.role}</span>
        </div>
      </div>
    </div>
  );
}

