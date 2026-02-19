'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { fadeInUp, fadeInRight } from '@/app/lib/animations';
import Image from 'next/image';
import { products } from '@/app/lib/data/products';
import featuresData from '@/app/lib/data/about-data/feature-data';
export default function Products() {
  const [activeProduct, setActiveProduct] = useState(featuresData[0]);

  return (
    <section id="products" className="lg:py-24 md:py-15 py-10 bg-[#111517] text-white " style={{ overflow:'clip'}}>
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
              <p className='text-[22px] font-semibold leading-[36px] '>Why Choose Technogetic</p>
              <h2 className=" font-inter text-[25px] sm:text-xl md:text-4xl lg:text-[44px] font-semibold lg:leading-tight md:leading-[50px] leading-[32px] tracking-tight mb-0 sm:mb-6">
              Scalable Solutions for Modern Businesses
              </h2>
              <p className='text-lg font-normal leading-[28px]'>Technogetic partners with businesses to deliver reliable, scalable digital solutions through innovation, clear communication, modern technology, and a strong focus on long-term growth.</p>
            </motion.div>

            {/* <motion.div
              initial="hidden "
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              transition={{ delay: 0 }}
              className="relative w-full rounded-2xl  border border-white/10 shadow-2xl bg-white hidden lg:block "
            >
              <Image
                key={activeProduct.id}
                src={activeProduct.image}
                alt={activeProduct.title}
                width={800}
                height={600}
                className="w-full h-auto object-cover object-top transition-opacity duration-300 rounded-2xl"
                sizes="(max-width: 1024px) 100vw, 50vw"
                loading="lazy"
              />
            </motion.div> */}
          </div>

          {/* --- Right Column: FLOWING LIST --- */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInRight}
            className=" pb-10"
          >
            {featuresData.map((product) => (
              <div 
                key={product.id}
                onMouseEnter={() => setActiveProduct(product)}
                className="group p-6 mb-4  bg-[#ffff] border-b border-white/50 hover:bg-[#000] transition-all duration-300 cursor-pointer rounded-xl "
              >
                <div className="flex justify-start hover:fill-white   gap-2 items-start mb-4">
                   {/* Arrow Icon */}
                   <span className="
  text-[#000] 
  group-hover:text-white 
  transition-all 
  transform 
  group-hover:translate-x-1 
  duration-300
">
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="25"
    height="25"
    viewBox="0 0 25 25"
    fill="none"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M0 12.5C0 9.18479 1.31696 6.00537 3.66117 3.66117C6.00537 1.31696 9.18479 0 12.5 0C15.8152 0 18.9946 1.31696 21.3388 3.66117C23.683 6.00537 25 9.18479 25 12.5C25 15.8152 23.683 18.9946 21.3388 21.3388C18.9946 23.683 15.8152 25 12.5 25C9.18479 25 6.00537 23.683 3.66117 21.3388C1.31696 18.9946 0 15.8152 0 12.5ZM11.7867 17.85L18.9833 8.85333L17.6833 7.81333L11.5467 15.4817L7.2 11.86L6.13333 13.14L11.7867 17.85Z"
      fill="currentColor"
    />
  </svg>
</span>
                  <h3 className="text-xl font-inter font-semibold text-black group-hover:text-white transition-colors">
                    {product.title}
                  </h3>
                 
                </div>
                <p className="text-[#595959] font-inter group-hover:text-white text-base leading-relaxed transition-colors duration-300">
                  {product.description}
                </p>
                <p className="text-black font-inter group-hover:text-white text-sm leading-relaxed transition-colors duration-300 mt-2 ">
                  {/* <span className="font-bold">Tech Stack:</span> {product.TechStack} */}
                </p>
              </div>
            ))}
          </motion.div>

        </div>
      </div>
    </section>
  );
}