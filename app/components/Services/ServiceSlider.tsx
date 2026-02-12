'use client';

import React, { useState, useRef, useCallback } from 'react';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import type { Swiper as SwiperType } from 'swiper';
import { Pagination, Autoplay, Navigation, EffectCoverflow } from 'swiper/modules';
import { services } from '@/app/lib/data/services';
import ReadMoreIcon from '@/app/lib/icon/readmore-icon';
import { redirect } from 'next/dist/server/api-utils';
import arrowl from '@/app/lib/icon/arrow.svg';
import arrowr from '@/app/lib/icon/arrowr.svg';
interface ServiceSliderProps {
  theme?: 'dark' | 'light';
}

const DETAIL_TRANSITION_MS = 450;
const EASE_SLIDE = 'cubic-bezier(0.25, 0.46, 0.45, 0.94)';

export default function ServiceSlider({ theme = 'light' }: ServiceSliderProps) {
  const isDark = theme === 'dark';
  const [isLoaded, setIsLoaded] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const swiperRef = useRef<SwiperType | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
const pagination = [1,2,3];
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
    <div className="w-full relative mx-auto overflow-hidden px-4 sm:px-6 lg:px-6">
      
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
          rotate: 35,
          stretch: 0,
          depth: 50,
          modifier: 1,
          slideShadows: false,
        }}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        pagination={false}
        modules={[EffectCoverflow, Navigation, Autoplay]}
        onSwiper={(swiper) => { swiperRef.current = swiper; }}
        onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
        onInit={() => setIsLoaded(true)}
        className={`w-full  py-12 pb-20 transition-opacity duration-500 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
      >
        {services.map((service, index) => (
          <SwiperSlide key={`${service.title}-${index}`} className="w-[260px]! md:w-[320px]! lg:w-[300px]! " style={{
            border:'2px solid #7A7A7A',
            borderRadius:'34px',
          }}>
            {({ isActive }) => {
              const showDetails = hoveredIndex === index;
              return (
                <div
                  role="button"
                  tabIndex={0}
                  onClick={() => handleSlideClick(index)}
                  onFocus={() => handleSlideClick(index)}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      handleSlideClick(index);
                    }
                  }}
                  className={`
                    relative h-[400px] md:h-[470px] w-full 
                    rounded-[32px] overflow-hidden cursor-pointer
                    transition-all duration-500 ease-out
                    ${isActive 
                      ? `${activeShadow} opacity-100 z-10` 
                      : `opacity-100 hover:opacity-80 z-0`
                    }
                  `}
                >
                  {/* Image layer */}
                  <div className="absolute inset-0 w-full h-full bg-gray-900 overflow-hidden rounded-2xl ">
                    <Image
                      src={service.image}
                      alt={service.title}
                      fill
                      sizes="(max-width: 768px) 260px, (max-width: 1024px) 320px, 380px"
                      className={`object-cover transition-transform duration-700  rounded-[32px] overflow-hidden ${showDetails ? 'scale-105' : 'scale-100'}`}
                      loading="lazy"
                    />
                    <div 
                      className="absolute inset-0 transition-opacity duration-300 overflow-hidden rounded-[32px]"
                      style={{
                        background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.2) 50%, transparent 100%)',
                        opacity: showDetails ? 0.5 : 0.7,
                      }}
                    />
                  </div>

                  {/* Default title bar – visible when details are hidden */}
                  <div 
                    className="absolute bottom-0 left-0 w-full p-6 md:p-8 text-center  transition-opacity duration-300 opacity-80   slider-tittle bg-[linear-gradient(176.17deg,rgba(0,139,206,0)_2.91%,#018BCE_90.68%,#018BCD_80.79%)] "
                    style={{ opacity: showDetails ? 0 : 1 }}
                    aria-hidden={showDetails}
                  >
                    <h3 className="font-bold text-white tracking-wide text-lg md:text-xl drop-shadow-md">
                      {service.title}
                    </h3>
                    {/* <div className="h-1.5 bg-[#008AC9] w-12 mx-auto rounded-full mt-3" /> */}
                  </div>

                  {/* Sliding details panel – slides up from bottom on hover/active */}
                  <div
                    className="absolute left-0 right-0 bottom-0 w-full flex flex-col justify-end rounded-b-[32px] overflow-hidden pointer-events-none opacity-90 bg-[linear-gradient(176.17deg,rgba(0,139,206,0)_2.91%,#018BCE_47.68%,#018BCD_89.79%)] "
                    style={{
                      height: '58%',
                      transform: showDetails ? 'translateY(0)' : 'translateY(100%)',
                      transition: `transform ${DETAIL_TRANSITION_MS}ms ${EASE_SLIDE}`,
                    }}
                    aria-hidden={!showDetails}
                  >
                    <div 
                      className="flex flex-col gap-4 justify-end flex-1 min-h-0 p-6 md:p-8 pb-7 text-center text-white"
                      style={{
                        background: isDark 
                          ? 'linear-gradient(180deg, transparent 0%, rgba(0, 82, 154, 0.97) 18%, rgba(0, 138, 201, 0.98) 100%)'
                          : 'linear-gradient(180deg, transparent 0%, rgba(0, 99, 221, 0.96) 18%, rgba(0, 136, 201, 0.98) 100%)',
                      }}
                    >
                      <h3 className="font-semibold text-xl md:text-xl lg:text-xl tracking-wide drop-shadow-sm mb-3 leading-[1.2]">
                        {service.title}
                      </h3>
                      {service.description && (
                        <p className="text-white/95 text-sm md:text-base font-normal leading-relaxed line-clamp-3 ">
                          {service.description}
                        </p>
                      )}
                      <span className="inline-flex items-center justify-center gap-1 text-sm md:text-base font-[500px] font-inter text-white/95 hover:text-white p-0! m-0!">
                        Read more
                       <ReadMoreIcon width={13} height={13} color="#F8F8F8" className="inline-block" />
                      </span>
                    </div>
                  </div>
                </div>
              );
            }}
          </SwiperSlide>
        ))}


<div className=" mt-6 flex items-center justify-center gap-3 shrink-0 md:hidden">
            <button
              type="button"
              aria-label="Previous slide"
              onClick={() => swiperRef.current?.slidePrev()}
              className="sm:w-10 sm:h-10 w-7 h-7 rounded-full text-white flex items-center justify-center hover:bg-white/10 transition-colors"
            >
              <Image src={arrowl} alt="arrow" width={20} height={20} className="sm:w-8 sm:h-8 w-5 h-5" />
            </button>

            <div className="flex items-center gap-1.5">
              {pagination.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  aria-label={`Go to slide ${i + 1}`}
                  onClick={() => swiperRef.current?.slideToLoop(i, 500)}
                  className={`rounded-full transition-all duration-300 ${
                    activeIndex % 3 === i
                      ? 'w-6 h-2.5 bg-[#2177C7]'
                      : 'w-2.5 h-2.5 bg-white/50 hover:bg-white/80'
                  }`}
                />
              ))}
            </div>

            <button
              type="button"
              aria-label="Next slide"
              onClick={() => swiperRef.current?.slideNext()}
              className="sm:w-10 sm:h-10 w-7 h-7 rounded-full [perspective:1000px] text-white flex items-center justify-center hover:bg-white/10 transition-colors"
            >
              <Image src={arrowl} alt="arrow" width={20} height={20} className="sm:w-8 sm:h-8 w-5 h-5 [transform:rotateY(180deg)]" />
            </button>
          </div>

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