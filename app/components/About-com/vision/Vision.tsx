import React from 'react'
import Image from 'next/image'
import { FaLinkedinIn, FaInstagram, FaFacebookF } from "react-icons/fa";

function Vision() {
    return (
        <section
            className="relative overflow-hidden      flex flex-col justify-start      bg-[#010101] "

        >
            <div className="flex flex-col lg:flex-row">
        
        {/* Left Image Section */}
        <div className="relative h-[260px] bg-[url('/About/vision/vision.png')] bg-center bg-cover  w-full lg:h-auto lg:w-1/3 lg:block hidden" >
       

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/60" />

      {/* Content */}
      <div className="relative z-10 flex flex-col gap-6 p-6 sm:p-8 md:p-8 max-w-xl">
        <h2 className="text-2xl sm:text-3xl md:text-[42px] font-semibold text-white sm:leading-[40px] md:leading-[60px] ">
          Join Our Digital  Community
        </h2>

        <p className="text-sm sm:text-[18px] text-gray-200 leading-relaxed">
          Follow Technogetic for insights, updates, and innovations shaping the future of digital technology.
        </p>

        {/* Social Buttons */}
        <div className="flex flex-wrap gap-2">
          <a
            href="#"
            className="flex items-center gap-2 rounded-full bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 transition"
          >
             Linkedin in <FaLinkedinIn />
          </a>

          <a
            href="#"
            className="flex items-center gap-2 rounded-full bg-gradient-to-r from-pink-500 to-orange-500 px-4 py-2 text-sm font-medium text-white hover:opacity-90 transition"
          >
            Instagram  <FaInstagram />
          </a>

          <a
            href="#"
            className="flex items-center gap-2 rounded-full bg-blue-500 px-4 py-2 text-sm font-medium text-white hover:bg-blue-600 transition"
          >
          Facebook    <FaFacebookF />
          </a>
        </div>
      </div>
        </div>

        {/* Right Content Section */}
        <div className="relative flex w-full flex-col justify-center bg-black px-6 py-10 text-white md:px-15 lg:w-2/3">
          
<h1 className='mb-10 text-[25px] sm:text-[32px] leading-[25px] sm:leading-[40px] '>A Vision That Guides Everything We Build</h1>

          {/* Quote icons */}
          <span className="absolute left-2 md:left-8 top-24 md:text-6xl text-4xl text-[#00A3E0]">“</span>
          <span className="absolute right-2 bottom-6 md:right-8 md:text-6xl text-4xl text-[#00A3E0]">”</span>

          <p className="mb-4 text-base leading-[28px] text-white/90 md:text-[20px]">
            Founded with a mission to simplify technology for businesses,
            Technogetic was created to help companies turn complex ideas into
            scalable digital solutions.
          </p>

          <p className="mb-6 text-base leading-[28px] text-white/80 md:text-[20px]">
            We focus on building reliable, future-ready software that aligns
            with business goals, not just technical requirements.
          </p>

          {/* Author */}
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 overflow-hidden rounded-full bg-gray-600">
              <Image
                src="/About/vision/profile.svg" // replace with avatar
                alt="Saksham Agarwal"
                width={40}
                height={40}
                className="object-cover  "
              />
            </div>

            <div>
              <p className="text-lg md:text-[22px] font-semibold">Saksham Agarwal</p>
              <p className="   text:base md:text-lg text-white/70">
                Founder & CEO, Technogetic
              </p>
            </div>
          </div>
        </div>
      </div>



        </section>
    )
}

export default Vision