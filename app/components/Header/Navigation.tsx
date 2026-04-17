'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';

interface NavigationProps {
  mobile?: boolean;
  onNavigate?: () => void;
}


const SVGComponent = (props : any) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={13}
    height={7}
    viewBox="0 0 13 7"
    fill="none"
    {...props}
  >
    <path d="M6.42 6.42L12.84 0H0L6.42 6.42Z" fill="black" />
  </svg>
);





export default function Navigation({ mobile = false, onNavigate }: NavigationProps) {
  const [mobileIndustriesOpen, setMobileIndustriesOpen] = useState(false);

  const industryItems = [
    { title: 'eCommerce', icon: '/service/industriesicon/ecommerce.svg' },
    { title: 'FinTech', icon: '/service/industriesicon/doller.svg' },
    { title: 'Transportation & Logistics', icon: '/service/industriesicon/truck.svg' },
    { title: 'Healthcare', icon: '/service/industriesicon/health.svg' },
    { title: 'Telecom', icon: '/service/industriesicon/phone.svg' },
    { title: 'Advertising & Marketing', icon: '/service/industriesicon/tv.svg' },
    { title: 'Media & Entertainment', icon: '/service/industriesicon/video.svg' },
    { title: 'Public Sector & Government', icon: '/service/industriesicon/fort.svg' },
    { title: 'EdTech', icon: '/service/industriesicon/education.svg' },
    { title: 'On-Demand Platforms', icon: '/service/industriesicon/demand.svg' },
    { title: 'Sports', icon: '/service/industriesicon/sport.svg' },
    { title: 'Gaming', icon: '/service/industriesicon/game.svg' },
  ];

  const navItems = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About us' },
    { href: '/service', label: 'Services' },
    { href: '/industries', label: 'Industries' },
    { href: '/portfolio', label: 'Portfolio' },
    { href: '/career', label: 'career' },
    { href: '/blog', label: 'Blogs' },
    { href: '/contact', label: 'Contact' },
  ];

  const baseClasses = mobile
    ? 'flex flex-col space-y-2 font-[18px] font-light font-inter text-[#040404]'
    : 'flex items-center space-x-6 xl:space-x-8 text-[18px] font-light font-inter text-[#040404]';

  if (mobile) {
    return (
      <ul className={baseClasses}>
        {navItems.map((item) => {
          if (item.label !== 'Industries') {
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => onNavigate?.()}
                  className="block text-dark-bg text-center hover:text-primary-blue transition-colors font-normal py-1"
                >
                  {item.label}
                </Link>
              </li>
            );
          }

          return (
            <li
              key={item.href}
              className="group"
              onMouseEnter={() => setMobileIndustriesOpen(true)}
            >
              <button
                type="button"
                onClick={() => setMobileIndustriesOpen((prev) => !prev)}
                className="w-full text-left text-dark-bg hover:text-primary-blue transition-colors font-normal inline-flex items-center justify-center py-1.5"
                aria-expanded={mobileIndustriesOpen}
                aria-controls="mobile-industries-dropdown"
              >
                Industries
                <span
                  className={`text-[12px] leading-none transition-transform duration-200 ${
                    mobileIndustriesOpen ? 'rotate-180' : ''
                  }`}
                >
                  ▼
                </span>
              </button>

              <div
                id="mobile-industries-dropdown"
                className={`overflow-hidden transition-all duration-300 ease-out ${
                  mobileIndustriesOpen
                    ? 'max-h-[560px] opacity-100'
                    : 'max-h-0 opacity-0'
                } group-hover:max-h-[560px] group-hover:opacity-100`}
              >
                <div className="border-t border-black/10 pt-3 pb-1">
                  <div className="grid grid-cols-2 gap-x-3 gap-y-2.5 md:grid-cols-3">
                    {industryItems.map((industry) => (
                      <Link
                        key={industry.title}
                        href="/industries"
                        onClick={() => {
                          setMobileIndustriesOpen(false);
                          onNavigate?.();
                        }}
                        className="inline-flex items-center gap-2 rounded-md px-1.5 py-1 text-[14px] leading-5 text-[#111] hover:bg-[#0094DB]/10"
                      >
                        <Image
                          src={industry.icon}
                          alt={industry.title}
                          width={18}
                          height={18}
                          className="h-[18px] w-[18px] object-contain"
                        />
                        <span>{industry.title}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    );
  }

  return (
    <ul className={baseClasses}>
      {navItems.map((item) => {
        if (item.label !== 'Industries') {
          return (
            <li key={item.href}>
              <Link
                href={item.href}
                className="text-dark-bg hover:text-primary-blue transition-colors font-normal"
              >
                {item.label}
              </Link>
            </li>
          );
        }

        return (
          <li key={item.href} className="relative group">
            <Link
              href={item.href}
              className="text-dark-bg hover:text-primary-blue transition-colors font-normal inline-flex items-center gap-1"
            >
              Industries
              <span className="text-[12px] leading-none translate-y-px"><SVGComponent /></span>
            </Link>
            <div className="absolute left-1/2 top-full -translate-x-1/2 pt-5 z-70 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
              <div className="w-[888px] rounded-2xl bg-[#FFFFFF]  shadow-[0_20px_50px_rgba(0,0,0,0.15)] border border-[#e8eef5]">
                <div className="grid grid-cols-[1.95fr_1fr] gap-x-4">
                  <div className="grid grid-cols-2 gap-x-7 m-5 gap-y-4">
                    {industryItems.map((industry) => (
                      <Link
                        key={industry.title}
                        href="/industries"
                        className="inline-flex items-center gap-2  text-[16px] text-[#000000]  leading-[35px]  tracking-[1%]"
                      >
                        <Image
                          src={industry.icon}
                          alt={industry.title}
                          width={16}
                          height={16}
                          className="h-4 w-4 object-contain object-center "
                        />
                        <span>{industry.title}</span>
                      </Link>
                    ))}
                  </div>
                  <div className=" h-full bg-[linear-gradient(237.1deg,rgba(53,169,244,0.12)_24.76%,rgba(0,136,255,0.12)_69.64%)] p-3 text-white overflow-hidden">
                    <Image
                      src="/Home/industries.webp"
                      alt="Commerce showcase"
                      width={280}
                      height={120}
                      className="h-[150px] w-full  object-cover object-center grayscale"
                    />
                    {/* <h4 className="mt-3 text-[40px] leading-[1] font-semibold">Commerce</h4> */}
                    <p className="mt-1 text-[#0094DB] text-[16px] font-semibold leading-[22px] tracking-[1%]">
                      Industry-focused thinking, not generic solutions
                    </p>
                    <p className="mt-4 text-[14px] leading-5 tracking-[1%] text-[#000000]">
                      Every solution is designed based on real workflows, systems, and business requirements to simplify day-to-day operations.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}

