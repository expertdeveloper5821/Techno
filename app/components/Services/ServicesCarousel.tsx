'use client';

import React, { useRef, useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';
import { services } from '@/app/lib/data/services';
import ServiceSlider from './ServiceSlider';
import ChevronRightIconImport from '@/app/lib/icon/chevron-right-icon';
import ChevronLeftIcon from '@/app/lib/icon/chevron-left-icon';
import ReadMoreIcon from '@/app/lib/icon/readmore-icon';
import arrowl from '@/app/lib/icon/arrow.svg';
import arrowr from '@/app/lib/icon/arrowr.svg';
type IconProps = React.SVGProps<SVGSVGElement> & { width?: number; height?: number; color?: string };
const ChevronRightIcon = ChevronRightIconImport as React.FC<IconProps>;

const CARD_WIDTH_NARROW = 193;
const CARD_WIDTH_EXPANDED = 420;
const EXTEND_DURATION_MS = 600;
const TEXT_APPEAR_DELAY_MS = 120;
const SM_BREAKPOINT = 640;
/** Smooth ease-out for expand, text, and visual transitions */
const EASE_SMOOTH = 'cubic-bezier(0.25, 0.46, 0.45, 0.94)';
const RESIZE_DEBOUNCE_MS = 150;
/** Delay before clearing hover when leaving a slide - prevents flicker when cursor is at slide edges */
const HOVER_LEAVE_DELAY_MS = 220;
/** Delay before setting hover when entering a slide - ignores quick grazes at edges */
const HOVER_ENTER_DELAY_MS = 50;

// Duplicate slides so loop works both left and right (Swiper needs enough slides)
const loopSlides = [...services, ...services];

export default function ServicesCarousel() {
  const swiperRef = useRef<SwiperType | null>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [isBelow640, setIsBelow640] = useState(false);
  const updateTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const leaveTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const enterTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Debounce resize so we don't flicker when crossing breakpoint
  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>;
    const check = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        setIsBelow640(window.innerWidth < SM_BREAKPOINT);
      }, RESIZE_DEBOUNCE_MS);
    };
    setIsBelow640(window.innerWidth < SM_BREAKPOINT);
    window.addEventListener('resize', check);
    return () => {
      window.removeEventListener('resize', check);
      clearTimeout(timeoutId);
    };
  }, []);

  // Schedule Swiper layout update after expand/collapse transition
  const scheduleSwiperUpdate = useCallback(() => {
    if (updateTimeoutRef.current) clearTimeout(updateTimeoutRef.current);
    updateTimeoutRef.current = setTimeout(() => {
      updateTimeoutRef.current = null;
      swiperRef.current?.update();
    }, EXTEND_DURATION_MS + 50);
  }, []);

  // Enter: set hover after short delay (cancels pending leave) – avoids edge flicker and quick grazes
  const handleSlideEnter = useCallback((realIndex: number) => {
    if (leaveTimeoutRef.current) {
      clearTimeout(leaveTimeoutRef.current);
      leaveTimeoutRef.current = null;
    }
    if (enterTimeoutRef.current) clearTimeout(enterTimeoutRef.current);
    enterTimeoutRef.current = setTimeout(() => {
      enterTimeoutRef.current = null;
      setHoveredIndex(realIndex);
      scheduleSwiperUpdate();
    }, HOVER_ENTER_DELAY_MS);
  }, [scheduleSwiperUpdate]);

  // Leave: clear hover only after delay so moving to adjacent slide doesn’t briefly clear and flicker
  const handleSlideLeave = useCallback(() => {
    if (enterTimeoutRef.current) {
      clearTimeout(enterTimeoutRef.current);
      enterTimeoutRef.current = null;
    }
    if (leaveTimeoutRef.current) clearTimeout(leaveTimeoutRef.current);
    leaveTimeoutRef.current = setTimeout(() => {
      leaveTimeoutRef.current = null;
      setHoveredIndex(null);
      scheduleSwiperUpdate();
    }, HOVER_LEAVE_DELAY_MS);
  }, [scheduleSwiperUpdate]);

  // When cursor leaves the carousel area entirely, clear hover and all pending timeouts
  const handleCarouselLeave = useCallback(() => {
    if (enterTimeoutRef.current) {
      clearTimeout(enterTimeoutRef.current);
      enterTimeoutRef.current = null;
    }
    if (leaveTimeoutRef.current) {
      clearTimeout(leaveTimeoutRef.current);
      leaveTimeoutRef.current = null;
    }
    setHoveredIndex(0);
    scheduleSwiperUpdate();
  }, [scheduleSwiperUpdate]);

  useEffect(() => {
    return () => {
      if (updateTimeoutRef.current) clearTimeout(updateTimeoutRef.current);
      if (leaveTimeoutRef.current) clearTimeout(leaveTimeoutRef.current);
      if (enterTimeoutRef.current) clearTimeout(enterTimeoutRef.current);
    };
  }, []);

  // Pause autoplay when hovering on a slide, resume when leaving
  useEffect(() => {
    const swiper = swiperRef.current;
    if (!swiper?.autoplay) return;
    if (hoveredIndex !== null) {
      swiper.autoplay.stop();
    } else {
      swiper.autoplay.start();
    }
  }, [hoveredIndex]);

  return (
    <section
      className="relative overflow-hidden min-h-screen flex flex-col justify-start lg:pt-24 lg:pb-24 md:pt-15 md:pb-15 pt-10 pb-10 bg-[linear-gradient(to_bottom,#0094DB_0%,#0094DB_85%,#003a5c_95%,#000000_100%)] "
     
    >
      <div className="w-full mx-auto px-4 sm:px-6 lg:px-6 mb-8">
        {/* Header: Title + CTA */}
        <div className="flex flex-col lg:flex-row justify-between items-start gap-6 lg:gap-8">
          <h2 className="text-[25px]  sm:text-xl md:text-4xl lg:text-[44px] font-semibold font-inter text-white lg:leading-[60px] md:leading-[50px] leading-[35px]  max-w-4xl">
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
        <div className="mt-8 flex flex-col sm:flex-row sm:items-start gap-6 max-w-7xl">
          <p className="text-base md:text-lg font-inter font-normal text-white/90 md:leading-relaxed leading-[25px] flex-1">
            At Technogetic, we are at the forefront of technological innovation, dedicated to delivering cutting-edge IT solutions that drive business success. Founded in 2018, our mission is to redefine the digital landscape by providing reliable and scalable technology solutions.
          </p>
          <div className={`flex items-center gap-2 shrink-0 ${isBelow640 ? 'hidden' : ''}`}>
            <button
              type="button"
              aria-label="Previous slide"
              onClick={() => swiperRef.current?.slidePrev()}
              className="w-12 h-12 rounded-full  text-white flex items-center justify-center hover:bg-white/10 hover:border-white transition-colors"
            >
              {/* <ChevronLeftIcon width={10} height={11} color="#ffffff"/> */}
              <Image src={arrowl} alt="arrow" width={20} height={20} className="w-10 h-10" />
              
            </button>
            <button
              type="button"
              aria-label="Previous slide"
              onClick={() => swiperRef.current?.slideNext()}
              className="w-12 h-12 rounded-full [perspective:1000px] text-white flex items-center justify-center hover:bg-white/10 hover:border-white transition-colors"
            >
              {/* <ChevronLeftIcon width={10} height={11} color="#ffffff"/> */}
              <Image src={arrowl} alt="arrow" width={20} height={20} className="w-10 h-10 [transform:rotateY(180deg)]" />
              
            </button>
          </div>
        </div>
      </div>

      {/* Slider at top: ServiceSlider below sm, carousel on sm+ */}
      <div className="w-full relative mt-4 flex justify-center px-4 sm:px-6">
       
        <div
          className="w-full  overflow-hidden"
          onMouseLeave={handleCarouselLeave}
        >
          <Swiper
            onSwiper={(swiper) => {
              swiperRef.current = swiper;
            }}
            modules={[Navigation, Autoplay]}
            spaceBetween={24}
            
            centeredSlides={false}
            loop={true}
            loopAdditionalSlides={3}
            observer={false}
            observeParents={false}
            speed={600}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            slidesPerView={1}
            breakpoints={{
              320: { spaceBetween: 16  ,slidesPerView: 1 },
              640: { spaceBetween: 18 ,slidesPerView: 2 },
              768: { spaceBetween: 20 ,slidesPerView: 3},
              1024: { spaceBetween: 24 ,slidesPerView: 4 },
              1280: { spaceBetween: 26 ,slidesPerView: 5 },
              1440: { spaceBetween: 28 ,slidesPerView: 6 },
              
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
                    transition: `width ${EXTEND_DURATION_MS}ms ${EASE_SMOOTH}`,
                  }}
                  onMouseEnter={() => handleSlideEnter(realIndex)}
                  onMouseLeave={handleSlideLeave}
                >
                  {/* Card aligned left so it only extends to the right */}
                  <article
                    className="relative h-[499px] rounded-[30px] overflow-hidden group shrink-0 origin-left"
                    style={{
                      width: isHovered ? CARD_WIDTH_EXPANDED : CARD_WIDTH_NARROW,
                      transition: `width ${EXTEND_DURATION_MS}ms ${EASE_SMOOTH}`,
                    }}
                  >
                    {/* Blue glow / border effect */}
                    <div
                      className="absolute inset-0 rounded-[30px] ring-2 ring-white/20 ring-inset z-10 pointer-events-none"
                      style={{
                        boxShadow: isHovered ? '0 0 40px rgba(0,138,201,0.35)' : '0 0 30px rgba(0,138,201,0.25)',
                        transition: `box-shadow ${EXTEND_DURATION_MS}ms ${EASE_SMOOTH}`,
                      }}
                    />
                    <div className="absolute inset-0 bg-sky-900/90 z-1">
                      <Image
                        src={service.image}
                        alt={service.title}
                        fill
                        sizes="(max-width: 1024px) 33vw, 420px"
                        className="object-cover object-center"
                        style={{
                          transform: isHovered ? 'scale(1.05)' : 'scale(1)',
                          transition: `transform ${EXTEND_DURATION_MS}ms ${EASE_SMOOTH}`,
                        }}
                        loading="lazy"
                      />
                    </div>
                    {/* Top black gradient overlay (like screenshot) - dark at top, fades down */}
                    <div
                      className="absolute top-0 left-0 right-0 z-2 pointer-events-none rounded-t-[30px]"
                      style={{
                        height: '50%',
                        background: 'linear-gradient(to bottom, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.35) 50%, transparent 100%)',
                      }}
                      aria-hidden
                    />
                    <div className="absolute top-0 left-0 right-0 p-6 z-3">
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
                    {/* Bottom gradient + description: fades and slides up smoothly after expand */}
                    <div
                      className="absolute bottom-0 left-0 right-0 z-2 bg-linear-to-t from-black/85 via-black/50 to-transparent pt-16 pb-6 px-6"
                      style={{
                        opacity: isHovered && service.description ? 1 : 0,
                        transform: isHovered && service.description ? 'translateY(0)' : 'translateY(10px)',
                        transition: `opacity ${EXTEND_DURATION_MS}ms ${EASE_SMOOTH} ${TEXT_APPEAR_DELAY_MS}ms, transform ${EXTEND_DURATION_MS}ms ${EASE_SMOOTH} ${TEXT_APPEAR_DELAY_MS}ms`,
                      }}
                      aria-hidden={!isHovered}
                    >
                      <p className="text-white text-sm leading-relaxed line-clamp-4">
                        <div>{service.description}</div>
                        <button className="text-white text-sm leading-relaxed line-clamp-4 inline-flex items-center gap-1.5">Read more <ReadMoreIcon width={13} height={13} color="#F8F8F8" className="inline-block" /> </button>
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
