'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { AnimatePresence, motion } from 'motion/react';

export default function Preloader() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setVisible(false), 1700);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    document.documentElement.style.overflow = visible ? 'hidden' : '';
  }, [visible]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="preloader"
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-ink-950"
          exit={{ clipPath: 'inset(0 0 100% 0)' }}
          transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
        >
          <motion.div
            className="absolute h-72 w-72 rounded-full bg-brand-600/30 blur-[100px]"
            animate={{ scale: [0.8, 1.2, 1] }}
            transition={{ duration: 1.6, ease: 'easeOut' }}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.6, rotate: -25, filter: 'blur(12px)' }}
            animate={{ opacity: 1, scale: 1, rotate: 0, filter: 'blur(0px)' }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            <Image src="/brand/gracegate-mark.png" alt="GraceGate" width={140} height={90} priority className="h-auto w-32" />
          </motion.div>
          <div className="relative mt-8 h-[2px] w-44 overflow-hidden rounded-full bg-white/10">
            <motion.div
              className="absolute inset-y-0 left-0 bg-gradient-to-r from-brand-700 via-brand-400 to-brand-300"
              initial={{ width: '0%' }}
              animate={{ width: '100%' }}
              transition={{ duration: 1.4, ease: [0.65, 0, 0.35, 1] }}
            />
          </div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2, delay: 0.2 }}
            className="relative mt-5 text-sm text-white/50"
          >
            Securing the gate
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
