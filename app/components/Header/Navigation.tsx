'use client';

import Link from 'next/link';
import Image from 'next/image';

interface NavigationProps {
  mobile?: boolean;
}

export default function Navigation({ mobile = false }: NavigationProps) {
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
    { href: '/Career', label: 'Career' },
    { href: '/blog', label: 'Blogs' },
    { href: '/contact', label: 'Contact' },
  ];

  const baseClasses = mobile
    ? 'flex flex-col space-y-4 font-[18px] font-light font-inter text-[#040404]'
    : 'flex items-center space-x-6 xl:space-x-8 text-[18px] font-light font-inter text-[#040404]';
  ;

  if (mobile) {
    return (
      <ul className={baseClasses}>
        {navItems.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              className="text-dark-bg hover:text-primary-blue transition-colors font-normal"
            >
              {item.label}
            </Link>
          </li>
        ))}
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
              <span className="text-[12px] leading-none translate-y-[1px]">▼</span>
            </Link>
            <div className="absolute left-1/2 top-full -translate-x-1/2 pt-5 z-[70] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
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
                          className="h-6 w-6 object-contain"
                        />
                        <span>{industry.title}</span>
                      </Link>
                    ))}
                  </div>
                  <div className="rounded-xl h-full bg-[linear-gradient(237.1deg,_rgba(53,169,244,0.12)_24.76%,_rgba(0,136,255,0.12)_69.64%)] p-3 text-white overflow-hidden">
                    <Image
                      src="/Home/industries.png"
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

