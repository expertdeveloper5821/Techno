'use client';

import { motion } from 'framer-motion';
import { fadeInUp } from '@/app/lib/animations';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import TechCard from './TechCard';

// Row 1 Data
const row1 = [
  {
    id: '1',
    name: 'GitLab',
    logo: '/tech/gitlab.svg',
    description: 'Support more Multiple repositories to one or more channels.',
  },
  {
    id: '2',
    name: 'OVHcloud',
    logo: '/tech/ovhcloud.svg',
    description: 'OVH legally OVH groupe SAS, is a French cloud compute company.',
  },
  {
    id: '3',
    name: 'ChatGPT',
    logo: '/tech/chatgpt.svg',
    description: 'Offering assistance with answering frequently asked questions.',
  },
  {
    id: '4',
    name: 'Notion',
    logo: '/tech/notion.svg',
    description: 'You can create rich-text document customizable formatting, images.',
  },
  
];

// Row 2 Data
const row2 = [
  {
    id: '5',
    name: 'Dropbox',
    logo: '/tech/dropbox.svg',
    description: 'Dropbox provides cloud storage where users can securely store.',
  },
  {
    id: '6',
    name: 'ClickUp',
    logo: '/tech/clickup.svg',
    description: 'ClickUp is a productivity platform for our task management.',
  },
  {
    id: '7',
    name: 'Slack',
    logo: '/tech/slack.svg',
    description: 'Slack usesd channels to organize communication around topics.',
  },
  {
    id: '8',
    name: 'Zoom',
    logo: '/tech/zoom.svg',
    description: 'For Video conferencing platform used for virtual meeting.',
  },
];

// Duplicate data to ensure seamless looping on wide screens
const row1Extended = [...row1, ...row1, ...row1];
const row2Extended = [...row2, ...row2, ...row2];

export default function Technologies() {
  return (
    <section className="py-24 bg-[#0a0a0a] overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="text-center"
        >
          <p className="text-gray-400 text-sm uppercase tracking-wider mb-3">Our Technologies</p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white">
            Effortless IT Integration for Business
          </h2>
        </motion.div>
      </div>

      <div className="flex flex-col gap-8">
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

      {/* Global Styles for linear animation */}
      <style jsx global>{`
        .tech-swiper .swiper-wrapper {
          transition-timing-function: linear !important;
        }
      `}</style>
    </section>
  );
}

// Reusable Card Component for consistency
