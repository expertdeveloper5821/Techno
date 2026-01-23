'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { fadeInLeft, fadeInRight } from '@/app/lib/animations';
import FAQItem from './FAQItem';

const faqs = [
  {
    id: '1',
    question: 'What services does Technogetic offer?',
    answer: 'We provide end-to-end digital solutions including web development, mobile app development, UI/UX design, digital marketing, and custom software tailored to your business needs.',
  },
  {
    id: '2',
    question: 'How do you approach a new project?',
    answer: 'We follow a structured approach: discovery and requirements gathering, planning and strategy, design and development, testing and quality assurance, and deployment with ongoing support.',
  },
  {
    id: '3',
    question: 'How do you approach a new project?',
    answer: 'Our process involves deep collaboration to ensure we understand your specific goals and deliver a solution that fits perfectly.',
  },
  {
    id: '4',
    question: 'How do you approach a new project?',
    answer: 'We prioritize agile methodologies, ensuring flexibility and rapid delivery while maintaining high quality standards.',
  },
  {
    id: '5',
    question: 'How do you approach a new project?',
    answer: 'Communication is key. We keep you updated at every stage of the project lifecycle to ensure total transparency.',
  },
  {
    id: '6',
    question: 'How do you approach a new project?',
    answer: 'Post-launch support is part of our commitment to ensuring your long-term success.',
  },
  {
    id: '7',
    question: 'How do you approach a new project?',
    answer: 'We provide detailed documentation and training to ensure your team can effectively manage the new solution.',
  },

];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0); 

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-24 bg-[#1a1a1a]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16">
          
          {/* --- LEFT SIDE (Text & CTA) --- */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInLeft}
            className="lg:col-span-5 space-y-8"
          >
            <div>
              <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4 leading-tight">
                Have Questions? <br />
                We’ve Got Answers
              </h2>
              <p className="text-gray-400 text-lg">
                Everything you need to know before starting your project with Technogetic.
              </p>
            </div>

            {/* CTA Box */}
            <div className="bg-[#008AC9] p-8 rounded-2xl relative overflow-hidden h-[340px] flex flex-col justify-between shadow-2xl">
              
              {/* TG Watermark - Behind text */}
              <div className="absolute top-1/2 -translate-y-1/2 right-[70px] pointer-events-none select-none z-0">
                <span className="text-[280px] font-bold text-white opacity-[0.07] leading-none">
                  TG
                </span>
              </div>

              {/* Content Layer */}
              <div className="relative z-10">
                <div className="text-6xl font-bold text-white/60 mb-4">?</div>
                <h3 className="text-white text-3xl font-bold mb-3 leading-tight">Still have a questions?</h3>
                <p className="text-white/90 text-base leading-relaxed max-w-[260px]">
                  Contact our team for clear answers and expert guidance on your project.
                </p>
              </div>

              {/* Animated Button */}
              <div className="relative z-10">
                <motion.button
                  className="bg-white text-black text-sm font-bold px-6 py-3.5 rounded-lg flex items-center gap-2 hover:bg-gray-100 transition-colors"
                  whileHover="hover"
                  initial="initial"
                >
                  <span>Send Email</span>
                  <motion.span
                    variants={{
                      initial: { width: 0, opacity: 0, x: -5 },
                      hover: { width: "auto", opacity: 1, x: 0 }
                    }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    className="overflow-hidden flex items-center"
                  >
                    <svg className="w-4 h-4 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </motion.span>
                </motion.button>
              </div>
            </div>
          </motion.div>

          {/* --- RIGHT SIDE (FAQ List) --- */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInRight}
            className="lg:col-span-7 flex flex-col"
          >
            <div className="space-y-4 mb-8">
              {faqs.map((faq, index) => (
                <FAQItem
                  key={faq.id}
                  question={faq.question}
                  answer={faq.answer}
                  isOpen={openIndex === index}
                  onToggle={() => handleToggle(index)}
                />
              ))}
            </div>

            {/* Read More Button */}
            <div className="flex justify-center md:justify-end">
              <button className="bg-[#008AC9] text-white font-semibold px-8 py-3 rounded-lg hover:bg-[#007bb3] transition-colors flex items-center gap-2 shadow-lg">
                Read More 
                <span className="text-xl leading-none">›</span>
              </button>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}