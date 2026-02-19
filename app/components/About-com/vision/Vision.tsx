import React from 'react'
import Image from 'next/image'
function Vision() {
    return (
        <section
            className="relative overflow-hidden      flex flex-col justify-start      bg-[#010101] "

        >
            <div className="flex flex-col lg:flex-row">
        
        {/* Left Image Section */}
        <div className="relative h-[260px] w-full lg:h-auto lg:w-1/3">
          <Image
            src="/About/vision/vision.png" // replace with your image path
            alt="Team working in office"
            fill
            className="lg:object-cover object-contain "
            priority
          />
        </div>

        {/* Right Content Section */}
        <div className="relative flex w-full flex-col justify-center bg-black px-6 py-10 text-white md:px-15 lg:w-2/3">
          
          {/* Quote icons */}
          <span className="absolute left-2 md:left-8 top-6 text-4xl text-[#00A3E0]">“</span>
          <span className="absolute right-2 bottom-6 md:right-8 text-4xl text-[#00A3E0]">”</span>

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
                className="object-cover"
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