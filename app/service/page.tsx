import React from 'react';
import { connectDB } from '@/app/lib/db';
import IndustryModel from '@/app/lib/models/Industry';
import WhatWeDoModel from '@/app/lib/models/WhatWeDo';

import Hero from '../components/service-com/hero/hero';
import WhatWeDo from '../components/service-com/WhatWeDo';
import ServiceTechStack from '../components/service-com/ServiceTechStack';
import ProcessFlow from '../components/service-com/ProcessFlow';
import Contact from '../components/service-com/contact/Contact';
import Slider from '../components/service-com/slider/Slider';
import IndustriesSection from '../components/service-com/IndustriesSection';

export const revalidate = 86400;

async function getServicePageData() {
  await connectDB();

  const [industries, whatWeDo] = await Promise.all([
    IndustryModel.find({}).sort({ order: 1 }).lean(),
    WhatWeDoModel.find({}).sort({ order: 1 }).lean(),
  ]);

  return JSON.parse(JSON.stringify({ industries, whatWeDo }));
}

export default async function ServicePage() {
  const { industries, whatWeDo } = await getServicePageData();

  return (
    <>
      <Hero />
      <WhatWeDo cards={whatWeDo} />
      <ServiceTechStack />
      <IndustriesSection industries={industries} />
      <ProcessFlow />
      <Slider />
      <Contact />
    </>
  );
}
