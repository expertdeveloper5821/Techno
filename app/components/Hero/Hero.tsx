'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { fadeInUp } from '@/app/lib/animations';
import ServiceSlider from '../Services/ServiceSlider'; // Import the slider
import ChevronRightIconImport from '@/app/lib/icon/chevron-right-icon';

type IconProps = React.SVGProps<SVGSVGElement> & { width?: number; height?: number; color?: string };
const ChevronRightIcon = ChevronRightIconImport as React.FC<IconProps>;

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
            className="font-inter font-bold text-[28px] md:text-[58px] leading-[38px] md:leading-[70px] tracking-[0.03em] text-white " style={{
              
            }}
          >
          Software Built To Scale Your Business, Not Slow It Down
          </motion.h1>

          <motion.p
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            transition={{ delay: 0.2 }}
            className="text-white font-normal font-inter  text-lg sm:text-xl max-w-4xl mx-auto mb-10 leading-relaxed  md:pt-10 tracking-[0.03em] "
          >
We build custom applications and provide dedicated development teams that work as your team—no vendor games, just reliable engineering.          </motion.p>

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
              className="group inline-flex gap-2 items-center bg-white text-[#028cd1] px-3 md:px-7  py-2  md:py-4  rounded-full text-lg font-semibold hover:bg-gray-100 transition-colors shadow-lg"
            >
              Start Your Project
              <ChevronRightIcon width={7} height={11} color="#028cd1" className="inline-block transition-transform duration-500 ease-out group-hover:translate-x-0.5" />
            </motion.a>
          </motion.div>
        </div>
      </div>

      {/* Service slider: hidden on mobile, visible from md up */}
      <div className="w-full mt-4 hidden md:block">
        <ServiceSlider theme="dark" />
      </div>

    </section>
  );
}