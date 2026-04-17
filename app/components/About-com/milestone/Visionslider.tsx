"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/autoplay";

export default function VisionSlider() {
  const milestone = [
    { id: 1, image: "/About/milestone/Frame1.webp" },
    { id: 2, image: "/About/milestone/Frame2.webp" },
    { id: 3, image: "/About/milestone/Frame3.webp" },
    // { id: 4, image:"/About/milestone/Fame4.webp" },
    { id: 5, image: "/About/milestone/Frame5.webp" },
    { id: 6, image: "/About/milestone/Frame6.webp" },
    { id: 7, image: "/About/milestone/Frame7.webp" },
    { id: 8, image: "/About/milestone/Frame8.webp" },
    { id: 9, image: "/About/milestone/Frame9.webp" },
    { id: 10, image: "/About/milestone/Frame10.webp" },
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
