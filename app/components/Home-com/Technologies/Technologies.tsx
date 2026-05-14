'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useReducedMotion } from 'framer-motion';
import { fadeInUp } from '@/app/lib/animations';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import TechCard from './TechCard';

interface Tech {
  _id: string;
  name: string;
  logo: string;
  description: string;
  row: number;
}

export default function Technologies() {
  const shouldReduceMotion = useReducedMotion();
  const [row1, setRow1] = useState<Tech[]>([]);
  const [row2, setRow2] = useState<Tech[]>([]);

  useEffect(() => {
    fetch('/api/technologies')
      .then((res) => res.json())
      .then((json) => {
        if (json.success) {
          setRow1(json.data.filter((t: Tech) => t.row === 1));
          setRow2(json.data.filter((t: Tech) => t.row === 2));
        }
      })
      .catch(console.error);
  }, []);

  // Duplicate for seamless loop
  const row1Extended = [...row1, ...row1];
  const row2Extended = [...row2, ...row2];

 const app:string = 10

 const Number: number = app as unknown  as number;
   
  return (
    <section className="lg:py-24 md:py-15 py-10 bg-[#000000] overflow-hidden">
      <div className="w-full mx-auto px-4 sm:px-6 lg:px-6 md:mb-16 mb-5">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="text-center"
        >
          <p className="text-gray-400 text-sm font-inter sm:text-[22px] tracking-wider mb-3">Our Technologies</p>
          <h2 className="font-inter text-[25px] sm:text-xl md:text-4xl lg:text-[44px] font-semibold text-white sm:leading-tight lg:leading-[60px] md:leading-[50px] leading-[32px] tracking-tight">
            Technology we use and integrate
          </h2>
        </motion.div>
      </div>

      <div className="flex flex-col gap-3 w-full mx-auto px-4 sm:px-6 lg:px-6">
        {/* Row 1 — scrolls left */}
        {row1Extended.length > 0 && (
          <div className="w-full">
            <Swiper
              modules={[Autoplay]}
              spaceBetween={14}
              slidesPerView="auto"
              loop={true}
              speed={4500}
              observer={true}
              observeParents={true}
              autoplay={shouldReduceMotion ? false : {
                delay: 0,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
              }}
              allowTouchMove={true}
              className="tech-swiper"
            >
              {row1Extended.map((tech, index) => (
                <SwiperSlide key={`${tech._id}-${index}`} className="w-[280px]! md:w-[320px]!">
                  <TechCard tech={tech} />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        )}

        {/* Row 2 — scrolls right */}
        {row2Extended.length > 0 && (
          <div className="w-full">
            <Swiper
              modules={[Autoplay]}
              spaceBetween={14}
              slidesPerView="auto"
              loop={true}
              speed={4500}
              autoplay={shouldReduceMotion ? false : {
                delay: 0,
                disableOnInteraction: false,
                reverseDirection: true,
                pauseOnMouseEnter: true,
              }}
              allowTouchMove={true}
              className="tech-swiper"
            >
              {row2Extended.map((tech, index) => (
                <SwiperSlide key={`${tech._id}-${index}`} className="w-[280px]! md:w-[320px]!">
                  <TechCard tech={tech} />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        )}
      </div>
    </section>
  );
}
