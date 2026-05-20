/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { X, Send, Sparkles, Check, Server, Eye, Search, ChevronDown } from 'lucide-react';
import { saveServiceRequest, supabase, ServiceRequest } from '../supabase';

const SERVICES_AVAILABLE = [
  { category: 'Website Design Services', value: 'WordPress Website Design' },
  { category: 'Website Design Services', value: 'Shopify Store Design' },
  { category: 'Website Design Services', value: 'Webflow Website Design' },
  { category: 'Website Design Services', value: 'Framer Website Design' },
  { category: 'Website Design Services', value: 'Wix Website Design' },
  { category: 'Digital Marketing Services', value: 'SEO Services' },
  { category: 'Digital Marketing Services', value: 'Social Media Marketing' },
  { category: 'Digital Marketing Services', value: 'Graphics Design' },
];

interface ServiceRequestModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedService?: string;
}

export default function ServiceRequestModal({
  isOpen,
  onClose,
  preselectedService = '',
}: ServiceRequestModalProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [serviceType, setServiceType] = useState(preselectedService || 'WordPress Website Design');
  const [message, setMessage] = useState('');
  const [budget, setBudget] = useState('Premium ($1000 - $3000)');
  const [timeline, setTimeline] = useState('1 - 2 Weeks');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [isLocalFallback, setIsLocalFallback] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [showLocalRecords, setShowLocalRecords] = useState(false);
  const [localRecords, setLocalRecords] = useState<ServiceRequest[]>([]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Trim values to avoid whitespace-only submissions
    const trimmedName = name.trim();
    const trimmedEmail = email.trim();
    const trimmedMessage = message.trim();

    // 1. Validation for empty / short fields
    if (!trimmedName) {
      setErrorMessage('Please enter your Name.');
      return;
    }
    if (trimmedName.length < 2) {
      setErrorMessage('Name must be at least 2 characters long.');
      return;
    }

    if (!trimmedEmail) {
      setErrorMessage('Please enter your Email address.');
      return;
    }
    
    // 2. Email format validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trimmedEmail)) {
      setErrorMessage('Please enter a valid Email address format (e.g., alex@example.com).');
      return;
    }

    if (!trimmedMessage) {
      setErrorMessage('Please fill in your project goals/message.');
      return;
    }
    if (trimmedMessage.length < 10) {
      setErrorMessage('Please provide a slightly details description (at least 10 characters) about your project/goals so I can understand it better!');
      return;
    }

    setSubmitting(true);
    setErrorMessage('');

    const payload: ServiceRequest = {
      name: trimmedName,
      email: trimmedEmail,
      service_type: serviceType,
      message: trimmedMessage,
      budget,
      timeline,
    };

    try {
      const res = await saveServiceRequest(payload);
      setSubmitting(false);

      if (res.success) {
        setSuccess(true);
        setIsLocalFallback(res.isLocalFallback);
        // Fetch latest local files for previewing
        try {
          const stored = localStorage.getItem('gracegate_service_requests');
          if (stored) setLocalRecords(JSON.parse(stored));
        } catch (_) {}
      } else {
        setErrorMessage(res.error || 'There was an error submitting your request. Please try again later.');
      }
    } catch (err) {
      setSubmitting(false);
      setErrorMessage('There was an error submitting your request. Please try again later.');
    }
  };

  const handleFetchLocal = () => {
    try {
      const stored = localStorage.getItem('gracegate_service_requests');
      if (stored) {
        setLocalRecords(JSON.parse(stored));
      } else {
        setLocalRecords([]);
      }
      setShowLocalRecords(!showLocalRecords);
    } catch (_) {}
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-lg bg-[#0f0a20] border border-purple-500/30 rounded-3xl p-6 sm:p-8 shadow-2xl overflow-y-auto max-h-[90vh]">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors cursor-pointer"
        >
          <X size={20} />
        </button>

        {!success ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex items-center space-x-2 text-purple-400 mb-2">
              <Sparkles size={18} />
              <span className="text-xs font-bold tracking-widest uppercase">Request a Service</span>
            </div>
            
            <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              Tell me about your project
            </h3>
            
            <p className="text-xs sm:text-sm text-gray-400">
              Complete the details below to request a service. The submission automatically routes to our database.
            </p>

            {errorMessage && (
              <div className="p-3 bg-red-950/40 border border-red-500/30 rounded-xl text-red-200 text-xs text-center font-medium">
                {errorMessage}
              </div>
            )}

            {/* Inputs */}
            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-1.5 uppercase tracking-wider">Your Name <span className="text-purple-400">*</span></label>
              <input
                type="text"
                required
                className="w-full bg-purple-950/20 border border-purple-900/40 focus:border-purple-500/50 rounded-xl px-4 py-2.5 text-white text-sm outline-none transition-colors"
                placeholder="Grace Francis"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-1.5 uppercase tracking-wider">Your Email <span className="text-purple-400">*</span></label>
              <input
                type="email"
                required
                className="w-full bg-purple-950/20 border border-purple-900/40 focus:border-purple-500/50 rounded-xl px-4 py-2.5 text-white text-sm outline-none transition-colors"
                placeholder="grace@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1.5 uppercase tracking-wider">Estimated Budget</label>
                <select
                  className="w-full bg-purple-950/20 border border-purple-900/40 focus:border-purple-500/50 rounded-xl px-3 py-2.5 text-white text-sm outline-none transition-colors"
                  value={budget}
                  onChange={(e) => setBudget(e.target.value)}
                >
                  <option className="bg-[#0f0a20]" value="Starter ($500 - $1000)">Starter ($500 - $1000)</option>
                  <option className="bg-[#0f0a20]" value="Premium ($1000 - $3000)">Premium ($1000 - $3000)</option>
                  <option className="bg-[#0f0a20]" value="Enterprise ($3000+)">Enterprise ($3000+)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1.5 uppercase tracking-wider">Desired Timeline</label>
                <select
                  className="w-full bg-purple-950/20 border border-purple-900/40 focus:border-purple-500/50 rounded-xl px-3 py-2.5 text-white text-sm outline-none transition-colors"
                  value={timeline}
                  onChange={(e) => setTimeline(e.target.value)}
                >
                  <option className="bg-[#0f0a20]" value="1 - 2 Weeks">1 - 2 Weeks</option>
                  <option className="bg-[#0f0a20]" value="2 - 4 Weeks">2 - 4 Weeks</option>
                  <option className="bg-[#0f0a20]" value="1 Month+">1 Month+</option>
                </select>
              </div>
            </div>

            {/* Service Type Selection with Interactive Search/Filter */}
            <div className="relative">
              <label className="block text-xs font-semibold text-gray-300 mb-1.5 uppercase tracking-wider">Selected Service</label>
              
              <button
                type="button"
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="w-full bg-purple-950/20 border border-purple-900/40 hover:border-purple-500/30 focus:border-purple-500/50 rounded-xl px-4 py-2.5 text-white text-sm outline-none font-medium flex items-center justify-between transition-colors cursor-pointer text-left"
              >
                <span>{serviceType}</span>
                <ChevronDown size={16} className={`text-purple-400 transition-transform duration-200 ${dropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* Click outside to close dropdown backdrop */}
              {dropdownOpen && (
                <div 
                  className="fixed inset-0 z-10" 
                  onClick={() => {
                    setDropdownOpen(false);
                    setSearchQuery('');
                  }} 
                />
              )}

              {/* Dropdown Box */}
              {dropdownOpen && (
                <div className="absolute left-0 right-0 mt-2 z-20 bg-[#140d29] border border-purple-900/60 rounded-xl p-3 shadow-2xl space-y-3 max-h-72 overflow-y-auto">
                  {/* Search Input Box */}
                  <div className="relative">
                    <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-purple-400" />
                    <input
                      type="text"
                      placeholder="Search services..."
                      autoFocus
                      className="w-full bg-purple-950/40 border border-purple-900/50 focus:border-purple-500/55 rounded-lg pl-9 pr-3 py-1.5 text-white text-xs outline-none font-medium"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>

                  {/* Filtered option list */}
                  <div className="space-y-3 pt-1">
                    {/* Web Design category */}
                    {(() => {
                      const items = SERVICES_AVAILABLE.filter(
                        (s) =>
                          s.category === 'Website Design Services' &&
                          s.value.toLowerCase().includes(searchQuery.toLowerCase())
                      );
                      if (items.length === 0) return null;
                      return (
                        <div className="space-y-1">
                          <span className="block text-[9px] uppercase tracking-wider text-purple-400/80 font-bold px-2">
                            Website Design Services
                          </span>
                          {items.map((item) => (
                            <button
                              type="button"
                              key={item.value}
                              onClick={() => {
                                setServiceType(item.value);
                                setDropdownOpen(false);
                                setSearchQuery('');
                              }}
                              className={`w-full text-left px-3 py-1.5 rounded-lg text-xs transition-colors flex items-center justify-between cursor-pointer ${
                                serviceType === item.value
                                  ? 'bg-purple-600/30 text-white font-bold border border-purple-500/20'
                                  : 'text-gray-300 hover:bg-purple-950/30 hover:text-white'
                              }`}
                            >
                              <span>{item.value}</span>
                              {serviceType === item.value && <Check size={12} className="text-purple-400" />}
                            </button>
                          ))}
                        </div>
                      );
                    })()}

                    {/* Marketing category */}
                    {(() => {
                      const items = SERVICES_AVAILABLE.filter(
                        (s) =>
                          s.category === 'Digital Marketing Services' &&
                          s.value.toLowerCase().includes(searchQuery.toLowerCase())
                      );
                      if (items.length === 0) return null;
                      return (
                        <div className="space-y-1">
                          <span className="block text-[9px] uppercase tracking-wider text-purple-400/80 font-bold px-2">
                            Digital Marketing Services
                          </span>
                          {items.map((item) => (
                            <button
                              type="button"
                              key={item.value}
                              onClick={() => {
                                setServiceType(item.value);
                                setDropdownOpen(false);
                                setSearchQuery('');
                              }}
                              className={`w-full text-left px-3 py-1.5 rounded-lg text-xs transition-colors flex items-center justify-between cursor-pointer ${
                                serviceType === item.value
                                  ? 'bg-purple-600/30 text-white font-bold border border-purple-500/20'
                                  : 'text-gray-300 hover:bg-purple-950/30 hover:text-white'
                              }`}
                            >
                              <span>{item.value}</span>
                              {serviceType === item.value && <Check size={12} className="text-purple-400" />}
                            </button>
                          ))}
                        </div>
                      );
                    })()}

                    {/* Match fallback */}
                    {SERVICES_AVAILABLE.filter((s) =>
                      s.value.toLowerCase().includes(searchQuery.toLowerCase())
                    ).length === 0 && (
                      <span className="block text-center py-4 text-xs italic text-purple-400/40">
                        No matches found for "{searchQuery}"
                      </span>
                    )}
                  </div>
                </div>
              )}
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-1.5 uppercase tracking-wider text-ellipsis">Tell me about your goals <span className="text-purple-400">*</span></label>
              <textarea
                required
                rows={3}
                className="w-full bg-purple-950/20 border border-purple-900/40 focus:border-purple-500/50 rounded-xl px-4 py-2.5 text-white text-sm outline-none transition-colors resize-none"
                placeholder="I need a responsive, premium store design built for my startup..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={submitting}
              className="w-full py-3 px-6 rounded-xl bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-500 hover:to-violet-500 text-white font-bold text-sm tracking-wide shadow-lg shadow-purple-500/20 flex items-center justify-center space-x-2 transition-all transition-transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer disabled:opacity-50"
            >
              <span>{submitting ? 'Submitting request...' : 'Submit Request →'}</span>
              {!submitting && <Send size={15} />}
            </button>
          </form>
        ) : (
          <div className="text-center py-6 space-y-6">
            <div className="mx-auto w-12 h-12 bg-purple-900/30 border border-purple-500/40 text-purple-400 rounded-full flex items-center justify-center shadow-inner">
              <Check size={26} />
            </div>

            <h3 className="text-2xl font-bold text-white tracking-tight">Request Submitted!</h3>
            
            <p className="text-sm text-gray-300 leading-relaxed max-w-sm mx-auto">
              Your message was captured successfully! I will reach out to you within 24 hours.
            </p>

            <div className="pt-2">
              <button
                onClick={() => {
                  setSuccess(false);
                  onClose();
                }}
                className="w-full sm:w-auto px-8 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-500 hover:to-violet-500 text-white font-bold text-sm tracking-wide shadow-lg shadow-purple-500/20 flex items-center justify-center mx-auto transition-all transition-transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
              >
                Back to Site
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
