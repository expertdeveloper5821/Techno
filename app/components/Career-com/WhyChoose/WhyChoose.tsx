'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { fadeInUp } from '@/app/lib/animations';

interface ReasonCard {
  id: number;
  title: string;
  description: string;
}

const reasons: ReasonCard[] = [
  {
    id: 1,
    title: 'Innovative & Challenging Projects',
    description:
      'Work on innovative projects solving complex real-world business challenges.',
  },
  {
    id: 2,
    title: 'Collaborative and Supportive Culture',
    description:
      'Thrive in a supportive team environment encouraging collaboration and growth.',
  },
  {
    id: 3,
    title: 'Continuous Learning & Skill Development',
    description:
      'Enhance your skills through ongoing learning and professional development programs.',
  },
  {
    id: 4,
    title: 'Flexible & Growth-Oriented Environment',
    description:
      'Enjoy a flexible workplace focused on career growth and balance.',
  },
  {
    id: 5,
    title: 'Transparent Communication',
    description:
      'Experience open communication that promotes clarity, trust, and teamwork.',
  },
  {
    id: 6,
    title: 'Recognition and Career Advancement Opportunities',
    description:
      'Receive recognition and opportunities for continuous career advancement.',
  },
];

const CheckIcon = (props : any) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={30}
    height={23}
    viewBox="0 0 30 23"
    fill="none"
    {...props}
  >
    <path
      d="M29.1667 2.35L9.16667 22.35L0 13.1833L2.35 10.8333L9.16667 17.6333L26.8167 0L29.1667 2.35Z"
      fill="white"
      fillOpacity={0.5}
    />
  </svg>
);

function ReasonCardItem({ item }: { item: ReasonCard }) {
  return (
    <div
      className="flex h-full flex-col rounded-[10px] border border-[#616161] bg-[#141824] p-6 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.04)] transition-colors hover:border-white/20 sm:p-7 md:p-8"
      style={{
        background:
          'linear-gradient(145deg, rgba(30, 36, 52, 0.95) 0%, rgba(18, 22, 34, 0.98) 100%)',
      }}
    >
      <div className="mb-6 flex items-start justify-between">
        <span className="font-inter text-xl font-semibold leading-5 text-[#FFFFFF] md:text-3xl">
          {item.id}
        </span>
        <span className="text-white">
          <CheckIcon className="h-5 w-5 shrink-0" />
        </span>
      </div>
      <h3 className="font-inter mb-3 text-xl font-semibold leading-7 text-[#FFFFFF] md:text-2xl">
        {item.title}
      </h3>
      <p className="font-inter mt-auto text-base leading-7 tracking-[1%] text-[#BABABA] md:text-[18px] md:leading-[1.55]">
        {item.description}
      </p>
    </div>
  );
}

export default function WhyChoose() {
  return (
    <section

            className=" text-white w-full mx-auto lg:pt-24 lg:pb-24 md:pt-15 md:pb-15 pt-10 pb-10 bg-cover bg-center bg-no-repeat    "style={{ backgroundImage: "url('/service/background-solution.svg')" }}
        >
      

      <div className="flex flex-col justify-center  px-4 sm:px-6 lg:px-6">
      <motion.div 
               
                 initial="hidden"
                 whileInView="visible"
                 viewport={{ once: true }}
                 variants={fadeInUp}
               
                className="max-w-4xl mx-auto text-center mb-10 md:mb-14">
                    <h2 className="text-[25px] md:text-4xl lg:text-[44px] font-semibold mb-6">
                    Why Choose Technogetic?
                    </h2>
                    <p className="text-base md:text-lg leading-[28px] text-[#ffff]">
                    At Technogetic, great technology starts with great people, driven by innovation and collaboration.
                    </p>
                </motion.div>

        <div className="grid gap-5 sm:grid-cols-2 sm:gap-6 xl:grid-cols-3 xl:gap-7">
          {reasons.map((item, index) => (
            <motion.div
              key={item.id}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-40px' }}
              variants={fadeInUp}
              transition={{ delay: index * 0.06 }}
            >
              <ReasonCardItem item={item} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
