"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";


interface Milestone {
  _id: string;
  image: string;
  order: number;
}

interface VisionSliderProps {
  milestones: Milestone[];
}

export default function VisionSlider({ milestones = [] }: VisionSliderProps) {
  if (milestones.length === 0) return null;

  return (
    <Swiper
      className="vision-container"
      modules={[Autoplay]}
      loop={true}
      speed={6000}
      autoplay={{
        delay: 0,
        disableOnInteraction: false,
      }}
      allowTouchMove={false}
      breakpoints={{
        320: { slidesPerView: 1, spaceBetween: 8 },
        400: { slidesPerView: 2, spaceBetween: 8 },
        640: { slidesPerView: 3, spaceBetween: 10 },
        768: { slidesPerView: 3, spaceBetween: 12 },
        1024: { slidesPerView: 4, spaceBetween: 14 },
        1280: { slidesPerView: 5, spaceBetween: 16 },
      }}
    >
      {milestones.map((item) => (
        <SwiperSlide key={item._id}>
          <img
            src={item.image}
            alt={`Milestone ${item.order}`}
            className="w-100 h-80 object-cover"
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
