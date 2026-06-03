import { NextResponse } from "next/server";
import { connectDB } from "@/app/lib/db";
import ServiceSlide from "@/app/lib/models/ServiceSlide";

export async function GET() {
  try {
    await connectDB();
    const slides = await ServiceSlide.find({}).sort({ order: 1 }).lean();
    return NextResponse.json({ success: true, data: slides });
  } catch (error) {
    console.error("[GET /api/service-slides]", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch service slides" },
      { status: 500 }
    );
  }
}
