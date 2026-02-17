"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/effect-coverflow";

import "swiper/css";

const milestones = [
  { id: 1, image: "/About/milestone/frame1.png" },
  { id: 2, image: "/About/milestone/frame2.png" },
  { id: 3, image: "/About/milestone/frame3.png" },
  { id: 4, image:"/About/milestone/frame4.png" },
  { id: 5, image: "/About/milestone/frame5.png" },
  { id: 6, image: "/About/milestone/frame6.png" },
  { id: 7, image: "/About/milestone/frame7.png" },
  { id: 8, image: "/About/milestone/frame8.png" },
  { id: 9, image: "/About/milestone/frame9.png" },
  { id: 10, image: "/About/milestone/frame10.png" },
];

export default function MilestoneCelebration() {
  return (
    <section className="bg-black py-16">
      <div className="mx-auto max-w-7xl px-4">
        
        {/* Heading */}
        <div className="mb-10 text-center text-white">
          <h2 className="mb-3 text-2xl font-semibold md:text-[44px] leading-[60px]">
            Every Milestone Is a Celebration
          </h2>
          <p className="mx-auto max-w-2xl text-base font-medium text-white md:text-[22px] leading-[40px] tracking-wider">
            Technogetic celebrates four years of building impactful products
            and meaningful digital experiences.
          </p>
        </div>

        {/* Swiper Slider */}
        <Swiper
         modules={[EffectCoverflow, Autoplay]}
        //  effect="coverflow"
          autoplay={{ delay: 2500, disableOnInteraction: false }}
          loop
          spaceBetween={20}
          slidesPerView={4}
          breakpoints={{
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 4 },
          }}
          className="w-full"
        >
          {milestones.map((item) => (
            <SwiperSlide key={item.id}>
              <div className="relative h-[260px] overflow-hidden rounded-xl">
                <Image
                  src={item.image}
                  alt="Milestone moment"
                  fill
                  className="object-cover"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

      </div>
    </section>
  );
}
