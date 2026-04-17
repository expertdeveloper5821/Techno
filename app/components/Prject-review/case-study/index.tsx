"use client";

import { Fragment } from "react";
import { motion } from "framer-motion";
import { fadeInUp } from "@/app/lib/animations";
import type {
  CaseStudySection,
  ProjectCaseStudyBlock,
} from "@/app/lib/data/project-review";

interface ProjectCaseStudyProps {
  content: ProjectCaseStudyBlock;
}

function SectionDivider() {
  return (
    <div className="flex items-center justify-center gap-4 py-10 md:py-14">
      <div className="h-px flex-1 max-w-[min(40%,200px)] border-t border-dashed border-white/25" />
      <div
        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/20 bg-white/6 shadow-[0_0_24px_rgba(0,148,219,0.25)]"
        aria-hidden
      >
        <span className="text-lg text-[#0094DB]">◆</span>
      </div>
      <div className="h-px flex-1 max-w-[min(40%,200px)] border-t border-dashed border-white/25" />
    </div>
  );
}

function renderBody(section: CaseStudySection, alignRight: boolean) {
  const textAlign = alignRight ? "lg:text-right" : "text-left ";
  const listAlign = alignRight ? "items-end" : "items-start ";

  if (section.variant === "paragraphs") {
    return (
      <div className={`space-y-4 text-base leading-7 text-[#FFFFFF] md:text-lg tracking-[1%] ${textAlign}`}>
        {section.paragraphs.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </div>
    );
  }

  return (
    <div className={`flex flex-col gap-4 ${listAlign}`}>
      <p
        className={`text-base leading-7 text-[#FFFFFF] md:text-lg tracking-[1%] ${textAlign}`}
      >
        {section.intro}
      </p>
      <ul className={`flex flex-col gap-2.5 ${textAlign} ${listAlign}`}>
        {section.bullets.map((line) => (
          <li
            key={line}
            className={`flex max-w-full gap-2 text-base leading-7 text-white/95 md:text-lg ${
              alignRight ? "flex-row-reverse" : "flex-row"
            }`}
          >
            <span className="mt-[0.35em] h-1.5 w-1.5 shrink-0 rounded-full bg-[#0094DB]" />
            <span>{line}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function ProjectCaseStudy({ content }: ProjectCaseStudyProps) {
  const { sections } = content;

  return (
    <section className="relative overflow-hidden  bg-[url('/Projectreview/card-background.svg')] bg-cover bg-center bg-no-repeat text-white  lg:pt-24 lg:pb-24 md:pt-15 md:pb-15 pt-10 pb-10">
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden
      >
        <div className="absolute -left-32 top-1/4 h-[420px] w-[420px] rounded-full bg-purple-600/20 blur-[120px]" />
        <div className="absolute -right-24 bottom-1/4 h-[380px] w-[380px] rounded-full bg-[#0094DB]/15 blur-[100px]" />
        <div className="absolute left-1/2 top-1/2 h-[300px] w-[300px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-600/10 blur-[90px]" />
      </div>

      <div className="relative z-10 mx-auto w-full  px-4 sm:px-8 lg:px-18">
        {sections.map((section, index) => {
          const alignRight = index % 2 === 1;

          return (
            <Fragment key={section.id}>
              <motion.article
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                variants={fadeInUp}
                className={`mb-10 flex w-full  last:mb-0 md:mb-20 ${
                  alignRight ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`w-full max-w-[min(100%,1000px)] rounded-[10px] border border-[#FFFFFF2B] p-8 shadow-[0_0_0_1px_rgba(255,255,255,0.04)] md:p-10 ${
                    alignRight
                      ? "bg-[linear-gradient(270.93deg,_rgba(0,0,0,0.5)_25.97%,_rgba(2,126,186,0.5)_96.83%)]"
                      : "bg-[linear-gradient(270.93deg,_rgba(0,0,0,0.5)_25.97%,_rgba(2,126,186,0.5)_96.83%)]"
                  }`}
                >
                  <h3
                    className={`mb-6 font-inter text-2xl font-semibold text-white md:text-3xl lg:text-[44px] leading-[60px] ${
                      alignRight ? "lg:text-right" : "text-left"
                    }`}
                  >
                    {section.title}
                  </h3>
                  {renderBody(section, alignRight)}
                </div>
              </motion.article>

              {/* {index === 1 && <SectionDivider />} */}
            </Fragment>
          );
        })}
      </div>
    </section>
  );
}
