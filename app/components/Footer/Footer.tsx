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
    <footer className="bg-[#090909] text-white">
      {/* Newsletter Bar */}
      <div className="w-full bg-[#22242A] border-b border-gray-800 px-6 py-4 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Left: Info text */}
        <span className="text-base md:text-lg font-medium text-left w-full md:w-auto">Subscribe to stay tuned for new web design and latest updates.</span>
        {/* Right: Let's do it + input group */}
        <div className="flex flex-col md:flex-row items-center gap-2 w-full md:w-auto justify-end">
          <span className="font-bold text-white text-base  md:text-lg whitespace-nowrap md:mr-2">Let&apos;s do it! —</span>
          <form className="w-full  md:w-[500px]">
            <div className="flex w-full bg-white rounded-full overflow-hidden shadow-md px-0.5 py-0.5">
              <input
                id="newsletter"
                type="email"
                placeholder="Enter your email Address"
                className="footer-input md:flex-1 w-full px-4 py-2 text-black bg-transparent focus:outline-none rounded-full"
                style={{borderTopRightRadius: 0, borderBottomRightRadius: 0}}
              />
              <button
                type="submit"
                className="bg-black text-white  text-sm sm:text-base font-semibold sm:px-8 sm:py-2 px-4 py-1.5 transition hover:bg-gray-800"
                style={{borderTopLeftRadius: 20, borderBottomLeftRadius: 20,borderTopRightRadius: 20, borderBottomRightRadius: 20 }}
              >
                Subscribe
              </button>
            </div>
          </form>
        </div>
      </div>
 
      <div className="container mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Logo & Description */}
        <div>
          <Image src="/footer/tg-logo.png" alt="Technogetic Logo" width={120} height={40} className="mb-4" />
          <p className="text-sm leading-relaxed">
            Technogetic simplifies technology, transforming complexity into seamless solutions to drive innovation, efficiency, and digital success
          </p>
        </div>
 
        {/* Helpful Links */}
        <div>
          <h3 className="font-semibold mb-3">Helpful Links</h3>
          <ul className="space-y-2 text-sm">
            {helpfulLinks.map((link) => (
              <li key={link.label}>
                <Link href={link.href} className="hover:text-gray-400">{link.label}</Link>
              </li>
            ))}
          </ul>
        </div>
 
        {/* Our Services */}
        <div>
          <h3 className="font-semibold mb-3">Our Services</h3>
          <ul className="space-y-2 text-sm">
            {services.map((service) => (
              <li key={service}>{service}</li>
            ))}
          </ul>
        </div>
 
        {/* Contact Us */}
        <div>
          <h3 className="font-semibold mb-3">Contact Us</h3>
          <div className="flex items-start gap-2 mb-2">
                            <div className="shrink-0">
                  <Image src="footer/location.png" alt="Location" width={20} height={20} sizes="20px" loading="lazy" />
                </div>
            <span className="text-sm">1<sup>st</sup> floor, Nexa Square, C-209/B, Phase 8B, Sec 74, Mohali, Punjab.</span>
          </div>
          <div className="flex items-center gap-2 mb-4">
                            <div className="shrink-0">
                  <Image src="footer/mail.png" alt="Email" width={20} height={20} sizes="20px" loading="lazy" />
                </div>
            <a href="mailto:info@technogetic.com" className="text-sm hover:text-gray-400">info@technogetic.com</a>
          </div>
          <div>
            <span className="font-semibold">Follow us</span>
            <div className="flex gap-3 mt-2">
              {socialLinks.map((social) => (
                <Link key={social.name} href="#" aria-label={social.name} className="hover:text-gray-400 text-xl">
                  <Image src={social.icon} alt={social.name} width={22} height={22} />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
 
      {/* Bottom Bar */}
      <div className="w-full bg-[#232429] border-t border-gray-800 px-6 py-4 flex flex-col md:flex-row items-center justify-between text-xs">
        <span>© 2026 Technogetic Inc. All rights reserved.</span>
        <div className="flex gap-6 mt-2 md:mt-0">
          <Link href="#privacy" className="hover:text-gray-400">Privacy</Link>
          <Link href="#terms" className="hover:text-gray-400">Terms</Link>
          <Link href="#cookies" className="hover:text-gray-400">Cookies</Link>
        </div>
      </div>
    </footer>
  );
}
 