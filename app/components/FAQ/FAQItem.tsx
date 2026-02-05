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
      {/* Small: one row [number + question + icon], answer below. Md: [number+question] [answer] [icon] in one row */}
      <button
        type="button"
        onClick={onToggle}
        className={`w-full flex flex-col md:flex-row md:items-start text-left px-6 transition-[padding] duration-300 ease-out gap-[15px] ${
          isOpen ? 'min-h-0 py-4' : 'min-h-[96px] py-[31px]'
        }`}
      >
        {/* Block 1: number + question; on small screen icon is inside this row so it stays aligned with question */}
        <div className="flex items-center gap-2 w-full min-h-[34px] md:w-auto md:flex-initial">
          <div className="flex gap-[5px] items-center min-w-0 flex-1 md:flex-initial text-white font-inter font-medium text-[20px] leading-[34px] tracking-[0.01em]">
            <span
              className="font-inter font-semibold tracking-normal inline-flex items-center justify-center shrink-0 w-[21px] h-[13px] text-[16px]"
              style={{ lineHeight: 1 }}
            >
              {numberLabel}
            </span>
            <span className="font-inter font-medium md:text-[16px] text-base leading-[34px] tracking-[0.01em]">
              {question}
            </span>
          </div>
          {/* + / − on same line as question on small screens only */}
          <span
            className="relative shrink-0 w-8 h-8 flex items-center justify-center text-white text-xl font-light leading-none md:hidden"
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
        </div>

        {/* Block 2: answer (below on small, inline on md) */}
        <span className="flex-1 min-w-0 text-left w-full md:w-auto">
          <AnimatePresence initial={false}>
            {isOpen ? (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25, ease: 'easeOut' }}
                className="text-white font-inter font-normal sm:text-base text-sm leading-relaxed"
              >
                {answer}
              </motion.p>
            ) : null}
          </AnimatePresence>
        </span>

        {/* + / − visible on md only (end of row) */}
        <span className="hidden md:inline-flex shrink-0" aria-hidden>
          <span className="relative w-8 h-8 flex items-center justify-center text-white text-xl font-light leading-none">
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
        </span>
      </button>
    </div>
  );
}
