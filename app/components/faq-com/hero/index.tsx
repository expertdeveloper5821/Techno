'use client';

import { motion } from 'framer-motion';
import { fadeInUp } from '@/app/lib/animations';

export default function Hero() {
    return (
        // Use inline backgroundImage for reliable asset resolution in all builds.
        <section
            className="relative pb-10  pt-40  sm:pt-40  sm:pb-40 flex flex-col items-center justify-center overflow-hidden z-10 bg-cover bg-center bg-no-repeat "
            style={{ backgroundImage: "url('/faq/faqHero.webp')" }}
        >
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10  content-baseline  ">
                <div className='max-w-lg' >
                <motion.h1 initial="hidden"
                    animate="visible"
                    variants={fadeInUp}
                    transition={{ delay: 0.2 }}
                    className="font-inter mb-[20px] mx-auto
                     sm:mb-0 font-semibold text-[24px]
                      md:text-[40px] lg:text-[44spx] leading-[30px] 
                      lg:leading-[60px] md:leading-[50px] tracking-[0.01em]
                       text-white">
                   Got Questions? We’ve Got Answers.
                </motion.h1>
                <motion.p
                    initial="hidden"
                    animate="visible"
                    variants={fadeInUp}
                    transition={{ delay: 0.2 }}
                    className="text-white font-normal font-inter  text-base sm:text-xl max-w-5xl   mb-10 leading-relaxed  md:pt-6 tracking-[0.03em] "
                >
                   Everything you need to know about working with Technogetic, all in one place.
                </motion.p>
                </div>
            </div>
        </section>
    );
}