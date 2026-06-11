import { connectDB } from '@/app/lib/db';
import ServiceModel from '@/app/lib/models/Service';
import IndustryModel from '@/app/lib/models/Industry';
import FeatureModel from '@/app/lib/models/Feature';
import MilestoneModel from '@/app/lib/models/Milestone';
import Hero from '../components/About-com/Hero/Hero';
import Intero from '../components/About-com/Intero/Intero';
import Services from '../components/Home-com/Services/Services';
import Products from '../components/About-com/product/product';
import IndustriesSection from '../components/service-com/IndustriesSection';
import Vision from '../components/About-com/vision/Vision';
import MilestoneCelebration from '../components/About-com/milestone/Milestone';
import Contact from '../components/About-com/contact/Contact';

export const revalidate = 86400;

async function getAboutPageData() {
  await connectDB();

  const [services, industries, features , milestone] = await Promise.all([
    ServiceModel.find({}).sort({ order: 1 }).lean(),
    IndustryModel.find({}).sort({ order: 1 }).lean(),
    FeatureModel.find({}).sort({ order: 1 }).lean(),
     MilestoneModel.find({}).sort({ order: 1 }).lean(),
  ]);


  return JSON.parse(JSON.stringify({ services, industries, features , milestone  }));
}

export default async function About() {
  const { services, industries, features , milestone } = await getAboutPageData();

  return (
    <>
      <Hero />
      <Intero />
      <Services services={services} />
      <Products features={features} />
      <IndustriesSection industries={industries} />
      <Vision />
      <MilestoneCelebration milestones={milestone}  />
      <Contact />
    </>
  );
}
