import { NextResponse } from "next/server";
import { connectDB } from "@/app/lib/db";
import PrivacyPolicy from "@/app/lib/models/PrivacyPolicy";

export async function GET() {
  try {
    await connectDB();
    const topics = await PrivacyPolicy.find({}).sort({ order: 1 }).lean();
    return NextResponse.json({ success: true, data: topics });
  } catch (error) {
    console.error("[GET /api/privacy-policy]", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch privacy policy" },
      { status: 500 }
    );
  }
}
