import { NextResponse } from "next/server";
import { connectDB } from "@/app/lib/db";
import IndustriesServe from "@/app/lib/models/IndustriesServe";
import { requireAdmin } from "@/app/lib/adminAuth";

export async function GET(req: Request) {
  const guard = await requireAdmin(req);
  if (guard) return guard;
  try {
    await connectDB();
    const data = await IndustriesServe.find({}).sort({ order: 1 }).lean();
    return NextResponse.json(data);
  } catch (err) {
    const msg = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ message: msg }, { status: 500 });
  }
}

export async function POST(req: Request) {
  const guard = await requireAdmin(req);
  if (guard) return guard;
  try {
    await connectDB();
    const body = await req.json();
    const doc = await IndustriesServe.create(body);
    return NextResponse.json(doc, { status: 201 });
  } catch (err) {
    const msg = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ message: msg }, { status: 400 });
  }
}
