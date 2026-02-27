"use client";

import React, { useRef } from "react";
import type { Swiper as SwiperType } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import Image from "next/image";
import arrowLeft from "@/app/lib/icon/arrow.svg";




;

export interface TechStackTag {
  name: string;
  iconUrl: string;
}

export interface TechStackSlide {
  id: number;
  title: string;
  subtitle: string;
  tags: TechStackTag[];
}

export const techStackSlides = [
  {
    id: 1,
    title: "Frontend Technologies",
    // Title icon using the colorful React logo
    titleIconUrl: "https://skillicons.dev/icons?i=react",
    subtitle: "Modern UI frameworks & state management",
    tags: [
      { name: "React", iconUrl: "https://skillicons.dev/icons?i=react" },
      { name: "Next.js", iconUrl: "https://skillicons.dev/icons?i=nextjs" },
      { name: "TypeScript", iconUrl: "https://skillicons.dev/icons?i=ts" },
      { name: "Tailwind CSS", iconUrl: "https://skillicons.dev/icons?i=tailwind" },
      { name: "Vue.js", iconUrl: "https://skillicons.dev/icons?i=vue" },
      { name: "Angular", iconUrl: "https://skillicons.dev/icons?i=angular" },
      { name: "Redux", iconUrl: "https://skillicons.dev/icons?i=redux" },
      { name: "Material-UI", iconUrl: "https://skillicons.dev/icons?i=mui" },
      { name: "Framer Motion", iconUrl: "https://skillicons.dev/icons?i=framer" },
    ],
  },
  {
    id: 2,
    title: "Backend Technologies",
    titleIconUrl: "https://skillicons.dev/icons?i=nodejs",
    subtitle: "Scalable APIs & real-time systems",
    tags: [
      { name: "Node.js", iconUrl: "https://skillicons.dev/icons?i=nodejs" },
      { name: "Express.js", iconUrl: "https://skillicons.dev/icons?i=express" },
      { name: "Python", iconUrl: "https://skillicons.dev/icons?i=py" },
      { name: "Django", iconUrl: "https://skillicons.dev/icons?i=django" },
      { name: "FastAPI", iconUrl: "https://skillicons.dev/icons?i=fastapi" },
      { name: "Nest.js", iconUrl: "https://skillicons.dev/icons?i=nestjs" },
      { name: "GraphQL", iconUrl: "https://skillicons.dev/icons?i=graphql" },
      { name: "PostgreSQL", iconUrl: "https://skillicons.dev/icons?i=postgres" },
    ],
  },
  {
    id: 3,
    title: "Database & Storage",
    titleIconUrl: "https://skillicons.dev/icons?i=mongodb",
    subtitle: "Reliable data & object storage",
    tags: [
      { name: "PostgreSQL", iconUrl: "https://skillicons.dev/icons?i=postgres" },
      { name: "MongoDB", iconUrl: "https://skillicons.dev/icons?i=mongodb" },
      { name: "Redis", iconUrl: "https://skillicons.dev/icons?i=redis" },
      { name: "Supabase", iconUrl: "https://skillicons.dev/icons?i=supabase" },
      { name: "MySQL", iconUrl: "https://skillicons.dev/icons?i=mysql" },
      { name: "Firebase", iconUrl: "https://skillicons.dev/icons?i=firebase" },
      { name: "Prisma", iconUrl: "https://skillicons.dev/icons?i=prisma" },
      { name: "AWS S3", iconUrl: "https://skillicons.dev/icons?i=aws" },
    ],
  },
  {
    id: 4,
    title: "Cloud & DevOps",
    titleIconUrl: "https://skillicons.dev/icons?i=docker",
    subtitle: "Deployment, automation & scalability",
    tags: [
      { name: "AWS", iconUrl: "https://skillicons.dev/icons?i=aws" },
      { name: "Google Cloud", iconUrl: "https://skillicons.dev/icons?i=gcp" },
      { name: "Vercel", iconUrl: "https://skillicons.dev/icons?i=vercel" },
      { name: "Docker", iconUrl: "https://skillicons.dev/icons?i=docker" },
      { name: "Kubernetes", iconUrl: "https://skillicons.dev/icons?i=kubernetes" },
      { name: "GitHub Actions", iconUrl: "https://skillicons.dev/icons?i=githubactions" },
    ],
  },
  {
    id: 5,
    title: "AI & Automation",
    titleIconUrl: "https://skillicons.dev/icons?i=ai",
    subtitle: "Intelligent systems & workflow automation",
    tags: [
      { name: "OpenAI", iconUrl: "https://skillicons.dev/icons?i=openai" },
      { name: "TensorFlow", iconUrl: "https://skillicons.dev/icons?i=tensorflow" },
      { name: "PyTorch", iconUrl: "https://skillicons.dev/icons?i=pytorch" },
      { name: "Zapier", iconUrl: "https://skillicons.dev/icons?i=zapier" },
    ],
  },
  {
    id: 6,
    title: "Design & Collaboration",
    titleIconUrl: "https://skillicons.dev/icons?i=figma",
    subtitle: "Product design & team productivity",
    tags: [
      { name: "Figma", iconUrl: "https://skillicons.dev/icons?i=figma" },
      { name: "Photoshop", iconUrl: "https://skillicons.dev/icons?i=ps" },
      { name: "Illustrator", iconUrl: "https://skillicons.dev/icons?i=ai" },
      { name: "Notion", iconUrl: "https://skillicons.dev/icons?i=notion" },
      { name: "Slack", iconUrl: "https://skillicons.dev/icons?i=slack" },
    ],
  },
];

export default function ServiceTechStack() {
  const swiperRef = useRef<SwiperType | null>(null);

  return (
    <section className="  bg-[#000000] text-white w-full mx-auto px-4 sm:px-6 lg:px-6">
      <div className=" mx-auto s">
        <div className="max-w-3xl mx-auto text-center mb-10 md:mb-14">
          <h2 className="text-[25px] md:text-4xl lg:text-[44px] font-semibold text-white max-w-4xl  text-center mb-6">
            Our Technology Stack
          </h2>
          <p className="text-base sm:text-base md:text-lg  text-center max-w-5xl leading-[22px] sm:leading-[28px] text-[#ffff]">
            We leverage modern, reliable, and scalable technologies to build
            secure, high‑performance digital solutions tailored to your business
            needs.
          </p>
        </div>

        <div className="relative">
          

          <Swiper
            modules={[Autoplay]}
            onSwiper={(swiper) => {
              swiperRef.current = swiper;
            }}
            loop
            spaceBetween={20}
            slidesPerView={1.05}
            centeredSlides={false}
            autoplay={{
              delay: 3500,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            breakpoints={{
              640: { slidesPerView: 1 },
              768: { slidesPerView: 2 },

              1224: { slidesPerView: 3 },
            }}
          >
            {techStackSlides.map((slide) => {
              // const TitleIcon = slide.titleIcon;

              return (
                <SwiperSlide key={slide.id}>
                  <article className="bg-[#0094DB] h-[350px] w-full rounded-xl px-6 py-7 sm:px-7 sm:py-9 md:px-8 md:py-10 lg:px-2 lg:py-2 shadow-[0_20px_60px_rgba(0,0,0,0.5)] flex flex-col">

                    <header className="flex items-start flex-col justify-between mb-6">
                      <div className="flex justify-between w-full">
                        <div className="w-16 h-16 flex items-center text-white  justify-center">
                          {/* <TitleIcon size={40}  /> */}
                          <img
                            src={slide.titleIconUrl}
                            alt={slide.title}
                            className="w-10 h-10"
                          />
                        </div>


                        <div className="w-8 h-8 rounded-full flex items-center justify-center text-white/60 text-sm font-semibold">
                          {slide.id}
                        </div>
                      </div>

                      <h3 className="font-inter text-lg sm:text-xl md:text-[20px] font-semibold text-white">
                        {slide.title}
                      </h3>
                    </header>

                    <div className="grid grid-cols-3 gap-2 ">
                      {slide.tags.map((tag) => {
                        // const Icon = tag.icon;

                        return (
                          <span
                            key={tag.name}
                            className="sm:px-1 px-3 py-3 rounded-xl bg-white/10 border border-white/20 text-xs sm:text-sm text-white whitespace-nowrap flex items-center gap-2 break-words "
                          >
                            <img
                              src={tag.iconUrl}
                              alt={tag.name}
                              className="w-4 h-4 object-contain"
                            />
                            {tag.name}
                          </span>
                        );
                      })}
                    </div>
                  </article>
                </SwiperSlide>
              );
            })}
          </Swiper>

          <div className="mt-8 flex items-center justify-center gap-3">
            <button
              type="button"
              aria-label="Previous slide"
              onClick={() => swiperRef.current?.slidePrev()}
              className="sm:w-10 sm:h-10 w-8 h-8 rounded-full border border-white/30 text-white flex items-center justify-center hover:bg-white/10 transition-colors"
            >
              <Image
                src={arrowLeft}
                alt="Previous"
                width={20}
                height={20}
                className="sm:w-6 sm:h-6 w-5 h-5"
              />
            </button>
            <button
              type="button"
              aria-label="Next slide"
              onClick={() => swiperRef.current?.slideNext()}
              className="sm:w-10 sm:h-10 w-8 h-8 rounded-full border border-white/30 text-white flex items-center justify-center hover:bg-white/10 transition-colors"
            >
              <Image
                src={arrowLeft}
                alt="Next"
                width={20}
                height={20}
                className="sm:w-6 sm:h-6 w-5 h-5 transform-[rotateY(180deg)]"
              />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

