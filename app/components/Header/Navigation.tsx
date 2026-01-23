'use client';

import Link from 'next/link';

interface NavigationProps {
  mobile?: boolean;
}

export default function Navigation({ mobile = false }: NavigationProps) {
  const navItems = [
    { href: '#', label: 'Home' },
    { href: '#about', label: 'About us' },
    { href: '#services', label: 'Services' },
    { href: '#career', label: 'Career' },
    { href: '#blog', label: 'Blogs' },
    { href: '#contact', label: 'Contact' },
  ];

  const baseClasses = mobile
    ? 'flex flex-col space-y-4'
    : 'flex items-center space-x-6 xl:space-x-8';

  return (
    <ul className={baseClasses}>
      {navItems.map((item) => (
        <li key={item.href}>
          <Link
            href={item.href}
            className={`${
              mobile ? 'text-dark-bg' : 'text-dark-bg'
            } hover:text-primary-blue transition-colors font-medium`}
          >
            {item.label}
          </Link>
        </li>
      ))}
    </ul>
  );
}

