'use client';

import { motion } from 'framer-motion';
import { fadeInUp, staggerContainer } from '@/app/lib/animations';
import Image from 'next/image';
import type { Partner } from '@/app/services';

interface PartnersProps {
  partners: Partner[];
}

export default function Partners({ partners }: PartnersProps) {

  return (
    <section aria-labelledby="partners-heading" tabIndex={0} className="lg:py-24 md:py-15 py-10 bg-[#0094DB] relative focus:outline-2 focus:outline-offset-[-4px] focus:outline-white focus:rounded-lg">
      <div className="w-full mx-auto px-4 sm:px-6 lg:px-6">

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="text-start md:mb-8 mb-5"
        >
          <h2 id="partners-heading" className="text-[25px] sm:text-xl md:text-4xl lg:text-[46px] font-semibold text-[#ffffff] sm:leading-tight lg:leading-[60px] md:leading-[50px] leading-[32px] font-inter">
            Trusted by Our Partners Who Share Our Vision for Digital Innovation and Long-Term Growth
          </h2>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-x-10 gap-y-0 sm:gap-x-22 sm:gap-y-10 md:gap-y-0 items-center justify-items-center px-[20px]"
          role="list"
          aria-label="Our trusted partners"
        >
          {partners.map((partner) => (
            <motion.div
              key={partner._id}
              variants={fadeInUp}
              role="listitem"
              tabIndex={0}
              aria-label={`${partner.name} - trusted partner`}
              className="group relative w-full h-[100px] sm:h-[120px] md:h-[140px] flex items-center justify-center cursor-pointer focus:outline-2 focus:outline-offset-2 focus:outline-white focus:rounded-lg"
            >
              {/* White/light logo (default) */}
              <div className="absolute w-full h-full inset-0 flex items-center justify-center transition-all duration-300 opacity-100 group-hover:opacity-0 group-focus:opacity-0 group-hover:scale-95 group-focus:scale-95" aria-hidden="true">
                <Image
                  src={partner.logoGray}
                  alt=""
                  width={280}
                  height={140}
                  className="object-contain w-auto h-auto grayscale brightness-0 invert opacity-90"
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 280px"
                  loading="lazy"
                />
              </div>

              {/* Color logo (on hover/focus) */}
              <div className="absolute w-full h-full inset-0 flex items-center justify-center transition-all duration-300 opacity-0 group-hover:opacity-100 group-focus:opacity-100 group-hover:scale-105 group-focus:scale-105" aria-hidden="true">
                <Image
                  src={partner.logoColor}
                  alt=""
                  width={280}
                  height={140}
                  className="object-contain w-auto h-full max-h-[72px] sm:max-h-[88px] md:max-h-[70px]"
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
