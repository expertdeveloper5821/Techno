import React from 'react';
import dynamic from 'next/dynamic';
import type { Product } from '@/app/services/productService';
import type { Service } from '@/app/services/serviceService';
import type { ServiceSlide } from '@/app/services/serviceSlideService';
import type { Technology } from '@/app/services/technologyService';
import type { Partner } from '@/app/services/partnerService';
import type { FAQ } from '@/app/services/faqService';

import Hero from '../components/Home-com/Hero/Hero';

// Revalidate every 24 hours (ISR / SSG)
export const revalidate = 86400;

// Lazy load below-the-fold components
const About = dynamic(() => import('../components/Home-com/About/About'), {
  loading: () => <div className="h-[800px] bg-[#0a0a0a]" />,
});
const Services = dynamic(() => import('../components/Home-com/Services/Services'), {
  loading: () => <div className="h-[900px] bg-[#e5e5e5]" />,
});
const Products = dynamic(() => import('../components/Home-com/Products/Products'), {
  loading: () => <div className="h-[1000px] bg-[#1a1a1a]" />,
});
const Technologies = dynamic(() => import('../components/Home-com/Technologies/Technologies'), {
  loading: () => <div className="h-[600px] bg-[#0a0a0a]" />,
});
const Partners = dynamic(() => import('../components/Home-com/Partners/Partners'), {
  loading: () => <div className="h-[500px] bg-[#e5e5e5]" />,
});
const FAQ = dynamic(() => import('../components/Home-com/FAQ/FAQ'), {
  loading: () => <div className="h-[800px] bg-[#1a1a1a]" />,
});
const Contact = dynamic(() => import('../components/Home-com/Contact/Contact'), {
  loading: () => <div className="h-[600px] bg-[#e5e5e5]" />,
});

interface HomeApiResponse {
  success: boolean;
  data: {
    heroServices: ServiceSlide[];
    services: Service[];
    products: Product[];
    technologies: Technology[];
    partners: Partner[];
    faqs: FAQ[];
  };
}

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? 'http://localhost:3000';

async function fetchHomeData() {
  const res = await fetch(`${BASE_URL}/api/home`, {
    next: { revalidate: 86400 }, // 24 hours cache
  });

  if (!res.ok) {
    throw new Error('Failed to fetch home page data');
  }

  const json: HomeApiResponse = await res.json();

  if (!json.success) {
    throw new Error('Home API returned unsuccessful response');
  }
  console.log(json.data, "reshome")

  return json.data;
}

export default async function Homeland() {
  const { heroServices, services, products, technologies, partners, faqs } =
    await fetchHomeData();

  return (
    <>
      <Hero serviceSlides={heroServices} />
      <About />
      <Services services={services} />
      <Products products={products} />
      <Technologies technologies={technologies} />
      <Partners partners={partners} />
      <FAQ faqs={faqs} />
      <Contact />
    </>
  );
}
