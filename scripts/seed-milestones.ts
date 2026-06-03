import mongoose from "mongoose";
import * as dotenv from "dotenv";
dotenv.config({ path: ".env" });

import Milestone from "../app/lib/models/Milestone";

const milestones = [
  { image: "/About/milestone/Frame1.webp", order: 1 },
  { image: "/About/milestone/Frame2.webp", order: 2 },
  { image: "/About/milestone/Frame3.webp", order: 3 },
  { image: "/About/milestone/Frame5.webp", order: 4 },
  { image: "/About/milestone/Frame6.webp", order: 5 },
  { image: "/About/milestone/Frame7.webp", order: 6 },
  { image: "/About/milestone/Frame8.webp", order: 7 },
  { image: "/About/milestone/Frame9.webp", order: 8 },
  { image: "/About/milestone/Frame10.webp", order: 9 },
];

async function seed() {
  const uri = process.env.MONGODB_URI;
  if (!uri) throw new Error("MONGODB_URI is not defined in .env");

  await mongoose.connect(uri);
  console.log("✅ Connected to MongoDB");

  await Milestone.deleteMany({});
  await Milestone.insertMany(milestones);

  console.log(`🌱 Seeded ${milestones.length} milestones`);
  await mongoose.disconnect();
  console.log("✅ Done");
}

seed().catch((err) => {
  console.error("❌ Seed failed:", err);
  process.exit(1);
});
