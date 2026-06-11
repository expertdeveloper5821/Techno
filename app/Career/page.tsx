import React from 'react';
import { connectDB } from '@/app/lib/db';
import JobOpeningModel from '@/app/lib/models/JobOpening';
import GrowthItemModel from '@/app/lib/models/GrowthItem';

import Hero from '../components/Career-com/Hero/Hero';
import WhyChoose from '../components/Career-com/WhyChoose/WhyChoose';
import Life from '../components/Career-com/life/Life';
import Opportunities from '../components/Career-com/opportunities/Opportunities';
import Growth from '../components/Career-com/Growth/Growth';
import Contact from '../components/Career-com/contact/Contact';

export const revalidate = 86400;

async function getCareerData() {
  await connectDB();

  const [jobOpenings, growthItems] = await Promise.all([
    JobOpeningModel.find({}).sort({ order: 1 }).lean(),
    GrowthItemModel.find({}).sort({ order: 1 }).lean(),
  ]);

  return JSON.parse(JSON.stringify({ jobOpenings, growthItems }));
}

export default async function CareerPage() {
  const { jobOpenings, growthItems } = await getCareerData();

  return (
    <>
      <Hero />
      <WhyChoose />
      <Opportunities openings={jobOpenings} />
      <Life />
      <Growth items={growthItems} />
      <Contact />
    </>
  );
}
