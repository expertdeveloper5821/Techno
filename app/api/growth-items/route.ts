import { NextResponse } from "next/server";
import { connectDB } from "@/app/lib/db";
import GrowthItem from "@/app/lib/models/GrowthItem";

export async function GET() {
  try {
    await connectDB();
    const items = await GrowthItem.find({}).sort({ order: 1 }).lean();
    return NextResponse.json({ success: true, data: items });
  } catch (error) {
    console.error("[GET /api/growth-items]", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch growth items" },
      { status: 500 }
    );
  }
}
