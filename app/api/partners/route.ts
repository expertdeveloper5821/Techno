import { NextResponse } from "next/server";
import { connectDB } from "@/app/lib/db";
import Partner from "@/app/lib/models/Partner";

export async function GET() {
  try {
    await connectDB();
    const partners = await Partner.find({}).sort({ order: 1 }).lean();
    return NextResponse.json({ success: true, data: partners });
  } catch (error) {
    console.error("[GET /api/partners]", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch partners" },
      { status: 500 }
    );
  }
}
