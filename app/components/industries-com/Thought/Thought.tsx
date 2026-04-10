import React from 'react'
import Image from 'next/image'
import ChevronRightIcon from '@/app/lib/icon/chevron-right-icon'
function Thought() {
    return (
        <>
            <section id="about" className="lg:pt-24 lg:pb-24 md:pt-15 md:pb-15  pt-10 pb-10 bg-[#000000] text-white w-full mx-auto px-4 sm:px-6 lg:px-6">


                <div className="w-full flex  flex-col gap-0 lg:gap-0   mx-auto  px-4 sm:px-6 lg:px-6 ">
                    <div className="mx-auto overflow-hidden relative w-full flex xl:flex-row flex-col-reverse items-center  gap-0  border border-[#FFFFFF33] b-[#FDFDFD4D]  bg-[#060606]  rounded-[10px] ">
                        {/* Left Content */}
                        <div className=" text-white z-10 xl:w-4/10 w-full p-20 lg:pr-0 xl:h-[450px] bg-[#060606]" style={
                            {
                                boxShadow: '60px 0px 40px 0px #060606',
                            }
                        }>
                            <h2 className="mb-4 text-2xl font-medium   md:leading-[50px] leading-[30px] md:text-4xl  lg:text-[38px] text-[#F5F5F5] tracking-[1%]">
                                Starting From Scratch or Rethinking Your Software?
                            </h2>

                            <p className="mb-6 text-base sm:text-[20px] text-white/90 md:text-base leading-relaxed tracking-[1%]">
                                Through a structured free consultation, we analyze your goals, challenges, and technical direction to ensure confident decision-making.
                            </p>

                            <a
                                href="#services"
                                className="group shrink-0 inline-flex items-center justify-center gap-2 sm:px-8  sm:py-3.5 px-4 py-2 text-base font-semibold text-white bg-[#018FD4] rounded-full hover:bg-white/95 transition-all duration-200 shadow-lg whitespace-nowrap mt-0"
                            >
                                Schedule a free consultation <ChevronRightIcon width={7} height={11} color="#FFFFFF" className="inline-block transition-transform duration-500 ease-out group-hover:translate-x-0.5" />
                            </a>
                        </div>
                        {/* Right Image */}
                        <div className="relative w-8/10 xl:w-6/10 md:h-[450px] mt-20 xl:mt-0  ">
                            <Image
                                src="/industries/men.png" // replace with your actual image path
                                alt="Customer support representative"
                                fill
                                className="object-fit  h-full xl:rounded-0 rounded-xl "
                                priority
                            />
                        </div>
                    </div>
                </div>
            </section>

        </>
    )
}

export default Thought