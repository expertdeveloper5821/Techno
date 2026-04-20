import type { FC, SVGProps } from 'react';
import Image from 'next/image';
import { whatWeDoData } from '@/app/lib/data/service-what-we-do';
import ChevronRightIconImport from '@/app/lib/icon/chevron-right-icon';
type IconProps = SVGProps<SVGSVGElement> & { width?: number; height?: number; color?: string };
const ChevronRightIcon = ChevronRightIconImport as FC<IconProps>;
export default function WhatWeDo() {
  const { heading, description, cards } = whatWeDoData;
  const topOffsetMap = [
    '!top-10',
    '!top-16',
    '!top-24',
    '!top-32',
  ];
  return (
    <section className="lg:pt-20 lg:pb-24 md:pt-15 md:pb-15  pt-10 pb-10 bg-[#000000] text-white w-full mx-auto px-4 sm:px-6 lg:px-6">
      <div className=" mx-auto ">
        {/* Top heading and description */}
        <div className="  flex justify-center items-center flex-col mx-auto  mb-10 md:mb-14">
          <h2 className="text-[25px] md:text-4xl lg:text-[44px] font-semibold text-white max-w-4xl  text-center mb-4 sm:mb-6">
            {heading}
          </h2>
          <p className="text-base sm:text-base md:text-lg  text-center max-w-5xl leading-[22px] sm:leading-[28px] text-[#ffff]">
            {description}
          </p>


        </div>


        {/* Cards */}

        {cards.map((card, cardIndex) => (
          <div
            key={card.title + cardIndex}
            className={`bg-[#0094DB] rounded-[20px] px-2 py-4 mb-2 sm:px-4  md:px-4 lg:px-4  shadow-[0_20px_60px_rgba(0,0,0,0.5)] lg:sticky ${topOffsetMap[cardIndex]} `}
          >
            <div className="flex flex-col lg:flex-row gap-4 sm:gap-2 lg:gap-10 items-stretch">
              {/* Left image */}
              <div className="relative lg:w-[32%] h-97 sm:h-94 md:h-94 lg:h-auto rounded-[12px] overflow-clip">
                <Image
                  src={card.imageSrc}
                  alt={card.imageAlt}
                  fill
                  className="object-cover"
                  sizes="(min-width: 1024px) 32vw, 100vw"
                />
              </div>

              {/* Right content */}
              <div className="lg:w-[68%] lg:py-12 md:py-2  sm:py-2 py-0 flex flex-col justify-between text-white">
                {/* Title and intro */}
                <div className='flex  gap-4 '>
                  <div className="flex items-center justify-center gap-3 ">
                    <div className="   lg:w-15 lg:h-15 w-10 h-10 rounded-full flex items-center justify-center">
                      <Image
                        src={card.icon}
                        alt={`${card.title} icon`}
                        width={60}
                        height={60}
                        className="w-full h-full object-contain"
                        loading="lazy"
                      />
                    </div>

                  </div>

                  <div className='flex flex-col sm:gap-2 gap-3 lg:mb-8 mb-0' >
                    {/* <div className=" sm:hidden  w-35 h-10 rounded-full bg-white/10 flex items-center justify-center">
                        <img src={card.icon} alt="icon " className='w-full h-full' />
                      </div> */}
                    <h3 className="font-inter text-xl sm:text-2xl md:text-[36px] font-medium sm:font-semibold  tracking-[0.03em]">
                      {card.title}
                    </h3>
                    <p className="text-sm sm:text-base md:text-[18px] text-[#F5F5F5] sm:leading-relaxed leading-[22px]">
                      {card.description}
                    </p>


                  </div>
                </div>
                <div className=' lg:block hidden w-full h-px text-white bg-white mt-8 '></div>

                {/* Services list */}
                <div className="mt-4 md:mt-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-y-3 gap-x-10 text-sm sm:text-[15px]">
                    {card.servicesColumns.map((column, columnIndex) => (
                      <ul key={columnIndex} className="sm:space-y-4 space-y-4 ">
                        {column.items.map((item, itemIndex) => (
                          <li key={itemIndex} className="flex items-center gap-2">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                            </svg>
                            <span className='text-lg sm:text-[20px]' >{item.label}</span>
                          </li>
                        ))}
                      </ul>
                    ))}
                  </div>
                </div>

                {/* Button */}
                <div className="mt-10">
                  <a
                    href="#services"
                    className="group shrink-0 text-lg inline-flex items-center justify-center gap-2 sm:px-8  sm:py-3.5 px-4 py-2  font-semibold text-[#000000] bg-white rounded-full hover:bg-white/95 transition-all duration-200 shadow-lg whitespace-nowrap mt-0"
                  >
                    Talk to us  <ChevronRightIcon width={7} height={11} color="#000000" className="inline-block transition-transform duration-500 ease-out group-hover:translate-x-0.5" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        ))}

      </div>
    </section>
  );
}

