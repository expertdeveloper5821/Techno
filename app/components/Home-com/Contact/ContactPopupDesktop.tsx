'use client';

import React, { useState, useCallback, useEffect, useRef } from 'react';
import { sendContactForm } from '@/app/lib/contact-api';
import { FORM_SUBMIT_THROTTLE_MS, validateContactForm } from '@/app/lib/form-validation';
import ContactFormCard from './ContactFormCard';
import { useToast, ToastContainer } from '@/app/components/Toast';

const STORAGE_KEY = 'technogetic_contact_popup_shown';

export default function ContactPopupDesktop() {
  const { toasts, show, dismiss } = useToast();

  const [isOpen, setIsOpen] = useState(true);
  const [formData, setFormData] = useState({
    firstName: '', lastName: '', email: '', phone: '', message: '', agreePrivacy: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const lastSubmitAtRef = useRef(0);

  const closePopup = useCallback(() => setIsOpen(false), []);

  useEffect(() => {
    if (typeof window === 'undefined' || !isOpen) return;
    try { sessionStorage.setItem(STORAGE_KEY, 'true'); } catch { /* ignore */ }
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
        setTimeout(closePopup, 1800);
      } else {
        show({ message: result.error ?? 'Something went wrong. Please try again.', type: 'error' });
      }
    } catch {
      show({ message: 'Something went wrong. Please try again.', type: 'error' });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <>
      <ToastContainer toasts={toasts} onDismiss={dismiss} />

      <div
        className="fixed inset-0 z-[100] flex items-center justify-center p-4"
        role="dialog"
        aria-modal="true"
        aria-labelledby="contact-desktop-popup-title"
      >
        <button
          type="button"
          onClick={closePopup}
          className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
          aria-label="Close"
        />
        <div className="relative w-full max-w-6xl min-h-[90vh]">
          <ContactFormCard
            formData={formData}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            isSubmitting={isSubmitting}
            submitStatus="idle"
            onClose={closePopup}
            idPrefix="desktop-popup"
          />
        </div>
      </div>
    </>
  );
}
