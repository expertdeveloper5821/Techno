'use client';

import { motion } from 'framer-motion';

interface FAQItemProps {
  question: string;
  answer: string;
  index: number;
  isOpen: boolean;
  onToggle: () => void;
}

const ACCORDION_DURATION = 0.55;
const ACCORDION_EASE = [0.52, 0.72, 0, 1] as const;

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
        rounded-xl overflow-hidden
        ${isOpen ? 'bg-[linear-gradient(193.06deg,#52BBEF_5.92%,#0181EC_89.21%)]' : 'bg-[#0a0a0a]'}
      `}
      style={{ transition: `background-color ${ACCORDION_DURATION}s cubic-bezier(${ACCORDION_EASE.join(',')})` }}
    >
      {/* Small: one row [number + question + icon], answer below. Md: [number+question] [answer] [icon] in one row */}
      <button
        type="button"
        onClick={onToggle}
        className={`w-full flex flex-col  md:items-start text-left px-2 sm:px-6 lg:gap-[20px] gap-[10] ${
          isOpen ? 'min-h-0 py-4' : 'min-h-[96px] py-[31px]'
        }`}
        style={{ transition: `padding ${ACCORDION_DURATION}s cubic-bezier(${ACCORDION_EASE.join(',')}), min-height ${ACCORDION_DURATION}s cubic-bezier(${ACCORDION_EASE.join(',')})` }}
      >
        {/* Block 1: number + question; on small screen icon is inside this row so it stays aligned with question */}
        <div className="flex items-center justify-between gap-4 w-full min-h-[34px]  lg:w-auto md:flex-initial">
          <div className="flex sm:gap-[5px]  items-start sm:items-center gap-2  min-w-0 flex-1 md:flex-initial text-white font-inter font-medium text-[20px] leading-[34px] tracking-[0.01em]">
            <span
              className="font-inter font-semibold mt-3 sm:mt-0 tracking-tight inline-flex items-center justify-center shrink-0  text-[16px]"
              style={{ lineHeight: 1 }}
            >
              {numberLabel}
            </span>
            <span className="font-inter  font-medium md:text-[20px] text-lg leading-[34px] tracking-[0.01em]">
              {question}
            </span>
          </div>
          {/* + / − on same line as question on small screens only */}
          <span
            className="relative shrink-0 w-8 h-8 flex items-center justify-center text-white text-xl font-light leading-none"
            aria-hidden
          >
          <span
            className={`absolute inset-0 flex items-center justify-center ${
              isOpen ? 'opacity-0' : 'opacity-100'
            }`}
            style={{ transition: `opacity ${ACCORDION_DURATION}s cubic-bezier(${ACCORDION_EASE.join(',')})` }}
          >
            +
          </span>
          <span
            className={`absolute inset-0 flex items-center justify-center ${
              isOpen ? 'opacity-100' : 'opacity-0'
            }`}
            style={{ transition: `opacity ${ACCORDION_DURATION}s cubic-bezier(${ACCORDION_EASE.join(',')})` }}
          >
            −
          </span>
          </span>
        </div>

        {/* Block 2: answer (below on small, inline on md) — smooth height + opacity, same phase/speed */}
        <span className="flex-1 min-w-0 text-left w-full md:w-auto overflow-hidden">
          <motion.div
            initial={false}
            animate={{
              height: isOpen ? 'auto' : 0,
              opacity: isOpen ? 1 : 0,
            }}
            transition={{
              height: { duration: ACCORDION_DURATION, ease: ACCORDION_EASE },
              opacity: { duration: ACCORDION_DURATION, ease: ACCORDION_EASE },
            }}
            className="overflow-hidden"
          >
            <p className="text-white font-inter font-normal sm:text-base text-base leading-[24px] tracking-[0.01em] pt-0.5 sm:p-0 p-5 ">
              {answer}
            </p>
          </motion.div>
        </span>

        {/* + / − visible on md only (end of row) */}
        <span className="hidden  shrink-0" aria-hidden>
          <span className="relative w-8 h-8 flex items-center justify-center text-white text-xl font-light leading-none">
          <span
            className={`absolute inset-0 flex items-center justify-center ${isOpen ? 'opacity-0' : 'opacity-100'}`}
            style={{ transition: `opacity ${ACCORDION_DURATION}s cubic-bezier(${ACCORDION_EASE.join(',')})` }}
          >
            +
          </span>
          <span
            className={`absolute inset-0 flex items-center justify-center ${isOpen ? 'opacity-100' : 'opacity-0'}`}
            style={{ transition: `opacity ${ACCORDION_DURATION}s cubic-bezier(${ACCORDION_EASE.join(',')})` }}
          >
            −
          </span>
          </span>
        </span>
      </button>
    </div>
  );
}
