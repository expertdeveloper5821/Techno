import React from "react";

interface ProcessStep {
  id: number;
  title: string;
  icon: string;
  description: string;
}

const steps: ProcessStep[] = [
  {
    id: 1,
    title: "Discovery & Requirement Analysis",
    icon : '/service/flowicon/card1.svg',
    description:
      "Understanding goals, challenges, and detailed business requirements to define the right solution.",
  },
  {
    id: 2,
    title: "Strategy & Planning",
    icon : '/service/flowicon/card2.svg',
    description:
      "Creating a structured roadmap aligned with business objectives, timelines, and success metrics.",
  },
  {
    id: 3,
    title: "Design & Architecture",
    icon : '/service/flowicon/card3.svg',
    description:
      "Designing scalable architectures and intuitive user experiences tailored to your users.",
  },
  {
    id: 4,
    title: "Development & Integration",
    icon : '/service/flowicon/card4.svg',
    description:
      "Building secure, scalable solutions with seamless integration across your existing systems.",
  },
  {
    id: 5,
    title: "Testing & Quality Assurance",
    icon : '/service/flowicon/card5.svg',
    description:
      "Ensuring performance, security, and reliability through rigorous QA and automated testing.",
  },
  {
    id: 6,
    title: "Deployment & Support",
    icon : '/service/flowicon/card6.svg',
    description:
      "Smooth deployment with monitoring, optimization, and ongoing support for long‑term success.",
  },
];

export default function ProcessFlow() {
  return (
    <section className="lg:pt-24 lg:pb-24 md:pt-15 md:pb-15  pt-10 pb-10 bg-[#000000] text-white w-full mx-auto px-4 sm:px-6 lg:px-6">
      <div className="mx-auto ">
        <div className="max-w-3xl mx-auto text-center mb-10 md:mb-14">
        <h2 className="text-[25px] md:text-4xl lg:text-[44px] font-semibold text-white max-w-4xl  text-center mb-6">
            How We Turn Ideas into Solutions
          </h2>
          <p className="text-base sm:text-base md:text-lg  text-center max-w-5xl  leading-[28px] text-[#ffff]">
            Our proven process ensures clarity, collaboration, and consistent delivery — from
            discovery to final deployment and ongoing support.
          </p>
        </div>

        <div className="grid gap-5 md:gap-6 lg:gap-20 md:grid-cols-3">
          {steps.map((step) => (
            <article
              key={step.id}
              className="relative rounded-2xl border border-white/10 bg-white/6 px-4 py-4 shadow-[0_20px_60px_rgba(0,0,0,0.6)]"
            >
              <div className="flex items-start justify-between mb-8">
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-full  text-[30px] md:text-[36px] font-semibold  text-white">
                  {step.id}
                </span>
                <img src={step.icon} alt="icon" />
              </div>

              <h3 className="font-inter text-base sm:text-lg md:text-[20px] font-semibold leading-[28px] text-white mb-2">
                {step.title}
              </h3>
              <p className="text-sm sm:text-base md:text-[18px] leading-[22px] md:leading-[28px] text-[#BABABA]">
                {step.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

