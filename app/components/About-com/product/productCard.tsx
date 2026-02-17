'use client';

import { motion } from 'framer-motion';
import { fadeInRight } from '@/app/lib/animations';

interface ProductCardProps {
  title: string;
  description: string;
  index: number;
}

export default function ProductCard({ title, description, index }: ProductCardProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-50px' }}
      variants={fadeInRight}
      transition={{ delay: index * 0.1 }}
      className="group cursor-pointer p-6 bg-dark-gray/50 rounded-lg border border-gray-700 hover:border-primary-blue transition-all duration-300"
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <h3 className="text-white text-xl font-semibold mb-3 group-hover:text-primary-blue transition-colors">
            {title}
          </h3>
          <p className="text-gray-400 leading-relaxed">
            {description}
          </p>
        </div>
        <motion.div
          whileHover={{ x: 5 }}
          className="ml-4 text-primary-blue text-2xl"
        >
          &gt;
        </motion.div>
      </div>
    </motion.div>
  );
}

