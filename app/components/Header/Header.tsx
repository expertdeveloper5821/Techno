




'use client';
import Link from 'next/link';
import type React from 'react';
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, easeOut } from 'framer-motion';
import Image from 'next/image';
import Navigation from './Navigation';
import ChevronRightIconImport from '@/app/lib/icon/chevron-right-icon';

type IconProps = React.SVGProps<SVGSVGElement> & {
  width?: number;
  height?: number;
  color?: string;
};
const NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'About us', href: '/about' },
  { label: 'Services', href: '#services' },
  { label: 'Career', href: '/career' },
  { label: 'Blogs', href: '/blogs' },
  { label: 'Contact', href: '/contact' },
];
const ChevronRightIcon = ChevronRightIconImport as React.FC<IconProps>;
const HEADER_BLUE = '#0094DB';
// Hysteresis: expand when near top, compact only when scrolled down past threshold
const SCROLL_UP_THRESHOLD = 50;   // below this = always normal (no flicker)
const SCROLL_DOWN_THRESHOLD = 120; // above this = use scroll direction
const MIN_SCROLL_DELTA = 25;      // min px movement to react (reduces jitter)
const TRANSITION_MS = 550;
const TRANSITION_EASE = 'cubic-bezier(0.22, 0.61, 0.36, 1)';

function HamburgerIcon({ open, onClick }: { open: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="p-2 -m-2 rounded-lg hover:cursor-pointer transition-colors shrink-0 touch-manipulation"
      aria-label={open ? 'Close menu' : 'Open menu'}
      aria-expanded={open}
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
            open
              ? 'M6 18L18 6M6 6l12 12'
              : 'M4 6h16M4 12h16M4 18h16'
          }
        />
      </svg>
    </button>
  );
}
export default function Header() {
  const [compact, setCompact] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const lastScrollY = useRef(0);
  const ticking = useRef(false);
  const [contactshow, setContactshow] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      const y = typeof window !== 'undefined' ? window.scrollY : 0;
      if (!ticking.current) {
        window.requestAnimationFrame(() => {
          const prevY = lastScrollY.current;
          const delta = y - prevY;
          if (y <= SCROLL_UP_THRESHOLD) {
            setCompact(false);
          } else if (y >= SCROLL_DOWN_THRESHOLD && Math.abs(delta) >= MIN_SCROLL_DELTA) {
            setCompact(delta > 0);

          }
          lastScrollY.current = y;
          ticking.current = false;
        });
        ticking.current = true;
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);


  useEffect(() => {
    const timer = setTimeout(() => {
      if (compact) {
        setContactshow(true);
      } else {
        setContactshow(false);
      }
    }, 0.1);
    return () => clearTimeout(timer);
  }, [compact]);
  return (
    <>
      {/* Mobile: simple, non-floating navbar */}
      <header className="sm:hidden absolute left-0 right-0 z-50 will-change-transform  px-4 sm:px-6"
        style={{
          paddingTop: compact ? 12 : 20,
          paddingBottom: compact ? 12 : 20,
          transition: `padding ${TRANSITION_MS}ms ${TRANSITION_EASE}`,
          opacity: 1,
          // top: 16,
          // transform: 'none',
        }}
      >
        <div className="flex  items-center justify-between rounded-2xl bg-white w-full p-4 ">
          <Link href="/" className="flex items-center">
            <Image
              src="/tg-logo.png"
              alt="Technogetic Logo"
              width={120}
              height={32}
              className="h-8 w-auto"
              priority
            />
          </Link>
          <HamburgerIcon open={menuOpen} onClick={() => setMenuOpen((o) => !o)} />
        </div>
        <AnimatePresence>
          {menuOpen && (
            <motion.nav
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2, ease: easeOut }}
              className="border-t border-black/5 bg-white px-4 pb-3 rounded-2xl mt-2 "
            >
              <div className="flex flex-col gap-1 pt-2">
                {NAV_LINKS.map(({ label, href }) => (
                  <Link
                    key={href}
                    href={href}
                    onClick={() => setMenuOpen(false)}
                    className="text-[#1f2937] font-medium py-2.5 rounded-md hover:bg-black/5"
                  >
                    {label}
                  </Link>
                ))}
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </header>




      {/* Fixed wrapper: no blue strip, transparent so page (e.g. blue gradient) shows through */}
      <header
        className=" hidden fixed left-0 right-0 z-50 will-change-transform sm:flex justify-center px-4 sm:px-6"
        style={{
          paddingTop: compact ? 12 : 20,
          paddingBottom: compact ? 12 : 20,
          transition: `padding ${TRANSITION_MS}ms ${TRANSITION_EASE}`,
          opacity: 1,
          // top: 16,
          // transform: 'none',
        }}
      >
        {/* Single bar: normal = full-width frosted, compact = centered pill */}
        <div
          className="flex flex-col items-center justify-between rounded-2xl  w-full"
          style={{
            maxWidth: compact ? 540 : '100%',
            minHeight: compact ? 48 : 56,
            paddingLeft: compact ? 20 : 28,
            paddingRight: compact ? 20 : 28,
            paddingTop: compact ? 14 : 18,
            paddingBottom: compact ? 14 : 18,
            gap: compact ? 0 : 12,
            backgroundColor: 'rgba(255, 255, 255, 0.75)',
            backdropFilter: 'saturate(180%) blur(14px)',
            WebkitBackdropFilter: 'saturate(180%) blur(14px)',
            boxShadow: compact
              ? '0 4px 24px rgba(0, 0, 0, 0.12)'
              : '0 1px 0 rgba(255,255,255,0.5), 0 2px 8px rgba(0, 0, 0, 0.06)',
            border: '1px solid rgba(255, 255, 255, 0.6)',
            transition: `max-width ${TRANSITION_MS}ms ${TRANSITION_EASE}, padding ${TRANSITION_MS}ms ${TRANSITION_EASE}, min-height ${TRANSITION_MS}ms ${TRANSITION_EASE}, box-shadow ${TRANSITION_MS}ms ${TRANSITION_EASE}`,
          }}
        >
          <div className='flex w-full justify-between ' >
            

            
              <a href="#" className="flex items-center">
                <Image
                  src="/tg-logo.png"
                  alt="Technogetic Logo"
                  width={140}
                  height={40}
                  className="h-8 md:h-10 w-auto "
                  priority
                  sizes="140px"
                />
              </a>
           
            {/* Nav links + Contact: visible in normal, collapse in compact */}
            <div
              className="hidden sm:flex items-center justify-end overflow-hidden"
              style={{
                maxWidth: compact ? 0 : 640,
                visibility: compact ? 'hidden' : 'visible',
                pointerEvents: compact ? 'none' : 'auto',
                gap: 28,
                transition: `max-width ${TRANSITION_MS}ms ${TRANSITION_EASE}, visibility 0s linear ${compact ? 0 : TRANSITION_MS}ms`,
              }}
            >
              <nav className="flex items-center gap-6 lg:gap-8 shrink-0">

                <AnimatePresence initial={false}>
                  {!compact && (
                    <motion.div
                      key="desktop-nav"

                      className="hidden lg:flex items-center space-x-8 flex-1 justify-center"
                    >
                      <Navigation />
                    </motion.div>
                  )}
                </AnimatePresence>
              </nav>
            </div>


            <AnimatePresence initial={false}>
              {!contactshow && (
                <motion.div
                  key="desktop-cta"

                  className={`hidden lg:block pr-2 transition-all duration-500 ease-in-out ${compact ? 'block' : 'none'} `}
                >
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
                </motion.div>
              )}
            </AnimatePresence>



            {/* Hamburger: only in compact on desktop; display none when normal so it takes no space */}
            <div
              className={`items-center shrink-0 ${compact ? 'hidden sm:flex' : 'hidden'}`}
            >
              <HamburgerIcon open={menuOpen} onClick={() => setMenuOpen((o) => !o)} />
            </div>
            {/* Mobile: always show hamburger */}
            <div className=
              {`flex lg:hidden items-center shrink-0 ${compact ? 'hidden' : 'block'}`} >
              <HamburgerIcon open={menuOpen} onClick={() => setMenuOpen((o) => !o)} />
            </div>
          </div>
          {/* Mobile dropdown */}
           
            <div
              className={`hidden sm:block  lg:hidden  mx-auto w-full bg-transparent z-40 overflow-hidden ${compact ? "hidden" : "block"} `}
              style={{
                top: compact ? 76 : 96,
                maxHeight: menuOpen ? 420 : 0,
                visibility: menuOpen ? 'visible' : 'hidden',
                pointerEvents: menuOpen ? 'auto' : 'none',
                transition: `max-height 0.3s ease-out, visibility 0s linear ${menuOpen ? 0 : 0.3}s`,
              }}
            >
              <div className={`mx-4 rounded-2xl max-w-2xl text-center    py-3 px-4 ${compact ? "hidden" : "block"} `}>
                <nav className="flex flex-col gap-1">
                  {NAV_LINKS.map(({ label, href }) => (
                    <Link
                      key={href}
                      href={href}
                      onClick={() => setMenuOpen(false)}
                      className="text-[#1f2937] font-medium py-2.5 px-3 rounded-lg hover:bg-black/5"
                    >
                      {label}
                    </Link>
                  ))}
                  <Link
                    href="/contact"
                    onClick={() => setMenuOpen(false)}
                    className="mt-2 inline-flex items-center justify-center gap-2 px-4 py-3 text-white font-medium text-sm rounded-full "
                    style={{ backgroundColor: HEADER_BLUE }}
                  >
                    Contact &gt;
                  </Link>
                </nav>
              </div>
            </div>

          {/* Desktop dropdown when compact + hamburger open */}
          <div
            className="hidden sm:block w-full  left-0 right-0 z-40 overflow-hidden"
            style={{
              top: compact ? 76 : 96,
              maxHeight: compact && menuOpen ? 400 : 0,
              display: compact && menuOpen ? ' block' : 'none',
              pointerEvents: compact && menuOpen ? 'auto' : 'none',
              transition: `max-height 0.3s ease-out, visibility 0s linear ${compact && menuOpen ? 0 : 0.3}s`,
            }}
          >
            <div className="flex justify-center w-full">
              <div className=" w-full  bg-transparent!   py-3 px-5 min-w-[200px]">
                <nav className="flex flex-col gap-0.5">
                  {NAV_LINKS.map(({ label, href }) => (
                    <Link
                      key={href}
                      href={href}
                      onClick={() => setMenuOpen(false)}
                      className="text-[#333] font-medium py-2 px-3 rounded-lg hover:bg-[#0094DB]/10 hover:text-[#0094DB]"
                    >
                      {label}
                    </Link>
                  ))}
                  <Link
                    href="/contact"
                    onClick={() => setMenuOpen(false)}
                    className="mt-2 inline-flex items-center justify-center gap-2 px-4 py-2.5 text-white font-medium text-sm rounded-full"
                    style={{ backgroundColor: HEADER_BLUE }}
                  >
                    Contact us &gt;
                  </Link>
                </nav>
              </div>
            </div>
          </div>

        </div>
      </header>





    </>
  );
}