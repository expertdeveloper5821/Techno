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
      { milestone.map((service, index) => (
        <SwiperSlide key={index}>
          <img
            alt={service.image}
            src={`https://picsum.photos/seed/picsum${index}/300`}
          />
        </SwiperSlide>
      ))}
    </Swiper>
    
  );
}
