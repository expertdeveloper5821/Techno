'use client';

import { motion, number } from 'framer-motion';
import { fadeInUp, scaleIn } from '@/app/lib/animations';
import Image from 'next/image';
import { div, label } from 'framer-motion/client';
import correctmark from '@/public/About/Intro/static-icon/correctmark.svg'
import handshake from '@/public/About/Intro/static-icon/handshak.svg'
import profile from '@/public/About/Intro/static-icon/profile.svg'
import graph from '@/public/About/Intro/static-icon/graph.svg'
const features = [
  'Tailored IT Solutions.',
  'Future-Ready Infrastructure.',
  'Industry Expertise.',
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


const staticbox = [{
  id: 1,
  icon: handshake,
  number: "10k+",
  heading: "Engaged Customerss"
},
{
  id: 2,
  icon: correctmark,
  number: "99%",
  heading: "Customer Success Stories"
},
{
  id: 3,
  icon: profile,
  number: "80+",
  heading: "Team of Professionals"
},
{
  id: 4,
  icon: graph,
  number: "10X",
  heading: "More Faster Growths"
}]

export default function Intero() {
  return (
    <section id="about" className="lg:pt-24 lg:pb-24 md:pt-15 md:pb-15  pt-10 pb-10 bg-[#0a0a0a] text-white w-full mx-auto px-4 sm:px-6 lg:px-6">
      <div className=" ">




        {/* --- Bottom Row: Image & Stats --- */}
        <div className="lg:grid  lg:grid-cols-[4fr_6fr] gap-8 lg:gap-4 items-start">

          {/* Left: Image Only */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={scaleIn}
            className="w-full lg:h-full  "
          >
            <div className="relative  w-full h-full rounded-2xl overflow-hidden lg:pb-4 pb-8">
              <img
                src="/About/Intro/intro.png"
                alt="Team working together"
                
                className="lg:object-cover object-contain  h-full w-full rounded-2xl "
                sizes="(max-width: 1024px) 100vw, 50vw"
                loading="lazy"
              />
            </div>
          </motion.div>




          {/* Right: Stats Grid */}

          <div className='flex flex-col h-full gap-6 bg-[#111517] p-6 rounded-t-2xl' >

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              transition={{ delay: 0.2 }}
              className="space-y-10 mt-2"
            >
              <h1 className='font-semibold text-[25px]  sm:text-xl md:text-4xl lg:text-[44px] lg:leading-[60px] md:leading-[50px] leading-[32px] !mb-1' >Who We Are</h1>
              <p className="text-[#FFFFFF] text-lg  leading-[28.8px] font-inters tracking-[1%] mb-0! sm:mb-2 ">
                Since 2018, we've helped startups and enterprises build software that actually works. No buzzwords, no vendor lock-in—just senior engineers who deliver working code on predictable timelines.            </p>
              <p className=''>We don't treat you like a ticket number. Our teams embed directly into yours—same Slack channels, same sprint cycles, same goals.</p>
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

            <div className="grid grid-cols-1 sm:grid-cols-2 items-end end gap-6   h-full">

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
                  hover:bg-white/5 transition-colors duration-300    
                "
                >
                  {/* <div className="   font-medium text-[32px]  text-white leading-[40px]  tracking-[1%] ">
                    {stat.number}
                  </div> */}
                  <div className='  flex flex-col gap-4  justify-between h-[70%]'>
                    <h3 className=" xl:text-[32px] text-2xl sm:m-0 mb-2 sm:mb-0 font-normal text-white  h-[40%]  flex items-end ">
                      {stat.label}
                    </h3>
                    <p className=" md:text-lg text-base leading-relaxed font-inter tracking-[1%] ">
                      {stat.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

        </div>
      </div>


      {/* statics boxes  */}
      <div className=' grid lg:grid-cols-4 grid-cols-1 lg:p-10 p-6 bg-[#111517] rounded-2xl '  >

        {
          staticbox.map((statics, index) => (
            <motion.div
              key={index}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              transition={{ delay: 0.2 + (index * 0.1) }}
              className="
    bg-[#000] lg:border-r border-b border-white/20  p-6 
    flex flex-col lg:gap-6  gap-3 justify-top  font-inter
    hover:bg-white/5 transition-colors duration-300    
  "
            >

              <Image
                src={statics.icon}
                alt={statics.heading}
                width={28}
                height={28}
              />

              <p className='font-semibold md:text-[60px] text-[44px] leading-[60px]' >{statics.number}</p>
              <p className='md:text-[20px] text-base leading-[34px]' >{statics.heading}</p>
            </motion.div>
          )
          )
        }
      </div>


    </section>
  );
}