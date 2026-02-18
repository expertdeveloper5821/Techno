"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { industries } from "@/app/lib/data/about-data/industries";

export default function Industries() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current!;
    const track = trackRef.current!;
  
    let start = 0;
    let end = 0;
    let maxTranslate = 0;
  
    const calculate = () => {
      const containerPadding = 48; // px-6 left + right
      const viewportWidth = window.innerWidth - containerPadding;
      const END_PADDING = 24; // gap buffer
  
      maxTranslate = Math.max(
        0,
        track.scrollWidth - viewportWidth + END_PADDING
      );
  
      start = section.offsetTop;
      end = start + section.offsetHeight - window.innerHeight;
    };
  
    const onScroll = () => {
      const scrollY = window.scrollY;
  
      if (scrollY < start) {
        track.style.transform = "translate3d(0,0,0)";
        return;
      }
  
      if (scrollY > end) {
        track.style.transform = `translate3d(-${maxTranslate}px,0,0)`;
        return;
      }
  
      const progress = (scrollY - start) / (end - start);
      const translateX = maxTranslate * progress;
  
      track.style.transform = `translate3d(-${translateX}px,0,0)`;
    };
  
    calculate();
    window.addEventListener("scroll", onScroll);
    window.addEventListener("resize", calculate);
  
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", calculate);
    };
  }, []);
  

//   useEffect(() => {
//     const section = sectionRef.current!;
//     const track = trackRef.current!;

//     const handleScroll = () => {
//       const sectionTop = section.offsetTop;
//       const sectionHeight = section.offsetHeight;
//       const scrollY = window.scrollY;

//       const scrollStart = sectionTop;
//       const scrollEnd =
//         sectionTop + sectionHeight - window.innerHeight;

//       if (scrollY >= scrollStart && scrollY <= scrollEnd) {
//         const progress =
//           (scrollY - scrollStart) /
//           (scrollEnd - scrollStart);

//         const maxTranslate =
//           track.scrollWidth - window.innerWidth;

//         track.style.transform = `translateX(-${
//           maxTranslate * progress
//         }px)`;
//       }
//     };

//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

  return (
    <section
      ref={sectionRef}
      className="relative lg:pt-24 lg:pb-24 md:pt-15 md:pb-15  pt-10 pb-10 bg-[linear-gradient(to_bottom,#0094DB_0%,#0094DB_85%,#003a5c_95%,#000000_100%)]"
      style={{ height: "300vh" }} // controls horizontal scroll length
    >
      {/* Sticky container */}
      <div className="sticky top-0 flex flex-col justify-center px-6 overflow-hidden">
        {/* Heading */}
        <h2 className="text-[25px] md:text-4xl lg:text-[44px] font-semibold text-white max-w-4xl mb-5">
          Industries We Empower with Technical Expertise
        </h2>

        {/* Horizontal scroll area */}
        <div className="overflow-hidden">
          <div
            ref={trackRef}
            className="
              grid
              grid-rows-2
              grid-flow-col
              gap-6
              w-max
              will-change-transform
            "
          >
            {industries.map((item) => (
              <div
                key={item.id}
                className="
                w-[calc(100vw/1)]
                  md:w-[calc(100vw/3)]
                  sm:w-[calc(100vw/1)]
                  min-w-[260px]
                  rounded-xl
                  border
                  border-white/30
                  bg-[#018BCE]
                  p-6
                  text-white
                "
              >
                <div className="flex justify-between mb-4">
                  <Image
                    src={item.icon}
                    alt={item.title}
                    width={40}
                    height={40}
                  />
                  <span className="flex h-10 w-10 items-center justify-center rounded-full border border-white/50 text-sm">
                    {item.id}
                  </span>
                </div>

                <h3 className="mb-2 text-[20px] md:text-[28px] font-medium">
                  {item.title}
                </h3>

                <p className="text-base md:text-lg text-white/90 leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
