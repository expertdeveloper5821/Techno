import { NextResponse } from "next/server";
import { connectDB } from "@/app/lib/db";
import Service from "@/app/lib/models/Service";
import { requireAdmin } from "@/app/lib/adminAuth";

export async function GET(req: Request) {
  const guard = await requireAdmin(req);
  if (guard) return guard;
  await connectDB();
  const data = await Service.find({}).sort({ order: 1 }).lean();
  return NextResponse.json(data);
}

export async function POST(req: Request) {
  const guard = await requireAdmin(req);
  if (guard) return guard;
  await connectDB();
  const body = await req.json();
  const doc = await Service.create(body);
  return NextResponse.json(doc, { status: 201 });
}
