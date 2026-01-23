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
    description: 'Successfully completed projects across web, mobile, and digital platforms.',
  },
  {
    number: '20+',
    label: 'Trusted Clients',
    description: 'Businesses worldwide trusting us for reliable IT solutions.',
  },
];

export default function About() {
  return (
    <section id="about" className="py-24 bg-[#0a0a0a] text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* --- Top Row: Heading & Description --- */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 mb-16 items-start">
          
          {/* Left: Main Heading */}
          <motion.h2 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-4xl sm:text-5xl md:text-5xl font-bold leading-[1.1] tracking-tight"
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
            <p className="text-gray-300 text-lg leading-relaxed">
              At Technogetic, we are at the forefront of technological innovation, dedicated to delivering cutting-edge IT solutions that drive business success. Founded in 2018, our mission is to redefine the digital landscape by providing reliable and scalable technology solutions.
            </p>
            
            <div className="space-y-4">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center space-x-3">
                  {/* Blue Check Icon */}
                  <div className="shrink-0 w-6 h-6 rounded-full bg-[#008AC9] flex items-center justify-center">
                    <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="3">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-white text-lg font-medium tracking-wide">{feature}</span>
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
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 h-full">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
                transition={{ delay: 0.2 + (index * 0.1) }}
                className="
                  bg-transparent border border-white/20 rounded-2xl p-8 
                  flex flex-col justify-start
                  hover:bg-white/5 transition-colors duration-300
                "
              >
                <div className="text-6xl font-bold text-white mb-6">
                  {stat.number}
                </div>
                <div>
                  <h3 className="text-2xl font-normal text-white mb-3">
                    {stat.label}
                  </h3>
                  <p className="text-gray-400 text-base leading-relaxed">
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