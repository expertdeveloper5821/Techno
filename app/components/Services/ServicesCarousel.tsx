'use client';

import React, { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';
import { services } from '@/app/lib/data/services';

const CARD_WIDTH_NARROW = 193;
const CARD_WIDTH_EXPANDED = 420;
const EXTEND_DURATION_MS = 500;
const TEXT_APPEAR_DELAY_MS = 150;
const SM_BREAKPOINT = 640; // Below sm = 1 slide only

export default function ServicesCarousel() {
  const swiperRef = useRef<SwiperType | null>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [isBelow640, setIsBelow640] = useState(false);

  useEffect(() => {
    const check = () => setIsBelow640(window.innerWidth < SM_BREAKPOINT);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  return (
    <section className="relative py-24 overflow-hidden min-h-[900px] flex flex-col justify-center bg-linear-to-b from-[#0c4a6e] via-[#0369a1] to-[#0c4a6e]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 mb-10">
        {/* Header: Title + CTA */}
        <div className="flex flex-col lg:flex-row justify-between items-start gap-6 lg:gap-8">
          <h2 className="text-4xl md:text-5xl lg:text-5xl font-bold text-white leading-[1.1] tracking-tight max-w-4xl">
            Full-stack Development From Discovery To Deployment
          </h2>
          <a
            href="#services"
            className="shrink-0 inline-flex items-center justify-center px-8 py-3.5 text-base font-bold text-[#008AC9] bg-white rounded-full hover:bg-white/95 transition-all duration-200 shadow-lg whitespace-nowrap"
          >
            Explore Services &gt;
          </a>
        </div>

        {/* Description + Navigation arrows */}
        <div className="mt-8 flex flex-col sm:flex-row sm:items-start gap-6 max-w-6xl">
          <p className="text-lg text-white/90 leading-relaxed flex-1">
            At Technogetic, we are at the forefront of technological innovation, dedicated to delivering cutting-edge IT solutions that drive business success. Founded in 2018, our mission is to redefine the digital landscape by providing reliable and scalable technology solutions.
          </p>
          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              aria-label="Previous slide"
              onClick={() => swiperRef.current?.slidePrev()}
              className="w-12 h-12 rounded-full  text-white flex items-center justify-center hover:bg-white/10 hover:border-white transition-colors"
            >
              <span className="text-xl font-medium">&lt;</span>
            </button>
            <button
              type="button"
              aria-label="Next slide"
              onClick={() => swiperRef.current?.slideNext()}
              className="w-12 h-12 rounded-full   text-white flex items-center justify-center hover:bg-white/10 hover:border-white transition-colors"
            >
              <span className="text-xl font-medium">&gt;</span>
            </button>
          </div>
        </div>
      </div>

      {/* Service cards slider - centered viewport, 6 cards on laptop */}
      <div className="w-full relative mt-6 flex justify-center px-4 sm:px-6">
        {/* Centered viewport: exact width for 2/3/4/6 cards so slider stays centered */}
        <div className="w-full max-w-full sm:max-w-[615px] md:max-w-[832px] lg:max-w-[1278px] overflow-hidden">
          <Swiper
            onSwiper={(swiper) => {
              swiperRef.current = swiper;
            }}
            modules={[Navigation, Autoplay]}
            spaceBetween={isBelow640 ? 16 : 24}
            slidesPerView={isBelow640 ? 1 : 'auto'}
            centeredSlides={isBelow640}
            loop={true}
            loopAdditionalSlides={2}
            speed={500}
            autoplay={{ delay: 4000, disableOnInteraction: false }}
            breakpoints={{
              320: { slidesPerView: 1, spaceBetween: 16, centeredSlides: true },
              640: { slidesPerView: 'auto', spaceBetween: 18, centeredSlides: false },
              768: { spaceBetween: 20 },
              1024: { spaceBetween: 24 },
            }}
            className="overflow-hidden! pb-4"
          >
            {services.map((service, index) => {
              const isHovered = !isBelow640 && hoveredIndex === index;
              const slideWidth = isBelow640 ? '100%' : (isHovered ? CARD_WIDTH_EXPANDED : CARD_WIDTH_NARROW);
              const showDescription = isBelow640 || isHovered;
              return (
                <SwiperSlide
                  key={`${service.title}-${index}`}
                  className="shrink-0! flex justify-start"
                  style={{
                    width: slideWidth,
                    transition: `width ${EXTEND_DURATION_MS}ms ease-out`,
                  }}
                  onMouseEnter={() => !isBelow640 && setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                >
                  {/* Card aligned left so it only extends to the right */}
                  <article
                    className="relative h-[420px] sm:h-[499px] rounded-[24px] sm:rounded-[30px] overflow-hidden group shrink-0 origin-left"
                    style={{
                      width: slideWidth,
                      transition: `width ${EXTEND_DURATION_MS}ms ease-out`,
                    }}
                  >
                    {/* Blue glow / border effect */}
                    <div className="absolute inset-0 rounded-[24px] sm:rounded-[30px] ring-2 ring-white/20 ring-inset shadow-[0_0_30px_rgba(0,138,201,0.25)] group-hover:shadow-[0_0_40px_rgba(0,138,201,0.35)] transition-shadow duration-500 z-10 pointer-events-none" />
                    <div className="absolute inset-0 bg-sky-900/90 z-1">
                      <Image
                        src={service.image}
                        alt={service.title}
                        fill
                        sizes="(max-width: 1024px) 33vw, 420px"
                        className="object-cover object-left group-hover:scale-105 transition-transform duration-700 ease-out"
                        loading="lazy"
                      />
                    </div>
                    <div className="absolute top-0 left-0 right-0 p-6 z-2">
                      <h2
                        className="text-white drop-shadow-md"
                        style={{
                          fontFamily: 'Inter, sans-serif',
                          fontWeight: 500,
                          fontSize: '22px',
                          lineHeight: '30px',
                          letterSpacing: '0.01em',
                        }}
                      >
                        {service.title}
                      </h2>
                    </div>
                    {/* Bottom gradient + description: fades and slides up slowly after expand */}
                    <div
                      className="absolute bottom-0 left-0 right-0 z-2 bg-linear-to-t from-black/85 via-black/50 to-transparent pt-16 pb-6 px-6"
                      style={{
                        opacity: showDescription && service.description ? 1 : 0,
                        transform: showDescription && service.description ? 'translateY(0)' : 'translateY(12px)',
                        transition: `opacity ${EXTEND_DURATION_MS}ms ease-out ${TEXT_APPEAR_DELAY_MS}ms, transform ${EXTEND_DURATION_MS}ms ease-out ${TEXT_APPEAR_DELAY_MS}ms`,
                      }}
                      aria-hidden={!showDescription}
                    >
                      <p className="text-white text-sm leading-relaxed line-clamp-4">
                        {service.description}
                      </p>
                    </div>
                  </article>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
      </div>
    </section>
  );
}
