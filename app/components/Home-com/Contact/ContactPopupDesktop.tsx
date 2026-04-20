'use client';

import React, { useState, useCallback, useEffect, useRef } from 'react';
import { sendContactForm } from '@/app/lib/contact-api';
import {
  FORM_SUBMIT_THROTTLE_MS,
  validateContactForm,
} from '@/app/lib/form-validation';
import ContactFormCard from './ContactFormCard';

const STORAGE_KEY = 'technogetic_contact_popup_shown';

export default function ContactPopupDesktop() {
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
  const [formErrorMessage, setFormErrorMessage] = useState<string | undefined>(undefined);
  const lastSubmitAtRef = useRef(0);

  const closePopup = useCallback(() => {
    setIsOpen(false);
  }, []);

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
        setTimeout(closePopup, 1500);
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

  if (!isOpen) return null;

  return (
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
      <div className="relative w-full max-w-6xl max-h-[90vh] overflow-y-auto">
        <ContactFormCard
          formData={formData}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          isSubmitting={isSubmitting}
          submitStatus={submitStatus}
          formErrorMessage={formErrorMessage}
          onClose={closePopup}
          idPrefix="desktop-popup"
        />
      </div>
    </div>
  );
}
