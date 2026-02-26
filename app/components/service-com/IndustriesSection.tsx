"use client";

import { FaHeartbeat, FaUniversity, FaShoppingCart, FaTruck, FaGraduationCap, FaHome, FaGamepad, FaBolt } from "react-icons/fa";

const industries = [
  {
    title: "Healthcare",
    desc: "Secure, scalable healthcare solutions improving patient care and operations.",
    icon:'/service/industriesicon/card1.svg',
  },
  {
    title: "Fintech",
    desc: "Innovative, secure financial technology solutions for modern digital banking.",
    icon:'/service/industriesicon/card2.svg',
  },
  {
    title: "Retail & E‑Commerce",
    desc: "Data‑driven retail platforms enhancing customer experience and conversions.",
    icon:'/service/industriesicon/card3.svg',
  },
  {
    title: "Logistics & Supply Chain",
    desc: "Smart logistics systems optimizing operations and supply chain efficiency.",
    icon:'/service/industriesicon/card4.svg',
  },
  {
    title: "Education",
    desc: "Interactive digital learning platforms enabling personalized education experiences.",
    icon:'/service/industriesicon/card5.svg',
  },
  {
    title: "Real Estate",
    desc: "Technology solutions streamlining property management and transactions.",
    icon:'/service/industriesicon/card6.svg',
  },
  {
    title: "Gaming",
    desc: "High‑performance gaming platforms powered by scalable cloud technologies.",
    icon:'/service/industriesicon/card7.svg',
  },
  {
    title: "On‑Demand Platforms",
    desc: "Scalable on‑demand applications connecting users with real‑time services.",
    icon:'/service/industriesicon/card8.svg',
  },
];

export default function IndustriesSection() {
  return (
    <section className="lg:pt-24 lg:pb-24 md:pt-15 md:pb-15  pt-10 pb-10 bg-[#000000] text-white w-full mx-auto px-4 sm:px-6 lg:px-6">
      <div className="mx-auto ">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <h2 className="text-[25px] md:text-4xl lg:text-[44px] font-semibold text-white max-w-4xl  text-center mb-6">
            Industries We Serve
          </h2>
          <p className="text-base sm:text-base md:text-lg  text-center max-w-5xl  leading-[28px] text-[#ffff]">
            We build smart, scalable, and secure digital solutions that help businesses adapt, grow, and succeed in today’s fast‑changing technology landscape.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {industries.map((item) => (
            <div
              key={item.title}
              className="group relative rounded-xl border border-white/10 bg-white/6 px-6 py-8 transition-all duration-300 hover:border-sky-500/50 hover:shadow-[0_0_30px_rgba(56,189,248,0.15)]"
            >
              {/* Icon */}
              
              <img src={item.icon} alt="icon" className=" relative top-[-48px] " />

              {/* Content */}
              <h3 className="text-lg md:text-[20px] leading-[20px] font-semibold mb-4">{item.title}</h3>
              <p className="text-base md:text-lg text-gray-400 leading-[28px]">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
