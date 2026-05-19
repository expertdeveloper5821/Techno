import { NextResponse } from "next/server";
import { connectDB } from "@/app/lib/db";
import TermsAndConditions from "@/app/lib/models/TermsAndConditions";

export async function GET() {
  try {
    await connectDB();
    const topics = await TermsAndConditions.find({})
      .sort({ order: 1 })
      .lean();
    return NextResponse.json({ success: true, data: topics });
  } catch (error) {
    console.error("[GET /api/terms-and-conditions]", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch terms and conditions" },
      { status: 500 }
    );
  }
}
