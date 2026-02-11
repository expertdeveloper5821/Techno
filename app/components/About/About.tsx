'use client';

import { motion } from 'framer-motion';
import { fadeInUp, scaleIn } from '@/app/lib/animations';
import Image from 'next/image';

const features = [
  'Tailored IT Solutions.',
  'Future-Ready Infrastructure.',
  'Industry Expertise.',
];

const stats = [
  {
    number: '50+',
    label: 'Projects Delivered',
    description: 'Projects Shipped Delivered on time, on scope, in production.',
  },
  {
    number: '20+',
    label: 'Trusted Clients',
    description: 'Clients who return for phase two and three.',
  },
];

export default function About() {
  return (
    <section id="about" className="lg:pt-24 lg:pb-24 md:pt-15 md:pb-15  pt-10 pb-10 bg-[#0a0a0a] text-white w-full mx-auto px-4 sm:px-6 lg:px-6">
      <div className=" ">
        
        {/* --- Top Row: Heading & Description --- */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-20 mb-5 items-start">
          
          {/* Left: Main Heading */}
          <motion.h2 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="font-inter text-[25px] sm:text-xl md:text-4xl font-semibold   lg:leading-[60px] md:leading-[50px] leading-[38px] "
          >
            We deliver exceptional value through innovative, tailored solutions.
          </motion.h2>

          {/* Right: Description & Checkmarks */}
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            transition={{ delay: 0.2 }}
            className="space-y-10 mt-2"
          >
            <p className="text-[#FFFFFF] text-lg  leading-[28.8px] font-inters tracking-[1%] mb-0!sm:mb-2 ">
            Since 2018, we've helped startups and enterprises build software that actually works. No buzzwords, no vendor lock-in—just senior engineers who deliver working code on predictable timelines.            </p>
            <p>We don't treat you like a ticket number. Our teams embed directly into yours—same Slack channels, same sprint cycles, same goals.</p>
            <div className="space-y-4">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center space-x-3">
                  {/* Blue Check Icon */}
                  <div className="shrink-0 w-6 h-6 rounded-full bg-[#008AC9] flex items-center justify-center">
                    <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="3">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-white text-lg font-medium leadinng-[34px] tracking-wide">{feature}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* --- Bottom Row: Image & Stats --- */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          
          {/* Left: Image Only */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={scaleIn}
            className="w-full"
          >
             {/* 
                1. Removed 'absolute inset-0' and 'min-h'.
                2. Removed 'fill'.
                3. Added width/height to respect aspect ratio.
                4. Added 'w-full h-auto' to make it responsive.
             */}
             <Image
              src="/about/client4.png" 
              alt="Team working together"
              width={800}
              height={600}
              className="w-full h-auto rounded-2xl object-contain"
              sizes="(max-width: 1024px) 100vw, 50vw"
              loading="lazy"
            />
          </motion.div>

          {/* Right: Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 items-end end gap-6  h-full">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
                transition={{ delay: 0.2 + (index * 0.1) }}
                className="
                  bg-transparent border border-white/20 rounded-2xl p-6 
                  flex flex-col  justify-between font-inter
                  hover:bg-white/5 transition-colors duration-300   h-full  xl:h-[80%] 
                "
              >
                <div className="   font-medium text-[32px]  text-white leading-[40px]  tracking-[1%] ">
                  {stat.number}
                </div>
                <div className='  flex flex-col  justify-between h-[70%]'>
                  <h3 className=" md:text-[32px] text-2xl sm:m-0 mb-2 sm:mb-0 font-normal text-white  h-[40%]  flex items-end ">
                    {stat.label}
                  </h3>
                  <p className=" text-lg leading-relaxed font-inter tracking-[1%] ">
                    {stat.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}