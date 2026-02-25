import React from "react";

interface ProcessStep {
  id: number;
  title: string;
  description: string;
}

const steps: ProcessStep[] = [
  {
    id: 1,
    title: "Discovery & Requirement Analysis",
    description:
      "Understanding goals, challenges, and detailed business requirements to define the right solution.",
  },
  {
    id: 2,
    title: "Strategy & Planning",
    description:
      "Creating a structured roadmap aligned with business objectives, timelines, and success metrics.",
  },
  {
    id: 3,
    title: "Design & Architecture",
    description:
      "Designing scalable architectures and intuitive user experiences tailored to your users.",
  },
  {
    id: 4,
    title: "Development & Integration",
    description:
      "Building secure, scalable solutions with seamless integration across your existing systems.",
  },
  {
    id: 5,
    title: "Testing & Quality Assurance",
    description:
      "Ensuring performance, security, and reliability through rigorous QA and automated testing.",
  },
  {
    id: 6,
    title: "Deployment & Support",
    description:
      "Smooth deployment with monitoring, optimization, and ongoing support for long‑term success.",
  },
];

export default function ProcessFlow() {
  return (
    <section className="bg-linear-to-b from-[#020617] via-[#020617] to-black py-16 md:py-24">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-10 md:mb-14">
          <h2 className="font-inter text-[26px] sm:text-[32px] md:text-[36px] font-semibold tracking-[0.03em] text-white mb-4">
            How We Turn Ideas into Solutions
          </h2>
          <p className="text-sm sm:text-base md:text-lg leading-relaxed text-[#E5E5E5]">
            Our proven process ensures clarity, collaboration, and consistent delivery — from
            discovery to final deployment and ongoing support.
          </p>
        </div>

        <div className="grid gap-5 md:gap-6 lg:gap-7 md:grid-cols-3">
          {steps.map((step) => (
            <article
              key={step.id}
              className="relative rounded-2xl border border-white/10 bg-linear-to-br from-[#020617] via-[#02091a] to-[#020617] px-5 py-6 sm:px-6 sm:py-7 lg:px-7 lg:py-8 shadow-[0_20px_60px_rgba(0,0,0,0.6)]"
            >
              <div className="flex items-start justify-between mb-4">
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-white/5 text-sm font-semibold text-white">
                  {step.id}
                </span>
              </div>

              <h3 className="font-inter text-base sm:text-lg md:text-[18px] font-semibold text-white mb-2">
                {step.title}
              </h3>
              <p className="text-xs sm:text-sm md:text-[13px] leading-relaxed text-[#D1E4FF]">
                {step.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

