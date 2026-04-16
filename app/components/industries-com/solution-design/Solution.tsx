'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { fadeInUp, fadeInRight } from '@/app/lib/animations';
import Image from 'next/image';
import { products } from '@/app/lib/data/products';
import featuresData from '@/app/lib/data/about-data/feature-data';
export default function Solution() {
  const [activeProduct, setActiveProduct] = useState(featuresData[0]);
  const stickyTopByIndex: Record<number, number> = {
    0: 24,
    1: 36,
    2: 48,
    3: 50,
  };

  return (
    <section id="products" className="lg:py-24 md:py-15 py-10 bg-[#010101] text-white " style={{ overflow:'clip'}}>
      <div className="w-full mx-auto px-4 sm:px-6 lg:px-6">
        
        {/* The Grid container defines the scroll area */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 md:gap-12 lg:gap-20 items-start">
          
          {/* --- Left Column: STICKY --- */}
          {/* 
              sticky + top-32 makes this side stay on screen 
              while the right side moves as you scroll the page.
          */}
          <div className="lg:sticky lg:top-5 h-fit">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="lg:mb-10 md:mb-5 mb-5"
            >
              {/* <p className='text-[22px] font-semibold mb-2 leading-[36px] '>Why Choose Technogetic</p> */}
              <h2 className=" font-inter text-[25px] sm:text-xl md:text-4xl lg:text-[44px] font-semibold lg:leading-tight md:leading-[50px] leading-[32px] tracking-tight mb-0 sm:mb-6">
              Solutions Designed for Real E-Commerce Business Needs
              </h2>
              <p className='text-lg font-normal leading-[28px]'>We build practical e-commerce solutions that solve real operational challenges, improve performance, and help businesses scale smoothly as demand grows.</p>
            </motion.div>

                     </div>

          {/* --- Right Column: FLOWING LIST --- */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInRight}
            className=" pb-10 space-y-20"
          >
            {featuresData.map((product,index) => {
              const stickyTop = stickyTopByIndex[index] ?? 56;
              return (
              <div 
                key={product.id}
                onMouseEnter={() => setActiveProduct(product)}
                className={` flex  flex-col gap-4  group p-6   bg-[#000000]  border border-white/50  transition-all duration-300 cursor-pointer rounded-xl  sticky` }   style={{
                    top: `${stickyTop}px`,
                    zIndex: index + 2,               // dynamic → inline style
                  }}
              >

                <h1 className='font-medium text-[#0094DB] text-[32px] leading-[40px] tracking-[1%]' >{index+1}</h1>
       
    

                  <h3 className="text-2xl tracking-normal leading-7 font-inter  font-semibold text-[#0094DB] group-hover:text-white transition-colors">
                    {product.title}
                  </h3>
                 
                
                <p className="text-[#FFFFFF] font-inter text-lg leading-7 tracking-[1%] transition-colors duration-300 ">
                  {product.description}
                </p>
                <p className="text-black font-inter group-hover:text-white text-sm leading-relaxed transition-colors duration-300 mt-2 ">
                  {/* <span className="font-bold">Tech Stack:</span> {product.TechStack} */}
                </p>
              </div>
            )})}
          </motion.div>

        </div>
      </div>
    </section>
  );
}