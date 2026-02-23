'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Navigation from './Navigation';
import { FaChevronRight } from 'react-icons/fa6';
import ChevronRightIconImport from '@/app/lib/icon/chevron-right-icon';

type IconProps = React.SVGProps<SVGSVGElement> & {
  width?: number;
  height?: number;
  color?: string;
};

const ChevronRightIcon = ChevronRightIconImport as React.FC<IconProps>;

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCompact, setIsCompact] = useState(false);
  const lastScrollYRef = useRef(0);

  // Detect scroll direction with a very small threshold so that
  // even subtle upward scrolls can expand the header again.
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const MIN_DELTA = 4; // minimal movement (px) to react to

    const handleScroll = () => {
      const currentY = window.scrollY || window.pageYOffset || 0;
      const previousY = lastScrollYRef.current;
      const diff = currentY - previousY;

      // Ignore imperceptible noise
      if (Math.abs(diff) < MIN_DELTA) return;

      const isScrollingDown = diff > 0;
      const isScrollingUp = diff < 0;

      // When user scrolls down a bit from the top, go compact
      if (isScrollingDown && currentY > 10 && !isCompact) {
        setIsCompact(true);
      }

      // As soon as the user scrolls up (even slightly), restore full header
      if (isScrollingUp && isCompact) {
        setIsCompact(false);
      }

      lastScrollYRef.current = currentY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isCompact]);

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{
        y: 0,
        opacity: 1,
      }}
      transition={{ duration: 0.45, ease: [0.22, 0.61, 0.36, 1] }}
      className={`fixed left-0 right-0 z-50 transition-all duration-300 ${
        isCompact ? 'top-4' : 'top-0 pt-6'
      }`}
    >
      <nav
        className={`w-full px-4 sm:px-6 lg:px-6 transition-all duration-300 ${
          isCompact ? 'flex justify-center' : 'mx-auto'
        }`}
      >
        {/* White pill-shaped container */}
        <motion.div
          animate={isCompact ? 'compact' : 'default'}
          variants={{
            default: {
              scale: 1,
              boxShadow: '0 14px 45px rgba(15,23,42,0.16)',
              borderRadius: 16,
              y: 0,
            },
            compact: {
              scale: 0.97,
              boxShadow: '0 18px 60px rgba(15,23,42,0.26)',
              borderRadius: 16,
              y: 0,
            },
          }}
          transition={{
            duration: 0.28,
            ease: [0.22, 0.61, 0.36, 1],
          }}
          className={`    bg-white/50
    backdrop-blur-[14px]
    backdrop-saturate-280
    border
    border-white/25
    rounded-2xl
    shadow-[0_8px_32px_rgba(0,0,0,0.12)]     flex items-center justify-between  px-4 transition-all duration-300 ${
            isCompact ? 'py-2 md:py-2 max-w-xs w-full gap-3' : 'py-3 md:py-4 w-full mx-auto'
          }`}
        >
          {/* Logo (always visible, scales down in compact mode) */}
          <motion.div
            whileHover={{ scale: 1.03 }}
            animate={{ scale: isCompact ? 0.9 : 1 }}
            transition={{ duration: 0.2 }}
            className="flex items-center pl-2"
          >
            <a href="#" className="flex items-center">
              <Image
                src="/tg-logo.png"
                alt="Technogetic Logo"
                width={140}
                height={40}
                className="h-8 md:h-10 w-auto transition-all duration-300"
                priority
                sizes="140px"
              />
            </a>
          </motion.div>

          {/* Desktop Navigation (hidden completely in compact mode) */}
          {!isCompact && (
            <div className="hidden lg:flex items-center space-x-8 flex-1 justify-center">
              <Navigation />
            </div>
          )}

          {/* Desktop CTA Button (hidden in compact mode) */}
          {!isCompact && (
            <div className="hidden lg:block pr-2">
              <motion.a
                href="#contact"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                className="group inline-flex items-center justify-center gap-1.5 bg-[#0099DD] text-white px-8 py-3.5 rounded-full font-semibold text-base hover:bg-[#0088c4] transition-colors shadow-md"
              >
                Contact us{' '}
                <ChevronRightIcon
                  width={7}
                  height={11}
                  color="#fff"
                  className="inline-block transition-transform duration-500 ease-out group-hover:translate-x-0.5"
                />
              </motion.a>
            </div>
          )}

          {/* Menu Button (shows on all breakpoints in compact mode so only logo + hamburger are visible) */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`${isCompact ? '' : 'lg:hidden'} text-dark-bg p-2`}
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d={
                  isMobileMenuOpen
                    ? 'M6 18L18 6M6 6l12 12'
                    : 'M4 6h16M4 12h16M4 18h16'
                }
              />
            </svg>
          </button>
        </motion.div>

        {/* Mobile Menu Dropdown */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden mt-4 bg-white rounded-2xl p-4 shadow-xl"
            >
              <Navigation mobile />
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </motion.header>
  );
}