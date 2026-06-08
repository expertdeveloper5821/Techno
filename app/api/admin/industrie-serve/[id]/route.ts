import { NextResponse } from "next/server";
import { connectDB } from "@/app/lib/db";
import IndustriesServe from "@/app/lib/models/IndustriesServe";
import { requireAdmin } from "@/app/lib/adminAuth";

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const guard = await requireAdmin(req);
  if (guard) return guard;
  try {
    await connectDB();
    const { id } = await params;
    const body = await req.json();
    const doc = await IndustriesServe.findByIdAndUpdate(id, body, { new: true });
    if (!doc) return NextResponse.json({ message: "Not found" }, { status: 404 });
    return NextResponse.json(doc);
  } catch (err) {
    const msg = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ message: msg }, { status: 400 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const guard = await requireAdmin(req);
  if (guard) return guard;
  try {
    await connectDB();
    const { id } = await params;
    await IndustriesServe.findByIdAndDelete(id);
    return NextResponse.json({ success: true });
  } catch (err) {
    const msg = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ message: msg }, { status: 400 });
  }
}
