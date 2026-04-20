'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { fadeInUp } from '@/app/lib/animations';
import type { SVGProps } from 'react';
 import ChevronRightIcon from '@/app/lib/icon/chevron-right-icon';
type IconProps = React.SVGProps<SVGSVGElement> & { width?: number; height?: number; color?: string };
interface ReasonCard {
  id: number;
  title: string;
  description: string;
}

const reasons: ReasonCard[] = [
  {
    id: 1,
    title: 'Manual Processess',
    description:
      'Too much manual work slows down operations and increases the chances of errors in daily tasks.',
  },
  {
    id: 2,
    title: 'Disconnected Systems',
    description:
      'Different tools and software don’t work together, leading to confusion and inconsistent data across teams.',
  },
  {
    id: 3,
    title: 'Limited Scalability',
    description:
      'Existing systems cannot handle growing business needs, making it difficult to scale operations efficiently.',
  },
  {
    id: 4,
    title: 'Inefficient Workflows',
    description:
      'Unstructured processes create delays and reduce overall productivity across teams and departments.',
  },
  {
    id: 5,
    title: 'Data Management Issues',
    description:
      'Handling large amounts of data becomes difficult without a proper system in place.',
  },
];

const CheckIcon = (props: SVGProps<SVGSVGElement>) => (
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

function SimilarChallengeCard() {
  return (
    <div className="flex h-full flex-col justify-between rounded-[10px] bg-[linear-gradient(180deg,#069ADC_0%,#047FC0_100%)] p-6 shadow-[0_16px_38px_rgba(0,137,206,0.28)] sm:p-7 md:p-8">
      <div>
        <h3 className="font-inter text-2xl font-semibold leading-8 text-white md:text-[24px] tracking-[1%]">
          Have a Similar Challenge?
        </h3>
        <p className="font-inter mt-4 max-w-md text-base leading-7 text-[#FBFBFB] md:text-[18px] md:leading-7">
          Tell us your requirement and we&apos;ll help you find a simple and practical solution.
        </p>
      </div>

      <motion.a
        href="#contact"
        className="mt-6 inline-flex w-fit items-center justify-center rounded-[10px] bg-[#FFFFFF] px-7 py-3 font-inter text-base font-semibold text-[#000000]"
        whileHover={{ y: -2, scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        animate={{ y: [0, -4, 0] }}
        transition={{
          y: { duration: 1, repeat: Infinity, ease: 'easeInOut' },
          scale: { duration: 0.2 },
        }}
      >
        Talk to Us  
        <ChevronRightIcon width={7} height={11} color="#000000" className="inline-block transition-transform duration-500 ease-out group-hover:translate-x-0.5 ml-2" />
      </motion.a>
    </div>
  );
}

export default function Solution() {
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
                    Problems We Help You Solve
                    </h2>
                    <p className="text-base md:text-lg leading-[28px] text-[#ffff]">
                    Common challenges businesses face when systems are not built around real operations and growing needs.
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

          <motion.div
            key="similar-challenge-cta"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-40px' }}
            variants={fadeInUp}
            transition={{ delay: reasons.length * 0.06 }}
          >
            <SimilarChallengeCard />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
