"use client";

import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";


interface Milestone {
  _id: string;
  image: string;
  order: number;
}

export default function VisionSlider() {
  const [milestones, setMilestones] = useState<Milestone[]>([]);

  useEffect(() => {
    fetch("/api/milestones")
      .then((res) => res.json())
      .then((json) => {
        if (json.success) setMilestones(json.data);
      })
      .catch(console.error);
  }, []);

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
            className="w-full sm:h-auto"
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
