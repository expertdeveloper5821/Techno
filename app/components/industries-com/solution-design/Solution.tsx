'use client';

import { motion } from 'framer-motion';
import { fadeInUp, fadeInRight } from '@/app/lib/animations';
import type { Feature } from '@/app/services';

const stickyTopByIndex: Record<number, number> = {
  0: 24,
  1: 36,
  2: 48,
  3: 58,
};

interface SolutionProps {
  features?: Feature[];
}

export default function Solution({ features: propFeatures }: SolutionProps) {
  const features = propFeatures ?? [];

  if (features.length === 0) {
    return (
      <section className="lg:py-24 md:py-15 py-10 bg-[#010101] text-white flex items-center justify-center min-h-[300px]">
        <div className="w-10 h-10 border-4 border-white/20 border-t-white rounded-full animate-spin" />
      </section>
    );
  }

  return (
    <section id="products" className="lg:py-24 md:py-15 py-10 bg-[#010101] text-white " style={{ overflow:'clip'}}>
      <div className="w-full mx-auto px-4 sm:px-6 lg:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 md:gap-12 lg:gap-20 items-start">

          {/* Left Column: STICKY */}
          <div className="lg:sticky lg:top-5 h-fit">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="lg:mb-10 md:mb-5 mb-5"
            >
              <h2 className="font-inter text-[25px] sm:text-xl md:text-4xl lg:text-[44px] font-semibold lg:leading-tight md:leading-[50px] leading-[32px] tracking-tight mb-0 sm:mb-6">
                Solutions Designed for Real E-Commerce Business Needs
              </h2>
              <p className="text-lg font-normal leading-[28px]">
                We build practical e-commerce solutions that solve real operational challenges, improve performance,
                and help businesses scale smoothly as demand grows.
              </p>
            </motion.div>
          </div>

          {/* Right Column: FLOWING LIST */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInRight}
            className=" pb-10 space-y-20 " style={{
              // ✅ THIS IS THE KEY: container must be tall enough
              // so the last card has scroll room before the section ends
              minHeight: `${features.length * 280}px`,
              position: 'relative',
            }}
          >
            {features.map((feature, index) => {
              const stickyTop = stickyTopByIndex[index] ?? 56;
              return (
                <div
                  key={feature._id}
                  className={` flex  flex-col gap-4  group p-6   bg-[#000000]  border border-white/50  transition-all duration-300 cursor-pointer rounded-xl  sticky` }
                  style={{ top: `${stickyTop}px`, zIndex: index + 2 }}
                >
                  <h1 className="font-medium text-[#0094DB] text-[32px] leading-[40px] tracking-[1%]">
                    {index + 1}
                  </h1>
                  <h3 className="text-2xl tracking-normal leading-7 font-inter font-semibold text-[#0094DB] group-hover:text-white transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-[#FFFFFF] font-inter text-lg leading-7 tracking-[1%] transition-colors duration-300">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </motion.div>

        </div>
      </div>
    </section>
  );
}
