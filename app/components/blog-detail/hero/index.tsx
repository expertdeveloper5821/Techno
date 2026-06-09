'use client';

import type { FC, SVGProps } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { fadeInUp } from '@/app/lib/animations';
import ChevronRightIconImport from '@/app/lib/icon/chevron-right-icon';
type IconProps = SVGProps<SVGSVGElement> & { width?: number; height?: number; color?: string };
const ChevronRightIcon = ChevronRightIconImport as FC<IconProps>;

interface BlogDetailHeroProps {
  title?: string;
  category?: string;
  date?: string;
}

export default function BlogDetailHero({ title, category, date }: BlogDetailHeroProps) {
  return (
    <section className="relative pt-40 pb-10 sm:pt-48 sm:pb-40 flex flex-col items-center justify-center overflow-hidden z-10 bg-[#000000]">

      <div className="absolute md:bottom-20 bottom-0 w-full h-full">
        <Image
          src="/About/hero/hero.svg"
          alt="Hero illustration"
          width={600}
          height={400}
          className="w-full h-full object-cover"
          priority
          sizes="100vw"
        />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 mb-10">
        <div className="max-w-5xl mx-auto text-center">
          <motion.h1
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            className="font-inter mb-[20px] mx-auto sm:mb-0 font-semibold text-[24px] md:text-[40px] lg:text-[44px] leading-[30px] lg:leading-[60px] md:leading-[50px] tracking-[0.01em] text-white"
          >
            {title || "Blog Detail"}
          </motion.h1>

          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            transition={{ delay: 0.4 }}
            className="mt-6"
          >
            <span className="group inline-flex gap-2 items-center bg-transparent text-[#ffff] px-3 md:px-6 py-1 md:py-2 rounded-full text-lg font-semibold transition-colors shadow-lg border border-[#B8B8B833]">
              <span className="text-[#CECECE]"><a href="/">Home</a></span>
              <ChevronRightIcon width={7} height={11} color="#CECECE" className="inline-block" />
              <span className="text-[#CECECE]"><a href="/blog">Blogs</a></span>
              <ChevronRightIcon width={7} height={11} color="#CECECE" className="inline-block" />
              <span>{category || "Article"}</span>
            </span>
          </motion.div>
        </div>
      </div>

      {date && (
        <h2 className="font-semibold text-xl leading-8 tracking-[1%] text-white">
          Published: {date}
        </h2>
      )}
    </section>
  );
}
