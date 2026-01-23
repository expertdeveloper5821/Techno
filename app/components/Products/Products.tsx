'use client';

import { motion } from 'framer-motion';
import { fadeInUp, fadeInRight } from '@/app/lib/animations';
import Image from 'next/image';

const products = [
  {
    id: '1',
    title: 'Blocktech Platform',
    description: 'A powerful CRM platform designed to manage leads, automate sales workflows, and improve customer relationships. It helps teams work smarter with real-time insights, secure data handling, and scalable performance built for growing businesses.',
  },
  {
    id: '2',
    title: 'ShopEase E-Commerce App',
    description: 'A modern e-commerce application built to deliver seamless shopping experiences across devices. It includes secure payment integration, smart product management, and performance optimization to increase conversions.',
  },
  {
    id: '3',
    title: 'HealthTrack Mobile App',
    description: 'A user-friendly health and fitness app that helps users track daily activities and monitor progress. With intelligent reports and engaging design, it encourages healthier habits and long-term user retention.',
  },
  {
    id: '4',
    title: 'EduLearn Learning Platform',
    description: 'An interactive online learning platform developed for courses, video lessons, and assessments. Designed with accessibility and intuitive navigation, it delivers a smooth and engaging learning experience.',
  },
  {
    id: '5',
    title: 'RealNest Property Website',
    description: 'A professional real estate website created to showcase properties with advanced search and filtering options. Built to attract potential buyers, it focuses on lead generation and strong visual presentation.',
  },
  {
    id: '6',
    title: 'FoodieGo Delivery App',
    description: 'A fast and reliable food delivery application with real-time order tracking and easy checkout. Designed for performance and usability, it ensures smooth ordering experiences for customers.',
  },
  {
    id: '7',
    title: 'FinGrow Business Website',
    description: 'A corporate website designed for finance and consulting businesses to showcase services and expertise. Built to establish trust and credibility, it strengthens brand presence and customer confidence.',
  },
  {
    id: '8',
    title: 'Eventify Event Management System',
    description: 'An all-in-one event management system for handling registrations, payments, and attendee tracking. It simplifies event planning through automation and a clean, user-friendly interface.',
  },
];

export default function Products() {
  return (
    <section id="products" className="py-24 bg-[#1a1a1a] text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* The Grid container defines the scroll area */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          
          {/* --- Left Column: STICKY --- */}
          {/* 
              sticky + top-32 makes this side stay on screen 
              while the right side moves as you scroll the page.
          */}
          <div className="lg:sticky lg:top-32 h-fit">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="mb-10"
            >
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight tracking-tight mb-6">
                Discover How We <br/> Transform Ideas Into <br/>
                <span className="text-gray-400">Impactful Products</span>
              </h2>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              transition={{ delay: 0.2 }}
              className="relative w-full rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-white"
            >
              {/* Image showing the top part as requested */}
              <Image
                src="/blocktech.png"
                alt="Product Preview"
                width={800}
                height={600}
                className="w-full h-auto object-cover object-top"
              />
            </motion.div>
          </div>

          {/* --- Right Column: FLOWING LIST --- */}
          {/* 
              Removed the fixed height and internal overflow.
              Now, when you scroll the entire section, these cards move.
          */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInRight}
            className="space-y-4"
          >
            {products.map((product) => (
              <div 
                key={product.id}
                className="group p-8 rounded-2xl bg-[#222] border border-white/5 hover:bg-[#2a2a2a] transition-all duration-300 cursor-pointer"
              >
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-bold text-white group-hover:text-[#008AC9] transition-colors">
                    {product.title}
                  </h3>
                  {/* Arrow Icon */}
                  <span className="text-gray-500 group-hover:text-[#008AC9] transition-colors transform group-hover:translate-x-1 duration-300">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                    </svg>
                  </span>
                </div>
                <p className="text-gray-400 text-sm leading-relaxed">
                  {product.description}
                </p>
              </div>
            ))}
          </motion.div>

        </div>
      </div>
    </section>
  );
}