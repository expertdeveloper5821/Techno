"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface Industry {
  _id: string;
  title: string;
  icon: string;
  blackIcon?: string;
  description: string;
  order: number;
}

interface IndustriesSectionProps {
  industries: Industry[];
}

export default function IndustriesSection({ industries }: IndustriesSectionProps) {

  const sectionRef = useRef<HTMLElement>(null);
  const stickyWrapRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLParagraphElement>(null);

  // Set up GSAP horizontal scroll — re-runs whenever industries load
  useEffect(() => {
    const section = sectionRef.current;
    const stickyWrap = stickyWrapRef.current;
    const track = trackRef.current;
    const heading = headingRef.current;

    if (!section || !stickyWrap || !track || !heading || industries.length === 0) return;

    ScrollTrigger.getAll().forEach((st) => {
      if (
        st.trigger === section ||
        st.trigger === stickyWrap ||
        st.trigger === heading
      )
        st.kill();
    });

    const mm = gsap.matchMedia();

    // DESKTOP: horizontal scroll driven by vertical scroll
    mm.add("(min-width: 1024px)", () => {
      const getMaxTranslate = () => {
        const padding = 48;
        const viewportWidth = window.innerWidth - padding;
        return Math.max(0, track.scrollWidth - viewportWidth + 54);
      };

      const tween = gsap.to(track, {
        x: () => -getMaxTranslate(),
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${getMaxTranslate()}`,
          pin: stickyWrap,
          anticipatePin: 1,
          scrub: 1,
          invalidateOnRefresh: true,
        },
      });

      return () => {
        tween.scrollTrigger?.kill();
        tween.kill();
      };
    });

    // MOBILE: no horizontal scroll
    mm.add("(max-width: 1023px)", () => {
      gsap.set(track, { x: 0, clearProps: "transform" });
    });

    return () => {
      mm.revert();
    };
  }, [industries]); // re-run after data loads so track.scrollWidth is accurate

  return (
    <section
      ref={sectionRef}
      className="bg-[#000000] text-white w-full mx-auto lg:pt-24 lg:pb-24 md:pt-15 md:pb-15 pt-10 pb-10 overflow-hidden"
    >
      <div ref={stickyWrapRef} className="flex flex-col justify-center px-4 sm:px-6 lg:px-6">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <h2 className="text-[25px] md:text-4xl lg:text-[44px] font-semibold text-white max-w-4xl text-center mb-6">
            Industries We Serve
          </h2>
          <p className="text-base sm:text-base md:text-lg text-center max-w-5xl leading-[28px] text-[#ffff]">
            We build smart, scalable, and secure digital solutions that help
            businesses adapt, grow, and succeed in today&apos;s fast-changing
            technology landscape.
          </p>
        </div>

        {/* Cards track */}
        <div ref={headingRef} className="overflow-hidden w-full">
          {industries.length === 0 ? (
            <div className="flex justify-center py-16">
              <div className="w-10 h-10 border-4 border-white/20 border-t-white rounded-full animate-spin" />
            </div>
          ) : (
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
                  key={item._id}
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
                    {item.blackIcon && (
                      <img src={item.blackIcon} alt="" aria-hidden="true" />
                    )}
                  </div>
                  <h3 className="text-lg md:text-[20px] leading-[20px] font-semibold mb-4">
                    {item.title}
                  </h3>
                  <p className="text-base md:text-lg text-gray-400 leading-[28px]">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
