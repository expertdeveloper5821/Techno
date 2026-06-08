import React from 'react';
import dynamic from 'next/dynamic';
import { connectDB } from '@/app/lib/db';
import ProductModel from '@/app/lib/models/Product';
import ServiceModel from '@/app/lib/models/Service';
import ServiceSlideModel from '@/app/lib/models/ServiceSlide';
import TechnologyModel from '@/app/lib/models/Technology';
import PartnerModel from '@/app/lib/models/Partner';
import FAQModel from '@/app/lib/models/FAQ';

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

async function getHomePageData() {
  await connectDB();

  const [heroServices, services, products, technologies, partners, faqs] =
    await Promise.all([
      ServiceSlideModel.find({}).sort({ order: 1 }).lean(),
      ServiceModel.find({}).sort({ order: 1 }).lean(),
      ProductModel.find({}).sort({ order: 1 }).lean(),
      TechnologyModel.find({}).sort({ row: 1, order: 1 }).lean(),
      PartnerModel.find({}).sort({ order: 1 }).lean(),
      FAQModel.find({}).sort({ order: 1 }).lean(),
    ]);

  // Serialize ObjectIds to plain JSON-safe objects
  return JSON.parse(JSON.stringify({
    heroServices,
    services,
    products,
    technologies,
    partners,
    faqs,
  }));
}

export default async function Homeland() {
  const { heroServices, services, products, technologies, partners, faqs } =
    await getHomePageData();

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
