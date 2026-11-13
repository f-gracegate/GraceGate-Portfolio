'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Check, Loader2, Send, X } from 'lucide-react';
import { CONTACT, SERVICES_DATA } from '@/lib/data';
import { saveServiceRequest, type ServiceRequest } from '@/lib/supabase';

const SERVICES = [...SERVICES_DATA.map((s) => s.title), 'Something else'];
const BUDGETS = ['Under GHS 1,000', 'GHS 1,000 – 3,000', 'GHS 3,000 – 8,000', 'GHS 8,000 – 15,000', 'GHS 15,000+', 'Not sure yet'];
const TIMELINES = ['1 – 2 weeks', '2 – 4 weeks', '1 month+', 'Flexible'];

interface Props {
  isOpen: boolean;
  onClose: () => void;
  preselectedService?: string;
}

const inputCls =
  'w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white outline-none transition-all placeholder:text-white/25 focus:border-brand-400/60 focus:bg-white/[0.05] focus:ring-4 focus:ring-brand-500/10';

function Pills({ options, value, onChange, name }: { options: string[]; value: string; onChange: (v: string) => void; name: string }) {
  return (
    <div className="isolate flex flex-wrap gap-2" role="radiogroup" aria-label={name}>
      {options.map((o) => (
        <button
          key={o}
          type="button"
          role="radio"
          aria-checked={value === o}
          onClick={() => onChange(o)}
          className={`relative rounded-full border px-3.5 py-2 text-xs transition-colors ${
            value === o ? 'border-transparent text-white' : 'border-white/10 text-white/55 hover:border-white/25 hover:text-white/85'
          }`}
        >
          {value === o && (
            <motion.span
              layoutId={`pill-${name}`}
              className="absolute inset-0 -z-10 rounded-full bg-gradient-to-r from-brand-500 to-brand-700"
              transition={{ type: 'spring', stiffness: 400, damping: 32 }}
            />
          )}
          {o}
        </button>
      ))}
    </div>
  );
}

export default function ServiceRequestModal({ isOpen, onClose, preselectedService = '' }: Props) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [service, setService] = useState(SERVICES[0]);
  const [budget, setBudget] = useState(BUDGETS[1]);
  const [timeline, setTimeline] = useState(TIMELINES[1]);
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!isOpen) return;
    setService(SERVICES.includes(preselectedService) ? preselectedService : preselectedService ? 'Something else' : SERVICES[0]);
    if (preselectedService && !SERVICES.includes(preselectedService)) {
      setMessage((m) => m || `I'd like something similar to "${preselectedService}". `);
    }
    setError('');
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [isOpen, preselectedService, onClose]);

  const close = () => {
    onClose();
    // Reset after the exit animation
    setTimeout(() => setSuccess(false), 400);
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const n = name.trim();
    const em = email.trim();
    const msg = message.trim();
    if (n.length < 2) return setError('Please enter your name.');
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(em)) return setError('Please enter a valid email address.');
    if (msg.length < 10) return setError('Tell me a little more about your project (at least 10 characters).');

    setError('');
    setSubmitting(true);
    const payload: ServiceRequest = { name: n, email: em, service_type: service, message: msg, budget, timeline };
    try {
      const res = await saveServiceRequest(payload);
      if (res.success) {
        setSuccess(true);
        setName('');
        setEmail('');
        setMessage('');
      } else {
        setError(res.error || 'Something went wrong. Please try again.');
      }
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[70] flex items-end justify-center sm:items-center sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div className="absolute inset-0 bg-black/70 backdrop-blur-md" onClick={close} aria-hidden />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="request-title"
            initial={{ opacity: 0, y: 60, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.97 }}
            transition={{ type: 'spring', stiffness: 260, damping: 28 }}
            className="relative max-h-[92svh] w-full max-w-xl overflow-y-auto rounded-t-[2rem] border border-white/10 bg-ink-900 p-6 shadow-2xl sm:rounded-[2rem] sm:p-9"
          >
            <div aria-hidden className="pointer-events-none absolute -right-20 -top-20 h-60 w-60 rounded-full bg-brand-600/25 blur-[80px]" />
            <button
              onClick={close}
              aria-label="Close"
              className="absolute right-5 top-5 grid h-9 w-9 place-items-center rounded-full border border-white/10 text-white/60 transition-all hover:rotate-90 hover:text-white"
            >
              <X size={16} />
            </button>

            <AnimatePresence mode="wait">
              {!success ? (
                <motion.form
                  key="form"
                  onSubmit={submit}
                  noValidate
                  exit={{ opacity: 0, y: -10 }}
                  className="relative space-y-6"
                >
                  <div>
                    <p className="text-sm font-medium text-brand-300">Start a project</p>
                    <h3 id="request-title" className="mt-2 font-display text-2xl font-semibold text-white sm:text-3xl">
                      Tell me about your project
                    </h3>
                    <p className="mt-2 text-sm text-white/45">
                      I reply to every request quickly. Prefer to talk?{' '}
                      <a href={CONTACT.phoneHref} className="font-medium text-brand-300 underline-offset-4 hover:underline">
                        Call {CONTACT.phone}
                      </a>
                    </p>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <label className="block">
                      <span className="mb-2 block text-xs font-medium text-white/60">Name</span>
                      <input className={inputCls} value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" autoComplete="name" />
                    </label>
                    <label className="block">
                      <span className="mb-2 block text-xs font-medium text-white/60">Email</span>
                      <input
                        type="email"
                        className={inputCls}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@company.com"
                        autoComplete="email"
                      />
                    </label>
                  </div>

                  <div>
                    <span className="mb-2.5 block text-xs font-medium text-white/60">Service</span>
                    <Pills name="service" options={SERVICES} value={service} onChange={setService} />
                  </div>
                  <div className="grid gap-6 sm:grid-cols-2">
                    <div>
                      <span className="mb-2.5 block text-xs font-medium text-white/60">Budget</span>
                      <Pills name="budget" options={BUDGETS} value={budget} onChange={setBudget} />
                    </div>
                    <div>
                      <span className="mb-2.5 block text-xs font-medium text-white/60">Timeline</span>
                      <Pills name="timeline" options={TIMELINES} value={timeline} onChange={setTimeline} />
                    </div>
                  </div>

                  <label className="block">
                    <span className="mb-2 block text-xs font-medium text-white/60">Project details</span>
                    <textarea
                      rows={4}
                      className={`${inputCls} resize-none`}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="What are you trying to achieve? Any systems, deadlines or constraints I should know about?"
                    />
                  </label>

                  <AnimatePresence>
                    {error && (
                      <motion.p
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="rounded-xl border border-red-500/25 bg-red-500/10 px-4 py-3 text-sm text-red-200"
                        role="alert"
                      >
                        {error}
                      </motion.p>
                    )}
                  </AnimatePresence>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="group flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-brand-500 to-brand-700 px-6 py-4 text-sm font-semibold text-white shadow-[0_10px_40px_-10px_rgba(139,44,245,0.9)] transition-all hover:brightness-110 disabled:opacity-60"
                  >
                    {submitting ? (
                      <>
                        <Loader2 size={16} className="animate-spin" /> Sending…
                      </>
                    ) : (
                      <>
                        Send request
                        <Send size={15} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </>
                    )}
                  </button>
                </motion.form>
              ) : (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="relative py-10 text-center"
                >
                  <motion.div
                    initial={{ scale: 0, rotate: -90 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: 'spring', stiffness: 220, damping: 14, delay: 0.1 }}
                    className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-gradient-to-br from-brand-400 to-brand-700 text-white shadow-[0_0_40px_rgba(139,44,245,0.6)]"
                  >
                    <Check size={30} />
                  </motion.div>
                  <h3 className="mt-6 font-display text-2xl font-semibold text-white">Request received</h3>
                  <p className="mx-auto mt-3 max-w-sm text-sm leading-relaxed text-white/55">
                    Thanks for reaching out. I&apos;ll review the details and get back to you shortly.
                  </p>
                  <button
                    onClick={close}
                    className="mt-8 rounded-full border border-white/15 px-7 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/[0.06]"
                  >
                    Back to site
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
