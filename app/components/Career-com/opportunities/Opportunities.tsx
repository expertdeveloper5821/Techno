"use client";

import { useState } from "react";
import ChevronRightIcon from "@/app/lib/icon/chevron-right-icon";

interface JobOpening {
  _id: string;
  title: string;
  experience: string;
  type: string;
  location: string;
  description: string;
  order: number;
}

const stickyTopMap: Record<number, number> = {
  0: 24,
  1: 36,
  2: 48,
  3: 50,
};

interface OpportunitiesProps {
  openings: JobOpening[];
}

export default function Opportunities({ openings }: OpportunitiesProps) {

  if (openings.length === 0) {
    return (
      <section className="lg:pt-24 lg:pb-24 md:pt-15 md:pb-15 pt-10 pb-10 bg-[#000000] text-white flex items-center justify-center min-h-[400px]">
        <p className="text-white/70">No openings at this time.</p>
      </section>
    );
  }

  return (
    <section id="about" className="lg:pt-24 lg:pb-24 md:pt-15 md:pb-15  pt-10 pb-10 bg-[#000000] text-white w-full mx-auto px-4 sm:px-6 lg:px-6">
      <div className="mx-auto">
        <div className="mb-18 grid items-start gap-6 lg:grid-cols-2">
          <h2 className="text-[36px] font-semibold leading-[60px] text-[#FFFFFF] md:text-[44px]">
            Current Opportunities
          </h2>
          <p className=" text-base leading-7 tracking-[1%] text-[#FFFFFF] md:text-lg">
            We are always looking for passionate and talented individuals ready to make a difference and contribute
            innovative ideas to impactful digital projects, collaborate with dynamic teams, and grow within a
            supportive and forward-thinking environment.
          </p>
        </div>

        <div className="space-y-12 xl:h-[1400px]">
          {openings.map((opening, index) => (
            <article
              key={opening._id}
              className="rounded-[12px] bg-[#027EBA] px-5 py-8 sm:px-8 lg:px-10  sticky "
              style={{
                zIndex: index * 2,
                top: `${stickyTopMap[index] ?? 60}px`,
                borderTop: '1px solid #5D5D5D',
                borderBottom: '1px solid #5D5D5D',
              }}
            >
              <div className="grid items-start lg:gap-8 gap-4 lg:grid-cols-[1.2fr_1.4fr_auto]">
                <div>
                  <h3 className="sm:text-[44px] text-[30px] font-semibold leading-[60px]text-[#FFFFFF] ">
                    {opening.title}
                  </h3>
                  <div className="mt-4 h-px w-full bg-[#FFFFFF4D]" />
                  <div className="mt-4 space-y-1 text-sm sm:text-base">
                    <p className="font-normal text-lg text-[#FFFFFF] tracking-[1%] leading-7">
                      <span className="font-normal">Experience:</span> {opening.experience}
                    </p>
                    <p className="font-normal text-lg text-[#FFFFFF] tracking-[1%] leading-7">
                      <span className="font-normal">Type:</span> {opening.type}
                    </p>
                    <p className="font-normal text-lg text-[#FFFFFF] tracking-[1%] leading-7">
                      <span className="font-normal">Location:</span> {opening.location}
                    </p>
                  </div>
                </div>

                <p className="font-normal text-lg text-[#FFFFFF] tracking-[1%] leading-7">
                  {opening.description}
                </p>

                <div className="lg:pt-2">
                  <div className="lg:mt-10 mt-3">
                    <a
                      href="#services"
                      className="group shrink-0 text-lg inline-flex items-center justify-center gap-2 sm:px-8  sm:py-3.5 px-4 py-2  font-semibold text-[#000000] bg-white rounded-full hover:bg-white/95 transition-all duration-200 shadow-lg whitespace-nowrap mt-0"
                    >
                      Apply Now{' '}
                      <ChevronRightIcon width={7} height={11} color="#000000" className="inline-block transition-transform duration-500 ease-out group-hover:translate-x-0.5" />
                    </a>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
