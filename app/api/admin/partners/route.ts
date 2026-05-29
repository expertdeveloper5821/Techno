import { NextResponse } from "next/server";
import { connectDB } from "@/app/lib/db";
import Partner from "@/app/lib/models/Partner";
import { requireAdmin } from "@/app/lib/adminAuth";

export async function GET(req: Request) {
  const guard = await requireAdmin(req);
  if (guard) return guard;
  await connectDB();
  const data = await Partner.find({}).sort({ order: 1 }).lean();
  return NextResponse.json(data);
}

export async function POST(req: Request) {
  const guard = await requireAdmin(req);
  if (guard) return guard;
  await connectDB();
  const body = await req.json();
  const doc = await Partner.create(body);
  return NextResponse.json(doc, { status: 201 });
}
