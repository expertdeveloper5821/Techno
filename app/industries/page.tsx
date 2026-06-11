import { connectDB } from '@/app/lib/db';
import IndustryModel from '@/app/lib/models/Industry';
import FeatureModel from '@/app/lib/models/Feature';

import Hero from '../components/industries-com/hero/Hero';
import Landscape from '../components/industries-com/landscape/Landscape';
import Ecommerce from '../components/industries-com/ecommerce/Ecommerce';
import EdtechServices from '../components/industries-com/edtech/EdtechServices';
import Solution from '../components/industries-com/solution-design/Solution';
import ServiceTechStack from '../components/service-com/ServiceTechStack';
import Thought from '../components/industries-com/Thought/Thought';

export const revalidate = 86400;

async function getIndustriesPageData() {
  await connectDB();
  const [industries, features] = await Promise.all([
    IndustryModel.find({}).sort({ order: 1 }).lean(),
    FeatureModel.find({}).sort({ order: 1 }).lean(),
  ]);
  return JSON.parse(JSON.stringify({ industries, features }));
}

export default async function IndustriesPage() {
  const { industries, features } = await getIndustriesPageData();

  return (
    <>
      <Hero />
      <Landscape />
      <Ecommerce />
      <EdtechServices />
      <Solution features={features} />
      <ServiceTechStack />
      <Thought />
    </>
  );
}
