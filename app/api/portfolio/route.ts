import { NextResponse } from "next/server";
import { connectDB } from "@/app/lib/db";
import PortfolioWork from "@/app/lib/models/PortfolioWork";
import type { PortfolioCategory } from "@/app/lib/models/PortfolioWork";

const VALID_CATEGORIES: PortfolioCategory[] = [
  "Consulting", "Mobile Apps", "Web Development", "Cloud & DevOps", "AI Solutions", "E-Commerce",
];

export async function GET(request: Request) {
  try {
    await connectDB();
    const { searchParams } = new URL(request.url);
    const categoryParam = searchParams.get("category");
    const page = Math.max(1, Number(searchParams.get("page") ?? "1"));
    const limit = Math.max(1, Number(searchParams.get("limit") ?? "9"));

    const validCategory = categoryParam && VALID_CATEGORIES.includes(categoryParam as PortfolioCategory)
      ? (categoryParam as PortfolioCategory)
      : null;

    const filter = validCategory ? { category: validCategory } : {};
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
