import { NextResponse } from "next/server";
import { connectDB } from "@/app/lib/db";
import Industry from "@/app/lib/models/Industry";
import { requireAdmin } from "@/app/lib/adminAuth";

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const guard = await requireAdmin(req);
  if (guard) return guard;
  await connectDB();
  const { id } = await params;
  const body = await req.json();
  const doc = await Industry.findByIdAndUpdate(id, body, { new: true });
  if (!doc) return NextResponse.json({ message: "Not found" }, { status: 404 });
  return NextResponse.json(doc);
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const guard = await requireAdmin(req);
  if (guard) return guard;
  await connectDB();
  const { id } = await params;
  await Industry.findByIdAndDelete(id);
  return NextResponse.json({ success: true });
}
