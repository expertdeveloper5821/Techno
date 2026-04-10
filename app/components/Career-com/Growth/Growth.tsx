// "use client";

// import { useEffect, useRef, useState } from "react";

// const industries = [

//   {
//     title: "eCommerce",
//     blackicon : '/service/industriesicon/card3black.svg',
//     desc: "Developing scalable eCommerce platforms that deliver seamless shopping experiences and growth.",
//     icon:'/service/industriesicon/card3.svg',
//   },
//   {
//     title: "Fintech",
//     blackicon : '/service/industriesicon/card2black.svg',
//     desc: "Building secure, compliant fintech solutions that simplify transactions and enhance financial access.",
//     icon:'/service/industriesicon/card2.svg',
//   },
//   {
//     title: "Transportation & Logistics",
//     blackicon : '/service/industriesicon/card4black.svg',
//     desc: "Optimizing logistics operations with smart digital solutions for efficiency and real-time tracking.",
//     icon:'/service/industriesicon/card4.svg',
//   },
//   {
//     title: "Healthcare",
//     blackicon : '/service/industriesicon/card1black.svg',
//     desc: "Designing reliable digital systems that streamline operations and improve patient care experiences.",
//     icon:'/service/industriesicon/card1.svg',
//   },
//   {
//     title: "Telecom",
//     blackicon : '/service/industriesicon/telecom-black.svg',
//     desc: "Creating robust digital platforms that support connectivity, scalability, and customer satisfaction.",
//     icon:'/service/industriesicon/telecom.svg',
//   },
//   {
//     title: "Advertising & Marketing",
//     blackicon : '/service/industriesicon/advertising-black.svg',
//     desc: "Crafting data-driven digital strategies that boost brand visibility and customer engagement.",
//     icon:'/service/industriesicon/advertising.svg',
//   },

//   {
//     title: "Media & Entertainment",
//     blackicon : '/service/industriesicon/media-black.svg',
//     desc: "Creating immersive digital experiences that engage audiences and amplify storytelling across platforms.",
//     icon:'/service/industriesicon/media.svg',
//   },
//   {
//     title: "Public Sector & Government",
//     blackicon : '/service/industriesicon/gov-black.svg',
//     desc: "Delivering secure, scalable digital solutions that enhance governance, transparency, and citizen services.",
//     icon:'/service/industriesicon/gov.svg',
//   },



//   {
//     title: "EdTech",
//     blackicon : '/service/industriesicon/card5black.svg',
//     desc: "Building interactive learning platforms that improve engagement, accessibility, and educational outcomes.",
//     icon:'/service/industriesicon/card5.svg',
//   },
//   {
//     title: "On‑Demand Platforms",
//     blackicon : '/service/industriesicon/card8black.svg',
//     desc: "Scalable on‑demand applications connecting users with real‑time services.",
//     icon:'/service/industriesicon/card8.svg',
//   },
//   {
//     title: "Sports",
//     blackicon : '/service/industriesicon/sports-black.svg',
//     desc: "Designing engaging digital experiences that connect fans, athletes, and sports organizations.",
//     icon:'/service/industriesicon/sports.svg',
//   },
//   {
//     title: "Gaming",
//     blackicon : '/service/industriesicon/card7black.svg',
//     desc: "High‑performance gaming platforms powered by scalable cloud technologies.",
//     icon:'/service/industriesicon/card7.svg',
//   },

// ];

// export default function IndustriesSection() {
//   const sectionRef = useRef<HTMLElement>(null);
//   const trackRef = useRef<HTMLDivElement>(null);
//   const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
//   const [stickyStates, setStickyStates] = useState<number[]>(
//     Array(industries.length).fill(-1)
//   );

//   useEffect(() => {
//     const section = sectionRef.current;
//     const track = trackRef.current;
//     if (!section || !track) return;

//     const isDesktop = () => window.innerWidth >= 1024;

//     let start = 0;
//     let end = 0;
//     let maxTranslate = 0;

//     const calculate = () => {
//       if (!isDesktop()) {
//         track.style.transform = "none";
//         return;
//       }

//       const padding = 48;
//       const viewportWidth = window.innerWidth - padding;
//       maxTranslate = Math.max(0, track.scrollWidth - viewportWidth +54 );
//       start = section.offsetTop +500 ;
//       end = start + section.offsetHeight - window.innerHeight ;
//     };

//     const onScroll = () => {
//       if (!isDesktop()) {
//         const newStates = Array(industries.length).fill(-1);

//         cardsRef.current.forEach((card, index) => {
//           if (!card) return;

//           const rect = card.getBoundingClientRect();
//           const cardTop = rect.top;
//           const cardHeight = rect.height  ;

//           if (cardTop <= 0 && cardTop > -cardHeight) {
//             newStates[index] = 1;
//           }
//         });

//         setStickyStates(newStates);
//         return;
//       }

//       const scrollY = window.scrollY;

//       if (scrollY < start) {
//         track.style.transform = "translate3d(0,0,0)";
//         return;
//       }

//       if (scrollY > end) {
//         track.style.transform = `translate3d(-${maxTranslate}px,0,0)`;
//         return;
//       }

//       const progress = (scrollY - start) / (end - start);
//       track.style.transform = `translate3d(-${maxTranslate * progress}px,0,0)`;
//     };

//     calculate();
//     onScroll();
//     window.addEventListener("scroll", onScroll, { passive: true });
//     window.addEventListener("resize", calculate);

//     return () => {
//       window.removeEventListener("scroll", onScroll);
//       window.removeEventListener("resize", calculate);
//     };
//   }, []);

//   return (
//     <section
//       ref={sectionRef}
//       className="lg:pt-24 lg:pb-24 md:pt-15 md:pb-15 pt-10 pb-10 bg-[#000000] text-white w-full mx-auto px-4 sm:px-6 lg:px-6"
//     >
//       <div className="lg:h-[300vh]">
//         <div className="lg:sticky lg:-top-20 flex flex-col justify-center">
//           <div className="mx-auto w-full">
//             {/* Header */}
//             <div className="text-center max-w-3xl mx-auto mb-14">
//               <h2 className="text-[25px] md:text-4xl lg:text-[44px] font-semibold text-white max-w-4xl text-center mb-6">
//                 Industries We Serve
//               </h2>
//               <p className="text-base sm:text-base md:text-lg text-center max-w-5xl leading-[28px] text-[#ffff]">
//                 We build smart, scalable, and secure digital solutions that help businesses adapt, grow, and succeed in today’s fast‑changing technology landscape.
//               </p>
//             </div>

//             <div className="overflow-clip">
//               <div
//                 ref={trackRef}
//                 className="grid grid-cols-1 sm:grid-cols-2 gap-10 lg:grid-cols-none lg:grid-rows-2 lg:grid-flow-col lg:w-max p-1 will-change-transform"
//               >
//                 {industries.map((item, index) => (
//                   <div
//                     key={item.title}
//                     ref={(el) => {
//                       cardsRef.current[index] = el;
//                     }}
//                     className="group relative rounded-xl border border-white/10 bg-white/6 px-6 py-8 pt-0 transition-all duration-300 hover:border-sky-500/50 hover:shadow-[0_0_30px_rgba(56,189,248,0.15)] w-full lg:w-[calc(100vw/3)] min-w-[260px]"
//                     style={{
//                       zIndex: stickyStates[index] === 1 ? 10 + index : 11 + index,
//                       position: stickyStates[index] === 1 ? "sticky" : "static",
//                       top: stickyStates[index] === 1 ? "0px" : "auto",
//                     }}
//                   >
//                     <div className="flex justify-between ">
//                       {/* Icon */}
//                       <img src={item.icon} alt="icon" className="relative top-[-16px]" />
//                       <img src={item.blackicon} alt="icon" className="" />
//                     </div>
//                     {/* Content */}
//                     <h3 className="text-lg md:text-[20px] leading-[20px] font-semibold mb-4">
//                       {item.title}
//                     </h3>
//                     <p className="text-base md:text-lg text-gray-400 leading-[28px]">
//                       {item.desc}
//                     </p>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }



"use client";

const industries = [
  {
    title: "Learning & Certification Support",
    blackicon: "/career/Growth/verified-black.svg",
    desc: "We support continuous learning through certifications, courses, and training.",
    icon: "/career/Growth/verified.svg",
  },
  {
    title: "Performance-Based Incentives",
    blackicon: "/career/Growth/graph-black.svg",
    desc: "Earn rewards and bonuses based on measurable performance and achievements.",
    icon: "/career/Growth/graph.svg",
  },
  {
    title: "Flexible Work Hours",
    blackicon: "/career/Growth/time-black.svg",
    desc: "Enjoy flexible schedules that promote productivity and work-life balance.",
    icon: "/career/Growth/time.svg",
  },
  {
    title: "Skill Development Programs",
    blackicon: "/career/Growth/men-black.svg",
    desc: "Participate in structured programs designed to enhance technical expertise.",
    icon: "/career/Growth/men.svg",
  },
  {
    title: "Supportive Team Culture",
    blackicon: "/career/Growth/hand-black.svg",
    desc: "Work within a collaborative environment that values respect and teamwork.",
    icon: "/career/Growth/hand.svg",
  },
  {
    title: "Career Progression Opportunities",
    blackicon: "/career/Growth/stair-black.svg",
    desc: "Advance your career through clear growth paths and leadership opportunities.",
    icon: "/career/Growth/stair.svg",
  },
 
];

export default function Growth() {
  return (
    <section className="bg-[#000000] text-white w-full mx-auto lg:pt-24 lg:pb-24 md:pt-15 md:pb-15 pt-10 pb-10">
      <div className="flex flex-col justify-center px-4 sm:px-6 lg:px-6">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <h2  className="text-[25px] md:text-4xl lg:text-[44px] font-semibold text-white max-w-4xl text-center mb-6">
          Your Growth Matters
          </h2>
          <p className="text-base sm:text-base md:text-lg text-center max-w-5xl leading-[28px] text-[#ffff]">
          We create an environment where talent thrives through skill development programs, supportive teamwork, performance recognition, and structured career advancement opportunities.
          </p>
        </div>

        <div className="w-full">
          <div
            className="
              grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-5 gap-y-10
              p-1 py-6
            "
          >
            {industries.map((item) => (
              <div
                key={item.title}
                className="
                  group relative rounded-xl border border-white/10 bg-white/6
                  px-6 py-8 pt-0 transition-all duration-300
                  hover:border-sky-500/50 hover:shadow-[0_0_30px_rgba(56,189,248,0.15)]
                  w-full min-w-[260px]
                "
              >
                <div className="flex justify-between mb-3">
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