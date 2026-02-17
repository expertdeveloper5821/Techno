'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';

const ContactPopup = dynamic(() => import('./ContactPopup'), { ssr: false });
const ContactPopupDesktop = dynamic(() => import('./ContactPopupDesktop'), { ssr: false });

const STORAGE_KEY = 'technogetic_contact_popup_shown';
const POPUP_DELAY_MS = 5000;
const DESKTOP_BREAKPOINT_PX = 1024;

function useIsDesktop() {
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const check = () => setIsDesktop(window.innerWidth >= DESKTOP_BREAKPOINT_PX);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  return isDesktop;
}

export default function ContactPopupLoader() {
  const [shouldShow, setShouldShow] = useState(false);
  const isDesktop = useIsDesktop();

  useEffect(() => {
    if (typeof window === 'undefined') return;
    try {
      if (sessionStorage.getItem(STORAGE_KEY) === 'true') return;
    } catch {
      return;
    }
    const timer = window.setTimeout(() => {
      setShouldShow(true);
    }, POPUP_DELAY_MS);
    return () => window.clearTimeout(timer);
  }, []);

  if (!shouldShow) return null;

  return isDesktop ? <ContactPopupDesktop /> : <ContactPopup />;
}
