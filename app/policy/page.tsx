import { connectDB } from '@/app/lib/db';
import PrivacyPolicyModel from '@/app/lib/models/PrivacyPolicy';

import Hero from '../components/policy/hero';
import Topics from '../components/policy/topics';
import Contact from '../components/policy/contact';

export const revalidate = 86400;

async function getPolicyData() {
  await connectDB();
  const topics = await PrivacyPolicyModel.find({}).sort({ order: 1 }).lean();
  return JSON.parse(JSON.stringify(topics));
}

export default async function PolicyPage() {
  const topics = await getPolicyData();

  return (
    <>
      <Hero />
      <Topics topics={topics} />
      <Contact />
    </>
  );
}
