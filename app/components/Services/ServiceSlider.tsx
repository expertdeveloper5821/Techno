'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay, Navigation } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/pagination';

const services = [
  { title: 'Digital Marketing', image: '/services/digital-marketing.jpg' },
  { title: 'Web Development', image: '/services/web-development.jpg' },
  { title: 'Mobile App Development', image: '/services/mobile-app.jpg' },
  { title: 'UI/UX Designing', image: '/services/ui-ux.jpg' },
  { title: 'Cloud Computing', image: '/services/cloud-computing.jpg' },
  { title: 'Digital Marketing', image: '/services/digital-marketing.jpg' },
  { title: 'Web Development', image: '/services/web-development.jpg' },
  { title: 'Mobile App Development', image: '/services/mobile-app.jpg' },
  { title: 'UI/UX Designing', image: '/services/ui-ux.jpg' },
  { title: 'Cloud Computing', image: '/services/cloud-computing.jpg' },
];

interface ServiceSliderProps {
  theme?: 'dark' | 'light';
}

export default function ServiceSlider({ theme = 'light' }: ServiceSliderProps) {
  const isDark = theme === 'dark';
  const [isLoaded, setIsLoaded] = useState(false);

  const activeShadow = isDark 
    ? 'shadow-[0_0_50px_rgba(0,138,201,0.5)]' 
    : 'shadow-[0_20px_60px_rgba(0,0,0,0.4)]';

  // ---------------------------------------------------------
  // SKELETON CARD COMPONENT
  // Uses bg-gray-200 for a solid light gray look
  // ---------------------------------------------------------
  const SkeletonCard = ({ opacity = 'opacity-40', scale = 'scale-75', className = '' }) => (
    <div className={`
      relative 
      h-[400px] md:h-[520px] 
      w-[260px] md:w-[320px] lg:w-[380px] 
      rounded-[32px] overflow-hidden 
      bg-gray-100 dark:bg-gray-800 
      shrink-0 
      ${opacity} ${scale} ${className}
    `}>
      {/* Shimmer Animation: White shine moving across */}
      <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/50 to-transparent -translate-x-full animate-[shimmer_1.5s_infinite]" />
      
      {/* Text Placeholders: Slightly darker gray (gray-300) to be visible on the gray-200 card */}
      <div className="absolute bottom-0 left-0 w-full p-8 flex flex-col items-center">
        <div className="h-8 w-48 bg-gray-100 dark:bg-gray-700 rounded mb-4" />
        <div className="h-1.5 w-16 bg-gray-100 dark:bg-gray-700 rounded" />
      </div>
    </div>
  );

  return (
    <div className="w-full relative mx-auto overflow-hidden">
      
      {/* ---------------- SKELETON LOADER ---------------- */}
      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
          {/* Container to center the skeleton items exactly like the swiper */}
          <div className="flex items-center justify-center gap-[10px] md:gap-[10px] lg:gap-[10px] w-full px-4">
            
            {/* Far Left Card (Visible on very wide screens) */}
            <div className="hidden xl:block">
              <SkeletonCard opacity="opacity-40" scale="scale-75" />
            </div>

            {/* Left Neighbor (Visible on Tablet/Desktop) */}
            <div className="hidden md:block">
              <SkeletonCard opacity="opacity-40" scale="scale-75" />
            </div>

            {/* CENTER CARD (Full Opacity, No Scale, Shadow) */}
            <div className="z-10 relative">
               {/* Note: Added a white shadow for light mode skeleton to pop */}
              <SkeletonCard opacity="opacity-100" scale="scale-100" className="shadow-2xl" />
            </div>

            {/* Right Neighbor (Visible on Tablet/Desktop) */}
            <div className="hidden md:block">
              <SkeletonCard opacity="opacity-40" scale="scale-75" />
            </div>

             {/* Far Right Card (Visible on very wide screens) */}
             <div className="hidden xl:block">
              <SkeletonCard opacity="opacity-40" scale="scale-75" />
            </div>

          </div>
        </div>
      )}

      {/* ---------------- ACTUAL SWIPER ---------------- */}
      <Swiper
        grabCursor={true}
        centeredSlides={true}
        loop={true}
        slidesPerView={'auto'}
        spaceBetween={10}
        initialSlide={2}
        speed={600}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        breakpoints={{
          320: { spaceBetween: 10 },
          768: { spaceBetween: 10 },
          1024: { spaceBetween: 10 }
        }}
        pagination={{ clickable: true, dynamicBullets: true }}
        modules={[Pagination, Autoplay, Navigation]}
        onInit={() => setIsLoaded(true)}
        className={`w-full py-12 pb-20 transition-opacity duration-500 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
      >
        {services.map((service, index) => (
          <SwiperSlide key={index} className="w-[260px]! md:w-[320px]! lg:w-[380px]! h-auto my-auto transition-all duration-300">
            {({ isActive }) => (
              <div
                className={`
                  relative h-[400px] md:h-[520px] w-full 
                  rounded-[32px] overflow-hidden
                  transition-all duration-500 ease-out
                  border border-transparent
                  ${isActive 
                    ? `${activeShadow} scale-100 opacity-100 z-10 translate-y-0` 
                    : `scale-90 md:scale-75 opacity-40 hover:opacity-60 z-0 translate-y-4`
                  }
                `}
              >
                <div className="absolute inset-0 w-full h-full bg-gray-900">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className={`object-cover transition-transform duration-700 ${isActive ? 'scale-110' : 'scale-100'}`}
                  />
                  <div className={`absolute inset-0 bg-linear-to-t from-black/90 via-black/20 to-transparent transition-opacity duration-300 ${isActive ? 'opacity-80' : 'opacity-60'}`} />
                </div>

                <div className="absolute bottom-0 left-0 w-full p-6 md:p-8 text-center">
                  <h3 className={`font-bold text-white tracking-wide transition-all duration-300 drop-shadow-md ${isActive ? 'text-2xl md:text-3xl translate-y-0' : 'text-lg translate-y-2'}`}>
                    {service.title}
                  </h3>
                  <div className={`h-1.5 bg-[#008AC9] mx-auto rounded-full mt-4 transition-all duration-500 ${isActive ? 'w-16 opacity-100' : 'w-0 opacity-0'}`} />
                </div>
              </div>
            )}
          </SwiperSlide>
        ))}
      </Swiper>

      <style jsx global>{`
        .swiper-pagination {
          position: relative !important;
          margin-top: 20px;
        }
        .swiper-pagination-bullet {
          width: 10px;
          height: 10px;
          background-color: ${isDark ? 'rgba(255,255,255,0.3)' : '#9ca3af'};
          opacity: 1;
          transition: all 0.3s ease;
        }
        .swiper-pagination-bullet-active {
          width: 32px;
          border-radius: 999px;
          background-color: #008AC9;
        }
        .swiper-wrapper {
          align-items: center;
        }
        .swiper-slide {
          display: flex;
          justify-content: center;
        }
        
        @keyframes shimmer {
          100% { transform: translateX(100%); }
        }
      `}</style>
    </div>
  );
}