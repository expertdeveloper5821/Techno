import { connectDB } from '@/app/lib/db';
import FAQModel from '@/app/lib/models/FAQ';

import Hero from '../components/faq-com/hero';
import TopicsAccordion from '../components/faq-com/topics';
import Contact from '../components/faq-com/contact';

export const revalidate = 86400;

async function getFAQPageData() {
  await connectDB();
  const faqs = await FAQModel.find({}).sort({ order: 1 }).lean();
  return JSON.parse(JSON.stringify(faqs));
}

export default async function FAQPage() {
  const faqs = await getFAQPageData();

  return (
    <>
      <Hero />
      <TopicsAccordion faqs={faqs} />
      <Contact />
    </>
  );
}
