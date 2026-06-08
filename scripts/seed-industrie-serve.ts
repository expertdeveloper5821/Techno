import mongoose from "mongoose";
import * as dotenv from "dotenv";
dotenv.config({ path: ".env" });

import IndustriesServe from "../app/lib/models/IndustriesServe";

const data = [
  {
    heading: "Understanding the E-Commerce Landscape",
    paragraphs:
      "E-commerce businesses operate in a highly competitive and fast-moving environment where customer expectations continue to rise. From browsing to checkout, every step needs to be smooth, fast, and reliable.\nWe focus on building systems that not only support daily operations but also help businesses scale efficiently as demand grows.",
    highlightText:
      "At Technogetic, great technology starts with great people, driven by innovation and collaboration.",
    feature1: "Seamless shopping experience across web and mobile platforms.",
    feature2: "Secure and reliable payment processing for smooth transactions.",
    feature3: "Scalable systems to handle traffic spikes and business growth.",
    image: "/About/Intro/intro.webp",
    order: 1,
  },
];

async function seed() {
  const uri = process.env.MONGODB_URI;
  if (!uri) throw new Error("MONGODB_URI is not defined in .env");

  await mongoose.connect(uri);
  console.log("✅ Connected to MongoDB");

  await IndustriesServe.deleteMany({});
  await IndustriesServe.insertMany(data);

  console.log(`🌱 Seeded ${data.length} industrie-serve record(s)`);
  await mongoose.disconnect();
  console.log("✅ Done");
}

seed().catch((err) => {
  console.error("❌ Seed failed:", err);
  process.exit(1);
});
