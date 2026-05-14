import { NextResponse } from "next/server";
import { connectDB } from "@/app/lib/db";
import PortfolioWork from "@/app/lib/models/PortfolioWork";

export async function GET(request: Request) {
  try {
    await connectDB();
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");
    const page = Math.max(1, Number(searchParams.get("page") ?? "1"));
    const limit = Math.max(1, Number(searchParams.get("limit") ?? "9"));

    const filter = category && category !== "All" ? { category } : {};
    const total = await PortfolioWork.countDocuments(filter);
    const items = await PortfolioWork.find(filter)
      .sort({ order: 1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .lean();

    return NextResponse.json({
      success: true,
      data: items,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("[GET /api/portfolio]", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch portfolio items" },
      { status: 500 }
    );
  }
}
