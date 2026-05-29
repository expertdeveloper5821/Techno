import { NextResponse } from "next/server";
import { connectDB } from "@/app/lib/db";
import Product from "@/app/lib/models/Product";

export async function GET() {
  try {
    await connectDB();
    const products = await Product.find({}).sort({ order: 1 }).lean();
    return NextResponse.json({ success: true, data: products });
  } catch (error) {
    console.error("[GET /api/products]", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch products" },
      { status: 500 }
    );
  }
}
