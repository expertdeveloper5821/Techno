'use client';

import { motion } from 'framer-motion';
import { fadeInUp, scaleIn } from '@/app/lib/animations';

const FALLBACK_DATA = [
  {
    _id: 'fallback',
    heading: 'Understanding the E-Commerce Landscape',
    paragraphs:
      'E-commerce businesses operate in a highly competitive and fast-moving environment where customer expectations continue to rise. From browsing to checkout, every step needs to be smooth, fast, and reliable.\nWe focus on building systems that not only support daily operations but also help businesses scale efficiently as demand grows.',
    highlightText:
      'At Technogetic, great technology starts with great people, driven by innovation and collaboration.',
    feature1: 'Seamless shopping experience across web and mobile platforms.',
    feature2: 'Secure and reliable payment processing for smooth transactions.',
    feature3: 'Scalable systems to handle traffic spikes and business growth.',
    image: '/About/Intro/intro.webp',
  },
];

interface LandscapeData {
  _id: string;
  heading: string;
  paragraphs?: string;
  paragraph1?: string;
  paragraph2?: string;
  highlightText: string;
  feature1: string;
  feature2: string;
  feature3: string;
  image: string;
}

interface LandscapeProps {
  items?: LandscapeData[];
}

export default function Landscape({ items: propItems }: LandscapeProps) {
  const displayItems = propItems && propItems.length > 0 ? propItems : FALLBACK_DATA;

  return (
    <section
      id="about"
      className="lg:pt-20 lg:pb-24 md:pt-15 md:pb-15 pt-10 pb-10 bg-[#000000] text-white w-full mx-auto px-4 sm:px-6 lg:px-6"
    >
      <div className="flex flex-col gap-16">
        {displayItems.map((item, idx) => {
          const features = [item.feature1, item.feature2, item.feature3].filter(Boolean);
          const imageLeft = idx % 2 === 0;

          return (
            <div
              key={item._id}
              className="grid lg:grid-cols-[4fr_6fr] items-start"
            >
              {/* Left: Image */}
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={scaleIn}
                className="w-full lg:h-full lg:block hidden"
              >
                <div className="relative w-full h-full xl:h-[585px] rounded-l-2xl overflow-hidden">
                  <img
                    src={item.image || '/About/Intro/intro.webp'}
                    alt={item.heading}
                    className="lg:object-cover object-contain h-full w-full rounded-l-2xl"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    loading="lazy"
                  />
                </div>
              </motion.div>

              {/* Right: Content */}
              <div className="flex flex-col h-full gap-6 bg-[#111517] p-6 lg:rounded-tl-none lg:rounded-bl-none lg:rounded-tr-2xl lg:rounded-br-2xl rounded-2xl">
                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeInUp}
                  transition={{ delay: 0.2 }}
                  className="space-y-10 mt-2"
                >
                  <h1 className="font-semibold text-[25px] sm:text-xl md:text-4xl lg:text-[44px] lg:leading-[60px] md:leading-[50px] leading-[32px] !mb-1">
                    {item.heading}
                  </h1>
                  {(item.paragraphs || [(item as Record<string, unknown>).paragraph1, (item as Record<string, unknown>).paragraph2].filter(Boolean).join('\n') || '')
                    .split('\n')
                    .filter((line) => line.trim() !== '')
                    .map((line, i) => (
                      <p key={i} className="text-[#FFFFFF] text-lg leading-[28.8px] font-inters tracking-[1%] mb-6! sm:mb-2 max-w-2xl">
                        {line}
                      </p>
                    ))}

                  {/* Mobile image */}
                  {item.image && (
                    <div className="lg:hidden w-full h-56 rounded-2xl overflow-hidden">
                      <img
                        src={item.image}
                        alt={item.heading}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    </div>
                  )}

                  <div className="space-y-4">
                    {features.map((feature, index) => (
                      <div key={index} className="flex items-center space-x-3">
                        <div className="shrink-0 w-6 h-6 rounded-full bg-[#008AC9] flex items-center justify-center">
                          <svg
                            className="w-3.5 h-3.5 text-white"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            strokeWidth="3"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <span className="text-white text-lg font-medium leadinng-[34px] tracking-wide">
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>
                </motion.div>

                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeInUp}
                  transition={{ delay: 0.2 }}
                  className="space-y-10 mt-2"
                >
                  <p className="text-[#FFDF51] text-base leading-[24px] tracking-[1%] max-w-2xl">
                    {item.highlightText}
                  </p>
                </motion.div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
