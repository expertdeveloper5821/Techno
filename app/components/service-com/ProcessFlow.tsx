import React from "react";

export default function ProcessFlow() {
  return (
    <section className="lg:pt-24 lg:pb-24 md:pt-15 md:pb-15 pt-10 pb-10  text-white w-full mx-auto px-4 sm:px-6 lg:px-6 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url('/service/background-solution.svg')" }} >
      <div className="mx-auto">

        {/* Heading */}
        <div className="max-w-3xl mx-auto text-center mb-10 md:mb-14">
          <h2 className="text-[25px] md:text-4xl lg:text-[44px] font-semibold mb-6">
            How We Turn Ideas into Solutions
          </h2>
          <p className="text-base md:text-lg leading-[28px] text-[#ffff]">
            Our proven process ensures clarity, collaboration, and consistent delivery — from
            discovery to final deployment and ongoing support.
          </p>
        </div>

        {/* Cards */}
        <div className="grid gap-12 md:gap-15 lg:gap-20   md:grid-cols-3">

          {/* Card 1 */}
          <div className=" relative  flex justify-center items-center  ">
          <article className="relative rounded-2xl border w-full border-white/10 bg-white/6 px-4 py-4 shadow-[0_20px_60px_rgba(0,0,0,0.6)] lg:h-[280px] md:h-[260px] bg-red-500">
            <div className="flex items-start justify-between lg:mb-8 mb-4">
              <span className="inline-flex lg:h-9 lg:w-9 h-5 w-5 items-center justify-center rounded-full text-[25px] lg:text-[30px] font-semibold">
                1
              </span>
              <img src="/service/flowicon/card1.svg" alt="Discovery" />
            </div>
            <h3 className="text-[20px] md:text-lg  lg:text-[20px] font-semibold mb-2">
              Discovery & Requirement Analysis
            </h3>
            <p className="text-lg md:text-base lg:text-[18px] text-[#BABABA] leading-[28px]">
              Understanding goals, challenges, and detailed business requirements to define the right solution.
            </p>
          </article>
          <img src='/service/flowicon/arrow.svg' alt="icon" className=" md:block hidden lg:w-18 w-13 h-6 absolute right-[-55px] lg:right-[-75px] "  />
          <img src='/service/flowicon/bottomicon.svg' alt="icon" className=" block md:hidden  lg:w-18 w-13 lg:h-15 md:h-13 h-11  absolute lg:bottom-[-60px] md:bottom-[-53px] bottom-[-47px] "  />
          </div>

          {/* Card 2 */}
          <div className=" relative flex justify-center items-center ">
          <article className="relative rounded-2xl w-full border border-white/10 bg-white/6 px-4 py-4 shadow-[0_20px_60px_rgba(0,0,0,0.6)] lg:h-[280px] md:h-[260px] bg-red-500">
            <div className="flex items-start justify-between lg:mb-8 mb-4">
              <span className="inline-flex lg:h-9 lg:w-9 h-5 w-5 items-center justify-center rounded-full text-[25px] lg:text-[30px] font-semibold">
                2
              </span>
              <img src="/service/flowicon/card2.svg" alt="Strategy" />
            </div>
            <h3 className="text-[20px] md:text-lg  lg:text-[20px] font-semibold mb-2">
              Strategy & Planning
            </h3>
            <p className="text-lg md:text-base lg:text-[18px] text-[#BABABA] leading-[28px]">
              Creating a structured roadmap aligned with business objectives, timelines, and success metrics.
            </p>
          </article>
          <img src='/service/flowicon/arrow.svg' alt="icon" className=" md:block hidden lg:w-18 w-13 h-6 absolute right-[-55px] lg:right-[-75px] "  />
          <img src='/service/flowicon/bottomicon.svg' alt="icon" className=" block md:hidden  lg:w-18 w-13 lg:h-15 md:h-13 h-11  absolute lg:bottom-[-60px] md:bottom-[-53px] bottom-[-47px] "  />
          </div>
          {/* Card 3 */}
          <div className=" relative flex justify-center items-center ">
          <article className="relative rounded-2xl w-full border border-white/10 bg-white/6 px-4 py-4 shadow-[0_20px_60px_rgba(0,0,0,0.6)] lg:h-[280px] md:h-[260px] bg-red-500">
            <div className="flex items-start justify-between lg:mb-8 mb-4">
              <span className="inline-flex lg:h-9 lg:w-9 h-5 w-5 items-center justify-center rounded-full text-[25px] lg:text-[30px] font-semibold">
                3
              </span>
              <img src="/service/flowicon/card3.svg" alt="Design" />
            </div>
            <h3 className="text-[20px] md:text-lg  lg:text-[20px] font-semibold mb-2">
              Design & Architecture
            </h3>
            <p className="text-lg md:text-base lg:text-[18px] text-[#BABABA] leading-[28px]">
              Designing scalable architectures and intuitive user experiences tailored to your users.
            </p>
          </article>
          <img src='/service/flowicon/bottomicon.svg' alt="icon" className="lg:w-18 w-13 lg:h-17 md:h-13 h-11  absolute lg:bottom-[-72px] md:bottom-[-53px] bottom-[-47px] "  />

          </div>

          {/* Card 4 */}
          <div className=" relative hidden  md:flex justify-center items-center ">
          <article className="relative rounded-2xl w-full border border-white/10 bg-white/6 px-4 py-4 shadow-[0_20px_60px_rgba(0,0,0,0.6)] lg:h-[280px] md:h-[260px] bg-red-500">
            <div className="flex items-start justify-between lg:mb-8 mb-4">
              <span className="inline-flex lg:h-9 lg:w-9 h-5 w-5 items-center justify-center rounded-full text-[25px] lg:text-[30px] font-semibold">
                6
              </span>
              <img src="/service/flowicon/card6.svg" alt="Deployment" />
            </div>
            <h3 className="text-[20px] md:text-lg  lg:text-[20px] font-semibold mb-2">
              Deployment & Support
            </h3>
            <p className="text-lg md:text-base lg:text-[18px] text-[#BABABA] leading-[28px]">
              Smooth deployment with monitoring, optimization, and ongoing support for long-term success.
            </p>
          </article>
          <img src='/service/flowicon/leftarrow.svg' alt="icon" className=" md:block hidden lg:w-18 w-13 h-6 absolute right-[-55px] lg:right-[-75px] "  />
          <img src='/service/flowicon/bottomicon.svg' alt="icon" className=" block md:hidden  lg:w-18 w-13 lg:h-15 md:h-13 h-11  absolute lg:bottom-[-60px] md:bottom-[-53px] bottom-[-47px] "  />
          </div>
          <div className=" relative md:hidden  flex justify-center items-center ">
          <article className="relative block md:hidden rounded-2xl w-full border border-white/10 bg-white/6 px-4 py-4 shadow-[0_20px_60px_rgba(0,0,0,0.6)] lg:h-[280px] md:h-[260px] bg-red-500">
            <div className="flex items-start justify-between lg:mb-8 mb-4">
              <span className=" inline-flex lg:h-9 lg:w-9 h-5 w-5 items-center justify-center rounded-full text-[25px] lg:text-[30px] font-semibold">
                4
              </span>
              
              <img src="/service/flowicon/card4.svg" alt="Development" />
            </div>
            <h3 className="text-[20px] md:text-lg  lg:text-[20px] font-semibold mb-2">
              Development & Integration
            </h3>
            <p className="text-lg md:text-base lg:text-[18px] text-[#BABABA] leading-[28px]">
              Building secure, scalable solutions with seamless integration across your systems.
            </p>
          </article>
          <img src='/service/flowicon/bottomicon.svg' alt="icon" className=" block md:hidden  lg:w-18 w-13 lg:h-15 md:h-13 h-11  absolute lg:bottom-[-60px] md:bottom-[-53px] bottom-[-47px] "  />
</div>
          {/* Card 5 */}
          <div className=" relative flex justify-center items-center  ">
          <article className="relative rounded-2xl w-full border border-white/10 bg-white/6 px-4 py-4 shadow-[0_20px_60px_rgba(0,0,0,0.6)] lg:h-[280px] md:h-[260px] bg-red-500">
            <div className="flex items-start justify-between lg:mb-8 mb-4">
              <span className="inline-flex lg:h-9 lg:w-9 h-5 w-5 items-center justify-center rounded-full text-[25px] lg:text-[30px] font-semibold">
                5
              </span>
              <img src="/service/flowicon/card5.svg" alt="Testing" />
            </div>
            <h3 className="text-[20px] md:text-lg  lg:text-[20px] font-semibold mb-2">
              Testing & Quality Assurance
            </h3>
            <p className="text-lg md:text-base lg:text-[18px] text-[#BABABA] leading-[28px]">
              Ensuring performance, security, and reliability through rigorous QA and automated testing.
            </p>
          </article>
          <img src='/service/flowicon/leftarrow.svg' alt="icon" className=" md:block hidden lg:w-18 w-13 h-6 absolute right-[-55px] lg:right-[-75px] "  />
          <img src='/service/flowicon/bottomicon.svg' alt="icon" className=" block md:hidden  lg:w-18 w-13 lg:h-15 md:h-13 h-11  absolute lg:bottom-[-60px] md:bottom-[-53px] bottom-[-47px] "  />
          </div>



          {/* Card 6 */}
          <article className="relative md:block hidden rounded-2xl w-full border border-white/10 bg-white/6 px-4 py-4 shadow-[0_20px_60px_rgba(0,0,0,0.6)] lg:h-[280px] md:h-[260px] bg-red-500">
            <div className="flex items-start justify-between lg:mb-8 mb-4">
              <span className=" inline-flex lg:h-9 lg:w-9 h-5 w-5 items-center justify-center rounded-full text-[25px] lg:text-[30px] font-semibold">
                4
              </span>
              
              <img src="/service/flowicon/card4.svg" alt="Development" />
            </div>
            <h3 className="text-[20px] md:text-lg  lg:text-[20px] font-semibold mb-2">
              Development & Integration
            </h3>
            <p className="text-lg md:text-base lg:text-[18px] text-[#BABABA] leading-[28px]">
              Building secure, scalable solutions with seamless integration across your systems.
            </p>
          </article>
          <div className=" relative md:hidden  flex justify-center items-center ">
          <article className="relative rounded-2xl w-full border border-white/10 bg-white/6 px-4 py-4 shadow-[0_20px_60px_rgba(0,0,0,0.6)] lg:h-[280px] md:h-[260px] bg-red-500">
            <div className="flex items-start justify-between lg:mb-8 mb-4">
              <span className="inline-flex lg:h-9 lg:w-9 h-5 w-5 items-center justify-center rounded-full text-[25px] lg:text-[30px] font-semibold">
                6
              </span>
              <img src="/service/flowicon/card6.svg" alt="Deployment" />
            </div>
            <h3 className="text-[20px] md:text-lg  lg:text-[20px] font-semibold mb-2">
              Deployment & Support
            </h3>
            <p className="text-lg md:text-base lg:text-[18px] text-[#BABABA] leading-[28px]">
              Smooth deployment with monitoring, optimization, and ongoing support for long-term success.
            </p>
          </article>
          {/* <img src='/service/flowicon/leftarrow.svg' alt="icon" className=" md:block hidden lg:w-18 w-13 h-6 absolute right-[-55px] lg:right-[-75px] "  />
          <img src='/service/flowicon/bottomicon.svg' alt="icon" className=" block md:hidden  lg:w-18 w-13 lg:h-15 md:h-13 h-11  absolute lg:bottom-[-60px] md:bottom-[-53px] bottom-[-47px] "  /> */}
          </div>

        </div>
      </div>
    </section>
  );
}