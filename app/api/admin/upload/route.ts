import { NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import path from "path";
import { requireAdmin } from "@/app/lib/adminAuth";

// Max file size: 5 MB
const MAX_BYTES = 5 * 1024 * 1024;

// Allowed MIME types
const ALLOWED = new Set([
  "image/jpeg",
  "image/png",
  "image/gif",
  "image/webp",
  "image/svg+xml",
  "image/avif",
]);

export async function POST(req: Request) {
  const guard = await requireAdmin(req);
  if (guard) return guard;

  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ success: false, message: "No file provided" }, { status: 400 });
    }

    if (!ALLOWED.has(file.type)) {
      return NextResponse.json(
        { success: false, message: "Only image files are allowed (JPEG, PNG, GIF, WebP, SVG, AVIF)" },
        { status: 400 }
      );
    }

    if (file.size > MAX_BYTES) {
      return NextResponse.json(
        { success: false, message: "File too large. Maximum size is 5 MB." },
        { status: 400 }
      );
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Build a safe, unique filename: timestamp + sanitised original name
    const ext = path.extname(file.name).toLowerCase() || ".bin";
    const base = path
      .basename(file.name, ext)
      .replace(/[^a-zA-Z0-9_-]/g, "_")
      .slice(0, 60);
    const filename = `${Date.now()}_${base}${ext}`;

    // Save to public/uploads/
    const uploadDir = path.join(process.cwd(), "public", "uploads");
    await mkdir(uploadDir, { recursive: true });
    await writeFile(path.join(uploadDir, filename), buffer);

    return NextResponse.json({ success: true, url: `/uploads/${filename}` });
  } catch (err) {
    console.error("[POST /api/admin/upload]", err);
    return NextResponse.json({ success: false, message: "Upload failed" }, { status: 500 });
  }
}
