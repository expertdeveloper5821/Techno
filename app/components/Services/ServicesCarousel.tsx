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

// Mobile-first responsive card widths
const CARD_WIDTH_MOBILE_NARROW = 140; // Mobile: collapsed card
const CARD_WIDTH_MOBILE_EXPANDED = 280; // Mobile: expanded card
const CARD_WIDTH_NARROW = 193; // Desktop: collapsed card
const CARD_WIDTH_EXPANDED = 420; // Desktop: expanded card
// Responsive card heights
const CARD_HEIGHT_MOBILE = 320; // Mobile height (more compact)
const CARD_HEIGHT_TABLET = 380; // Tablet height
const CARD_HEIGHT_DESKTOP = 499; // Desktop height
const EXTEND_DURATION_MS = 600;
const TEXT_APPEAR_DELAY_MS = 120;
const SM_BREAKPOINT = 640;
const MD_BREAKPOINT = 768;
const LG_BREAKPOINT = 1024;
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
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(0);
  const [isBelow640, setIsBelow640] = useState(false);
  const [windowSize, setWindowSize] = useState<'mobile' | 'tablet' | 'desktop'>('mobile');
  const [mobileActiveIndex, setMobileActiveIndex] = useState<number>(0); // Track active card on mobile
  const updateTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const leaveTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const enterTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Function to get card height based on screen size
  const getCardHeight = (): number => {
    if (windowSize === 'mobile') return CARD_HEIGHT_MOBILE;
    if (windowSize === 'tablet') return CARD_HEIGHT_TABLET;
    return CARD_HEIGHT_DESKTOP;
  };

  // Debounce resize so we don't flicker when crossing breakpoint
  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>;
    const check = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        const width = window.innerWidth;
        setIsBelow640(width < SM_BREAKPOINT);
        // Update window size category
        if (width < SM_BREAKPOINT) {
          setWindowSize('mobile');
        } else if (width < LG_BREAKPOINT) {
          setWindowSize('tablet');
        } else {
          setWindowSize('desktop');
        }
      }, RESIZE_DEBOUNCE_MS);
    };
    check();
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
    if (isBelow640) return; // Mobile: always extended, no hover required
    
    if (leaveTimeoutRef.current) {
      clearTimeout(leaveTimeoutRef.current);
      leaveTimeoutRef.current = null;
    }
    if (enterTimeoutRef.current) clearTimeout(enterTimeoutRef.current);
    enterTimeoutRef.current = setTimeout(() => {
      enterTimeoutRef.current = null;
      setHoveredIndex(realIndex);
      // On desktop/tablet we only expand the card; we do NOT slide here
      // to avoid weird reverse looping behavior at the ends.
      scheduleSwiperUpdate();
    }, HOVER_ENTER_DELAY_MS);
  }, [scheduleSwiperUpdate, isBelow640]);

  // Leave: clear hover only after delay so moving to adjacent slide doesn't briefly clear and flicker
  const handleSlideLeave = useCallback(() => {
    if (isBelow640) return; // Mobile: always extended, no hover required
    
    if (enterTimeoutRef.current) {
      clearTimeout(enterTimeoutRef.current);
      enterTimeoutRef.current = null;
    }
    if (leaveTimeoutRef.current) clearTimeout(leaveTimeoutRef.current);
    leaveTimeoutRef.current = setTimeout(() => {
      leaveTimeoutRef.current = null;
      setHoveredIndex(0);
      scheduleSwiperUpdate();
    }, HOVER_LEAVE_DELAY_MS);
  }, [scheduleSwiperUpdate, isBelow640]);

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
    setHoveredIndex(null);
    scheduleSwiperUpdate();
  }, [scheduleSwiperUpdate]);

  // Click handler: on mobile it behaves like an accordion and scrolls to keep card visible;
  // on tablet/desktop it opens (sets hovered) and also scrolls so the expanded card stays on-screen.
  const handleSlideClick = useCallback(
    (realIndex: number) => {
      if (isBelow640) {
        // Mobile: toggle active card + scroll
        setMobileActiveIndex(realIndex);

        if (swiperRef.current) {
          // On mobile we use slideToLoop so tapping any card brings it into view,
          // but only here to avoid confusing reverse loops on desktop.
          swiperRef.current.slideToLoop(realIndex, 500);
        }
      } else {
        // Desktop/tablet: treat click like an "intentional hover"
        setHoveredIndex(realIndex);

        // Also scroll so the expanded slide is fully visible (especially for last slides)
        if (swiperRef.current) {
          swiperRef.current.slideToLoop(realIndex, 500);
        }
      }

      scheduleSwiperUpdate();
    },
    [isBelow640, scheduleSwiperUpdate]
  );

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
      <div className="w-full flex lg:flex-row flex-col lg:gap-0 gap-8   mx-auto  px-4 sm:px-6 lg:px-6 mb-8">
        {/* Header: Title + CTA */}
        <div className="flex flex-col lg:flex-col justify-between items-start gap-2 lg:gap-2">
          <h2 className="text-[25px]  sm:text-xl md:text-4xl lg:text-[44px] font-semibold font-inter text-white lg:leading-[60px] md:leading-[50px] leading-[35px]  max-w-4xl">
            Full-stack Development From Discovery To Deployment
          </h2>
          <p className="text-base md:text-lg font-inter font-normal text-white/90 md:leading-relaxed leading-[25px] flex-1">
            At Technogetic, we are at the forefront of technological innovation, dedicated to delivering cutting-edge IT solutions that drive business success. Founded in 2018, our mission is to redefine the digital landscape by providing reliable and scalable technology solutions.
          </p>
        </div>

        {/* Description + Navigation arrows */}
        <div className=" flex lg:justify-center sm:justify-between sm:gap-20 justify-between sm:items-end items-center flex-row  lg:flex-col   ">
          
          <a
            href="#services"
            className="group shrink-0 inline-flex items-center justify-center gap-2 sm:px-8  sm:py-3.5 px-4 py-2 text-base font-semibold text-[#000000] bg-white rounded-full hover:bg-white/95 transition-all duration-200 shadow-lg whitespace-nowrap mt-0"
          >
            Explore Services <ChevronRightIcon width={7} height={11} color="#000000" className="inline-block transition-transform duration-500 ease-out group-hover:translate-x-0.5" />
          </a>
          <div className={`flex items-center gap-2 shrink-0 ${isBelow640 ? '' : ''}`}>
            <button
              type="button"
              aria-label="Previous slide"
              onClick={() => swiperRef.current?.slidePrev()}
              className="sm:w-12 sm:h-12 w-6 h-6 rounded-full  text-white flex items-center justify-center hover:bg-white/10 hover:border-white transition-colors"
            >
              {/* <ChevronLeftIcon width={10} height={11} color="#ffffff"/> */}
              <Image src={arrowl} alt="arrow" width={20} height={20} className="sm:w-10 sm:h-10 w-6 h-6 " />
              
            </button>
            <button
              type="button"
              aria-label="Previous slide"
              onClick={() => swiperRef.current?.slideNext()}
              className="sm:w-12 sm:h-12 w-6 h-6 rounded-full [perspective:1000px] text-white flex items-center justify-center hover:bg-white/10 hover:border-white transition-colors"
            >
              {/* <ChevronLeftIcon width={10} height={11} color="#ffffff"/> */}
              <Image src={arrowl} alt="arrow" width={20} height={20} className="w-10 h-10 sm:w-10 sm:h-10 w-6 h-6 [transform:rotateY(180deg)]" />
              
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
            // Center active slide so when it expands (especially the last one)
            // it stays fully visible on screen.
            centeredSlides={false}
            loop={true}
            loopAdditionalSlides={3}
            observer={true}
            observeParents={true}
            watchSlidesProgress={true}
            speed={600}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            slidesPerView="auto"
            breakpoints={{
              320: { spaceBetween: 16 },
              640: { spaceBetween: 18 },
              768: { spaceBetween: 20 },
              1024: { spaceBetween: 24 },
              1280: { spaceBetween: 26 },
              1440: { spaceBetween: 28 },

            }}
            className="overflow-hidden! pb-4"
          >
            {loopSlides.map((service, index) => {
              const realIndex = index % services.length;
              // On mobile, only the active card is expanded (accordion behavior)
              // On desktop, hovered card is expanded
              const isHovered = isBelow640 ? (mobileActiveIndex === realIndex) : (hoveredIndex === realIndex);
              // Responsive card widths: mobile has its own sizes, desktop has different sizes
              const cardWidth = isBelow640
                ? (isHovered ? CARD_WIDTH_MOBILE_EXPANDED : CARD_WIDTH_MOBILE_NARROW)
                : (isHovered ? CARD_WIDTH_EXPANDED : CARD_WIDTH_NARROW);
              const cardHeight = getCardHeight();
              
              return (
                <SwiperSlide
                  key={`${service.title}-${index}`}
                  className="shrink-0! flex justify-end sm:justify-start"
                  style={{
                    width: cardWidth,
                    transition: `width ${EXTEND_DURATION_MS}ms ${EASE_SMOOTH}`,
                  }}
                  onMouseEnter={() => handleSlideEnter(realIndex)}
                  onMouseLeave={handleSlideLeave}
                  onClick={() => handleSlideClick(realIndex)}
                >
                  {/* Card expands to the right, pushing other cards */}
                  <article
                    className="relative rounded-[30px] overflow-hidden group shrink-0 origin-left cursor-pointer w-full"
                    style={{
                      height: `${cardHeight}px`,
                      transition: `all ${EXTEND_DURATION_MS}ms ${EASE_SMOOTH}`,
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
                    <div className="absolute top-0 left-0 right-0 z-3" style={{ padding: isBelow640 ? '15px' : '24px' }}>
                      <h2
                        className="text-white drop-shadow-md"
                        style={{
                          fontFamily: 'Inter, sans-serif',
                          fontWeight: 500,
                          fontSize: isBelow640 ? '18px' : '22px',
                          lineHeight: isBelow640 ? '18px' : '30px',
                          letterSpacing: '0.01em',
                        }}
                      >
                        {service.title}
                      </h2>
                    </div>
                    {/* Bottom gradient + description: always visible on mobile, shows on hover on desktop */}
                    <div
                      className="absolute bottom-0 left-0 right-0 z-2 bg-linear-to-t from-black/85 via-black/50 to-transparent"
                      style={{
                        padding: isBelow640 ? '10px' : '24px',
                        paddingTop: isBelow640 ? '12px' : '32px',
                        paddingBottom: isBelow640 ? '10px' : '24px',
                        opacity: isHovered && service.description ? 1 : 0,
                        transform: isHovered && service.description ? 'translateY(0)' : 'translateY(10px)',
                        transition: `opacity ${EXTEND_DURATION_MS}ms ${EASE_SMOOTH} ${isBelow640 ? 0 : TEXT_APPEAR_DELAY_MS}ms, transform ${EXTEND_DURATION_MS}ms ${EASE_SMOOTH} ${isBelow640 ? 0 : TEXT_APPEAR_DELAY_MS}ms`,
                        pointerEvents: isHovered ? 'auto' : 'none',
                      }}
                      aria-hidden={!isHovered}
                    >
                      <p className="text-white leading-snug " style={{ fontSize: isBelow640 ? '12px' : '14px', lineHeight: isBelow640 ? '14px' : '22px' }}>
                        <div>{service.description}</div>
                        <button className="text-white inline-flex items-center gap-1 mt-2" style={{ fontSize: isBelow640 ? '11px' : '14px' }}>
                          Read more <ReadMoreIcon width={isBelow640 ? 10 : 13} height={isBelow640 ? 10 : 13} color="#F8F8F8" className="inline-block" />
                        </button>
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
