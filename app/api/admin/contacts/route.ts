import { NextResponse } from "next/server";
import { connectDB } from "@/app/lib/db";
import ContactSubmission from "@/app/lib/models/ContactSubmission";
import { requireAdmin } from "@/app/lib/adminAuth";

export async function GET(req: Request) {
  const guard = await requireAdmin(req);
  if (guard) return guard;

  await connectDB();

  const { searchParams } = new URL(req.url);
  const status = searchParams.get("status");
  const page   = Math.max(1, Number(searchParams.get("page")  ?? "1"));
  const limit  = Math.max(1, Math.min(100, Number(searchParams.get("limit") ?? "50")));

  const filter = status && status !== "all" ? { status } : {};
  const total  = await ContactSubmission.countDocuments(filter);
  const items  = await ContactSubmission.find(filter)
    .sort({ createdAt: -1 })
    .skip((page - 1) * limit)
    .limit(limit)
    .lean();

  return NextResponse.json({ success: true, data: items, total, page, limit });
}
