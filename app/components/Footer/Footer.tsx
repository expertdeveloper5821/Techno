'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';

const helpfulLinks = [
  { href: '#about', label: 'About Us' },
  { href: '#contact', label: 'Contact Us' },
  { href: '#', label: 'Privacy Policy' },
  { href: '#', label: 'Terms of Service' },
  { href: '#faq', label: 'FAQ' },
  { href: '#blog', label: 'Blog' },
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
  { name: 'Facebook', icon: 'footer/fb.png' },
  { name: 'Twitter', icon: 'footer/tw.png' },
  { name: 'Instagram', icon: 'footer/inst.png' },
  { name: 'LinkedIn', icon: 'footer/in.png' },
  { name: 'YouTube', icon: 'footer/yt.png' },
];

export default function Footer() {
  return (
    <footer className="bg-[#151515] text-white pt-20 pb-10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-16">
          
          {/* Column 1 - Brand Info */}
          <div className="space-y-6">
            <h3 className="text-xl font-bold">Technogetic</h3>
            <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
              Technogetic simplifies technology, transforming complexity into seamless solutions to drive innovation, efficiency, and digital success.
            </p>
            <div className="flex space-x-3">
              {socialLinks.map((social) => (
                <Link
                  key={social.name}
                  href="#"
                  className="w-10 h-10 rounded-full bg-black flex items-center justify-center hover:bg-[#008AC9] transition-all duration-300"
                >
                  <Image 
                    src={social.icon} 
                    alt={social.name} 
                    width={18} 
                    height={18}
                    sizes="18px"
                    loading="lazy"
                  />
                </Link>
              ))}
            </div>
          </div>

          {/* Column 2 - Helpful Links */}
          <div>
            <h3 className="text-xl font-bold mb-6">Helpful Links</h3>
            <ul className="space-y-4">
              {helpfulLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 - Our Services */}
          <div>
            <h3 className="text-xl font-bold mb-6">Our Services</h3>
            <ul className="space-y-4">
              {services.map((service) => (
                <li key={service}>
                  <Link
                    href="#services"
                    className="text-gray-400 hover:text-white transition-colors text-sm"
                  >
                    {service}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4 - Contact Info */}
          <div>
            <h3 className="text-xl font-bold mb-6">Get In Touch</h3>
            <ul className="space-y-6">
              <li className="flex items-start gap-4">
                <div className="shrink-0 mt-1">
                  <Image src="footer/location.png" alt="Location" width={20} height={20} sizes="20px" loading="lazy" />
                </div>
                <span className="text-gray-400 text-sm leading-relaxed">
                  1st floor, Nexa Square, C-209/B, Phase BB, Sec 74, Mohali, Punjab.
                </span>
              </li>
              <li className="flex items-center gap-4">
                <div className="shrink-0">
                  <Image src="footer/mail.png" alt="Email" width={20} height={20} sizes="20px" loading="lazy" />
                </div>
                <a href="mailto:info@technogetic.com" className="text-gray-400 hover:text-white transition-colors text-sm">
                  info@technogetic.com
                </a>
              </li>
              <li className="flex items-center gap-4">
                <div className="shrink-0">
                  <Image src="footer/call.png" alt="Phone" width={20} height={20} sizes="20px" loading="lazy" />
                </div>
                <a href="tel:+919779992829" className="text-gray-400 hover:text-white transition-colors text-sm">
                  +91-9779992829
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-800 pt-8 mb-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-500 text-sm">
              © 2025 HireRekrut Inc. All rights reserved.
            </p>
            <div className="flex gap-6">
              <Link href="#" className="text-gray-500 hover:text-white text-sm">Privacy</Link>
              <Link href="#" className="text-gray-500 hover:text-white text-sm">Terms</Link>
              <Link href="#" className="text-gray-500 hover:text-white text-sm">Cookies</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}