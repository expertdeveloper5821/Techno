import { NextResponse } from "next/server";
import { connectDB } from "@/app/lib/db";
import Feature from "@/app/lib/models/Feature";

export async function GET() {
  try {
    await connectDB();
    const features = await Feature.find({}).sort({ order: 1 }).lean();
    return NextResponse.json({ success: true, data: features });
  } catch (error) {
    console.error("[GET /api/features]", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch features" },
      { status: 500 }
    );
  }
}
