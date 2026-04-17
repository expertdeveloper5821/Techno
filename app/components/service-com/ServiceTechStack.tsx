
"use client";

import { useRef } from "react";
import type { Swiper as SwiperType } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import Image from "next/image";
import arrowLeft from "@/app/lib/icon/arrow.svg";

// ── import Swiper styles ──────────────────────────────────────────────────────
import "swiper/css";

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
    // titleIconUrl: "https://skillicons.dev/icons?i=react",
    titleIconUrl:"/service/techstack/frontend.webp",
    subtitle: "Modern UI frameworks & state management",
    tags: [
      { name: "React",        iconUrl: "https://skillicons.dev/icons?i=react" },
      { name: "Next.js",      iconUrl: "https://skillicons.dev/icons?i=nextjs" },
      { name: "TypeScript",   iconUrl: "https://skillicons.dev/icons?i=ts" },
      { name: "Tailwind CSS", iconUrl: "https://skillicons.dev/icons?i=tailwind" },
      { name: "Vue.js",       iconUrl: "https://skillicons.dev/icons?i=vue" },
      { name: "Angular",      iconUrl: "https://skillicons.dev/icons?i=angular" },
      { name: "Redux",        iconUrl: "https://skillicons.dev/icons?i=redux" },
      { name: "Material-UI",  iconUrl: "https://skillicons.dev/icons?i=mui" },
      { name: "Framer Motion",iconUrl: "/service/techstack/framer.webp" },
    ],
  },
  {
    id: 2,
    title: "Backend Technologies",
    // titleIconUrl: "https://skillicons.dev/icons?i=nodejs",
    titleIconUrl:"/service/techstack/backend.webp",
    subtitle: "Scalable APIs & real-time systems",
    tags: [
      { name: "Node.js",    iconUrl: "https://skillicons.dev/icons?i=nodejs" },
      { name: "Express.js", iconUrl: "https://skillicons.dev/icons?i=express" },
      { name: "Python",     iconUrl: "https://skillicons.dev/icons?i=py" },
      { name: "Django",     iconUrl: "https://skillicons.dev/icons?i=django" },
      { name: "FastAPI",    iconUrl: "https://skillicons.dev/icons?i=fastapi" },
      { name: "Nest.js",    iconUrl: "https://skillicons.dev/icons?i=nestjs" },
      { name: "GraphQL",    iconUrl: "https://skillicons.dev/icons?i=graphql" },
      { name: "PostgreSQL", iconUrl: "https://skillicons.dev/icons?i=postgres" },
    ],
  },
  {
    id: 3,
    title: "Database & Storage",
    // titleIconUrl: "https://skillicons.dev/icons?i=mongodb",
    titleIconUrl:"/service/techstack/database.webp",
    subtitle: "Reliable data & object storage",
    tags: [
      { name: "PostgreSQL", iconUrl: "https://skillicons.dev/icons?i=postgres" },
      { name: "MongoDB",    iconUrl: "https://skillicons.dev/icons?i=mongodb" },
      { name: "Redis",      iconUrl: "https://skillicons.dev/icons?i=redis" },
      { name: "Supabase",   iconUrl: "https://skillicons.dev/icons?i=supabase" },
      { name: "MySQL",      iconUrl: "https://skillicons.dev/icons?i=mysql" },
      { name: "Firebase",   iconUrl: "https://skillicons.dev/icons?i=firebase" },
      { name: "Prisma",     iconUrl: "https://skillicons.dev/icons?i=prisma" },
      { name: "AWS S3",     iconUrl: "https://skillicons.dev/icons?i=aws" },
    ],
  },
  {
    id: 4,
    title: "Cloud & DevOps",
    // titleIconUrl: "https://skillicons.dev/icons?i=docker",
    titleIconUrl:"/service/techstack/devops.webp",
    subtitle: "Deployment, automation & scalability",
    tags: [
      { name: "AWS",            iconUrl: "https://skillicons.dev/icons?i=aws" },
      { name: "Google Cloud",   iconUrl: "https://skillicons.dev/icons?i=gcp" },
      { name: "Vercel",         iconUrl: "https://skillicons.dev/icons?i=vercel" },
      { name: "Docker",         iconUrl: "https://skillicons.dev/icons?i=docker" },
      { name: "Kubernetes",     iconUrl: "https://skillicons.dev/icons?i=kubernetes" },
      { name: "GitHub Actions", iconUrl: "https://skillicons.dev/icons?i=githubactions" },
    ],
  },
  {
    id: 5,
    title: "AI & Automation",
    titleIconUrl: "https://skillicons.dev/icons?i=ai",
    subtitle: "Intelligent systems & workflow automation",
    tags: [
      { name: "OpenAI",     iconUrl: "https://skillicons.dev/icons?i=ai" },
      { name: "TensorFlow", iconUrl: "https://skillicons.dev/icons?i=tensorflow" },
      { name: "PyTorch",    iconUrl: "https://skillicons.dev/icons?i=pytorch" },
      { name: "Zapier",     iconUrl: "/service/techstack/zapier.svg" },
    ],
  },
  {
    id: 6,
    title: "Design & Collaboration",
    // titleIconUrl: "https://skillicons.dev/icons?i=figma",
    titleIconUrl:"/service/techstack/web-design.webp",
    subtitle: "Product design & team productivity",
    tags: [
      { name: "Figma",       iconUrl: "https://skillicons.dev/icons?i=figma" },
      { name: "Photoshop",   iconUrl: "https://skillicons.dev/icons?i=ps" },
      { name: "Illustrator", iconUrl: "https://skillicons.dev/icons?i=ai" },
      { name: "Notion",      iconUrl: "https://skillicons.dev/icons?i=notion" },
      { name: "Slack",       iconUrl: "/service/techstack/slack.webp" },
    ],
  },
];

export default function ServiceTechStack() {
  const swiperRef = useRef<SwiperType | null>(null);

  return (
    <section className="bg-[#000000] text-white w-full mx-auto px-4 sm:px-6 lg:px-6">
      <div className="mx-auto">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-10 md:mb-14">
          <h2 className="text-[25px] md:text-4xl lg:text-[44px] font-semibold text-white max-w-4xl text-center mb-6">
            Our Technology Stack
          </h2>
          <p className="text-base sm:text-base md:text-lg text-center max-w-5xl leading-[22px] sm:leading-[28px] text-[#ffff]">
            We leverage modern, reliable, and scalable technologies to build
            secure, high‑performance digital solutions tailored to your business
            needs.
          </p>
        </div>

        <div className="relative">
          <Swiper
           speed={2500}
            // ── 1. register the Autoplay module ──────────────────────────────
            modules={[Autoplay]}

            onSwiper={(swiper) => {
              swiperRef.current = swiper;
            }}
            loop
            spaceBetween={0}
            slidesPerView={1}
            breakpoints={{
              640:  { slidesPerView: 1 },
              768:  { slidesPerView: 2 },
              1224: { slidesPerView: 3 },
            }}

            // ── 2. autoplay config ────────────────────────────────────────────
            autoplay={{
              delay: 3500,              // ms between slides
              disableOnInteraction: false, // keeps auto-playing after manual swipe
              pauseOnMouseEnter: true,  // pauses when user hovers over slider
            }}
          >
            {techStackSlides.map((slide) => (
              <SwiperSlide key={slide.id} className="pt-3 " style={{ display: "block" }}>
                {/* Timeline dot */}
                <div className="relative w-full flex items-center mb-6 mt-4">
                  <div className="w-full h-[2px] bg-neutral-400"></div>
                  <img
                    src="/service/service-dot.svg"
                    alt=""
                    width="40"
                    height="40"
                    loading="lazy"
                    decoding="async"
                    className="absolute left-1/2 -translate-x-1/2 w-10 h-10 rounded-full"
                  />
                </div>

                {/* Card */}
                <div className="p-2">
                  <article className="bg-[#0094DB] h-[450px] sm:h-[380px] w-full rounded-2xl px-2 py-7 sm:px-7 sm:py-9 md:px-8 md:py-6 lg:px-2 lg:py-2 shadow-[0_20px_60px_rgba(0,0,0,0.5)] flex flex-col my-4">
                    <header className="flex items-start flex-col justify-between mb-6">
                      <div className="flex justify-between items-center w-full">
                        <div className="w-16 h-16 flex items-center text-white justify-center">
                          <img
                            src={slide.titleIconUrl}
                            alt={slide.title}
                            width="40"
                            height="40"
                            loading="lazy"
                            decoding="async"
                            className="w-10 h-10"
                          />
                        </div>
                        <div className="w-8 h-8 text-[24px] rounded-full flex items-center justify-center text-white/60 text-sm font-semibold">
                          {slide.id}
                        </div>
                      </div>
                      <h3 className="font-inter text-lg pl-3 sm:text-xl md:text-[26px] font-semibold text-white">
                        {slide.title}
                      </h3>
                    </header>

                    <div className="grid sm:grid-cols-3 grid-cols-2 gap-2">
                      {slide.tags.map((tag) => (
                        <span
                          key={tag.name}
                          className="sm:px-1 px-3 py-3 rounded-md bg-white/10 border border-white/20 text-xs sm:text-sm text-white whitespace-nowrap flex items-center gap-2 overflow-hidden"
                        >
                          <img
                            src={tag.iconUrl}
                            alt={tag.name}
                            width="32"
                            height="32"
                            loading="lazy"
                            decoding="async"
                            className="w-8 h-8 object-contain"
                          />
                          <p className="truncate max-w-xs">{tag.name}</p>
                        </span>
                      ))}
                    </div>
                  </article>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Prev / Next buttons */}
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

