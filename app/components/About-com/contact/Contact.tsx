import React from 'react'
import Image from 'next/image'
import ChevronRightIcon from '@/app/lib/icon/chevron-right-icon'
function Contact() {
  return (
    <>
    <section
                className="relative overflow-hidden min-h-screen flex flex-col justify-start lg:pt-24 lg:pb-24 md:pt-15 md:pb-15 pt-10 pb-10 bg-[#161616] "

            >
                <div className='absolute md:bottom-20  bottom-0 ' >

<img src="/About/hero/hero.svg" alt="Hero illustration" className='w-ful ' />
</div>
<div className="w-full flex  flex-col gap-0 lg:gap-0   mx-auto  px-4 sm:px-6 lg:px-6 ">
<div className="mx-auto w-full flex flex-col items-center  gap-0 md:flex-row bg-[#0094DB]  rounded-2xl ">
        
        {/* Left Content */}
        <div className=" text-white p-10 pr-0">
          <h2 className="mb-4 text-2xl font-semibold md:leading-snug leading-[30px]   md:text-[44px]">
            Looking for a digital partner who understands your goals and works
            toward real results?
          </h2>

          <p className="mb-6 text-[20px] text-white/90 md:text-base leading-relaxed">
            Share your idea with us, and let Technogetic turn it into a powerful solution.
          </p> 

          <a
            href="#services"
            className="group shrink-0 inline-flex items-center justify-center gap-2 sm:px-8  sm:py-3.5 px-4 py-2 text-base font-semibold text-[#000000] bg-white rounded-full hover:bg-white/95 transition-all duration-200 shadow-lg whitespace-nowrap mt-0"
          >
           Let’s Get Started <ChevronRightIcon width={7} height={11} color="#000000" className="inline-block transition-transform duration-500 ease-out group-hover:translate-x-0.5" />
          </a>
        </div>

        {/* Right Image */}
        <div className="relative h-[260px] w-full max-w-[320px] md:h-[400px] md:max-w-[380px]  ">
          <Image
            src="/About/contact/contact.png" // replace with your actual image path
            alt="Customer support representative"
            fill
            className="object-fill pt-10 pr-10 h-full"
            priority
          />
        </div>
      </div>
      </div>
            </section>
    
    </>
  )
}

export default Contact