'use client';

import { motion } from 'framer-motion';
import { fadeInUp } from '@/app/lib/animations';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import TechCard from './TechCard';
import { technologiesRow1, technologiesRow2 } from '@/app/lib/data/technologies';

// Duplicate data to ensure seamless looping on wide screens
const row1Extended = [...technologiesRow1, ...technologiesRow1, ...technologiesRow1];
const row2Extended = [...technologiesRow2, ...technologiesRow2, ...technologiesRow2];

export default function Technologies() {
  return (
    <section className="py-20 bg-[#0a0a0a] overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="text-center"
        >
          <p className="text-gray-400  text-sm font-inter sm:text-[22px] uppercase tracking-wider mb-3">Our Technologies</p>
          <h2 className=" font-inter text-3xl sm:text-[44px] md:text-4xl font-semibold text-white leading-tight tracking-tight ">
          Technology we use and integrate </h2>
        </motion.div>
      </div>

      <div className="flex flex-col gap-8 md:px-10 px-4">
        {/* --- Row 1 Slider (Left Scroll) --- */}
        <div className="w-full">
          <Swiper
            modules={[Autoplay]}
            spaceBetween={24}
            slidesPerView="auto"
            loop={true}
            speed={5000} // Smooth continuous scroll speed
            autoplay={{
              delay: 0,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            allowTouchMove={true}
            className="tech-swiper"
          >
            {row1Extended.map((tech, index) => (
              <SwiperSlide key={`${tech.id}-${index}`} className="w-[280px]! md:w-[320px]!">
                <TechCard tech={tech} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* --- Row 2 Slider (Right Scroll) --- */}
        <div className="w-full">
          <Swiper
            modules={[Autoplay]}
            spaceBetween={24}
            slidesPerView="auto"
            loop={true}
            speed={5000}
            autoplay={{
              delay: 0,
              disableOnInteraction: false,
              reverseDirection: true, // Scroll in opposite direction
              pauseOnMouseEnter: true,
            }}
            allowTouchMove={true}
            className="tech-swiper"
          >
            {row2Extended.map((tech, index) => (
              <SwiperSlide key={`${tech.id}-${index}`} className="w-[230px]! md:w-[320px]!">
                <TechCard tech={tech} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
}

// Reusable Card Component for consistency
