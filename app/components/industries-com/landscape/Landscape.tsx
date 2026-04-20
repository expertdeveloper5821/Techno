'use client';

import { motion, number } from 'framer-motion';
import { fadeInUp, scaleIn } from '@/app/lib/animations';
import Image from 'next/image';
import { div, label } from 'framer-motion/client';
import correctmark from '@/public/About/Intro/static-icon/correctmark.svg'
import handshake from '@/public/About/Intro/static-icon/handshak.svg'
import profile from '@/public/About/Intro/static-icon/profile.svg'
import graph from '@/public/About/Intro/static-icon/graph.svg'
import CountUp from 'react-countup'

const features = [
  'Seamless shopping experience across web and mobile platforms.',
  'Secure and reliable payment processing for smooth transactions.',
  'Scalable systems to handle traffic spikes and business growth.',
];

const stats = [
  {

    label: 'Our Mission',
    description: 'To help businesses achieve digital success by delivering innovative, reliable, and user-focused technology solutions.',
  },
  {

    label: 'Our Mission',
    description: 'To help businesses achieve digital success by delivering innovative, reliable, and user-focused technology solutions.',
  },
];


const staticbox = [
  {
    id: 1,
    icon: handshake,
    value: 10,
    suffix: "k+",
    heading: "Engaged Customers"
  },
  {
    id: 2,
    icon: correctmark,
    value: 99,
    suffix: "%",
    heading: "Customer Success Stories"
  },
  {
    id: 3,
    icon: profile,
    value: 80,
    suffix: "+",
    heading: "Team of Professionals"
  },
  {
    id: 4,
    icon: graph,
    value: 10,
    suffix: "X",
    heading: "More Faster Growth"
  }
]


export default function Landscape() {
  return (
    <section id="about" className="lg:pt-20 lg:pb-24 md:pt-15 md:pb-15  pt-10 pb-10 bg-[#000000] text-white w-full mx-auto px-4 sm:px-6 lg:px-6">
      <div className=" ">




        {/* --- Bottom Row: Image & Stats --- */}
        <div className="grid  lg:grid-cols-[4fr_6fr]    items-start">

          {/* Left: Image Only */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={scaleIn}
            className="w-full lg:h-full lg:block hidden  "
          >
            <div className="relative  w-full h-full xl:h-[585px] rounded-l-2xl overflow-hidden ">
              <img
                src="/About/Intro/intro.webp"
                alt="Team working together"
                
                className="lg:object-cover object-contain  h-full w-full rounded-l-2xl "
                sizes="(max-width: 1024px) 100vw, 50vw"
                loading="lazy"
              />
            </div>
          </motion.div>




          {/* Right: Stats Grid */}

          <div className='flex flex-col h-full gap-6 bg-[#111517] p-6   lg:rounded-tl-none lg:rounded-bl-none lg:rounded-tr-2xl lg:rounded-br-2xl rounded-2xl' >

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              transition={{ delay: 0.2 }}
              className="space-y-10 mt-2"
            >
              <h1 className='font-semibold text-[25px]  sm:text-xl md:text-4xl lg:text-[44px] lg:leading-[60px] md:leading-[50px] leading-[32px] !mb-1' >Understanding the E-Commerce Landscape</h1>
              <p className="text-[#FFFFFF] text-lg  leading-[28.8px] font-inters tracking-[1%] mb-6! sm:mb-2 max-w-2xl ">
              E-commerce businesses operate in a highly competitive and fast-moving environment where customer expectations continue to rise. From browsing to checkout, every step needs to be smooth, fast, and reliable.</p>

              <p className="text-[#FFFFFF] text-lg  leading-[28.8px] font-inters tracking-[1%] mb-6! sm:mb-2 max-w-2xl">We focus on building systems that not only support daily operations but also help businesses scale efficiently as demand grows.</p>
              <div className="space-y-4 ">
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

   <motion.div
   initial="hidden"
   whileInView="visible"
   viewport={{ once: true }}
   variants={fadeInUp}
   transition={{ delay: 0.2 }}
   className="space-y-10 mt-2">

    <p className='text-[#FFDF51] text-base  leading-[24px]  tracking-[1%] max-w-2xl  ' >At Technogetic, great technology starts with great people, driven by innovation and collaboration.</p>


   </motion.div>


          </div>

        </div>
      </div>




    </section>
  );
}