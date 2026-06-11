import { connectDB } from '@/app/lib/db';
import TermsAndConditionsModel from '@/app/lib/models/TermsAndConditions';

import Hero from '../components/terms-com/hero';
import Topics from '../components/terms-com/topics';
import Contact from '../components/terms-com/contact';

export const revalidate = 86400;

export const metadata = {
  title: 'Terms & Conditions | Technogetic',
  description:
    'Read the Terms & Conditions for using Technogetic services. Understand your rights, responsibilities, and our commitments to you.',
};

async function getTermsData() {
  await connectDB();
  const topics = await TermsAndConditionsModel.find({}).sort({ order: 1 }).lean();
  return JSON.parse(JSON.stringify(topics));
}

export default async function TermsPage() {
  const topics = await getTermsData();

  return (
    <>
      <Hero />
      <Topics topics={topics} />
      <Contact />
    </>
  );
}
