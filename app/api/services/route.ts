import { NextResponse } from "next/server";
import { connectDB } from "@/app/lib/db";
import Service from "@/app/lib/models/Service";

export async function GET() {
  try {
    await connectDB();
    const services = await Service.find({}).sort({ order: 1 }).lean();
    return NextResponse.json({ success: true, data: services });
  } catch (error) {
    console.error("[GET /api/services]", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch services" },
      { status: 500 }
    );
  }
}
