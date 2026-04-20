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
    title: 'Understand Your Requirements',
    description:
      'We take time to understand your business processes, challenges, and goals so we can define a solution that actually fits your needs.',
  },
  {
    id: 2,
    title: 'Plan the Right Solution',
    description:
      'We create a clear structure and approach based on your requirements, ensuring the system is simple, scalable, and aligned with your business operations.',
  },
  {
    id: 3,
    title: 'Build and Implement the System',
    description:
      'We develop the solution with a focus on performance, usability, and reliability, ensuring smooth functionality and seamless integration into your existing workflows.',
  },
  {
    id: 4,
    title: 'Support and Improve Continuously',
    description:
      'After deployment, we monitor performance, make improvements, and provide ongoing support to ensure the system continues to perform as your business grows.',
  },
];



function ServiceCard({ title, description, id }: EdtechServiceItem) {
  return (
    <div className="flex h-full flex-col gap-4 rounded-xl bg-[#000000] p-8 ring-1 ring-white/10">
      <div className="flex items-start justify-between">
         <h1 className='text-2xl  py-1 px-3 rounded-sm bg-[#FFFFFF1A] font-medium leading-[30px] tracking-[1%] text-white'>{id}</h1>
      </div>
      <div className="space-y-2">
        <h3 className="text-xl  font-medium leading-[30px] tracking-[1%] text-white">{title}</h3>
      </div>
      <p className="md:text-lg text-base leading-[25.8px] tracking-[1%] text-[#CDCDCD]">{description}</p>
    </div>
  );
}

export default function Strategies() {
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
              <ServiceCard id={service.id} title={service.title} description={service.description} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

