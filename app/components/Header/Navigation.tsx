'use client';

import Link from 'next/link';
import Image from 'next/image';

interface NavigationProps {
  mobile?: boolean;
}

export default function Navigation({ mobile = false }: NavigationProps) {
  const industryItems = [
    { title: 'eCommerce', icon: '/service/industriesicon/card3.svg' },
    { title: 'FinTech', icon: '/service/industriesicon/card2.svg' },
    { title: 'Transportation & Logistics', icon: '/service/industriesicon/card4.svg' },
    { title: 'Healthcare', icon: '/service/industriesicon/card1.svg' },
    { title: 'Telecom', icon: '/service/industriesicon/telecom.svg' },
    { title: 'Advertising & Marketing', icon: '/service/industriesicon/advertising.svg' },
    { title: 'Media & Entertainment', icon: '/service/industriesicon/media.svg' },
    { title: 'Public Sector & Government', icon: '/service/industriesicon/gov.svg' },
    { title: 'EdTech', icon: '/service/industriesicon/card5.svg' },
    { title: 'On-Demand Platforms', icon: '/service/industriesicon/card8.svg' },
    { title: 'Sports', icon: '/service/industriesicon/sports.svg' },
    { title: 'Gaming', icon: '/service/industriesicon/card7.svg' },
  ];

  const navItems = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About us' },
    { href: '/service', label: 'Services' },
    { href: '/industries', label: 'Industries' },
    { href: '/portfolio', label: 'Portfolio' },
    { href: '/career', label: 'Career' },
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
              <div className="w-[760px] rounded-2xl bg-white p-5 shadow-[0_20px_50px_rgba(0,0,0,0.15)] border border-[#e8eef5]">
                <div className="grid grid-cols-[1.45fr_1fr] gap-4">
                  <div className="grid grid-cols-2 gap-x-7 gap-y-4">
                    {industryItems.map((industry) => (
                      <Link
                        key={industry.title}
                        href="/service#industries"
                        className="inline-flex items-center gap-2.5 text-[15px] text-[#151515] hover:text-[#0094DB] transition-colors"
                      >
                        <Image
                          src={industry.icon}
                          alt={industry.title}
                          width={16}
                          height={16}
                          className="h-4 w-4 object-contain"
                        />
                        <span>{industry.title}</span>
                      </Link>
                    ))}
                  </div>
                  <div className="rounded-xl bg-[#0094DB] p-3 text-white overflow-hidden">
                    <Image
                      src="/Home/services/web-development.jpg"
                      alt="Commerce showcase"
                      width={280}
                      height={120}
                      className="h-[110px] w-full rounded-lg object-cover grayscale"
                    />
                    <h4 className="mt-3 text-[40px] leading-[1] font-semibold">Commerce</h4>
                    <p className="mt-1 text-[19px] font-semibold leading-tight">
                      Industry-focused thinking, not generic solutions
                    </p>
                    <p className="mt-2 text-[13px] leading-5 text-white/90">
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

