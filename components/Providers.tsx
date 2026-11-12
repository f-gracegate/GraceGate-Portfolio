'use client';

import { createContext, useCallback, useContext, useState } from 'react';
import { MotionConfig } from 'motion/react';
import ServiceRequestModal from './ServiceRequestModal';

type ContactContextValue = {
  openContact: (service?: string) => void;
};

const ContactContext = createContext<ContactContextValue | null>(null);

export function useContact() {
  const ctx = useContext(ContactContext);
  if (!ctx) throw new Error('useContact must be used inside <Providers>');
  return ctx;
}

export default function Providers({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const [service, setService] = useState('');

  const openContact = useCallback((s?: string) => {
    setService(s ?? '');
    setOpen(true);
  }, []);

  const closeContact = useCallback(() => setOpen(false), []);

  return (
    <MotionConfig reducedMotion="user">
      <ContactContext.Provider value={{ openContact }}>
        {children}
        <ServiceRequestModal isOpen={open} onClose={closeContact} preselectedService={service} />
      </ContactContext.Provider>
    </MotionConfig>
  );
}
