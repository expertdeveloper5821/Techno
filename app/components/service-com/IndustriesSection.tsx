



"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const industries = [
  {
    title: "eCommerce",
    blackicon: "/service/industriesicon/card3black.svg",
    desc: "Developing scalable eCommerce platforms that deliver seamless shopping experiences and growth.",
    icon: "/service/industriesicon/card3.svg",
  },
  {
    title: "Fintech",
    blackicon: "/service/industriesicon/card2black.svg",
    desc: "Building secure, compliant fintech solutions that simplify transactions and enhance financial access.",
    icon: "/service/industriesicon/card2.svg",
  },
  {
    title: "Transportation & Logistics",
    blackicon: "/service/industriesicon/card4black.svg",
    desc: "Optimizing logistics operations with smart digital solutions for efficiency and real-time tracking.",
    icon: "/service/industriesicon/card4.svg",
  },
  {
    title: "Healthcare",
    blackicon: "/service/industriesicon/card1black.svg",
    desc: "Designing reliable digital systems that streamline operations and improve patient care experiences.",
    icon: "/service/industriesicon/card1.svg",
  },
  {
    title: "Telecom",
    blackicon: "/service/industriesicon/telecom-black.svg",
    desc: "Creating robust digital platforms that support connectivity, scalability, and customer satisfaction.",
    icon: "/service/industriesicon/telecom.svg",
  },
  {
    title: "Advertising & Marketing",
    blackicon: "/service/industriesicon/advertising-black.svg",
    desc: "Crafting data-driven digital strategies that boost brand visibility and customer engagement.",
    icon: "/service/industriesicon/advertising.svg",
  },
  {
    title: "Media & Entertainment",
    blackicon: "/service/industriesicon/media-black.svg",
    desc: "Creating immersive digital experiences that engage audiences and amplify storytelling across platforms.",
    icon: "/service/industriesicon/media.svg",
  },
  {
    title: "Public Sector & Government",
    blackicon: "/service/industriesicon/gov-black.svg",
    desc: "Delivering secure, scalable digital solutions that enhance governance, transparency, and citizen services.",
    icon: "/service/industriesicon/gov.svg",
  },
  {
    title: "EdTech",
    blackicon: "/service/industriesicon/card5black.svg",
    desc: "Building interactive learning platforms that improve engagement, accessibility, and educational outcomes.",
    icon: "/service/industriesicon/card5.svg",
  },
  {
    title: "On‑Demand Platforms",
    blackicon: "/service/industriesicon/card8black.svg",
    desc: "Scalable on‑demand applications connecting users with real‑time services.",
    icon: "/service/industriesicon/card8.svg",
  },
  {
    title: "Sports",
    blackicon: "/service/industriesicon/sports-black.svg",
    desc: "Designing engaging digital experiences that connect fans, athletes, and sports organizations.",
    icon: "/service/industriesicon/sports.svg",
  },
  {
    title: "Gaming",
    blackicon: "/service/industriesicon/card7black.svg",
    desc: "High‑performance gaming platforms powered by scalable cloud technologies.",
    icon: "/service/industriesicon/card7.svg",
  },
];

export default function IndustriesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const stickyWrapRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const stickyWrap = stickyWrapRef.current;
    const track = trackRef.current;
    const heading = headingRef.current;

    if (!section || !stickyWrap || !track || !heading) return;

    // ── Kill any existing ScrollTriggers scoped to this section ──
    ScrollTrigger.getAll().forEach((st) => {
      if (st.trigger === section || st.trigger === stickyWrap || st.trigger === heading) st.kill();
    });

    const mm = gsap.matchMedia();

    // ── DESKTOP: horizontal scroll driven by vertical scroll ──
    mm.add("(min-width: 1024px)", () => {
      const getMaxTranslate = () => {
        const padding = 48;
        const viewportWidth = window.innerWidth - padding;
        return Math.max(0, track.scrollWidth - viewportWidth +54 );
      };

      const tween = gsap.to(track, {
        x: () => -getMaxTranslate(),
        ease: "none",
        scrollTrigger: {
          trigger: heading,
          start: "top 20px",           // start only when heading touches viewport top
          end: () => `+=${getMaxTranslate()}`,  // scroll distance = how far we need to translate
          pin: stickyWrap,           // pin the inner sticky wrapper (not the whole section)
          anticipatePin: 1,
          scrub: 1,                  // smooth 1s lag — increase for more lag, decrease for snappier
          invalidateOnRefresh: true, // recalculate on resize
        },
      });

      return () => {
        tween.scrollTrigger?.kill();
        tween.kill();
      };
    });

    // ── MOBILE: no horizontal scroll, clean up any transforms ──
    mm.add("(max-width: 1023px)", () => {
      gsap.set(track, { x: 0, clearProps: "transform" });
    });

    return () => {
      mm.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="bg-[#000000] text-white w-full mx-auto lg:pt-24 lg:pb-24 md:pt-15 md:pb-15 pt-10 pb-10"
    >
      {/*
        stickyWrapRef is what GSAP pins.
        It must be a plain div — GSAP will inject `position:sticky` itself.
      */}
      <div ref={stickyWrapRef} className="flex flex-col justify-center px-4 sm:px-6 lg:px-6">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <h2  className="text-[25px] md:text-4xl lg:text-[44px] font-semibold text-white max-w-4xl text-center mb-6">
            Industries We Serve
          </h2>
          <p className="text-base sm:text-base md:text-lg text-center max-w-5xl leading-[28px] text-[#ffff]">
            We build smart, scalable, and secure digital solutions that help
            businesses adapt, grow, and succeed in today's fast‑changing
            technology landscape.
          </p>
        </div>

        {/* Cards track — overflow hidden on the wrapper, translate on the track */}
        <div ref={headingRef} className="overflow-clip  w-full">
          <div
            ref={trackRef}
            className="
              grid grid-cols-1 sm:grid-cols-2 gap-7
              lg:grid-cols-none lg:grid-rows-2 lg:grid-flow-col lg:w-max
              p-1 py-6 will-change-transform
            "
          >
            {industries.map((item) => (
              <div
                key={item.title}
                className="
                  group relative rounded-xl border border-white/10 bg-white/6
                  px-6 py-8 pt-0 transition-all duration-300
                  hover:border-sky-500/50 hover:shadow-[0_0_30px_rgba(56,189,248,0.15)]
                  w-full lg:w-[calc(100vw/3)] min-w-[260px]
                "
              >
                <div className="flex justify-between">
                  <img
                    src={item.icon}
                    alt={item.title}
                    className="relative top-[-16px]"
                  />
                  <img src={item.blackicon} alt="" />
                </div>
                <h3 className="text-lg md:text-[20px] leading-[20px] font-semibold mb-4">
                  {item.title}
                </h3>
                <p className="text-base md:text-lg text-gray-400 leading-[28px]">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}