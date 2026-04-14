import type { Metadata } from "next";
import React from "react";
import ContactHero from "../components/contact-com/Hero/ContactHero";
import TrustedBrands from "../components/contact-com/trusted/TrustedBrands";
import Forward from "../components/contact-com/forward/Forward";
import Thought from '../components/industries-com/Thought/Thought';
export const metadata: Metadata = {
  title: "Contact Us | Technogetic",
  description:
    "Get in touch with Technogetic — location, email, and phone. Send us a message about your project.",
};

export default function ContactPage() {
  return (
    <>
      <ContactHero />
      <TrustedBrands />
      <Forward/>
      <Thought/>
    </>
  );
}
