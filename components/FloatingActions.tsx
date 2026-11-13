'use client';

import { useState } from 'react';
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'motion/react';
import { ArrowUp, MessageCircle, Phone } from 'lucide-react';
import { CONTACT } from '@/lib/data';

export default function FloatingActions() {
  const { scrollY } = useScroll();
  const [show, setShow] = useState(false);
  useMotionValueEvent(scrollY, 'change', (y) => setShow(y > 600));

  return (
    <div className="fixed bottom-5 right-5 z-40 flex flex-col items-center gap-3">
      <AnimatePresence>
        {show && (
          <motion.button
            initial={{ opacity: 0, scale: 0.5, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.5, y: 20 }}
            whileHover={{ y: -3 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="glass grid h-11 w-11 place-items-center rounded-full text-white/80 hover:text-white"
            aria-label="Back to top"
          >
            <ArrowUp size={17} />
          </motion.button>
        )}
      </AnimatePresence>
      {/* Tap-to-call, phones and tablets only */}
      <motion.a
        href={CONTACT.phoneHref}
        aria-label={`Call ${CONTACT.phone}`}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 2.3, type: 'spring', stiffness: 260, damping: 15 }}
        whileTap={{ scale: 0.95 }}
        className="grid h-12 w-12 place-items-center rounded-full bg-gradient-to-br from-brand-400 to-brand-700 text-white shadow-[0_10px_30px_-6px_rgba(139,44,245,0.7)] lg:hidden"
      >
        <Phone size={20} />
      </motion.a>
      <motion.a
        href={CONTACT.whatsapp}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Message on WhatsApp"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 2.4, type: 'spring', stiffness: 260, damping: 15 }}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        className="relative grid h-14 w-14 place-items-center rounded-full bg-[#25D366] text-white shadow-[0_10px_30px_-6px_rgba(37,211,102,0.6)]"
      >
        <span className="absolute inset-0 animate-ping rounded-full bg-[#25D366] opacity-25 [animation-duration:2.5s]" />
        <MessageCircle size={24} className="relative" />
      </motion.a>
    </div>
  );
}
