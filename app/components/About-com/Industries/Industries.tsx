"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { industries } from "@/app/lib/data/about-data/industries";

export default function Industries() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const trackRef = useRef<HTMLDivElement>(null);
    const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
    const [stickyStates, setStickyStates] = useState<number[]>(
        Array(industries.length).fill(-1)
    );

    useEffect(() => {
        const section = sectionRef.current!;
        const track = trackRef.current!;

        const isDesktop = () => window.innerWidth >= 1024;

        let start = 0;
        let end = 0;
        let maxTranslate = 0;

        const calculate = () => {
            if (!isDesktop()) {
                track.style.transform = "none";
                return;
            }

            const padding = 48;
            const viewportWidth = window.innerWidth - padding;

            maxTranslate = Math.max(
                0,
                track.scrollWidth - viewportWidth +24
            );

            start = section.offsetTop;
            end = start + section.offsetHeight - window.innerHeight;
        };

        const onScroll = () => {
            if (!isDesktop()) {
                // Mobile/Tablet: Handle staggered sticky effect
                const scrollY = window.scrollY;
                const newStates = Array(industries.length).fill(-1);

                cardsRef.current.forEach((card, index) => {
                    if (!card) return;

                    const rect = card.getBoundingClientRect();
                    const cardTop = rect.top;
                    const cardHeight = rect.height;

                    // Card is sticky if it reaches the top
                    if (cardTop <= 0 && cardTop > -cardHeight) {
                        newStates[index] = 1; // Sticky
                    }
                });

                setStickyStates(newStates);
                return;
            }

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
            track.style.transform = `translate3d(-${maxTranslate * progress}px,0,0)`;
        };

        calculate();
        window.addEventListener("scroll", onScroll);
        window.addEventListener("resize", calculate);

        return () => {
            window.removeEventListener("scroll", onScroll);
            window.removeEventListener("resize", calculate);
        };
    }, []);

    return (
        <section
            ref={sectionRef}
            className="
        relative
        bg-[linear-gradient(to_bottom,#0094DB_0%,#0094DB_85%,#003a5c_95%,#000000_100%)]
        pt-10 pb-10
        md:pt-24 md:pb-24 
      "
            style={{
                height: "auto",
            }}
        >
            {/* Desktop horizontal scroll height */}
            <div className="lg:h-[300vh]">
                <div
                    className="
            lg:sticky lg:-top-23
            flex flex-col justify-center
            px-6 
          "
                >
                    <h2 className="text-[25px] md:text-4xl lg:text-[44px] font-semibold text-white max-w-4xl mb-6">
                        Industries We Empower with Technical Expertise
                    </h2>

                    <div className="overflow-clip">
                        <div
                            ref={trackRef}
                            className="
                                       grid
                                       grid-cols-1
                                       gap-6
                                       lg:grid-rows-2
                                       lg:grid-flow-col
                                       lg:w-max
                                       will-change-transform
              "
                        >
                            {industries.map((item, index) => (
                                <div
                                    key={index}
                                    ref={(el) => {
                                        cardsRef.current[index] = el;
                                    }}
                                    className={`
                                            w-full
                                            lg:w-[calc(100vw/3)]
                                            min-w-[260px]
                                            rounded-xl
                                            border border-white/30
                                            bg-[#018BCE]
                                            p-6
                                             text-white
                                              lg:static
                                          
                                              
                                                     `}
                                    style={{
                                        zIndex: stickyStates[index] === 1 ? 10 + index : 11 + index,
                                        position: stickyStates[index] === 1 ? "sticky" : "static",
                                        top: stickyStates[index] === 1 ? "0px" : "auto",
                                    }}

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
            </div>
        </section>
    );
}
