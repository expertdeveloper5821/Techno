import { NextResponse } from "next/server";
import { connectDB } from "@/app/lib/db";
import BlogPost from "@/app/lib/models/BlogPost";
import type { BlogPostCategory } from "@/app/lib/models/BlogPost";

const VALID_CATEGORIES: BlogPostCategory[] = [
  "Technology", "Marketing", "Business", "Case Studies", "AI Solutions", "E-Commerce",
];

export async function GET(request: Request) {
  try {
    await connectDB();
    const { searchParams } = new URL(request.url);
    const categoryParam = searchParams.get("category");
    const page = Math.max(1, Number(searchParams.get("page") ?? "1"));
    const limit = Math.max(1, Number(searchParams.get("limit") ?? "6"));

    const validCategory = categoryParam && VALID_CATEGORIES.includes(categoryParam as BlogPostCategory)
      ? (categoryParam as BlogPostCategory)
      : null;

    const filter = validCategory ? { category: validCategory } : {};
    const total = await BlogPost.countDocuments(filter);
    const posts = await BlogPost.find(filter)
      .sort({ order: 1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .lean();

    return NextResponse.json({
      success: true,
      data: posts,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("[GET /api/blog-posts]", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch blog posts" },
      { status: 500 }
    );
  }
}
