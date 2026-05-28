import { NextResponse } from "next/server";
import { connectDB } from "@/app/lib/db";
import ContactSubmission from "@/app/lib/models/ContactSubmission";
import { requireAdmin } from "@/app/lib/adminAuth";

// PATCH — update status (new → read → replied → archived)
export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const guard = await requireAdmin(req);
  if (guard) return guard;

  await connectDB();
  const { id } = await params;
  const { status } = await req.json();

  const allowed = ["new", "read", "replied", "archived"];
  if (!allowed.includes(status)) {
    return NextResponse.json({ message: "Invalid status" }, { status: 400 });
  }

  const doc = await ContactSubmission.findByIdAndUpdate(
    id,
    { status },
    { new: true }
  );
  if (!doc) return NextResponse.json({ message: "Not found" }, { status: 404 });
  return NextResponse.json(doc);
}

// DELETE — permanently remove a submission
export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const guard = await requireAdmin(req);
  if (guard) return guard;

  await connectDB();
  const { id } = await params;
  await ContactSubmission.findByIdAndDelete(id);
  return NextResponse.json({ success: true });
}
