'use client';

import { motion } from 'framer-motion';
import { fadeInUp } from '@/app/lib/animations';
import ServiceSlider from '../Services/ServiceSlider'; // Import the slider

export default function Hero() {
  return (
    // Removed background styles, just padding for spacing
    <section className="relative pt-40 pb-12 sm:pt-48 sm:pb-16 flex flex-col items-center justify-center overflow-hidden z-10">
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 mb-10">
        <div className="max-w-5xl mx-auto text-center">
          <motion.h1
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            // Adjusted sizing: starts at 4xl, grows to 5xl/6xl/7xl on larger screens
            className="text-2xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-8 leading-tight tracking-tight"
          >
            More Growth, Less work
            <br />
            <span className="block mt-2">Get your time back</span>
          </motion.h1>

          <motion.p
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            transition={{ delay: 0.2 }}
            className="text-white/80 text-lg sm:text-xl max-w-3xl mx-auto mb-10 leading-relaxed font-light"
          >
            It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has.
          </motion.p>

          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            transition={{ delay: 0.4 }}
          >
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              // White pill button with blue text matching the design
              className="inline-flex items-center bg-white text-[#028cd1] px-7 py-4 rounded-full text-lg font-bold hover:bg-gray-100 transition-colors shadow-lg"
            >
              Get Started
              <svg
                className="w-4 h-4 ml-2"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 12h14M13 6l6 6-6 6"
                />
              </svg>
            </motion.a>
          </motion.div>
        </div>
      </div>

      {/* Added the Service Cards Slider here */}
      <div className="w-full mt-4">
        <ServiceSlider theme="dark" />
      </div>

    </section>
  );
}