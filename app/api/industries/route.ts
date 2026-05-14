import { NextResponse } from "next/server";
import { connectDB } from "@/app/lib/db";
import Industry from "@/app/lib/models/Industry";

export async function GET() {
  try {
    await connectDB();
    const industries = await Industry.find({}).sort({ order: 1 }).lean();
    return NextResponse.json({ success: true, data: industries });
  } catch (error) {
    console.error("[GET /api/industries]", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch industries" },
      { status: 500 }
    );
  }
}
