'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { fadeInUp } from '@/app/lib/animations';
import ChevronRightIconImport from '@/app/lib/icon/chevron-right-icon';
import { defaultProjectReview } from '@/app/lib/data/project-review';

type IconProps = React.SVGProps<SVGSVGElement> & { width?: number; height?: number; color?: string };
const ChevronRightIcon = ChevronRightIconImport as React.FC<IconProps>;

export default function Hero() {
  const { hero } = defaultProjectReview;

  return (
    // Removed background styles, just padding for spacing
    <section
      className="relative pt-30 pb-10 sm:pt-40 sm:pb-30 flex flex-col items-center justify-center overflow-hidden z-10 bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url('${hero.backgroundImageSrc}')` }}
    >
      


      <div className="container h-full md:mx-auto mx-14 px-4 sm:px-6 lg:px-8 py-25 relative z-10  bg-[#0000004D] backdrop-blur-xs  border border-white/20 rounded-xl p-6 shadow-lg">
        <div className="max-w-5xl mx-auto text-center">

          <motion.h1
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            // Adjusted sizing: starts at 4xl, grows to 5xl/6xl/7xl on larger screens
            className="font-inter mb-[20px] mx-auto sm:mb-0 font-semibold text-[24px] md:text-[40px] lg:text-[44spx] leading-[30px] lg:leading-[60px] md:leading-[50px] tracking-[0.01em] text-white " style={{
              
            }}
          >
            {hero.title}
          </motion.h1>

          <motion.p
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            transition={{ delay: 0.2 }}
            className="text-white font-normal font-inter  text-base sm:text-xl max-w-5xl   mb-10 leading-relaxed  md:pt-6 tracking-[0.03em] "
          >
            {hero.description}
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
              className="group inline-flex gap-2 items-center bg-transparent text-[#ffff] px-3 md:px-6 py-1  md:py-2  rounded-full text-lg font-semibold  transition-colors shadow-lg " style={{
                border:'1px solid #B8B8B833'
              }}
            >
              <p className='p-0 m-0' > <span className='text-[#CECECE]'>Home</span>  <ChevronRightIcon width={7} height={11} color="#CECECE" className="inline-block transition-transform duration-500 ease-out group-hover:translate-x-0.5" /> {hero.breadcrumbCurrent}</p>
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