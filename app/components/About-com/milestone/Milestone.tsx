"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Autoplay } from "swiper/modules";
import './vision.css'
import "swiper/css";
import "swiper/css/effect-coverflow";

import "swiper/css";
import VisionSlider from "./Visionslider";




export default function MilestoneCelebration() {
  return (
    <section className="bg-black py-16 md:pb-28">
      <div className="mx-auto max-w-full ">
        
        {/* Heading */}
        <div className="mb-10 text-center text-white px-4">
          <h2 className="mb-3 text-[25px] mx-auto sm:text-xl md:text-4xl lg:text-[44px] font-semibold font-inter text-white lg:leading-[60px] md:leading-[50px] leading-[32px]  max-w-4xl">
       We create outstanding value with our unique solutions.

          </h2>
          <p className="mx-auto max-w-2xl text-base font-medium text-white md:text-[22px] md:leading-[40px] leading-[25px] tracking-wider">
            Technogetic celebrates four years of building impactful products
            and meaningful digital experiences.
          </p>
        </div>

       

        <VisionSlider/>
       

      </div>
    </section>
  );
}
