import type { Metadata } from "next";
import { connectDB } from '@/app/lib/db';
import FeatureModel from '@/app/lib/models/Feature';

import ContactHero from "../components/contact-com/Hero/ContactHero";
import TrustedBrands from "../components/contact-com/trusted/TrustedBrands";
import Forward from "../components/contact-com/forward/Forward";
import Thought from '../components/industries-com/Thought/Thought';

export const revalidate = 86400;

export const metadata: Metadata = {
  title: "Contact Us | Technogetic",
  description:
    "Get in touch with Technogetic — location, email, and phone. Send us a message about your project.",
};

async function getContactPageData() {
  await connectDB();
  const features = await FeatureModel.find({}).sort({ order: 1 }).lean();
  return JSON.parse(JSON.stringify(features));
}

export default async function ContactPage() {
  const features = await getContactPageData();

  return (
    <>
      <ContactHero />
      <TrustedBrands />
      <Forward features={features} />
      <Thought />
    </>
  );
}
