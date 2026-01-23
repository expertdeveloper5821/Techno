'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Navigation from './Navigation';

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

          {/* Desktop CTA Button */}
          <div className="hidden lg:block pr-2">
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-[#008AC9] text-white px-8 py-2.5 rounded-full font-semibold hover:bg-[#007bb3] transition-colors"
            >
              Contact us &gt;
            </motion.a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden text-dark-bg p-2"
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isMobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
            </svg>
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