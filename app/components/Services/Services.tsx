'use client';

import React from 'react';
import ServiceSlider from './ServiceSlider'; // Import the reusable slider

export default function Services() {
  return (
    <section className="py-24 bg-[#e5e5e5] overflow-hidden min-h-[900px] flex flex-col justify-center">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 mb-10">
        <div className="flex flex-col lg:flex-row justify-between items-start gap-10">
          <h2 className="text-4xl md:text-5xl lg:text-5xl font-bold text-[#1a1a1a] leading-[1.1] tracking-tight max-w-6xl">
            We deliver exceptional value through innovative, tailored solutions.
          </h2>
          <a href="#services" className="hidden lg:inline-flex items-center justify-center px-8 py-3.5 text-base font-bold text-white transition-all duration-200 bg-[#008AC9] rounded-full hover:bg-[#0073a8] shadow-lg whitespace-nowrap">
            Explore Services &gt;
          </a>
        </div>
        <p className="mt-8 text-lg text-gray-700 max-w-6xl leading-relaxed">
        At Technogetic, we are at the forefront of technological innovation, dedicated to delivering cutting-edge IT solutions that drive business success. Founded in 2018, our mission is to redefine the digital landscape by providing reliable and scalable technology solutions.
        </p>
      </div>

      {/* Use the slider in LIGHT mode */}
      <ServiceSlider theme="light" />
    </section>
  );
}