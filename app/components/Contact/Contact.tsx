'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { fadeInLeft, fadeInRight } from '@/app/lib/animations';
import Image from 'next/image';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    // Basic validation
    if (!formData.name || !formData.email || !formData.phone || !formData.message) {
      setSubmitStatus('error');
      setIsSubmitting(false);
      return;
    }

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setSubmitStatus('success');
      setFormData({ name: '', email: '', phone: '', message: '' });
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className=" bg-[#e5e5e5] ml-[-40px]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-stretch">
          
          {/* Left Side - Image */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInLeft}
            className="relative min-h-[500px] h-full w-full overflow-hidden shadow-xl"
          >
            {/* 
               Ensure you have an image at /contact/contact.jpg 
               'grayscale' class added to match the black & white look in screenshot
            */}
            <Image
              src="/contact/contact.jpg"
              alt="Contact us"
              fill
              className="object-cover grayscale"
              priority
            />
          </motion.div>

          {/* Right Side - Form */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInRight}
            className="flex flex-col justify-center py-20"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#1a1a1a] mb-6 leading-tight">
              Have Any Questions on <br/> Your Mind? Get in Touch
            </h2>
            <p className="text-gray-600 text-lg mb-10 leading-relaxed">
              We’re here to help—let’s discuss your ideas, goals, and next big project.
            </p>

            <form onSubmit={handleSubmit} className="space-y-5">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your Name"
                className="w-full px-6 py-4 bg-white rounded-xl text-gray-800 placeholder-gray-400 border border-transparent focus:border-[#008AC9] focus:outline-none focus:ring-0 transition-all shadow-sm"
              />

              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Your Email"
                className="w-full px-6 py-4 bg-white rounded-xl text-gray-800 placeholder-gray-400 border border-transparent focus:border-[#008AC9] focus:outline-none focus:ring-0 transition-all shadow-sm"
              />

              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Your Phone"
                className="w-full px-6 py-4 bg-white rounded-xl text-gray-800 placeholder-gray-400 border border-transparent focus:border-[#008AC9] focus:outline-none focus:ring-0 transition-all shadow-sm"
              />

              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Message"
                rows={6}
                className="w-full px-6 py-4 bg-white rounded-xl text-gray-800 placeholder-gray-400 border border-transparent focus:border-[#008AC9] focus:outline-none focus:ring-0 transition-all resize-none shadow-sm"
              />

              {submitStatus === 'success' && (
                <div className="text-green-600 font-medium px-2">
                  Message sent successfully!
                </div>
              )}

              {submitStatus === 'error' && (
                <div className="text-red-600 font-medium px-2">
                  Please fill in all fields.
                </div>
              )}

              <motion.button
                type="submit"
                disabled={isSubmitting}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-[#008AC9] text-white text-lg font-bold px-6 py-4 rounded-xl hover:bg-[#007bb3] transition-colors shadow-md disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Sending...' : 'Contact us'}
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}