import { NextResponse } from "next/server";
import { connectDB } from "@/app/lib/db";
import IndustriesServe from "@/app/lib/models/IndustriesServe";

export async function GET() {
  try {
    await connectDB();
    const data = await IndustriesServe.find({}).sort({ order: 1 }).lean();
    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error("[GET /api/industrie-serve]", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch industrie-serve data" },
      { status: 500 }
    );
  }
}
