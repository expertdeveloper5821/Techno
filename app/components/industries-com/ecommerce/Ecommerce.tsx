'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { fadeInUp } from '@/app/lib/animations';

interface Challenge {
    id: number;
    title: string;
    description: string;
}

const challenges: Challenge[] = [
    {
        id: 1,
        title: 'Inventory Management Issues',
        description:
            'Managing inventory across multiple platforms often leads to mismatches, delays, and operational inefficiencies.',
    },
    {
        id: 2,
        title: 'Checkout Abandonment Rates',
        description:
            'Complex checkout processes or slow pages cause users to leave before completing purchases.',
    },
    {
        id: 3,
        title: 'System Integration Challenges',
        description:
            'Lack of integration between tools creates inefficiencies and disrupts smooth business operations.',
    },
    {
        id: 4,
        title: 'High Traffic Performance',
        description:
            'Handling sudden traffic spikes during sales can slow systems and affect user experience.',
    },
    {
        id: 5,
        title: 'Data Security Concerns',
        description:
            'Protecting customer data and transactions is critical to avoid risks and maintain trust.',
    },
    {
        id: 6,
        title: 'Scalability Limitations',
        description:
            'Many platforms struggle to scale efficiently with growing demand and business expansion needs.',
    },
];

/** Faint 4×4 grid + centered blue check — vector, no raster */
function GridCheckIcon(props: React.SVGProps<SVGSVGElement>) {
    const uid = React.useId().replace(/:/g, '');
    const vignetteId = `ecom-grid-vignette-${uid}`;
    const maskId = `ecom-grid-mask-${uid}`;

    const gridStroke = 'rgba(255, 255, 255, 0.12)';
    const xs = [28, 68, 108, 148, 188];
    const ys = [19, 59, 99, 139, 179];

    return (
        <svg
            viewBox="0 0 216 198"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden
            {...props}
        >
            <defs>
                <radialGradient id={vignetteId} cx="50%" cy="50%" r="58%" fx="50%" fy="50%">
                    <stop offset="0%" stopColor="#ffffff" />
                    <stop offset="50%" stopColor="#ffffff" />
                    <stop offset="100%" stopColor="#000000" />
                </radialGradient>
                <mask id={maskId} maskUnits="userSpaceOnUse" x="0" y="0" width="216" height="198">
                    <rect width="216" height="198" fill={`url(#${vignetteId})`} />
                </mask>
            </defs>
            <g mask={`url(#${maskId})`}>
                {xs.map((x) => (
                    <line
                        key={`v-${x}`}
                        x1={x}
                        y1={19}
                        x2={x}
                        y2={179}
                        stroke={gridStroke}
                        strokeWidth={1}
                    />
                ))}
                {ys.map((y) => (
                    <line
                        key={`h-${y}`}
                        x1={28}
                        y1={y}
                        x2={188}
                        y2={y}
                        stroke={gridStroke}
                        strokeWidth={1}
                    />
                ))}
            </g>
            <path
                d="M 86 99 L 104 117 L 134 79"
                stroke="#3b82f6"
                strokeWidth={5}
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
            />
        </svg>
    );
}

function ChallengeCard({ title, description }: Omit<Challenge, 'id'>) {
    return (
        <div className=" h-full md:h-[414px]   flex flex-col items-center rounded-xl border border-white/10 bg-[#0a0a0a] px-6 py-8 text-center transition-colors hover:border-white/15">
            <div className="relative mb-6 flex h-[197px] w-[215px] items-center justify-center">
                <GridCheckIcon className="h-full w-full max-h-[198px] max-w-[216px]" />
            </div>
            <h3 className="mb-3 text-center text-base font-medium bg-[linear-gradient(237.1deg,_#35A9F4_24.76%,_#0088FF_69.64%)] bg-clip-text text-transparent md:text-xl leading-[34px] tracking-[1%]">
                {title}
            </h3>
            <p className="text-base text-center text-[#9ca3af] md:text-lg  md:leading-[27.8px] tracking-[1%]">
                {description}
            </p>
        </div>
    );
}

function Ecommerce() {
    return (
        <section

            className="bg-[#000000] text-white w-full mx-auto lg:pt-24 lg:pb-24 md:pt-15 md:pb-15 pt-10 pb-10"
        >
            <div className="flex flex-col justify-center  px-4 sm:px-6 lg:px-6">
                {/* Heading */}
                <motion.div 
               
                 initial="hidden"
                 whileInView="visible"
                 viewport={{ once: true }}
                 variants={fadeInUp}
               
                className="max-w-3xl mx-auto text-center mb-10 md:mb-14">
                    <h2 className="text-[25px] md:text-4xl lg:text-[44px] font-semibold mb-6">
                    Common E-Commerce Challenges
                    </h2>
                    <p className="text-base md:text-lg leading-[28px] text-[#ffff]">
                    These are some of the key issues businesses face while managing platforms, users, and operations at scale.
                    </p>
                </motion.div>

                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {challenges.map((challenge, index) => (
                        <motion.div
                            key={challenge.id}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            variants={fadeInUp}
                            transition={{ delay: index * 0.05 }}
                        >
                            <ChallengeCard
                                title={challenge.title}
                                description={challenge.description}
                            />
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default Ecommerce;
