import { NextResponse } from "next/server";
import { connectDB } from "@/app/lib/db";
import Technology from "@/app/lib/models/Technology";

export async function GET(request: Request) {
  try {
    await connectDB();
    const { searchParams } = new URL(request.url);
    const row = searchParams.get("row");

    const filter = row ? { row: Number(row) } : {};
    const technologies = await Technology.find(filter).sort({ row: 1, order: 1 }).lean();

    return NextResponse.json({ success: true, data: technologies });
  } catch (error) {
    console.error("[GET /api/technologies]", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch technologies" },
      { status: 500 }
    );
  }
}
