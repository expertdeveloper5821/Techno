import React from 'react'
import Image from 'next/image'
import { FaLinkedinIn, FaInstagram, FaFacebookF } from "react-icons/fa";


// import * as React from "react";
const SVGComponentright = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    width={28}
    height={20}
    viewBox="0 0 28 20"
    fill="none"
    {...props}
  >
    <mask
      id="mask0_1281_25544"
      style={{
        maskType: "alpha",
      }}
      maskUnits="userSpaceOnUse"
      x={0}
      y={0}
      width={28}
      height={20}
    >
      <rect
        width={28}
        height={20}
        transform="matrix(-1 0 0 1 28 0)"
        fill="url(#pattern0_1281_25544)"
      />
    </mask>
    <g mask="url(#mask0_1281_25544)">
      <rect
        x={-6.66602}
        y={-4.83496}
        width={44.885}
        height={33.3306}
        fill="#0181EC"
      />
    </g>
    <defs>
      <pattern
        id="pattern0_1281_25544"
        patternContentUnits="objectBoundingBox"
        width={1}
        height={1}
      >
        <use xlinkHref="#image0_1281_25544" transform="scale(0.0357143 0.05)" />
      </pattern>
      <image
        id="image0_1281_25544"
        width={28}
        height={20}
        preserveAspectRatio="none"
        xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAUCAYAAACeXl35AAABRklEQVRIiZ1VbXXDMAyU80IgFEwhFEKhFEKhFEohg9BC6CAsEFoICYTbc5+2esr5a/crL9HlZOksCQOACcAC4IEjJkpSAJgBXAFslsmCBw3OgQoCGAF85Yghro/FROQuImPuBCkx5Q6l2D56vhKxDxH5FJE9ercaMU/E9ohLM5xJBebK0y2Gt+mJsyRrjqVSzDcnqs228JWCF8O7lzidiFjX3ZxzzxpB0vNbidAT0qqODYl4NcnqnNsJ3yb71OpMaqLA+2ucUAZTFnZpN9Yb0gprIKg/xpxgDueCYApv5zYKQsvdKogfQ3XmUtfg1Bj/2+/Q385OjgrEE4VPkjRegq2kGP/jNvbxFPEGtoZSiAV9JfFBkmVzmOFiiWNBNDmUK0TDnjyuLi1RuLxWOLzLzldN2C7v8J8zFUv8oHkZK/d1BQ4fROQbdliH54sKfzwAAAAASUVORK5CYII="
      />
    </defs>
  </svg>
);
// export default SVGComponentright;



// import * as React from "react";
const SVGComponent = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    width={28}
    height={20}
    viewBox="0 0 28 20"
    fill="none"
    {...props}
  >
    <mask
      id="mask0_1281_25541"
      style={{
        maskType: "alpha",
      }}
      maskUnits="userSpaceOnUse"
      x={0}
      y={0}
      width={28}
      height={20}
    >
      <rect width={28} height={20} fill="url(#pattern0_1281_25541)" />
    </mask>
    <g mask="url(#mask0_1281_25541)">
      <rect
        width={44.885}
        height={33.3306}
        transform="matrix(-1 0 0 1 34.666 -4.83496)"
        fill="#0181EC"
      />
    </g>
    <defs>
      <pattern
        id="pattern0_1281_25541"
        patternContentUnits="objectBoundingBox"
        width={1}
        height={1}
      >
        <use xlinkHref="#image0_1281_25541" transform="scale(0.0357143 0.05)" />
      </pattern>
      <image
        id="image0_1281_25541"
        width={28}
        height={20}
        preserveAspectRatio="none"
        xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAUCAYAAACeXl35AAABRklEQVRIiZ1VbXXDMAyU80IgFEwhFEKhFEKhFEohg9BC6CAsEFoICYTbc5+2esr5a/crL9HlZOksCQOACcAC4IEjJkpSAJgBXAFslsmCBw3OgQoCGAF85Yghro/FROQuImPuBCkx5Q6l2D56vhKxDxH5FJE9ercaMU/E9ohLM5xJBebK0y2Gt+mJsyRrjqVSzDcnqs228JWCF8O7lzidiFjX3ZxzzxpB0vNbidAT0qqODYl4NcnqnNsJ3yb71OpMaqLA+2ucUAZTFnZpN9Yb0gprIKg/xpxgDueCYApv5zYKQsvdKogfQ3XmUtfg1Bj/2+/Q385OjgrEE4VPkjRegq2kGP/jNvbxFPEGtoZSiAV9JfFBkmVzmOFiiWNBNDmUK0TDnjyuLi1RuLxWOLzLzldN2C7v8J8zFUv8oHkZK/d1BQ4fROQbdliH54sKfzwAAAAASUVORK5CYII="
      />
    </defs>
  </svg>
);



function Vision() {
  return (
    <section
      className="relative overflow-hidden      flex flex-col justify-start      bg-[#010101] "

    >
      <div className="flex flex-col lg:flex-row">

        {/* Left Image Section */}
        <div
          className="relative h-[260px] bg-center bg-cover  w-full lg:h-auto lg:w-1/3 lg:block hidden"
          style={{ backgroundImage: "url('/About/vision/vision.png')" }}
        >


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
          <div className=' px-14'>
            {/* Quote icons */}
            <span className="absolute left-2 md:left-16 top-27 md:text-6xl text-4xl text-[#00A3E0]"><SVGComponent /></span>
            <span className="absolute right-2 bottom-30 md:right-20 md:text-6xl text-4xl text-[#00A3E0]"><SVGComponentright /></span>

            <p className="mb-4 text-[18px] leading-[28px] text-white/90 md:text-[20px]">
              Founded with a mission to simplify technology for businesses,
              Technogetic was created to help companies turn complex ideas into
              scalable digital solutions.
            </p>

            <p className="mb-6 text-base leading-[28px] text-white/80 md:text-[20px]">
              We focus on building reliable, future-ready software that aligns
              with business goals, not just technical requirements.
            </p>
          </div>

          {/* Author */}
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 overflow-hidden rounded-full bg-gray-600">
              <Image
                src="/About/vision/profile.svg" // replace with avatar
                alt="Saksham Agarwal"
                width={50}
                height={50}
                className="object-cover  "
              />
            </div>

            <div>
              <p className="text-lg md:text-[22px] mb-1 font-semibold">Saksham Agarwal</p>
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