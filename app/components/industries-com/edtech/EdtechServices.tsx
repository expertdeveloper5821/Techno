'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { fadeInUp } from '@/app/lib/animations';

interface EdtechServiceItem {
  id: number;
  title: string;
  description: string;
}

const services: EdtechServiceItem[] = [
  {
    id: 1,
    title: 'Learning Management Systems (LMS)',
    description:
      'We build scalable LMS platforms that support course management, live sessions, and student tracking while delivering a smooth and engaging learning experience.',
  },
  {
    id: 2,
    title: 'Interactive Learning Platforms',
    description:
      'We develop interactive platforms with quizzes, video content, and real-time engagement features to make learning more effective and enjoyable for students.',
  },
  {
    id: 3,
    title: 'Mobile Learning Applications',
    description:
      'We create mobile apps that allow students to access courses anytime, ensuring flexibility, accessibility, and a consistent learning experience across devices.',
  },
  {
    id: 4,
    title: 'Assessment & Analytics Systems',
    description:
      'We design systems to track student performance, generate insights, and help educators make data-driven decisions to improve learning outcomes.',
  },
];



function ServiceCard({ title, description }: Omit<EdtechServiceItem, 'id'>) {
  return (
    <div className="flex h-full flex-col gap-4 rounded-xl bg-[#000000] p-8 ring-1 ring-white/10">
      <div className="flex items-start justify-between">
      <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
<rect width="32" height="32" rx="6" fill="white" fill-opacity="0.1"/>
<path d="M8.46094 16.3592L13.4869 21.3852L23.5389 10.6152" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
      </div>
      <div className="space-y-2">
        <h3 className="text-xl  font-medium leading-[30px] tracking-[1%] text-white">{title}</h3>
      </div>
      <p className="md:text-lg text-base leading-[25.8px] tracking-[1%] text-[#CDCDCD]">{description}</p>
    </div>
  );
}

export default function EdtechServices() {
  return (
    <section className="lg:pt-24 lg:pb-24 md:pt-15 md:pb-15 pt-10 pb-10  text-white w-full mx-auto px-4 sm:px-6 lg:px-6 bg-cover bg-center bg-no-repeat bg-[#000000] "  >
      <div className="mx-auto  px-4 sm:px-6 lg:px-14 bg-[#0094DB] rounded-2xl  py-20">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="mx-auto mb-8 max-w-3xl text-center md:mb-10"
        >
          <h2 className="text-[25px] md:text-4xl lg:text-[44px] font-semibold mb-6">
            Our Versatile Development Services for
            the EdTech Sector
          </h2>
        </motion.div>

        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              transition={{ delay: index * 0.05 }}
              className="h-full"
            >
              <ServiceCard title={service.title} description={service.description} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

