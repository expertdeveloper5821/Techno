import React from 'react'
import {industries} from '@/app/lib/data/about-data/industries'
import Image from 'next/image'

function Industries() {
    return (
        <>
            <section
                className="relative overflow-hidden min-h-screen flex flex-col justify-start lg:pt-24 lg:pb-24 md:pt-15 md:pb-15 pt-10 pb-10 bg-[linear-gradient(to_bottom,#0094DB_0%,#0094DB_85%,#003a5c_95%,#000000_100%)] "

            >
                <div className="w-full flex  flex-col gap-8 lg:gap-6   mx-auto  px-4 sm:px-6 lg:px-6 mb-8">
                    {/* Header: Title + CTA */}

                    <h2 className="text-[25px]  sm:text-xl md:text-4xl lg:text-[44px] font-semibold font-inter text-white lg:leading-[60px] md:leading-[50px] leading-[32px]  max-w-4xl">
                        Industries We Empower with Technical Expertise
                    </h2>
                

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-0!">
                    {industries.map((item) => (
                        <div
                            key={item.id}
                            className="relative rounded-xl border border-white/30 bg-[#018BCE] p-6 text-white"
                        >
                            {/* Number badge */}
                            <span className="absolute top-4 right-4 flex h-8 w-8 items-center justify-center rounded-full border border-white/50 text-sm">
                                {item.id}
                            </span>

                            {/* Icon placeholder */}
                            <div className="mb-4 flex h-10 w-10 items-center justify-center ">
                                {/* Replace with real SVG/icon */}
                                {/* <span className="text-lg">{item.icon}</span> */}
                                <Image
                                src={item.icon}
                                alt='icon'
                                width={800}
                                height={600}

                                />
                            </div>

                            {/* Title */}
                            <h3 className="mb-2 md:text-[28px] text-[20px] font-medium">
                                {item.title}
                            </h3>

                            {/* Description */}
                            <p className="md:text-lg text-base text-white/90 leading-relaxed">
                                {item.description}
                            </p>
                        </div>
                    ))}
                </div>
                </div>




            </section>



        </>
    )
}

export default Industries