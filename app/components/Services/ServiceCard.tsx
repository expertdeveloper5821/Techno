'use client';

import { motion } from 'framer-motion';
import { hoverScale, scaleIn } from '@/app/lib/animations';
import Image from 'next/image';

interface ServiceCardProps {
  title: string;
  image: string;
  index: number;
}

export default function ServiceCard({ title, image, index }: ServiceCardProps) {
  // Cards tilt towards the center: left cards tilt right, center is straight, right cards tilt left
  // Index: 0=Digital Marketing (left), 1=Web Dev (left), 2=Mobile App (center), 3=UI/UX (right), 4=Cloud (right)
  const rotations = [3, 2, 0, -2, -3]; // Left cards tilt right (+), center straight (0), right cards tilt left (-)
  const rotation = rotations[index] || 0;

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-100px' }}
      variants={scaleIn}
      transition={{ delay: index * 0.1 }}
      whileHover={{ scale: 1.05, rotate: 0, transition: { duration: 0.3 } }}
      style={{ rotate: `${rotation}deg` }}
      className="relative group cursor-pointer"
    >
      <div className="relative overflow-hidden rounded-lg border-2 border-primary-blue/30 bg-dark-gray/50 backdrop-blur-sm transform transition-all duration-300 group-hover:border-primary-blue group-hover:shadow-lg group-hover:shadow-primary-blue/50">
        {/* Image container */}
        <div className="relative h-48 sm:h-56 md:h-64 overflow-hidden">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
          />
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-linear-to-t from-dark-bg/90 via-dark-bg/50 to-transparent" />
        </div>
        
        {/* Title */}
        <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6">
          <h3 className="text-white text-lg sm:text-xl font-semibold">
            {title}
          </h3>
        </div>
      </div>
    </motion.div>
  );
}

