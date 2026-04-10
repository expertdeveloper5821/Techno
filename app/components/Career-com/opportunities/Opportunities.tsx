"use client";

import ChevronRightIcon from "@/app/lib/icon/chevron-right-icon";
interface JobOpening {
  title: string;
  experience: string;
  type: string;
  location: string;
  description: string;
}

const openings: JobOpening[] = [
  {
    title: "Backend Developer",
    experience: "1-3 Years",
    type: "Full-Time",
    location: "Remote",
    description:
      "We are looking for a skilled backend developer to build secure, scalable APIs and optimize server-side performance for high-quality digital applications.",
  },
  {
    title: "Full Stack Developer",
    experience: "1-3 Years",
    type: "Full-Time",
    location: "Remote",
    description:
      "Join our team to develop end-to-end web applications, manage databases, and deliver seamless, scalable digital experiences.",
  },
  {
    title: "UI/UX Designer",
    experience: "1-3 Years",
    type: "Full-Time",
    location: "Remote",
    description:
      "We seek a creative designer to craft intuitive user experiences and visually engaging interfaces for modern digital products.",
  },
  {
    title: "Digital Marketing",
    experience: "1-3 Years",
    type: "Full-Time",
    location: "Remote",
    description:
      "Help drive growth through SEO, paid campaigns, and data-driven marketing strategies that increase visibility and conversions.",
  },
];

export default function Opportunities() {
  return (
    <section id="about" className="lg:pt-24 lg:pb-24 md:pt-15 md:pb-15  pt-10 pb-10 bg-[#000000] text-white w-full mx-auto px-4 sm:px-6 lg:px-6">
      <div className="mx-auto">
        <div className="mb-18 grid items-start gap-6 lg:grid-cols-2">
          <h2 className="text-[36px] font-semibold leading-[60px] text-[#FFFFFF]  md:text-[44px]">
            Current Opportunities
          </h2>
          <p className=" text-base leading-7 tracking-[1%] text-[#FFFFFF] md:text-lg">
            We are always looking for passionate and talented individuals ready
            to make a difference and contribute innovative ideas to impactful
            digital projects, collaborate with dynamic teams, and grow within a
            supportive and forward-thinking environment.
          </p>
        </div>

        <div className="space-y-12">
          {openings.map((opening , index ) => (
            <article
            key={opening.title}
            className="rounded-[12px] bg-[#027EBA] px-5 py-8 sm:px-8 lg:px-10 sticky"
            style={{
              zIndex: index * 2,
              top: `${index * 5}px`,
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
                    <p className="font-normal text-lg text-[#FFFFFF] tracking-[1%] leading-7" >
                      <span className="font-normal text-lg text-[#FFFFFF] tracking-[1%] leading-7" >Experience:</span>{" "}
                      {opening.experience}
                    </p>
                    <p className="font-normal text-lg text-[#FFFFFF] tracking-[1%] leading-7" >
                      <span className="font-normal text-lg text-[#FFFFFF] tracking-[1%] leading-7" >Type:</span> {opening.type}
                    </p>
                    <p className="font-normal text-lg text-[#FFFFFF] tracking-[1%] leading-7" >
                      <span className="font-normal text-lg text-[#FFFFFF] tracking-[1%] leading-7" >Location:</span>{" "}
                      {opening.location}
                    </p>
                  </div>
                </div>

                <p className="font-normal text-lg text-[#FFFFFF] tracking-[1%] leading-7" >
                  {opening.description}
                </p>

                <div className="lg:pt-2">
                <div className="lg:mt-10 mt-3">
                  <a
                    href="#services"
                    className="group shrink-0 text-lg inline-flex items-center justify-center gap-2 sm:px-8  sm:py-3.5 px-4 py-2  font-semibold text-[#000000] bg-white rounded-full hover:bg-white/95 transition-all duration-200 shadow-lg whitespace-nowrap mt-0"
                  >
                    Apply Now <ChevronRightIcon width={7} height={11} color="#000000" className="inline-block transition-transform duration-500 ease-out group-hover:translate-x-0.5" />
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
