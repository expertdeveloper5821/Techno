'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Navigation from './Navigation';
import { IoChevronForwardOutline } from "react-icons/io5";
import { FaChevronRight } from "react-icons/fa6";
import ChevronRightIconImport from '@/app/lib/icon/icon';

/** Props type for the icon so className and other SVG props are accepted */
type IconProps = React.SVGProps<SVGSVGElement> & { width?: number; height?: number; color?: string };
const ChevronRightIcon = ChevronRightIconImport as React.FC<IconProps>;

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // We removed the scroll background logic because the header 
  // now sits transparently on top of the hero gradient.
  
  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className="absolute top-0 left-0 right-0 z-50 pt-6" // Absolute positioning to sit ON TOP of the gradient
    >
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* White pill-shaped container - Matches the design exactly */}
        <div className="bg-white rounded-xl px-4 py-3 md:py-4 flex items-center justify-between shadow-lg">
          
          {/* Logo */}
          <motion.div whileHover={{ scale: 1.05 }} className="flex items-center pl-2">
            <a href="#" className="flex items-center">
              <Image
                src="/tg-logo.png"
                alt="Technogetic Logo"
                width={140}
                height={40}
                className="h-8 md:h-10 w-auto"
                priority
                sizes="140px"
              />
            </a>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8 flex-1 justify-center">
            <Navigation />
          </div>

          {/* Desktop CTA Button — pill-shaped, vibrant blue, "Contact us >" */}
          <div className="hidden lg:block pr-2">
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              className="group inline-flex items-center justify-center gap-1.5 bg-[#0099DD] text-white px-8 py-3.5 rounded-full font-semibold text-base hover:bg-[#0088c4] transition-colors shadow-md"
            >
              Contact us <ChevronRightIcon width={7} height={11} color="#fff" className="inline-block transition-transform duration-500 ease-out group-hover:translate-x-0.5" />
            </motion.a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden text-dark-bg p-2"
            aria-label="Toggle menu"
          >
            <FaChevronRight  
            className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"/>
              {/* <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isMobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
            </svg> */}
          </button>
        </div>

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