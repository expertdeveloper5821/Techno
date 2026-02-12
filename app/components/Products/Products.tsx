'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { fadeInUp, fadeInRight } from '@/app/lib/animations';
import Image from 'next/image';
import { products } from '@/app/lib/data/products';

export default function Products() {
  const [activeProduct, setActiveProduct] = useState(products[0]);

  return (
    <section id="products" className="lg:py-24 md:py-15 py-10 bg-[#0000] text-white " style={{ overflow:'clip'}}>
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
              <h2 className=" font-inter text-[25px] sm:text-xl md:text-4xl lg:text-[44px] font-semibold lg:leading-tight md:leading-[50px] leading-[32px] tracking-tight mb-0 sm:mb-6">
                Discover How We Transform Ideas Into Impactful digital Products
              </h2>
            </motion.div>

            <motion.div
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
                className="w-full h-auto object-cover object-top transition-opacity duration-300"
                sizes="(max-width: 1024px) 100vw, 50vw"
                loading="lazy"
              />
            </motion.div>
          </div>

          {/* --- Right Column: FLOWING LIST --- */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInRight}
            className=" pb-10"
          >
            {products.map((product) => (
              <div 
                key={product.id}
                onMouseEnter={() => setActiveProduct(product)}
                className="group p-6  bg-[#222] border-b border-white/50 hover:bg-[#0094DB] transition-all duration-300 cursor-pointer"
              >
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-inter font-semibold text-white group-hover:text-white transition-colors">
                    {product.title}
                  </h3>
                  {/* Arrow Icon */}
                  <span className="text-gray-500 group-hover:text-white transition-colors transform group-hover:translate-x-1 duration-300">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                    </svg>
                  </span>
                </div>
                <p className="text-gray-400 font-inter group-hover:text-white text-base leading-relaxed transition-colors duration-300">
                  {product.description}
                </p>
                <p className="text-gray-400 font-inter group-hover:text-white text-sm leading-relaxed transition-colors duration-300 mt-2 ">
                  <span className="font-bold">Tech Stack:</span> {product.TechStack}
                </p>
              </div>
            ))}
          </motion.div>

        </div>
      </div>
    </section>
  );
}