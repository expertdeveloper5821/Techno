'use client';

import React, { useRef, useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';
import ServiceSlider from './ServiceSlider';
import ChevronRightIconImport from '@/app/lib/icon/chevron-right-icon';
import ReadMoreIcon from '@/app/lib/icon/readmore-icon';
import arrowl from '@/app/lib/icon/arrow.svg';
import { motion } from 'framer-motion';
import { fadeInUp } from '@/app/lib/animations';

type IconProps = React.SVGProps<SVGSVGElement> & { width?: number; height?: number; color?: string };
const ChevronRightIcon = ChevronRightIconImport as React.FC<IconProps>;

import { getServices } from '@/app/services';
import type { Service } from '@/app/services';

const EASE_SMOOTH = 'cubic-bezier(0.25, 0.46, 0.45, 0.94)';

interface ServicesCarouselProps {
  services?: Service[];
}

export default function ServicesCarousel({ services }: ServicesCarouselProps) {
  const swiperRef = useRef<SwiperType | null>(null);
  // const [services, setServices] = useState<Service[]>(propServices ?? []);
  const [hoveredIndex, setHoveredIndex] = useState<number>(0);
  const [firstVisibleIndex, setFirstVisibleIndex] = useState<number>(0);
  const [isUserHovering, setIsUserHovering] = useState(false);
  const [isBelow640, setIsBelow640] = useState(false);
  const [windowSize, setWindowSize] = useState<'mobile' | 'tablet' | 'desktop'>('mobile');
  const [mobileActiveIndex, setMobileActiveIndex] = useState<number>(0);
  const updateTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const leaveTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const enterTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // useEffect(() => {
  //   // If services are passed as props (SSG), skip fetching
  //   if (propServices && propServices.length > 0) {
  //     setServices(propServices);
  //     return;
  //   }
  //   getServices()
  //     .then(setServices)
  //     .catch(console.error);
  // }, [propServices]);

  const loopSlides = services ? [...services, ...services] : [];

  const getCardHeight = (): number => {
    if (windowSize === 'mobile') return 320;
    if (windowSize === 'tablet') return 380;
    return 499;
  };

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>;
    const check = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        const width = window.innerWidth;
        setIsBelow640(width < 640);
        if (width < 640) setWindowSize('mobile');
        else if (width < 1024) setWindowSize('tablet');
        else setWindowSize('desktop');
      }, 150);
    };
    check();
    window.addEventListener('resize', check);
    return () => { window.removeEventListener('resize', check); clearTimeout(timeoutId); };
  }, []);

  const scheduleSwiperUpdate = useCallback(() => {
    if (updateTimeoutRef.current) clearTimeout(updateTimeoutRef.current);
    updateTimeoutRef.current = setTimeout(() => {
      updateTimeoutRef.current = null;
      swiperRef.current?.update();
    }, 450);
  }, []);

  const handleSlideEnter = useCallback((realIndex: number) => {
    if (isBelow640) return;
    if (leaveTimeoutRef.current) { clearTimeout(leaveTimeoutRef.current); leaveTimeoutRef.current = null; }
    if (enterTimeoutRef.current) clearTimeout(enterTimeoutRef.current);
    enterTimeoutRef.current = setTimeout(() => {
      enterTimeoutRef.current = null;
      setHoveredIndex(realIndex);
      setIsUserHovering(true);
      scheduleSwiperUpdate();
    }, 50);
  }, [scheduleSwiperUpdate, isBelow640]);

  const handleSlideLeave = useCallback(() => {
    if (isBelow640) return;
    if (enterTimeoutRef.current) { clearTimeout(enterTimeoutRef.current); enterTimeoutRef.current = null; }
    if (leaveTimeoutRef.current) clearTimeout(leaveTimeoutRef.current);
    leaveTimeoutRef.current = setTimeout(() => {
      leaveTimeoutRef.current = null;
      setHoveredIndex(firstVisibleIndex);
      setIsUserHovering(false);
      scheduleSwiperUpdate();
    }, 220);
  }, [scheduleSwiperUpdate, isBelow640, firstVisibleIndex]);

  const handleCarouselLeave = useCallback(() => {
    if (enterTimeoutRef.current) { clearTimeout(enterTimeoutRef.current); enterTimeoutRef.current = null; }
    if (leaveTimeoutRef.current) { clearTimeout(leaveTimeoutRef.current); leaveTimeoutRef.current = null; }
    setHoveredIndex(firstVisibleIndex);
    setIsUserHovering(false);
    scheduleSwiperUpdate();
  }, [scheduleSwiperUpdate, firstVisibleIndex]);

  const handleSlideClick = useCallback((realIndex: number) => {
    if (isBelow640) {
      setMobileActiveIndex(realIndex);
      swiperRef.current?.slideToLoop(realIndex, 2000);
    } else {
      setHoveredIndex(realIndex);
      swiperRef.current?.slideToLoop(realIndex, 500);
    }
    scheduleSwiperUpdate();
  }, [isBelow640, scheduleSwiperUpdate]);

  useEffect(() => {
    return () => {
      if (updateTimeoutRef.current) clearTimeout(updateTimeoutRef.current);
      if (leaveTimeoutRef.current) clearTimeout(leaveTimeoutRef.current);
      if (enterTimeoutRef.current) clearTimeout(enterTimeoutRef.current);
    };
  }, []);

  useEffect(() => {
    const swiper = swiperRef.current;
    if (!swiper?.autoplay) return;
    if (isUserHovering) swiper.autoplay.stop();
    else swiper.autoplay.start();
  }, [isUserHovering]);

  return (
    <section className="relative overflow-hidden min-h-screen flex flex-col justify-start lg:pt-24 lg:pb-24 md:pt-15 md:pb-15 pt-10 pb-10 bg-[linear-gradient(to_bottom,#0094DB_0%,#0094DB_85%,#003a5c_95%,#000000_100%)]">

      <div className="w-full flex lg:flex-row flex-col gap-8 lg:gap-0 mx-auto px-4 sm:px-6 lg:px-6 mb-8">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
          <div className="flex flex-col lg:flex-col justify-between items-start gap-5 lg:gap-2">
            <h2 className="text-[25px] sm:text-xl md:text-4xl lg:text-[44px] font-semibold font-inter text-white lg:leading-[60px] md:leading-[50px] leading-[32px] max-w-4xl">
             Full Stack Development From Starting till completion 
            </h2>
            <p className="text-base md:text-lg font-inter font-normal text-white/90 md:leading-relaxed leading-[25px] flex-1">
              Technogetic is a full-service company that is committed to bringing innovative technological solutions to its clients to ensure their success. Established in 2018, our objective is to revolutionize the technological sector by offering robust and scalable technology solutions.
            </p>
          </div>
        </motion.div>

        <div className="flex lg:justify-center sm:justify-between sm:gap-20 justify-between sm:items-end items-center flex-row lg:flex-col">
          <a
            href="#services"
            className="group shrink-0 inline-flex items-center justify-center gap-2 sm:px-8 sm:py-3.5 px-4 py-2 text-base font-semibold text-[#000000] bg-white rounded-full hover:bg-white/95 transition-all duration-200 shadow-lg whitespace-nowrap mt-0"
          >
            Explore Services <ChevronRightIcon width={7} height={11} color="#000000" className="inline-block transition-transform duration-500 ease-out group-hover:translate-x-0.5" />
          </a>
          <div className={`flex items-center gap-2 shrink-0 ${isBelow640 ? 'hidden' : ''}`}>
            <button type="button" aria-label="Previous slide" onClick={() => swiperRef.current?.slidePrev()} className="sm:w-12 sm:h-12 w-6 h-6 rounded-full text-white flex items-center justify-center hover:bg-white/10 hover:border-white transition-colors">
              <Image src={arrowl} alt="arrow" width={20} height={20} className="sm:w-10 sm:h-10 w-6 h-6" />
            </button>
            <button type="button" aria-label="Next slide" onClick={() => swiperRef.current?.slideNext()} className="sm:w-12 sm:h-12 w-6 h-6 rounded-full text-white flex items-center justify-center hover:bg-white/10 hover:border-white transition-colors">
              <Image src={arrowl} alt="arrow" width={20} height={20} className="w-10 h-10 sm:w-10 sm:h-10 w-6 h-6 [transform:rotateY(180deg)]" />
            </button>
          </div>
        </div>
      </div>

      <div className="w-full relative mt-4 flex justify-center px-4 sm:px-6">
        <div className="w-full overflow-hidden" onMouseLeave={handleCarouselLeave}>
          <Swiper
            onSwiper={(swiper) => { swiperRef.current = swiper; }}
            modules={[Navigation, Autoplay]}
            spaceBetween={24}
            centeredSlides={false}
            loop={true}
            loopAdditionalSlides={3}
            observer={true}
            observeParents={true}
            watchSlidesProgress={true}
            speed={1500}
            autoplay={{ delay: 3000, disableOnInteraction: false, pauseOnMouseEnter: true }}
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
              if (isBelow640) setMobileActiveIndex(visibleIndex);
              else if (!isUserHovering) setHoveredIndex(visibleIndex);
              scheduleSwiperUpdate();
            }}
            className="overflow-hidden! pb-4"
          >
            {loopSlides?.map((service, index) => {
              const realIndex = index % (services?.length || 1);
              const isHovered = isBelow640 ? mobileActiveIndex === realIndex : hoveredIndex === realIndex;
              const cardWidth = isBelow640 ? (isHovered ? 280 : 140) : (isHovered ? 420 : 193);
              const cardHeight = getCardHeight();

              return (
                <SwiperSlide
                  key={`${service._id}-${index}`}
                  className="shrink-0! flex justify-end sm:justify-start"
                  style={{ width: cardWidth, transition: `width 400ms ${EASE_SMOOTH}` }}
                  onMouseEnter={() => handleSlideEnter(realIndex)}
                  onMouseLeave={handleSlideLeave}
                  onClick={() => handleSlideClick(realIndex)}
                >
                  <article
                    className="relative rounded-[30px] overflow-hidden group shrink-0 origin-left cursor-pointer w-full"
                    style={{ height: `${cardHeight}px`, transition: `all 400ms ${EASE_SMOOTH}` }}
                  >
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
                    <div
                      className="absolute top-0 left-0 right-0 z-2 bg-linear-to-b from-black/85 via-black/50 to-transparent pointer-events-none rounded-t-[30px]"
                      style={{ height: '50%' }}
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
                    <div
                      className="absolute bottom-0 left-0 right-0 z-2 bg-[linear-gradient(to_top,rgba(0,0,0,0.85)_0%,rgba(0,0,0,0.7)_80%,transparent_100%)]"
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
                      <div className="text-white leading-snug" style={{ fontSize: isBelow640 ? '12px' : '14px', lineHeight: isBelow640 ? '14px' : '22px' }}>
                        <div>{service.description}</div>
                        <button className="text-white inline-flex items-center gap-1 mt-2" style={{ fontSize: isBelow640 ? '11px' : '14px' }}>
                          Read more <ReadMoreIcon width={isBelow640 ? 10 : 13} height={isBelow640 ? 10 : 13} color="#F8F8F8" className="inline-block" />
                        </button>
                      </div>
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
