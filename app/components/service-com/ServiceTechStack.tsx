"use client";

import React, { useRef } from "react";
import type { Swiper as SwiperType } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import Image from "next/image";
import arrowLeft from "@/app/lib/icon/arrow.svg";
import { IconType } from "react-icons";
import js from "/service/techstack/js.png"

import {
  FaReact,
  FaNodeJs,
  FaDatabase,
  FaCloud,
  FaRobot,
  FaChartLine,
  FaPaintBrush,
  FaShieldAlt,
} from "react-icons/fa";

import {
  SiNextdotjs,
  SiTypescript,
  SiTailwindcss,
  SiVuedotjs,
  SiAngular,
  SiRedux,
  SiMui,
  SiFramer,
  SiExpress,
  SiPython,
  SiDjango,
  SiFastapi,
  SiNestjs,
  SiGraphql,
  SiPostgresql,
  SiMongodb,
  SiRedis,
  SiSupabase,
  SiMysql,
  SiFirebase,
  SiPrisma,
  SiElasticsearch,
  SiAmazons3,
  SiAmazon,
  SiGooglecloud,
  // SiMicrosoftazure,
  SiVercel,
  SiDocker,
  SiKubernetes,
  SiGithubactions,
  SiNetlify,
  SiDigitalocean,
  SiOpenai,
  SiZapier,
  SiTensorflow,
  SiHuggingface,
  SiGoogleads,
  SiMeta,
  SiSemrush,
  SiMailchimp,
  SiHubspot,
  SiHootsuite,
  SiFigma,
  SiAdobe,
  SiSlack,
  SiJira,
  SiTrello,
  SiNotion,
  SiGithub,
  SiZoom,
  SiStripe,
  SiAuth0,
  SiCloudflare,
  SiSentry,
  SiJsonwebtokens,
  SiNewrelic,
} from "react-icons/si";

type TechTag = {
  name: string;
  icon: IconType;
};

type TechStackSlide = {
  id: number;
  title: string;
  titleIcon: IconType;
  subtitle: string;
  tags: TechTag[];
};

export const techStackSlides: TechStackSlide[] = [
  {
    id: 1,
    title: "Frontend Technologies",
    titleIcon: FaReact,
    subtitle: "Modern UI frameworks & state management",
    tags: [
      { name: "React", icon: FaReact },
      { name: "Next.js", icon: SiNextdotjs },
      { name: "TypeScript", icon: SiTypescript },
      { name: "Tailwind CSS", icon: SiTailwindcss },
      { name: "Vue.js", icon: SiVuedotjs },
      { name: "Angular", icon: SiAngular },
      { name: "Redux", icon: SiRedux },
      { name: "Material-UI", icon: SiMui },
      { name: "Framer Motion", icon: SiFramer },
    ],
  },
  {
    id: 2,
    title: "Backend Technologies",
    titleIcon: FaNodeJs,
    subtitle: "Scalable APIs & real-time systems",
    tags: [
      { name: "Node.js", icon: FaNodeJs },
      { name: "Express.js", icon: SiExpress },
      { name: "Python", icon: SiPython },
      { name: "Django", icon: SiDjango },
      { name: "FastAPI", icon: SiFastapi },
      { name: "Nest.js", icon: SiNestjs },
      { name: "GraphQL", icon: SiGraphql },
      { name: "REST API", icon: FaNodeJs },
      { name: "Socket.io", icon: FaNodeJs },
    ],
  },
  {
    id: 3,
    title: "Database & Storage",
    titleIcon: FaDatabase,
    subtitle: "Reliable data & object storage",
    tags: [
      { name: "PostgreSQL", icon: SiPostgresql },
      { name: "MongoDB", icon: SiMongodb },
      { name: "Redis", icon: SiRedis },
      { name: "Supabase", icon: SiSupabase },
      { name: "MySQL", icon: SiMysql },
      { name: "Firebase", icon: SiFirebase },
      { name: "Prisma", icon: SiPrisma },
      { name: "Elasticsearch", icon: SiElasticsearch },
      { name: "AWS S3", icon: SiAmazons3 },
    ],
  },
  {
    id: 4,
    title: "Cloud & DevOps",
    titleIcon: FaCloud,
    subtitle: "Deployment, automation & scalability",
    tags: [
      { name: "AWS", icon: SiAmazon },
      { name: "Google Cloud", icon: SiGooglecloud },
      // { name: "Azure", icon: SiMicrosoftazure },
      { name: "Vercel", icon: SiVercel },
      { name: "Docker", icon: SiDocker },
      { name: "Kubernetes", icon: SiKubernetes },
      { name: "GitHub Actions", icon: SiGithubactions },
      { name: "Netlify", icon: SiNetlify },
      { name: "DigitalOcean", icon: SiDigitalocean },
    ],
  },
  {
    id: 5,
    title: "AI & Automation",
    titleIcon: FaRobot,
    subtitle: "Intelligent systems & workflow automation",
    tags: [
      { name: "OpenAI", icon: SiOpenai },
      { name: "Claude", icon: FaRobot },
      { name: "Make.com", icon: FaRobot },
      { name: "n8n", icon: FaRobot },
      { name: "Cursor", icon: FaRobot },
      { name: "Zapier", icon: SiZapier },
      { name: "LangChain", icon: FaRobot },
      { name: "TensorFlow", icon: SiTensorflow },
      { name: "Hugging Face", icon: SiHuggingface },
    ],
  },
  {
    id: 6,
    title: "Digital Marketing & Analytics",
    titleIcon: FaChartLine,
    subtitle: "Growth, tracking & campaign optimization",
    tags: [
      { name: "Google Ads", icon: SiGoogleads },
      { name: "Meta Ads", icon: SiMeta },
      { name: "SEMrush", icon: SiSemrush },
      { name: "Mailchimp", icon: SiMailchimp },
      { name: "HubSpot", icon: SiHubspot },
      { name: "Hootsuite", icon: SiHootsuite },
      { name: "GA4", icon: FaChartLine },
      { name: "Search Console", icon: FaChartLine },
    ],
  },
  {
    id: 7,
    title: "Design & Collaboration",
    titleIcon: FaPaintBrush,
    subtitle: "Product design & team productivity",
    tags: [
      { name: "Figma", icon: SiFigma },
      { name: "Adobe Creative Suite", icon: SiAdobe },
      { name: "Slack", icon: SiSlack },
      { name: "Jira", icon: SiJira },
      { name: "Trello", icon: SiTrello },
      { name: "Notion", icon: SiNotion },
      { name: "GitHub", icon: SiGithub },
      { name: "Zoom", icon: SiZoom },
    ],
  },
  {
    id: 8,
    title: "Security & Performance",
    titleIcon: FaShieldAlt,
    subtitle: "Payments, auth & monitoring",
    tags: [
      { name: "Stripe", icon: SiStripe },
      { name: "Auth0", icon: SiAuth0 },
      { name: "Cloudflare", icon: SiCloudflare },
      { name: "Sentry", icon: SiSentry },
      { name: "JWT", icon: SiJsonwebtokens },
      { name: "SSL/TLS", icon: FaShieldAlt },
      { name: "OAuth 2.0", icon: FaShieldAlt },
      { name: "New Relic", icon: SiNewrelic },
    ],
  },
];

export default function ServiceTechStack() {
  const swiperRef = useRef<SwiperType | null>(null);

  return (
    <section className="lg:pt-24 lg:pb-24 md:pt-15 md:pb-15  pt-10 pb-10 bg-[#000000] text-white w-full mx-auto px-4 sm:px-6 lg:px-6">
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
            // modules={[Autoplay]}
            onSwiper={(swiper) => {
              swiperRef.current = swiper;
            }}
            loop
            spaceBetween={20}
            slidesPerView={1.05}
            centeredSlides={false}
            // autoplay={{
            //   delay: 3500,
            //   disableOnInteraction: false,
            //   pauseOnMouseEnter: true,
            // }}
            breakpoints={{
              640: { slidesPerView: 1 },
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
          >
            {techStackSlides.map((slide) => {
  const TitleIcon = slide.titleIcon;

  return (
    <SwiperSlide key={slide.id}>
      <article className="bg-[#0094DB] h-[300px] w-full rounded-xl px-6 py-7 sm:px-7 sm:py-9 md:px-8 md:py-10 lg:px-2 lg:py-2 shadow-[0_20px_60px_rgba(0,0,0,0.5)] flex flex-col">
        
        <header className="flex items-start flex-col justify-between mb-6">
          <div className="flex justify-between w-full">
            <div className="w-16 h-16 flex items-center text-white  justify-center">
              <TitleIcon size={40}  />
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
            const Icon = tag.icon;

            return (
              <span
                key={tag.name}
                className="sm:px-6 px-3 py-3 rounded-xl bg-white/10 border border-white/20 text-xs sm:text-sm text-white whitespace-nowrap flex items-center gap-2 break-words "
              >
                <Icon size={16} />
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

