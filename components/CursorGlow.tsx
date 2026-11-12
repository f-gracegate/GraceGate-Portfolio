'use client';

import { useEffect } from 'react';
import { motion, useMotionValue, useSpring } from 'motion/react';

/** Soft brand-coloured light that trails the mouse across the page (desktop only). */
export default function CursorGlow() {
  const x = useMotionValue(-1000);
  const y = useMotionValue(-1000);
  const sx = useSpring(x, { stiffness: 80, damping: 20 });
  const sy = useSpring(y, { stiffness: 80, damping: 20 });

  useEffect(() => {
    const move = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse') return;
      x.set(e.clientX - 250);
      y.set(e.clientY - 250);
    };
    window.addEventListener('pointermove', move, { passive: true });
    return () => window.removeEventListener('pointermove', move);
  }, [x, y]);

  return (
    <motion.div
      aria-hidden
      style={{ x: sx, y: sy }}
      className="pointer-events-none fixed left-0 top-0 z-0 hidden h-[500px] w-[500px] rounded-full bg-brand-600/[0.07] blur-[90px] lg:block"
    />
  );
}
