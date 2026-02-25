import React from 'react';
import Image from 'next/image';
import { whatWeDoData } from '@/app/lib/data/service-what-we-do';
import ChevronRightIconImport from '@/app/lib/icon/chevron-right-icon';
type IconProps = React.SVGProps<SVGSVGElement> & { width?: number; height?: number; color?: string };
const ChevronRightIcon = ChevronRightIconImport as React.FC<IconProps>;
export default function WhatWeDo() {
  const { heading, description, cards } = whatWeDoData;
  const topOffsetMap = [
    '!top-10',
    '!top-16',
    '!top-24',
    '!top-32',
  ];
  return (
    <section className="bg-[#020617] py-16 md:py-24">
      <div className=" mx-auto px-4 sm:px-6 lg:px-8 ">
        {/* Top heading and description */}
        <div className="max-w-3xl mx-auto text-center mb-10 md:mb-14">
          <h2 className="font-inter text-[26px] sm:text-[32px] md:text-[36px] font-semibold tracking-[0.03em] text-white mb-4">
            {heading}
          </h2>
          <p className="text-sm sm:text-base md:text-lg leading-[28px] text-[#E5E5E5]">
            {description}
          </p>

          
        </div>


        {/* Cards */}
       
          {cards.map((card, cardIndex) => (
            <div
              key={card.title + cardIndex}
              className={`bg-[#0094DB] rounded-[32px] px-4 py-4 mb-2 sm:px-6  md:px-10  lg:px-12  shadow-[0_20px_60px_rgba(0,0,0,0.5)] sticky ${topOffsetMap[cardIndex]} `}
            >
              <div className="flex flex-col lg:flex-row gap-8 lg:gap-10 items-stretch">
                {/* Left image */}
                <div className="relative lg:w-[32%] h-52 sm:h-64 lg:h-auto rounded-2xl overflow-clip">
                  <Image
                    src={card.imageSrc}
                    alt={card.imageAlt}
                    fill
                    className="object-cover"
                    sizes="(min-width: 1024px) 32vw, 100vw"
                  />
                </div>

                {/* Right content */}
                <div className="lg:w-[68%] lg:py-12 md:py-10  sm:py-8 py-6 flex flex-col justify-between text-white">
                  {/* Title and intro */}
                  <div>
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-full border border-white/30 bg-white/10 flex items-center justify-center">
                        <img src={card.icon} alt="icon " className='w-full h-full' />
                      </div>
                      <h3 className="font-inter text-xl sm:text-2xl md:text-[36px] font-semibold leading-[40px] tracking-[0.03em]">
                        {card.title}
                      </h3>
                    </div>
       
                  <div className='flex flex-col gap-10 mb-8' >
                    <p className="text-sm sm:text-base md:text-[15px] text-[#F5F5F5] max-w-xl leading-relaxed">
                      {card.description}
                    </p>
                    <div className='w-full h-[1px] text-white bg-white  '></div>
                    </div>
                  </div>

                  {/* Services list */}
                  <div className="mt-6 md:mt-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-y-3 gap-x-10 text-sm sm:text-[15px]">
                      {card.servicesColumns.map((column, columnIndex) => (
                        <ul key={columnIndex} className="space-y-7">
                          {column.items.map((item, itemIndex) => (
                            <li key={itemIndex} className="flex items-center gap-2">
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                    </svg>
                              <span className='text-[20px]' >{item.label}</span>
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
            Explore Services <ChevronRightIcon width={7} height={11} color="#000000" className="inline-block transition-transform duration-500 ease-out group-hover:translate-x-0.5" />
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

