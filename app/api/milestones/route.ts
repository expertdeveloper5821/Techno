import { NextResponse } from "next/server";
import { connectDB } from "@/app/lib/db";
import Milestone from "@/app/lib/models/Milestone";

export async function GET() {
  try {
    await connectDB();
    const milestones = await Milestone.find({}).sort({ order: 1 }).lean();
    return NextResponse.json({ success: true, data: milestones });
  } catch (error) {
    console.error("[GET /api/milestones]", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch milestones" },
      { status: 500 }
    );
  }
}
