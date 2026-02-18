"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/autoplay";

export default function VisionSlider() {
  return (
    
    <Swiper
    className="vision-container"
  
      spaceBetween={10}
      slidesPerView={6}
      modules={[Autoplay]}
      autoplay={{
        delay: 2500,
        disableOnInteraction: false,
      }}
      onSlideChange={() => console.log("slide change")}
      onSwiper={(swiper) => console.log(swiper)}
    >
      {Array.from({ length: 20 }).map((_, index) => (
        <SwiperSlide key={index}>
          <img
            alt={`Slide ${index}`}
            src={`https://picsum.photos/seed/picsum${index}/300`}
          />
        </SwiperSlide>
      ))}
    </Swiper>
    
  );
}
