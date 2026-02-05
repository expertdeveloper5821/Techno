'use client';

import { motion, AnimatePresence } from 'framer-motion';

interface FAQItemProps {
  question: string;
  answer: string;
  index: number;
  isOpen: boolean;
  onToggle: () => void;
}

function formatNumber(n: number): string {
  return n < 10 ? `0${n}` : `${n}`;
}

export default function FAQItem({
  question,
  answer,
  index,
  isOpen,
  onToggle,
}: FAQItemProps) {
  const numberLabel = formatNumber(index + 1);

  return (
    <div
      className={`
        rounded-xl overflow-hidden transition-colors duration-300 ease-out
        ${isOpen ? 'bg-[linear-gradient(193.06deg,#52BBEF_5.92%,#0181EC_89.21%)]' : 'bg-[#0a0a0a]'}
      `}
    >
      {/* Horizontal flow: [Number + Question] — 100px gap — [Answer] — [Icon]; height hug 96px when collapsed */}
      <button
        type="button"
        onClick={onToggle}
        className={`w-full flex md:flex-row flex-col items-start gap-[15px] text-left px-6 transition-[padding] duration-300 ease-out ${
          isOpen ? 'min-h-0 py-4' : 'min-h-[96px] py-[31px]'
        }`}
      >
        {/* Left: number + question */}
        <div  className=" text-white font-inter font-medium text-[20px] leading-[34px] tracking-[0.01em] flex gap-[5px] items-center  ">
          <span
            className="  font-inter font-semibold tracking-normal inline-flex items-center justify-center shrink-0 w-[21px] h-[13px] text-[16px]"
            style={{ lineHeight: 1 }}
          >
            {numberLabel} 
          </span>
          <span className="  md:w-[274px] w-full font-inter font-medium md:text-[16px] text-base leading-[34px] tracking-[0.01em] ">
          {question}
          </span>
        </div>

        {/* Middle: answer (same line as title when expanded), flex-1 when collapsed so icon stays right */}
        <span className="flex-1 min-w-0 text-left">
          <AnimatePresence initial={false}>
            {isOpen ? (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25, ease: 'easeOut' }}
                className="text-white font-inter font-normal sm:text-base text-sm "
              >
                {answer}
              </motion.p>
            ) : null}
          </AnimatePresence>
        </span>

        {/* Right: + / − in the same place */}
        <span
          className="relative shrink-0 w-8 h-8 flex items-center justify-center text-white text-xl font-light leading-none"
          aria-hidden
        >
          <span
            className={`absolute inset-0 flex items-center justify-center transition-opacity duration-200 ease-out ${
              isOpen ? 'opacity-0' : 'opacity-100'
            }`}
          >
            +
          </span>
          <span
            className={`absolute inset-0 flex items-center justify-center transition-opacity duration-200 ease-out ${
              isOpen ? 'opacity-100' : 'opacity-0'
            }`}
          >
            −
          </span>
        </span>
      </button>
    </div>
  );
}
