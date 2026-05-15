import { NextResponse } from "next/server";
import { connectDB } from "@/app/lib/db";
import WhatWeDo from "@/app/lib/models/WhatWeDo";

export async function GET() {
  try {
    await connectDB();
    const cards = await WhatWeDo.find({}).sort({ order: 1 }).lean();
    return NextResponse.json({ success: true, data: cards });
  } catch (error) {
    console.error("[GET /api/what-we-do]", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch what-we-do data" },
      { status: 500 }
    );
  }
}
