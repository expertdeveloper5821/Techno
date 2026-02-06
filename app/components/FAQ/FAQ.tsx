'use client';

import { useState } from 'react';
import FAQItem from './FAQItem';
import { faqs } from '@/app/lib/data/faqs';

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-20 sm:py-24 bg-[#0000]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-2 w-full max-w-[1068px]">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-14">
          <h2
            className="text-white mb-4 font-inter font-medium text-[20px] leading-[34px] tracking-[0.01em]"
          >
            Common questions from CTOs and founders
          </h2>
          <p
            className="text-gray-400 font-inter font-normal text-base leading-6 tracking-[0.01em]"
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
          <button
            type="button"
            className="bg-[linear-gradient(193.06deg,#52BBEF_5.92%,#0181EC_89.21%)] text-white font-semibold px-8 py-3.5 rounded-lg hover:opacity-95 transition-all duration-300 ease-out flex items-center gap-2"
          >
            Read More
            <span className="text-lg leading-none" aria-hidden>
              &gt;
            </span>
          </button>
        </div>
      </div>
    </section>
  );
}
