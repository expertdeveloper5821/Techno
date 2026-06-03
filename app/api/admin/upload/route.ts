import { NextResponse } from "next/server";
import { requireAdmin } from "@/app/lib/adminAuth";
import { uploadToS3 } from "@/app/lib/s3";

export async function POST(req: Request) {
  const guard = await requireAdmin(req);
  if (guard) return guard;

  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json(
        { success: false, message: "No file provided" },
        { status: 400 }
      );
    }

    const result = await uploadToS3(file);

    if (!result.success) {
      // Return the real error message (includes the AWS error text)
      return NextResponse.json(
        { success: false, message: result.message },
        { status: 400 }
      );
    }

    return NextResponse.json({ success: true, url: result.url });
  } catch (err) {
    const msg = err instanceof Error ? err.message : "Unknown error";
    console.error("[POST /api/admin/upload] Unhandled error:", msg);
    return NextResponse.json(
      { success: false, message: `Upload failed: ${msg}` },
      { status: 500 }
    );
  }
}
