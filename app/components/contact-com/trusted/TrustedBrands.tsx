"use client";

import Image from "next/image";
import { memo, useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { fadeInUp } from "@/app/lib/animations";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, FreeMode } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";

interface Brand {
  name: string;
  logo: string;
}

const topRow: Brand[] = [
  { name: "Akasa Air", logo: "/Home/partners/alska.svg" },
  { name: "CuddlyNest", logo: "/Home/partners/cuddlynest.svg" },
  { name: "Deborah Henning", logo: "/Home/partners/DEBORAH HENNING-gray.svg" },
  { name: "HeyOye", logo: "/Home/partners/heyoye-gray.svg" },
  { name: "inadev", logo: "/Home/partners/inadev-gray.svg" },
];

const bottomRow: Brand[] = [
  { name: "Obortech", logo: "/Home/partners/obortech-gray.svg" },
  { name: "Sourcebae", logo: "/Home/partners/sourcebae-gray.svg" },
  { name: "Synergy", logo: "/Home/partners/synergy-gray.svg" },
  { name: "Techved", logo: "/Home/partners/techved-gray.svg" },
  { name: "Beast", logo: "/Home/partners/beast-gray.svg" },
];

const topRowExtended = [...topRow, ...topRow];
const bottomRowExtended = [...bottomRow, ...bottomRow];

const BrandCard = memo(function BrandCard({ brand }: { brand: Brand }) {
  return (
    <div className="flex h-[98px] w-[190px] shrink-0 items-center justify-center rounded-[10px] border border-white/10 bg-[#ffffff05] sm:h-[150px] sm:w-[296px]">
      <Image
        src={brand.logo}
        alt={brand.name}
        width={250} 
        height={84}
        className="h-12  w-[170px] object-contain opacity-95"
        sizes="(max-width: 640px) 170px, 250px"
        loading="lazy"
      />
    </div>
  );
});

export default function TrustedBrands() {
  const topSwiperRef = useRef<SwiperType | null>(null);
  const bottomSwiperRef = useRef<SwiperType | null>(null);
  const shouldReduceMotion = useReducedMotion();

  const restartIfStopped = (swiper: SwiperType | null) => {
    if (!swiper?.autoplay) return;
    if (!swiper.autoplay.running) {
      swiper.autoplay.start();
    }
  };

  return (
    <section className="lg:py-24 md:py-15 py-10 bg-[#000000] overflow-hidden text-white">
      <style jsx>{`
        :global(.brand-swiper .swiper-wrapper) {
          transition-timing-function: linear !important;
        }
      `}</style>

      <div className="w-full mx-auto px-4 sm:px-6 lg:px-6 md:mb-12 mb-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="mx-auto max-w-4xl text-center"
        >
          <h2 className="font-inter text-[25px] sm:text-xl md:text-4xl lg:text-[44px] font-semibold text-white sm:leading-tight lg:leading-[60px] md:leading-[50px] leading-[32px] tracking-tight">
            Businesses That Trust Our Work
          </h2>
          <p className="mx-auto mt-3 max-w-3xl text-base leading-8 text-white/85 sm:text-lg">
            We&apos;ve worked with businesses across different industries,
            helping them solve real problems and build systems that actually
            work.
          </p>
        </motion.div>
      </div>

      <div className="flex flex-col gap-3 w-full mx-auto px-4 sm:px-6 lg:px-6">
        <div className="w-full">
          <Swiper
            modules={[Autoplay, FreeMode]}
            onSwiper={(swiper) => {
              topSwiperRef.current = swiper;
            }}
            onMouseLeave={() => restartIfStopped(topSwiperRef.current)}
            onTouchEnd={() => restartIfStopped(topSwiperRef.current)}
            spaceBetween={14}
            slidesPerView={4}
            loop={true}
            speed={4500}
            freeMode={{
              enabled: true,
              momentum: false,
            }}
            autoplay={shouldReduceMotion ? false : {
              delay: 0,
              disableOnInteraction: false,
              reverseDirection: true,
              pauseOnMouseEnter: false,
            }}
            allowTouchMove={true}
            className="brand-swiper"
          >
            {topRowExtended.map((brand, idx) => (
              <SwiperSlide key={`top-${brand.name}-${idx}`} className="w-[190px]! sm:w-[296px]!">
                <BrandCard brand={brand} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        <div className="w-full">
          <Swiper
            modules={[Autoplay, FreeMode]}
            onSwiper={(swiper) => {
              bottomSwiperRef.current = swiper;
            }}
            onMouseLeave={() => restartIfStopped(bottomSwiperRef.current)}
            onTouchEnd={() => restartIfStopped(bottomSwiperRef.current)}
            spaceBetween={14}
            slidesPerView="auto"
            loop={true}
            speed={4500}
            freeMode={{
              enabled: true,
              momentum: false,
            }}
            autoplay={shouldReduceMotion ? false : {
              delay: 0,
              disableOnInteraction: false,
              pauseOnMouseEnter: false,
            }}
            allowTouchMove={true}
            className="brand-swiper"
          >
            {bottomRowExtended.map((brand, idx) => (
              <SwiperSlide key={`bottom-${brand.name}-${idx}`} className="w-[190px]! sm:w-[296px]!">
                <BrandCard brand={brand} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
}
