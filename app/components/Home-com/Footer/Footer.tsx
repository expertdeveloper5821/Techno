'use client';
 
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import facebookLogo from '@/app/lib/icon/facebooklogo.svg';
import instagramLogo from '@/app/lib/icon/instalogo.svg';

import twitterLogo from '@/app/lib/icon/twitter.svg';
import linkedinLogo from '@/app/lib/icon/linkdin.svg';
import { Subscribe } from '@/app/lib/subscribe-api';
import {
  FORM_SUBMIT_THROTTLE_MS,
  isValidEmail,
} from '@/app/lib/form-validation';
import { siteContact } from '@/app/lib/data/site-contact';
import { useRef, useState } from 'react';
const helpfulLinks = [
  { href: '/about', label: 'About Us' },
  { href: '/contact', label: 'Contact Us' },
  { href: '/policy', label: 'Privacy Policy' },
  { href: '/terms', label: 'Terms of Service' },
  { href: '/faq', label: 'FAQ' },
  { href: '/blog', label: 'Blog' },
];
 
const services = [
  'Web Development',
  'Mobile App Development',
  'Cloud Computing',
  'UI/UX',
  'Product Consultancy',
  'Staffing Augmentation',
];
 
const socialLinks = [
  { name: 'Facebook', icon: facebookLogo , link : "https://www.facebook.com/p/Technogetic-Web-Services-100071705236676/" },
  { name: 'Twitter', icon: twitterLogo , link : "https://www.instagram.com/life_at_tg/" },
  // { name: 'Instagram', icon: instagramLogo  , link : "https://www.linkedin.com/company/technogetic/" },

  { name: 'LinkedIn', icon: linkedinLogo  , link : "https://www.linkedin.com/company/technogetic/"},
];


export default function Footer() {
  const [formData, setFormData] = useState<{ email: string }>({ email: '' });
  const [newsletterError, setNewsletterError] = useState<string | null>(null);
  const [isNewsletterSubmitting, setIsNewsletterSubmitting] = useState(false);
  const lastSubmitAtRef = useRef(0);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setNewsletterError(null);
    const value = e.target.value;
    setFormData({ email: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setNewsletterError(null);

    if (!formData.email.trim()) {
      setNewsletterError('Please enter your email address.');
      return;
    }
    if (!isValidEmail(formData.email)) {
      setNewsletterError('Please enter a valid email address.');
      return;
    }

    const now = Date.now();
    if (now - lastSubmitAtRef.current < FORM_SUBMIT_THROTTLE_MS) {
      setNewsletterError('Please wait a moment before subscribing again.');
      return;
    }
    lastSubmitAtRef.current = now;

    setIsNewsletterSubmitting(true);
    try {
      const result = await Subscribe({ email: formData.email });
      if (result.ok) {
        setFormData({ email: '' });
      } else {
        setNewsletterError(
          'We could not complete your subscription. Please try again later.'
        );
      }
    } catch {
      setNewsletterError(
        'We could not complete your subscription. Please check your connection and try again.'
      );
    } finally {
      setIsNewsletterSubmitting(false);
    }
  };

  return (
    <footer className="bg-[#090909] text-white" role="contentinfo" aria-label="Site footer">
      {/* Newsletter Bar */}
      <div className="w-full bg-[#22242A] border-b border-gray-800 px-6 py-4 flex flex-col md:flex-row items-center justify-between gap-5 lg:gap-24">
        {/* Left: Info text */}
        <span className="text-base md:text-base font-normal font-Roboto text-left">Subscribe to stay tuned for new web design and latest updates.</span>
        {/* Right: Let's do it + input group */}
        <div className="flex flex-col md:flex-row md:items-center gap-2 w-full md:w-auto justify-start md:justify-end">
          <span className="font-semibold text-white text-base md:text-lg whitespace-nowrap md:mr-2" aria-hidden="true">Let&apos;s do it! —</span>
          <form className="w-full" onSubmit={handleSubmit} noValidate aria-label="Newsletter subscription">
            <div className="flex flex-col gap-2">
              <div className="flex w-full bg-white rounded-full overflow-hidden shadow-md px-0.5 py-0.5">
                <label htmlFor="newsletter" className="sr-only">Email address for newsletter</label>
                <input
                  id="newsletter"
                  type="email"
                  placeholder="Enter your email Address"
                  value={formData.email}
                  onChange={handleChange}
                  disabled={isNewsletterSubmitting}
                  autoComplete="email"
                  aria-required="true"
                  aria-invalid={newsletterError ? 'true' : undefined}
                  aria-describedby={newsletterError ? 'newsletter-error' : undefined}
                  className="footer-input md:flex-1 w-full px-4 py-2 text-black bg-transparent focus:outline-none rounded-full disabled:opacity-60"
                  style={{borderTopRightRadius: 0, borderBottomRightRadius: 0}}
                />
                <button
                  type="submit"
                  disabled={isNewsletterSubmitting}
                  aria-busy={isNewsletterSubmitting}
                  className="bg-black text-white text-sm sm:text-base font-semibold sm:px-8 sm:py-2 px-4 py-1.5 transition hover:bg-gray-800 disabled:opacity-70 disabled:cursor-not-allowed focus:outline-2 focus:outline-offset-2 focus:outline-white"
                  style={{borderTopLeftRadius: 20, borderBottomLeftRadius: 20,borderTopRightRadius: 20, borderBottomRightRadius: 20 }}
                >
                  {isNewsletterSubmitting ? 'Subscribing…' : 'Subscribe'}
                </button>
              </div>
              {newsletterError && (
                <p id="newsletter-error" className="text-red-300 text-sm font-medium px-1" role="alert" aria-live="assertive">
                  {newsletterError}
                </p>
              )}
            </div>
          </form>
        </div>
      </div>
 
      <div className="w-full mx-auto px-4 sm:px-6 lg:px-6 py-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4  gap-8">
        {/* Logo & Description */}
        <div >
          <Image src="/Home/footer/tg-logo.webp" alt="Technogetic - Home" width={120} height={40} className="mb-4" />
          <p className=" font-inter text-base leading-relaxed text-[#D1D5DB] font-normal">
            Technogetic simplifies technology, transforming complexity into seamless solutions to drive innovation, efficiency, and digital success
          </p>
        </div>
 
        {/* Helpful Links */}
        <nav aria-label="Helpful links">
          <h3 className=" font-Roboto font-lg font-semibold mb-3">Helpful Links</h3>
          <ul className="space-y-2 text-base font-inter text-[#D1D5DB] ">
            {helpfulLinks.map((link) => (
              <li key={link.label}>
                <Link href={link.href} className="hover:text-gray-400 focus:outline-2 focus:outline-offset-2 focus:outline-white">{link.label}</Link>
              </li>
            ))}
          </ul>
        </nav>
 
        {/* Our Services */}
        <div>
          <h3 className="font-Roboto font-lg font-semibold mb-3">Our Services</h3>
          <ul className="space-y-2 text-base font-inter text-[#D1D5DB]" aria-label="Services we offer">
            {services.map((service) => (
              <li key={service}>{service}</li>
            ))}
          </ul>
        </div>
 
        {/* Contact Us */}
        <div>
          <h3 className="font-Roboto font-lg font-semibold mb-3">Contact Us</h3>
          <address className="not-italic">
            <div className="flex items-start gap-2 mb-2">
              <div className="shrink-0" aria-hidden="true">
                <Image src="/Home/footer/location.webp" alt="" width={20} height={20} sizes="20px" loading="lazy" />
              </div>
              <span className="space-y-2 text-base font-inter text-[#D1D5DB]">{siteContact.address}</span>
            </div>
            <div className="flex items-center gap-2 mb-4">
              <div className="shrink-0" aria-hidden="true">
                <Image src="/Home/footer/mail.webp" alt="" width={20} height={20} sizes="20px" loading="lazy" />
              </div>
              <a href={`mailto:${siteContact.email}`} className="space-y-2 text-base font-inter text-[#D1D5DB] focus:outline-2 focus:outline-offset-2 focus:outline-white">{siteContact.email}</a>
            </div>
          </address>
          <div>
            <span className="font-bold text-base font-Roboto text-[#ffffff]">Follow us</span>
            <div className="flex gap-3 mt-2" role="list" aria-label="Social media links">
              {socialLinks.map((social) => (
                <Link key={social.name} href={social.link} aria-label={`Follow us on ${social.name}`} className="hover:text-gray-400 text-xl focus:outline-2 focus:outline-offset-2 focus:outline-white" role="listitem" target="_blank" rel="noopener noreferrer">
                  <Image src={social.icon} alt="" width={22} height={22} aria-hidden="true" />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
 
      {/* Bottom Bar */}
      <div className="w-full bg-[#232429] border-t border-gray-800 px-6 py-4 flex flex-col md:flex-row items-center justify-between text-xs">
        <span className="space-y-2 text-base font-inter text-[#9CA3AF]">© 2026 Technogetic Inc. All rights reserved.</span>
        <div className="flex gap-6 mt-2 md:mt-0">
          <Link href="/policy" className="space-y-2 text-base font-inter text-[#9CA3AF]">Privacy</Link>
          <Link href="/terms" className="space-y-2 text-base font-inter text-[#9CA3AF]">Terms</Link>
          <Link href="#cookies" className="space-y-2 text-base font-inter text-[#9CA3AF]">Cookies</Link>
        </div>
      </div>
    </footer>
  );
}
