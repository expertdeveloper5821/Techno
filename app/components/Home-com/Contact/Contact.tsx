'use client';

import { useRef, useState } from 'react';
import { sendContactForm } from '@/app/lib/contact-api';
import {
  FORM_SUBMIT_THROTTLE_MS,
  validateContactForm,
} from '@/app/lib/form-validation';
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
  const [formErrorMessage, setFormErrorMessage] = useState<string | undefined>(undefined);
  const lastSubmitAtRef = useRef(0);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormErrorMessage(undefined);
    const name = e.target.name;
    const value = e.target.type === 'checkbox' ? (e.target as HTMLInputElement).checked : e.target.value;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const validation = validateContactForm(formData);
    if (!validation.ok) {
      setSubmitStatus('error');
      setFormErrorMessage(validation.message);
      return;
    }

    const now = Date.now();
    if (now - lastSubmitAtRef.current < FORM_SUBMIT_THROTTLE_MS) {
      setSubmitStatus('error');
      setFormErrorMessage('Please wait a moment before submitting again.');
      return;
    }
    lastSubmitAtRef.current = now;

    setIsSubmitting(true);
    setSubmitStatus('idle');
    setFormErrorMessage(undefined);

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
        setFormErrorMessage(
          result.error ?? 'Something went wrong. Please try again.'
        );
      }
    } catch {
      setSubmitStatus('error');
      setFormErrorMessage('Something went wrong. Please try again.');
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
            formErrorMessage={formErrorMessage}
            idPrefix="contact"
          />
        </div>
      </div>
    </section>
  );
}
