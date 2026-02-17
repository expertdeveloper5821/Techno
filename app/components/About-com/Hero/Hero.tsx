'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { fadeInUp } from '@/app/lib/animations';
import ServiceSlider from '@/app/components/Home-com/Services/ServiceSlider'; // Import the slider
import ChevronRightIconImport from '@/app/lib/icon/chevron-right-icon';
import hero from '../../../../public/About/hero/hero.svg'
type IconProps = React.SVGProps<SVGSVGElement> & { width?: number; height?: number; color?: string };
const ChevronRightIcon = ChevronRightIconImport as React.FC<IconProps>;

export default function Hero() {
  return (
    // Removed background styles, just padding for spacing
    <section className="relative pt-40 pb-10 sm:pt-48 sm:pb-16 flex flex-col items-center justify-center overflow-hidden z-10 bg-[linear-gradient(180deg,#0094DB_0%,#036C9F_70.41%,#000000_94.02%)] ">
      
<div className='absolute bottom-20  ' >

<img src="/About/hero/hero.svg" alt="Hero illustration" className='w-ful ' />
</div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 mb-10">
        <div className="max-w-5xl mx-auto text-center">

          <motion.h1
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            // Adjusted sizing: starts at 4xl, grows to 5xl/6xl/7xl on larger screens
            className="font-inter mb-[20px] mx-auto sm:mb-0 font-semibold text-[24px] md:text-[40px] lg:text-[44spx] leading-[30px] lg:leading-[60px] md:leading-[50px] tracking-[0.03em] text-white " style={{
              
            }}
          >
         Building  Smart Digital Solutions for Modern Businesses
          </motion.h1>

          <motion.p
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            transition={{ delay: 0.2 }}
            className="text-white font-normal font-inter  text-base sm:text-xl max-w-5xl   mb-10 leading-relaxed  md:pt-10 tracking-[0.03em] "
          >
We design and develop websites, apps, and digital experiences that help businesses grow.</motion.p>

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
              className="group inline-flex gap-2 items-center bg-transparent text-[#ffff] px-3 md:px-7  py-2  md:py-4  rounded-full text-lg font-semibold  transition-colors shadow-lg " style={{
                border:'1px solid #B8B8B833'
              }}
            >
              <p className='p-0 m-0' > <span className='text-[#B8B8B833]'>Home</span>  <ChevronRightIcon width={7} height={11} color="#B8B8B833" className="inline-block transition-transform duration-500 ease-out group-hover:translate-x-0.5" />  About us</p>
            </motion.a>
          </motion.div>
        </div>
      </div>

      {/* Service slider: hidden on mobile, visible from md up */}
      {/* <div className="w-full mt-4 ">
        <ServiceSlider theme="dark" />
      </div> */}

    </section>
  );
}