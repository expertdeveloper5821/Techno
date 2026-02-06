'use client';

import React, { useState, useRef, useCallback } from 'react';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import type { Swiper as SwiperType } from 'swiper';
import { Pagination, Autoplay, Navigation, EffectCoverflow } from 'swiper/modules';
import { services } from '@/app/lib/data/services';

interface ServiceSliderProps {
  theme?: 'dark' | 'light';
}

export default function ServiceSlider({ theme = 'light' }: ServiceSliderProps) {
  const isDark = theme === 'dark';
  const [isLoaded, setIsLoaded] = useState(false);
  const swiperRef = useRef<SwiperType | null>(null);

  /** Slide to the clicked slide so it moves to center */
  const handleSlideClick = useCallback((index: number) => {
    swiperRef.current?.slideToLoop(index, 500);
  }, []);

  const activeShadow = isDark 
    ? 'shadow-[0_0_50px_rgba(0,138,201,0.5)]' 
    : 'shadow-[0_20px_60px_rgba(0,0,0,0.4)]';

  // ---------------------------------------------------------
  // SKELETON CARD (Unchanged from your preferred style)
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
      <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/50 to-transparent -translate-x-full animate-[shimmer_1.5s_infinite]" />
      <div className="absolute bottom-0 left-0 w-full p-8 flex flex-col items-center">
        <div className="h-8 w-48 bg-gray-200 dark:bg-gray-700 rounded mb-4" />
        <div className="h-1.5 w-16 bg-gray-200 dark:bg-gray-700 rounded" />
      </div>
    </div>
  );

  return (
    <div className="w-full relative mx-auto overflow-hidden">
      
      {/* ---------------- SKELETON LOADER ---------------- */}
      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
          <div className="flex items-center justify-center gap-[10px] md:gap-[10px] lg:gap-[10px] w-full px-4">
            <div className="hidden xl:block">
              <SkeletonCard opacity="opacity-40" scale="scale-75" />
            </div>
            <div className="hidden md:block">
              <SkeletonCard opacity="opacity-40" scale="scale-75" />
            </div>
            <div className="z-10 relative">
              <SkeletonCard opacity="opacity-100" scale="scale-100" className="shadow-2xl" />
            </div>
            <div className="hidden md:block">
              <SkeletonCard opacity="opacity-40" scale="scale-75" />
            </div>
             <div className="hidden xl:block">
              <SkeletonCard opacity="opacity-40" scale="scale-75" />
            </div>
          </div>
        </div>
      )}

      {/* ---------------- SWIPER WITH COVERFLOW ---------------- */}
      <Swiper
        effect={'coverflow'}
        grabCursor={true}
        centeredSlides={true}
        loop={true}
        slidesPerView={'auto'}
        initialSlide={2}
        speed={600}
        coverflowEffect={{
          rotate: 50,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: true,
        }}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        pagination={{ clickable: true, dynamicBullets: true }}
        modules={[EffectCoverflow, Pagination, Autoplay, Navigation]}
        onSwiper={(swiper) => { swiperRef.current = swiper; }}
        onInit={() => setIsLoaded(true)}
        className={`w-full py-12 pb-20 transition-opacity duration-500 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
      >
        {services.map((service, index) => (
          <SwiperSlide key={`${service.title}-${index}`} className="w-[260px]! md:w-[320px]! lg:w-[380px]!">
            {({ isActive }) => (
              <div
                role="button"
                tabIndex={0}
                onClick={() => handleSlideClick(index)}
                onFocus={() => handleSlideClick(index)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleSlideClick(index);
                  }
                }}
                className={`
                  relative h-[400px] md:h-[520px] w-full 
                  rounded-[32px] overflow-hidden cursor-pointer
                  transition-all duration-500 ease-out
                  ${isActive 
                    ? `${activeShadow} opacity-100 z-10` 
                    : `opacity-60 hover:opacity-80 z-0`
                  }
                `}
              >
                <div className="absolute inset-0 w-full h-full bg-gray-900">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    sizes="(max-width: 768px) 260px, (max-width: 1024px) 320px, 380px"
                    className={`object-cover transition-transform duration-700 ${isActive ? 'scale-110' : 'scale-100'}`}
                    loading="lazy"
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
        .swiper-pagination-bullet {
          background-color: ${isDark ? 'rgba(255,255,255,0.3)' : '#9ca3af'};
          width: 10px;
          height: 10px;
          opacity: 1;
        }
        .swiper-pagination-bullet-active {
          background-color: #008AC9;
          width: 30px;
          border-radius: 20px;
        }
        
        @keyframes shimmer {
          100% { transform: translateX(100%); }
        }
      `}</style>
    </div>
  );
}