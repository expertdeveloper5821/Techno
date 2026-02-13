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


/** Smooth ease-out for expand, text, and visual transitions */
const EASE_SMOOTH = 'cubic-bezier(0.25, 0.46, 0.45, 0.94)';


// Duplicate slides so loop works both left and right (Swiper needs enough slides)
const loopSlides = [...services, ...services];

export default function ServicesCarousel() {
  const swiperRef = useRef<SwiperType | null>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number>(0); // Active tab, defaults to first visible in swiper
  const [firstVisibleIndex, setFirstVisibleIndex] = useState<number>(0); // First card visible in swiper viewport
  const [isUserHovering, setIsUserHovering] = useState(false); // Track if user is actively hovering
  const [isBelow640, setIsBelow640] = useState(false);
  const [windowSize, setWindowSize] = useState<'mobile' | 'tablet' | 'desktop'>('mobile');
  const [mobileActiveIndex, setMobileActiveIndex] = useState<number>(0); // Track active card on mobile
  const updateTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const leaveTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const enterTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Function to get card height based on screen size
  const getCardHeight = (): number => {
    if (windowSize === 'mobile') return 320;
    if (windowSize === 'tablet') return 380;
    return 499;
  };

  // Debounce resize so we don't flicker when crossing breakpoint
  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>;
    const check = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        const width = window.innerWidth;
        setIsBelow640(width < 640);
        // Update window size category
        if (width < 640) {
          setWindowSize('mobile');
        } else if (width < 1024) {
          setWindowSize('tablet');
        } else {
          setWindowSize('desktop');
        }
      }, 150);
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
    }, 400 + 50);
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
      setIsUserHovering(true);
      // On desktop/tablet we only expand the card; we do NOT slide here
      // to avoid weird reverse looping behavior at the ends.
      scheduleSwiperUpdate();
    }, 50);
  }, [scheduleSwiperUpdate, isBelow640]);

  // Leave: reset hover to first visible card after delay so moving to adjacent slide doesn't briefly flicker
  const handleSlideLeave = useCallback(() => {
    if (isBelow640) return; // Mobile: always extended, no hover required
    
    if (enterTimeoutRef.current) {
      clearTimeout(enterTimeoutRef.current);
      enterTimeoutRef.current = null;
    }
    if (leaveTimeoutRef.current) clearTimeout(leaveTimeoutRef.current);
    leaveTimeoutRef.current = setTimeout(() => {
      leaveTimeoutRef.current = null;
      setHoveredIndex(firstVisibleIndex); // Reset to first visible card in swiper
      setIsUserHovering(false);
      scheduleSwiperUpdate();
    }, 220);
  }, [scheduleSwiperUpdate, isBelow640, firstVisibleIndex]);

  // When cursor leaves the carousel area entirely, reset to first visible card and all pending timeouts
  const handleCarouselLeave = useCallback(() => {
    if (enterTimeoutRef.current) {
      clearTimeout(enterTimeoutRef.current);
      enterTimeoutRef.current = null;
    }
    if (leaveTimeoutRef.current) {
      clearTimeout(leaveTimeoutRef.current);
      leaveTimeoutRef.current = null;
    }
    setHoveredIndex(firstVisibleIndex); // Reset to first visible card in swiper
    setIsUserHovering(false);
    scheduleSwiperUpdate();
  }, [scheduleSwiperUpdate, firstVisibleIndex]);

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
          swiperRef.current.slideToLoop(realIndex, 2000);
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

  // Pause autoplay when user is actively hovering (not on default first tab), resume when leaving
  useEffect(() => {
    const swiper = swiperRef.current;
    if (!swiper?.autoplay) return;
    if (isUserHovering) {
      swiper.autoplay.stop();
    } else {
      swiper.autoplay.start();
    }
  }, [isUserHovering]);

  return (
    <section
      className="relative overflow-hidden min-h-screen flex flex-col justify-start lg:pt-24 lg:pb-24 md:pt-15 md:pb-15 pt-10 pb-10 bg-[linear-gradient(to_bottom,#0094DB_0%,#0094DB_85%,#003a5c_95%,#000000_100%)] "
     
    >
      <div className="w-full flex lg:flex-row flex-col gap-8 lg:gap-0   mx-auto  px-4 sm:px-6 lg:px-6 mb-8">
        {/* Header: Title + CTA */}
        <div className="flex flex-col lg:flex-col justify-between items-start gap-5 lg:gap-2">
          <h2 className="text-[25px]  sm:text-xl md:text-4xl lg:text-[44px] font-semibold font-inter text-white lg:leading-[60px] md:leading-[50px] leading-[32px]  max-w-4xl">
            Full-stack Development From Discovery To Deployment
          </h2>
          <p className="text-base md:text-lg font-inter font-normal text-white/90 md:leading-relaxed leading-[25px] flex-1">
            At Technogetic, we are at the forefront of technological innovation, dedicated to delivering cutting-edge IT solutions that drive business success. Founded in 2018, our mission is to redefine the digital landscape by providing reliable and scalable technology solutions.
          </p>
        </div>

        {/* Description + Navigation arrows */}
        <div className=" flex lg:justify-center sm:justify-between sm:gap-20 justify-between sm:items-end items-center flex-row  lg:flex-col   ">
          
          {/* <a
            href="#services"
            className="group shrink-0 inline-flex items-center justify-center gap-2 sm:px-8  sm:py-3.5 px-4 py-2 text-base font-semibold text-[#000000] bg-white rounded-full hover:bg-white/95 transition-all duration-200 shadow-lg whitespace-nowrap mt-0"
          >
            Explore Services <ChevronRightIcon width={7} height={11} color="#000000" className="inline-block transition-transform duration-500 ease-out group-hover:translate-x-0.5" />
          </a> */}
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
            speed={1500}
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


            onSlideChange={(swiper) => {
              const visibleIndex = swiper.realIndex;
              setFirstVisibleIndex(visibleIndex);
              
              if (isBelow640) {
                setMobileActiveIndex(visibleIndex);
              } else if (!isUserHovering) {
                // On desktop: if not hovering, set active to first visible card
                setHoveredIndex(visibleIndex);
              }
            
              scheduleSwiperUpdate();
            }}

            className="overflow-hidden! pb-4"
          >
            {loopSlides.map((service, index) => {
              const realIndex = index % 20;
              // On mobile, only the active card is expanded (accordion behavior)
              // On desktop, hovered card is expanded
              // const isHovered = isBelow640 ? (mobileActiveIndex === realIndex) : (hoveredIndex === realIndex);
              const isHovered = isBelow640
  ? mobileActiveIndex === realIndex
  : hoveredIndex === realIndex; // First visible card in swiper is active by default
              // Responsive card widths: mobile has its own sizes, desktop has different sizes
              const cardWidth = isBelow640
                ? (isHovered ? 280 : 140)
                : (isHovered ? 420: 193);
              const cardHeight = getCardHeight();
              
              return (
                <SwiperSlide
                  key={`${service.title}-${index}`}
                  className="shrink-0! flex justify-end sm:justify-start"
                  style={{
                    width: cardWidth,
                    transition: `width 400ms ${EASE_SMOOTH}`,
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
                      transition: `all 400ms ${EASE_SMOOTH}`,
                    }}
                  >
                    {/* Blue glow / border effect */}
                    <div
                      className="absolute inset-0 rounded-[30px] ring-2 ring-white/20 ring-inset z-10 pointer-events-none"
                      style={{
                        boxShadow: isHovered ? '0 0 40px rgba(0,138,201,0.35)' : '0 0 30px rgba(0,138,201,0.25)',
                        transition: `box-shadow 400ms ${EASE_SMOOTH}`,
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
                          transition: `transform 400ms ${EASE_SMOOTH}`,
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
                        transition: `opacity 400ms ${EASE_SMOOTH} ${isBelow640 ? 0 : 120}ms, transform 400ms ${EASE_SMOOTH} ${isBelow640 ? 0 : 120}ms`,
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
