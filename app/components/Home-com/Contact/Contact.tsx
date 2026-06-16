'use client';

import { useRef, useState } from 'react';
import { sendContactForm } from '@/app/lib/contact-api';
import { FORM_SUBMIT_THROTTLE_MS, validateContactForm } from '@/app/lib/form-validation';
import ContactFormCard from './ContactFormCard';
import { useToast, ToastContainer } from '@/app/components/Toast';

export default function Contact() {
  const { toasts, show, dismiss } = useToast();

  const [formData, setFormData] = useState({
    firstName: '', lastName: '', email: '', phone: '', message: '', agreePrivacy: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const lastSubmitAtRef = useRef(0);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const name = e.target.name;
    const value = e.target.type === 'checkbox' ? (e.target as HTMLInputElement).checked : e.target.value;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const validation = validateContactForm(formData);
    if (!validation.ok) {
      show({ message: validation.message, type: 'error' });
      return;
    }

    const now = Date.now();
    if (now - lastSubmitAtRef.current < FORM_SUBMIT_THROTTLE_MS) {
      show({ message: 'Please wait a moment before submitting again.', type: 'info' });
      return;
    }
    lastSubmitAtRef.current = now;

    setIsSubmitting(true);
    try {
      const result = await sendContactForm(formData);
      if (result.ok) {
        show({ message: "🎉 Message sent! We'll get back to you soon.", type: 'success', duration: 5000 });
        setFormData({ firstName: '', lastName: '', email: '', phone: '', message: '', agreePrivacy: false });
      } else {
        show({ message: result.error ?? 'Something went wrong. Please try again.', type: 'error' });
      }
    } catch {
      show({ message: 'Something went wrong. Please try again.', type: 'error' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <ToastContainer toasts={toasts} onDismiss={dismiss} />
      <section id="contact" aria-labelledby="contact-heading" className="py-6 sm:pb-20 pt-5 bg-[#161616] relative z-10">
        <div className="bg-[#000000] h-30 w-full absolute top-0 left-0 right-0 z-[-1]" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-4 max-w-[1268px]">
          <div className="static -top-24 z-10">
            <ContactFormCard
              formData={formData}
              handleChange={handleChange}
              handleSubmit={handleSubmit}
              isSubmitting={isSubmitting}
              submitStatus="idle"
              idPrefix="contact"
            />
          </div>
        </div>
      </section>
    </>
  );
}
