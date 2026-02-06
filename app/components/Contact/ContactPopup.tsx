'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { sendContactForm } from '@/app/lib/contact-api';

const STORAGE_KEY = 'technogetic_contact_popup_shown';

export default function ContactPopup() {
  const [isOpen, setIsOpen] = useState(true);
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

  const closePopup = useCallback(() => {
    setIsOpen(false);
    if (typeof window !== 'undefined') {
      try {
        sessionStorage.setItem(STORAGE_KEY, 'true');
      } catch {
        // ignore
      }
    }
  }, []);

  // Mark as shown when popup is displayed (loader controls when we mount)
  useEffect(() => {
    if (typeof window === 'undefined' || !isOpen) return;
    try {
      sessionStorage.setItem(STORAGE_KEY, 'true');
    } catch {
      // ignore
    }
  }, [isOpen]);

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
      const result = await sendContactForm(formData);
      if (result.ok) {
        setSubmitStatus('success');
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          message: '',
          agreePrivacy: false,
        });
        setTimeout(closePopup, 1500);
      } else {
        setSubmitStatus('error');
      }
    } catch {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="  fixed  inset-0 z-100 flex items-center justify-center p-4 bg-red-500"
      role="dialog"
      aria-modal="true"
      aria-labelledby="contact-popup-title"
    >
      {/* Backdrop */}
      <button
        type="button"
        onClick={closePopup}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        aria-label="Close"
      />

      {/* Modal card */}
      <div className="relative w-full max-w-lg  overflow-y-auto rounded-2xl bg-[#0094DB] p-6 sm:p-8 shadow-2xl transition-all duration-200 ease-out opacity-100 scale-100">
        <button
          type="button"
          onClick={closePopup}
          className="absolute top-4 right-4 p-1.5 rounded-lg text-white/90 hover:text-white hover:bg-white/20 transition-colors"
          aria-label="Close"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <h2 id="contact-popup-title" className="text-2xl font-bold text-white mb-1 pr-10">
          Get in touch
        </h2>
       

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="popup-firstName" className="block text-white text-sm font-medium mb-1.5">
                First name
              </label>
              <input
                id="popup-firstName"
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                placeholder="First name"
                className="w-full px-4 py-2 rounded-lg bg-[#0ea5e9]/20 border border-white/40 text-white placeholder-gray-300 focus:border-white focus:outline-none focus:ring-1 focus:ring-white/50 transition-colors"
              />
            </div>
            <div>
              <label htmlFor="popup-lastName" className="block text-white text-sm font-medium mb-1.5">
                Last name
              </label>
              <input
                id="popup-lastName"
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                placeholder="Last name"
                className="w-full px-4 py-2 rounded-lg bg-[#0ea5e9]/20 border border-white/40 text-white placeholder-gray-300 focus:border-white focus:outline-none focus:ring-1 focus:ring-white/50 transition-colors"
              />
            </div>
          </div>

          <div>
            <label htmlFor="popup-email" className="block text-white text-sm font-medium mb-1.5">
              Email
            </label>
            <input
              id="popup-email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="you@company.com"
              className="w-full px-4 py-2 rounded-lg bg-[#0ea5e9]/20 border border-white/40 text-white placeholder-gray-300 focus:border-white focus:outline-none focus:ring-1 focus:ring-white/50 transition-colors"
            />
          </div>

          <div>
            <label htmlFor="popup-phone" className="block text-white text-sm font-medium mb-1.5">
              Phone number
            </label>
            <div className="flex rounded-lg overflow-hidden border border-white/40 bg-[#0ea5e9]/20 focus-within:border-white focus-within:ring-1 focus-within:ring-white/50">
              <select
                name="countryCode"
                aria-label="Country code"
                className="px-3 py-2 bg-transparent text-white text-sm border-r border-white/40 focus:outline-none"
              >
                <option value="IN" className="bg-[#004b75] text-white">IN</option>
                <option value="US" className="bg-[#004b75] text-white">US</option>
                <option value="UK" className="bg-[#004b75] text-white">UK</option>
              </select>
              <input
                id="popup-phone"
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="+91000-0000"
                className="flex-1 min-w-0 px-4 py-2 bg-transparent text-white placeholder-gray-300 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label htmlFor="popup-message" className="block text-white text-sm font-medium mb-1.5">
              Message
            </label>
            <textarea
              id="popup-message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Leave us a message..."
              rows={3}
              className="w-full px-4 py-2 rounded-lg bg-[#0ea5e9]/20 border border-white/40 text-white placeholder-gray-300 focus:border-white focus:outline-none focus:ring-1 focus:ring-white/50 transition-colors resize-none"
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
            className="w-full py-3.5 px-6 rounded-lg bg-[#1a1a1a] text-white font-semibold hover:opacity-95 transition-opacity disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Sending...' : 'Submit'}
          </button>
        </form>
      </div>
    </div>
  );
}
