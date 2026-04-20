'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { fadeInUp } from '@/app/lib/animations';
import { fadeInRight } from '@/app/lib/animations';
import CheckIcon from '@/app/lib/icon/chevron-right-icon';
interface Challenge {
    id: number;
    title: string;
    description: string;
}

interface ReasonCard {
    id: number;
    title: string;
    description: string;
  }

const challenges: Challenge[] = [
    {
        id: 1,
        title: 'Inventory Management Issues',
        description:
            'Managing inventory across multiple platforms often leads to mismatches, delays, and operational inefficiencies.',
    },
    {
        id: 2,
        title: 'Checkout Abandonment Rates',
        description:
            'Complex checkout processes or slow pages cause users to leave before completing purchases.',
    },
    {
        id: 3,
        title: 'System Integration Challenges',
        description:
            'Lack of integration between tools creates inefficiencies and disrupts smooth business operations.',
    },
    {
        id: 4,
        title: 'High Traffic Performance',
        description:
            'Handling sudden traffic spikes during sales can slow systems and affect user experience.',
    },
    {
        id: 5,
        title: 'Data Security Concerns',
        description:
            'Protecting customer data and transactions is critical to avoid risks and maintain trust.',
    },
    {
        id: 6,
        title: 'Scalability Limitations',
        description:
            'Many platforms struggle to scale efficiently with growing demand and business expansion needs.',
    },
];


function ReasonCardItem({ item }: { item: ReasonCard }) {
    return (
      <div
        className="flex h-full flex-col rounded-[10px] border border-[#FFFFFF33] bg-[#080809] p-6 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.04)] transition-colors sm:p-7 md:p-8"
        
      >
        <div className="mb-6 flex items-start justify-between">
          <span className="font-inter text-xl  rounded-full w-10 h-10 text-center content-center  bg-[#0094DB] text-white leading-7 tracking-[1%] font-semibold">
            {item.id}
          </span>
        </div>
        <h3 className="font-inter mb-1 text-xl font-semibold    text-[#0094DB] leading-[34px] tracking-[1%] ">
          {item.title}
        </h3>
        <p className="font-inter mt-auto text-base leading-7 tracking-[1%] text-[#FFFFFF]  ">
          {item.description}
        </p>
      </div>
    );
  }







function Ecommerce() {
    return (
        <section

            className="bg-[#000000] text-white w-full mx-auto lg:pt-24 lg:pb-24 md:pt-15 md:pb-15 pt-10 pb-10"
        >
            <div className="flex flex-col justify-center  px-4 sm:px-6 lg:px-6">
                {/* Heading */}
                <motion.div 
               
                 initial="hidden"
                 whileInView="visible"
                 viewport={{ once: true }}
                 variants={fadeInUp}
               
                className="max-w-3xl mx-auto text-center mb-10 md:mb-14">
                    <h2 className="text-[25px] md:text-4xl lg:text-[44px] font-semibold mb-6">
                    Common E-Commerce Challenges
                    </h2>
                    <p className="text-base md:text-lg leading-[28px] text-[#ffff]">
                    These are some of the key issues businesses face while managing platforms, users, and operations at scale.
                    </p>
                </motion.div>

                

<div className="grid gap-5 sm:grid-cols-2 sm:gap-6 xl:grid-cols-3 xl:gap-7">
          {challenges.map((item, index) => (
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

export default Ecommerce;
