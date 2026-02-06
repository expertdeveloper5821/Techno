'use client';

import { motion } from 'framer-motion';
import { fadeInUp, staggerContainer } from '@/app/lib/animations';
import Image from 'next/image';
import { partners } from '@/app/lib/data/partners';

export default function Partners() {
  return (
    <section className="py-24 bg-[#0094DB]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="text-start mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-[46px] font-semibold text-[#ffffff]  leading-tight">
            Trusted by Our Partners Who Share Our Vision for Digital Innovation and Long-Term Growth
          </h2>
        </motion.div>

        {/* Partners Grid — 4 columns, 3 rows, ample spacing, white/light logos on blue */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-x-12 gap-y-16 sm:gap-x-16 sm:gap-y-20 md:gap-x-12 md:gap-y-12 items-center justify-items-center"
        >
          {partners.map((partner) => (
            <motion.div 
              key={partner.id} 
              variants={fadeInUp}
              className="group relative w-full max-w-[200px] sm:max-w-[240px] md:max-w-[280px] h-[100px] sm:h-[120px] md:h-[140px] flex items-center justify-center cursor-pointer"
            >
              {/* 1. White/light logo (visible by default) */}
              <div className="absolute inset-0 flex items-center justify-center transition-all duration-300 opacity-100 group-hover:opacity-0 group-hover:scale-95">
                <Image
                  src={partner.logoGray} 
                  alt={`${partner.name}`}
                  width={280}
                  height={140}
                  className="object-contain w-auto h-full max-h-[72px] sm:max-h-[88px] md:max-h-[100px] grayscale brightness-0 invert opacity-90"
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 280px"
                  loading="lazy"
                />
              </div>

              {/* 2. Color logo (on hover) */}
              <div className="absolute inset-0 flex items-center justify-center transition-all duration-300 opacity-0 group-hover:opacity-100 group-hover:scale-105">
                <Image
                  src={partner.logoColor}
                  alt={`${partner.name}`}
                  width={280}
                  height={140}
                  className="object-contain w-auto h-full max-h-[72px] sm:max-h-[88px] md:max-h-[100px]"
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 280px"
                  loading="lazy"
                />
              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}