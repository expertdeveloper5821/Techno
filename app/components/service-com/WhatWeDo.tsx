import React from 'react';
import Image from 'next/image';
import { whatWeDoData } from '@/app/lib/data/service-what-we-do';
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
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 ">
        {/* Top heading and description */}
        <div className="max-w-3xl mx-auto text-center mb-10 md:mb-14">
          <h2 className="font-inter text-[26px] sm:text-[32px] md:text-[36px] font-semibold tracking-[0.03em] text-white mb-4">
            {heading}
          </h2>
          <p className="text-sm sm:text-base md:text-lg leading-relaxed text-[#E5E5E5]">
            {description}
          </p>
        </div>

        {/* Cards */}
       
          {cards.map((card, cardIndex) => (
            <div
              key={card.title + cardIndex}
              className={`bg-[#0094DB] rounded-[32px] px-4 py-6 sm:px-6 sm:py-8 md:px-10 md:py-10 lg:px-12 lg:py-12 shadow-[0_20px_60px_rgba(0,0,0,0.5)] sticky ${topOffsetMap[cardIndex]} `}
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
                <div className="lg:w-[68%] flex flex-col justify-between text-white">
                  {/* Title and intro */}
                  <div>
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-full border border-white/30 bg-white/10 flex items-center justify-center">
                        <img src={card.icon} alt="icon " className='w-full h-full' />
                      </div>
                      <h3 className="font-inter text-xl sm:text-2xl md:text-[26px] font-semibold tracking-[0.03em]">
                        {card.title}
                      </h3>
                    </div>
                    <p className="text-sm sm:text-base md:text-[15px] text-[#F5F5F5] max-w-xl leading-relaxed">
                      {card.description}
                    </p>
                  </div>

                  {/* Services list */}
                  <div className="mt-6 md:mt-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-y-3 gap-x-10 text-sm sm:text-[15px]">
                      {card.servicesColumns.map((column, columnIndex) => (
                        <ul key={columnIndex} className="space-y-2">
                          {column.items.map((item, itemIndex) => (
                            <li key={itemIndex} className="flex items-start gap-2">
                              <span className="mt-[7px] inline-block w-1.5 h-1.5 rounded-full bg-white" />
                              <span>{item.label}</span>
                            </li>
                          ))}
                        </ul>
                      ))}
                    </div>
                  </div>

                  {/* Button */}
                  <div className="mt-8">
                    <button
                      type="button"
                      className="inline-flex items-center gap-2 rounded-full bg-white text-[#0094DB] px-6 py-2.5 text-sm sm:text-base font-semibold shadow-lg hover:bg-[#F5F9FF] transition-colors"
                    >
                      {card.buttonLabel}
                      <span className="w-4 h-4 rounded-full bg-[#0094DB] text-white flex items-center justify-center text-[10px]">
                        &gt;
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
   
      </div>
    </section>
  );
}

