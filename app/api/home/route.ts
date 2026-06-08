import { NextResponse } from "next/server";
import { connectDB } from "@/app/lib/db";
import Product from "@/app/lib/models/Product";
import Service from "@/app/lib/models/Service";
import ServiceSlide from "@/app/lib/models/ServiceSlide";
import Technology from "@/app/lib/models/Technology";
import Partner from "@/app/lib/models/Partner";
import FAQ from "@/app/lib/models/FAQ";

export async function GET() {
  try {
    await connectDB();

    const [heroServices, services, products, technologies, partners, faqs] =
      await Promise.all([
        ServiceSlide.find({}).sort({ order: 1 }).lean(),
        Service.find({}).sort({ order: 1 }).lean(),
        Product.find({}).sort({ order: 1 }).lean(),
        Technology.find({}).sort({ row: 1, order: 1 }).lean(),
        Partner.find({}).sort({ order: 1 }).lean(),
        FAQ.find({}).sort({ order: 1 }).lean(),
      ]);

    return NextResponse.json({
      success: true,
      data: {
        heroServices,
        services,
        products,
        technologies,
        partners,
        faqs,
      },
    });
  } catch (error) {
    console.error("[GET /api/home]", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch home page data" },
      { status: 500 }
    );
  }
}
