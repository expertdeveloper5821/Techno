'use client';

import React, { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';
import { services } from '@/app/lib/data/services';
import ServiceSlider from './ServiceSlider';
import ChevronRightIconImport from '@/app/lib/icon/icon';

type IconProps = React.SVGProps<SVGSVGElement> & { width?: number; height?: number; color?: string };
const ChevronRightIcon = ChevronRightIconImport as React.FC<IconProps>;

const CARD_WIDTH_NARROW = 193;
const CARD_WIDTH_EXPANDED = 420;
const EXTEND_DURATION_MS = 500;
const TEXT_APPEAR_DELAY_MS = 150;
const SM_BREAKPOINT = 640;

// Duplicate slides so loop works both left and right (Swiper needs enough slides)
const loopSlides = [...services, ...services];

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
    <section
      className="relative overflow-hidden min-h-screen flex flex-col justify-start pt-16 pb-24"
      style={{
        background: 'linear-gradient(180deg, #027EBA 0%, rgba(2, 126, 186, 0.6) 25%, #00549A 55%, #030303 94%, #000000 80%)',
      }}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        {/* Header: Title + CTA */}
        <div className="flex flex-col lg:flex-row justify-between items-start gap-6 lg:gap-8">
          <h2 className="text-4xl md:text-5xl lg:text-5xl font-bold text-white leading-[1.1] tracking-tight max-w-4xl">
            Full-stack Development From Discovery To Deployment
          </h2>
          <a
            href="#services"
            className="group shrink-0 inline-flex items-center justify-center gap-2 px-8 py-3.5 text-base font-bold text-[#000000] bg-white rounded-full hover:bg-white/95 transition-all duration-200 shadow-lg whitespace-nowrap"
          >
            Explore Services <ChevronRightIcon width={7} height={11} color="#000000" className="inline-block transition-transform duration-500 ease-out group-hover:translate-x-0.5" />
          </a>
        </div>

        {/* Description + Navigation arrows */}
        <div className="mt-8 flex flex-col sm:flex-row sm:items-start gap-6 max-w-6xl">
          <p className="text-lg text-white/90 leading-relaxed flex-1">
            At Technogetic, we are at the forefront of technological innovation, dedicated to delivering cutting-edge IT solutions that drive business success. Founded in 2018, our mission is to redefine the digital landscape by providing reliable and scalable technology solutions.
          </p>
          <div className={`flex items-center gap-2 shrink-0 ${isBelow640 ? 'hidden' : ''}`}>
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

      {/* Slider at top: ServiceSlider below sm, carousel on sm+ */}
      <div className="w-full relative mt-4 flex justify-center px-4 sm:px-6">
        {isBelow640 ? (
          <div className="w-full max-w-full">
            <ServiceSlider theme="dark" />
          </div>
        ) : (
        <div className="w-full max-w-[402px] sm:max-w-[615px] md:max-w-[832px] lg:max-w-[1278px] overflow-hidden">
          <Swiper
            onSwiper={(swiper) => {
              swiperRef.current = swiper;
            }}
            modules={[Navigation , Autoplay]}
            spaceBetween={24}
            slidesPerView="auto"
            centeredSlides={false}
            loop={true}
            loopAdditionalSlides={0}
            observer={true}
            observeParents={true}
            speed={500}
            autoplay={{ delay: 4000, disableOnInteraction: false }}
            breakpoints={{
              320: { spaceBetween: 16 },
              640: { spaceBetween: 18 },
              768: { spaceBetween: 20 },
              1024: { spaceBetween: 24 },
            }}
            className="overflow-hidden! pb-4"
          >
            {loopSlides.map((service, index) => {
              const realIndex = index % services.length;
              const isHovered = hoveredIndex === realIndex;
              return (
                <SwiperSlide
                  key={`${service.title}-${index}`}
                  className="shrink-0! flex justify-start"
                  style={{
                    width: isHovered ? CARD_WIDTH_EXPANDED : CARD_WIDTH_NARROW,
                    transition: `width ${EXTEND_DURATION_MS}ms ease-out`,
                  }}
                  onMouseEnter={() => setHoveredIndex(realIndex)}
                  onMouseLeave={() => setHoveredIndex(null)}
                >
                  {/* Card aligned left so it only extends to the right */}
                  <article
                    className="relative h-[499px] rounded-[30px] overflow-hidden group shrink-0 origin-left"
                    style={{
                      width: isHovered ? CARD_WIDTH_EXPANDED : CARD_WIDTH_NARROW,
                      transition: `width ${EXTEND_DURATION_MS}ms ease-out`,
                    }}
                  >
                    {/* Blue glow / border effect */}
                    <div className="absolute inset-0 rounded-[30px] ring-2 ring-white/20 ring-inset shadow-[0_0_30px_rgba(0,138,201,0.25)] group-hover:shadow-[0_0_40px_rgba(0,138,201,0.35)] transition-shadow duration-500 z-10 pointer-events-none" />
                    <div className="absolute inset-0 bg-sky-900/90 z-1">
                      <Image
                        src={service.image}
                        alt={service.title}
                        fill
                        sizes="(max-width: 1024px) 33vw, 420px"
                        className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
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
                        opacity: isHovered && service.description ? 1 : 0,
                        transform: isHovered && service.description ? 'translateY(0)' : 'translateY(12px)',
                        transition: `opacity ${EXTEND_DURATION_MS}ms ease-out ${TEXT_APPEAR_DELAY_MS}ms, transform ${EXTEND_DURATION_MS}ms ease-out ${TEXT_APPEAR_DELAY_MS}ms`,
                      }}
                      aria-hidden={!isHovered}
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
        )}
      </div>
    </section>
  );
}
