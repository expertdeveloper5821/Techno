"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/autoplay";

export default function VisionSlider() {
  const milestone = [
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

  return (
    
    <Swiper
    className="vision-container"
    modules={[Autoplay]}
    loop={true}
    speed={6000}               // smooth continuous speed
    autoplay={{
      delay: 0,                // no pause
      disableOnInteraction: false,
    }}
    allowTouchMove={false}
    breakpoints={{
      320: {
        slidesPerView: 1,
        spaceBetween: 8,
      },

      400: {
        slidesPerView: 2,
        spaceBetween: 8,
      },
      640: {
        slidesPerView: 3,
        spaceBetween: 10,
      },
      768: {
        slidesPerView: 3,
        spaceBetween: 12,
      },
      1024: {
        slidesPerView: 4,
        spaceBetween: 14,
      },
      1280: {
        slidesPerView: 5,
        spaceBetween: 16,
      },
    }}
  
>
  {milestone.map((service, index) => (
    <SwiperSlide key={index}>
      <img
        src={service.image}
        alt={service.image}
        className="w-full sm:h-auto "
      />
    </SwiperSlide>
  ))}
</Swiper>
    
  );
}
