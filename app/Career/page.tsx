import React from 'react';
import { connectDB } from '@/app/lib/db';
import JobOpeningModel from '@/app/lib/models/JobOpening';
import GrowthItemModel from '@/app/lib/models/GrowthItem';
import MilestoneModel from '@/app/lib/models/Milestone';

import Hero from '../components/Career-com/Hero/Hero';
import WhyChoose from '../components/Career-com/WhyChoose/WhyChoose';
import Life from '../components/Career-com/life/Life';
import Opportunities from '../components/Career-com/opportunities/Opportunities';
import Growth from '../components/Career-com/Growth/Growth';
import Contact from '../components/Career-com/contact/Contact';

export const revalidate = 86400;

async function getCareerData() {
  await connectDB();

  const [jobOpenings, growthItems, milestones] = await Promise.all([
    JobOpeningModel.find({}).sort({ order: 1 }).lean(),
    GrowthItemModel.find({}).sort({ order: 1 }).lean(),
    MilestoneModel.find({}).sort({ order: 1 }).lean(),
  ]);

  return JSON.parse(JSON.stringify({ jobOpenings, growthItems, milestones }));
}

export default async function CareerPage() {
  const data = await getCareerData();
  const jobOpenings = data?.jobOpenings ?? [];
  const growthItems = data?.growthItems ?? [];
  const milestones = data?.milestones ?? [];

  return (
    <>
      <Hero />
      <WhyChoose />
      <Opportunities openings={jobOpenings} />
      <Life milestones={milestones} />
      <Growth items={growthItems} />
      <Contact />
    </>
  );
}
