'use client';

import type { ReactNode } from 'react';
import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import Lenis from 'lenis';

type SmoothScrollProviderProps = {
  children: ReactNode;
};

export default function SmoothScrollProvider({ children }: SmoothScrollProviderProps) {
  const pathname = usePathname();
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const reduceMotion =
      typeof window !== 'undefined' &&
      window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

    if (reduceMotion) return;

    const lenis = new Lenis({
      duration: 2.05,
      smoothWheel: true,
      wheelMultiplier: 0.9,
      touchMultiplier: 1.0,
    });
    lenisRef.current = lenis;

    let rafId = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      rafId = window.requestAnimationFrame(raf);
    };
    rafId = window.requestAnimationFrame(raf);

    return () => {
      window.cancelAnimationFrame(rafId);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }

    const scrollTop = () => {
      lenisRef.current?.scrollTo(0, { immediate: true, force: true });
      window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
      if (document.scrollingElement) {
        document.scrollingElement.scrollTop = 0;
      }
    };

    scrollTop();
    const rafId = window.requestAnimationFrame(scrollTop);
    return () => window.cancelAnimationFrame(rafId);
  }, [pathname]);

  return children;
}

