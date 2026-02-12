'use client';

import { useState } from 'react';
import { sendContactForm } from '@/app/lib/contact-api';
import ContactFormCard from './ContactFormCard';

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
      } else {
        setSubmitStatus('error');
      }
    } catch {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-6 sm:pb-20  pt-5 bg-[#161616] relative z-10 ">
      <div className="bg-[#000000] h-30 w-full absolute top-0 left-0 right-0 z-[-1]" />
      <div className="container mx-auto px-4 sm:px-6 lg:px-4 max-w-[1268px]">
        <div className="static -top-24 z-10">
          <ContactFormCard
            formData={formData}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            isSubmitting={isSubmitting}
            submitStatus={submitStatus}
            idPrefix="contact"
          />
        </div>
      </div>
    </section>
  );
}
