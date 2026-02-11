'use client';

import { useState } from 'react';
import FAQItem from './FAQItem';
import { faqs } from '@/app/lib/data/faqs';
import RightArrowIcon from '@/app/lib/icon/chevron-right-icon';
import { motion } from 'framer-motion';
import { fadeInUp } from '@/app/lib/animations';
export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-20 sm:py-24 bg-[#0000]">
      <div className=" mx-auto px-4 sm:px-6 lg:px-2 w-full max-w-[1068px]">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-14">
          <h2
            className="text-white mb-6 font-inter font-semibold text-[20px] sm:text-[44px] leading-[34px] tracking-[0.01em]"
          >
            Common questions from CTOs and founders
          </h2>
          <p
            className="text-[#F5F5F5] font-inter font-normal text-[20px] leading-6 tracking-[0.01em]"
          >
            Don&apos;t see your question? Book a 15-minute call—no pitch, just
            answers.
          </p>
        </div>

        {/* Accordion */}
        <div className="divide-y divide-gray-600/80 rounded-lg overflow-hidden">
          {faqs.map((faq, index) => (
            <div key={faq.id}>
              <FAQItem
                question={faq.question}
                answer={faq.answer}
                index={index}
                isOpen={openIndex === index}
                onToggle={() => handleToggle(index)}
              />
            </div>
          ))}
        </div>

        {/* Read More CTA */}
        <div className="flex justify-center mt-10">
        <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            transition={{ delay: 0.4 }}
          >
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group inline-flex gap-2 items-center rounded-xl bg-[linear-gradient(206.67deg,#45B3F1_-0.38%,#0088FF_81.83%)] text-[#ffffff] px-3 md:px-7  py-2  md:py-4  text-lg font-semibold hover:bg-gray-100 transition-colors shadow-lg"
            >
            Read More
           <RightArrowIcon width={7} height={11} color="#ffffff" className="inline-block transition-transform duration-500 ease-out group-hover:translate-x-0.5" />
           </motion.a>
          </motion.div>
        
        </div>
      </div>
    </section>
  );
}
