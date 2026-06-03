import mongoose from "mongoose";
import * as dotenv from "dotenv";
import { hash } from "bcryptjs";
dotenv.config({ path: ".env" });

import AdminUser from "../app/lib/models/AdminUser";

async function seed() {
  const uri = process.env.MONGODB_URI;
  if (!uri) throw new Error("MONGODB_URI is not defined in .env");

  await mongoose.connect(uri);
  console.log("✅ Connected to MongoDB");

  await AdminUser.deleteMany({});

  const passwordHash = await hash("admin@123", 12);
  await AdminUser.create({
    name: "Admin",
    email: "admin@technogetic.com",
    passwordHash,
    role: "admin",
  });

  console.log("🌱 Admin user seeded:");
  console.log("   Email   : admin@technogetic.com");
  console.log("   Password: admin@123");
  console.log("   ⚠️  Change the password after first login!");

  await mongoose.disconnect();
  console.log("✅ Done");
}

seed().catch((err) => {
  console.error("❌ Seed failed:", err);
  process.exit(1);
});
