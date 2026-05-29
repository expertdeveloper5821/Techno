import { NextResponse } from "next/server";
import { connectDB } from "@/app/lib/db";
import JobOpening from "@/app/lib/models/JobOpening";

export async function GET() {
  try {
    await connectDB();
    const openings = await JobOpening.find({}).sort({ order: 1 }).lean();
    return NextResponse.json({ success: true, data: openings });
  } catch (error) {
    console.error("[GET /api/job-openings]", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch job openings" },
      { status: 500 }
    );
  }
}
