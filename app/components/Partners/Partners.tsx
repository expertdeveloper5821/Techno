'use client';

import { motion } from 'framer-motion';
import { fadeInUp, staggerContainer } from '@/app/lib/animations';
import Image from 'next/image';
import { partners } from '@/app/lib/data/partners';

export default function Partners() {
  return (
    <section className="py-24 bg-[#0181EC]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#ffffff] max-w-5xl mx-auto leading-tight">
            Trusted by Our Partners Who Share Our Vision for Digital Innovation and Long-Term Growth
          </h2>
        </motion.div>

        {/* Partners Grid */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-x-12 gap-y-16 items-center justify-items-center"
        >
          {partners.map((partner) => (
            <motion.div 
              key={partner.id} 
              variants={fadeInUp}
              className="group relative w-full max-w-[160px] h-[80px] flex items-center justify-center cursor-pointer"
            >
              {/* 1. Gray Logo (Visible by default) */}
              <div className="absolute inset-0 flex items-center justify-center transition-all duration-300 opacity-100 group-hover:opacity-0 group-hover:scale-95">
                <Image
                  src={partner.logoGray} 
                  alt={`${partner.name} grayscale`}
                  width={150}
                  height={80}
                  className="object-contain w-auto h-full max-h-12 grayscale opacity-60  "
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                  loading="lazy"
                />
              </div>

              {/* 2. Color Logo (Hidden by default, appears on hover) */}
              <div className="absolute inset-0 flex items-center justify-center transition-all duration-300 opacity-0 group-hover:opacity-100 group-hover:scale-110">
                <Image
                  src={partner.logoColor}
                  alt={`${partner.name} color`}
                  width={150}
                  height={80}
                  className="object-contain w-auto h-full max-h-14"
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
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