import { NextResponse } from "next/server";
import { connectDB } from "@/app/lib/db";
import FAQ from "@/app/lib/models/FAQ";

export async function GET() {
  try {
    await connectDB();
    const faqs = await FAQ.find({}).sort({ order: 1 }).lean();
    return NextResponse.json({ success: true, data: faqs });
  } catch (error) {
    console.error("[GET /api/faqs]", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch FAQs" },
      { status: 500 }
    );
  }
}
