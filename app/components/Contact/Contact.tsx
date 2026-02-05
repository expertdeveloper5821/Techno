'use client';

import { useState } from 'react';

const contactBlocks = [
  {
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    title: 'Email',
    description: 'Our friendly team is here to help.',
    value: 'info@technogetic.com',
    href: 'mailto:info@technogetic.com',
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
      </svg>
    ),
    title: 'Phone',
    description: 'Mon-Fri from 8am to 5pm.',
    value: '+91-9779992829',
    href: 'tel:+919779992829',
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    title: 'Office',
    description: 'Come say hello at our office HQ.',
    value: '1st floor, Nexa Square, C-209/B, Phase 8B, Sec 74, Mohali, Punjab.',
    href: undefined,
  },
];

export default function Contact() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    message: '',
    agreePrivacy: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const name = e.target.name;
    const value = e.target.type === 'checkbox' ? (e.target as HTMLInputElement).checked : e.target.value;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    if (
      !formData.firstName ||
      !formData.lastName ||
      !formData.email ||
      !formData.message ||
      !formData.agreePrivacy
    ) {
      setSubmitStatus('error');
      setIsSubmitting(false);
      return;
    }

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setSubmitStatus('success');
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        message: '',
        agreePrivacy: false,
      });
    } catch {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-16 sm:pb-20  pt-5 bg-[#161616] relative z-10 ">
      <div className= "bg-[#0a0a0a] h-30 w-full   absolute top-0 left-0 right-0 z-[-1] " ></div>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[1068px]">
        <div className="rounded-2xl overflow-hidden bg-[linear-gradient(193.06deg,#52BBEF_5.92%,#0181EC_89.21%)] p-8 sm:p-10 lg:p-12 static -top-24 z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Left – Contact form */}
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">Get in touch</h2>
              <p className="text-white/90 text-sm sm:text-base mb-6">
                We&apos;d love to hear from you. Please fill out this form.
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="firstName" className="block text-white text-sm font-medium mb-1.5">
                      First name
                    </label>
                    <input
                      id="firstName"
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      placeholder="First name"
                      className="w-full px-4 py-3 rounded-lg bg-[#0ea5e9]/20 border border-white/40 text-white placeholder-gray-300 focus:border-white focus:outline-none focus:ring-1 focus:ring-white/50 transition-colors"
                    />
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block text-white text-sm font-medium mb-1.5">
                      Last name
                    </label>
                    <input
                      id="lastName"
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      placeholder="Last name"
                      className="w-full px-4 py-3 rounded-lg bg-[#0ea5e9]/20 border border-white/40 text-white placeholder-gray-300 focus:border-white focus:outline-none focus:ring-1 focus:ring-white/50 transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className="block text-white text-sm font-medium mb-1.5">
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="you@company.com"
                    className="w-full px-4 py-3 rounded-lg bg-[#0ea5e9]/20 border border-white/40 text-white placeholder-gray-300 focus:border-white focus:outline-none focus:ring-1 focus:ring-white/50 transition-colors"
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-white text-sm font-medium mb-1.5">
                    Phone number
                  </label>
                  <div className="flex rounded-lg overflow-hidden border border-white/40 bg-[#0ea5e9]/20 focus-within:border-white focus-within:ring-1 focus-within:ring-white/50">
                    <select
                      name="countryCode"
                      aria-label="Country code"
                      className="px-3 py-3 bg-transparent text-white text-sm border-r border-white/40 focus:outline-none"
                    >
                      <option value="IN" className="bg-[#004b75] text-white">IN</option>
                      <option value="US" className="bg-[#004b75] text-white">US</option>
                      <option value="UK" className="bg-[#004b75] text-white">UK</option>
                    </select>
                    <input
                      id="phone"
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+91000-0000"
                      className="flex-1 min-w-0 px-4 py-3 bg-transparent text-white placeholder-gray-300 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="block text-white text-sm font-medium mb-1.5">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Leave us a message..."
                    rows={4}
                    className="w-full px-4 py-3 rounded-lg bg-[#0ea5e9]/20 border border-white/40 text-white placeholder-gray-300 focus:border-white focus:outline-none focus:ring-1 focus:ring-white/50 transition-colors resize-none"
                  />
                </div>

                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    name="agreePrivacy"
                    checked={formData.agreePrivacy}
                    onChange={handleChange}
                    className="mt-1 w-4 h-4 rounded border-white/40 bg-[#0ea5e9]/20 text-[#008AC9] focus:ring-white/50"
                  />
                  <span className="text-white/90 text-sm">
                    You agree to our friendly privacy policy.
                  </span>
                </label>

                {submitStatus === 'success' && (
                  <p className="text-green-200 text-sm font-medium">Message sent successfully!</p>
                )}
                {submitStatus === 'error' && (
                  <p className="text-red-200 text-sm font-medium">Please fill in all required fields and accept the privacy policy.</p>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 px-6 rounded-lg bg-linear-to-r from-[#1a1a1a] to-[#0a0a0a] text-white font-semibold hover:opacity-95 transition-opacity disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Sending...' : 'Submit'}
                </button>
              </form>
            </div>

            {/* Right – Contact info */}
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">
                We&apos;d love to hear from you
              </h2>
              <p className="text-white/90 text-sm sm:text-base mb-8">
                Need something cleared up? Here are our most frequently asked questions.
              </p>

              <div className="space-y-6">
                {contactBlocks.map((block) => (
                  <div key={block.title} className="flex gap-4">
                    <div className="shrink-0 w-10 h-10 rounded-lg border border-white/40 bg-[#0ea5e9]/20 flex items-center justify-center text-white">
                      {block.icon}
                    </div>
                    <div>
                      <h3 className="text-white font-bold text-base mb-1">{block.title}</h3>
                      <p className="text-white/90 text-sm mb-1">{block.description}</p>
                      {block.href ? (
                        <a
                          href={block.href}
                          className="text-white text-sm font-medium hover:underline"
                        >
                          {block.value}
                        </a>
                      ) : (
                        <p className="text-white text-sm font-medium">{block.value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
