'use client';

import { motion, AnimatePresence } from 'framer-motion';

interface FAQItemProps {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
}

export default function FAQItem({ question, answer, isOpen, onToggle }: FAQItemProps) {
  return (
    <div 
      className={`
        rounded-xl overflow-hidden transition-all duration-300
        ${isOpen 
          ? 'bg-linear-to-b from-[#E0F7FF] to-[#F0FAFF] shadow-sm' 
          : 'bg-white'
        }
      `}
    >
      <button
        onClick={onToggle}
        className="w-full px-6 py-5 flex items-center justify-between text-left"
      >
        <span className={`text-md font-bold transition-colors ${isOpen ? 'text-[#008AC9]' : 'text-[#1a1a1a]'}`}>
          {question}
        </span>
        
        {/* Toggle Icon */}
        <div className={`
          shrink-0 w-8 h-8 rounded-lg flex items-center justify-center transition-colors
          ${isOpen ? 'bg-[#008AC9] text-white' : 'bg-[#F3F4F6] text-[#1a1a1a]'}
        `}>
          <span className="text-xl font-bold leading-none mb-0.5">
            {isOpen ? '−' : '+'}
          </span>
        </div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-6 text-gray-600 text-sm leading-relaxed">
              {answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}