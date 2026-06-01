/**
 * GET /api/admin/upload/check
 *
 * Diagnostic endpoint — verifies that all AWS env vars are present
 * and that the S3 bucket is reachable.
 * Protected by admin session.
 */
import { NextResponse } from "next/server";
import { requireAdmin } from "@/app/lib/adminAuth";
import { S3Client, HeadBucketCommand } from "@aws-sdk/client-s3";

export async function GET(req: Request) {
  const guard = await requireAdmin(req);
  if (guard) return guard;

  const region    = (process.env.AWS_REGION            ?? "").trim();
  const keyId     = (process.env.AWS_ACCESS_KEY_ID     ?? "").trim();
  const secret    = (process.env.AWS_SECRET_ACCESS_KEY ?? "").trim();
  const bucket    = (process.env.AWS_S3_BUCKET_NAME    ?? "").trim();

  const missing: string[] = [];
  if (!region) missing.push("AWS_REGION");
  if (!keyId)  missing.push("AWS_ACCESS_KEY_ID");
  if (!secret) missing.push("AWS_SECRET_ACCESS_KEY");
  if (!bucket) missing.push("AWS_S3_BUCKET_NAME");

  if (missing.length > 0) {
    return NextResponse.json({
      ok: false,
      error: `Missing env vars: ${missing.join(", ")}`,
      hint: "Add them to your .env file and restart the dev server.",
    });
  }

  // Try to reach the bucket
  try {
    const client = new S3Client({
      region,
      credentials: { accessKeyId: keyId, secretAccessKey: secret },
    });
    await client.send(new HeadBucketCommand({ Bucket: bucket }));

    return NextResponse.json({
      ok: true,
      bucket,
      region,
      folder: "techno/",
      message: "✅ S3 bucket is reachable. Uploads will go to: " +
        `https://${bucket}.s3.${region}.amazonaws.com/techno/`,
    });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    return NextResponse.json({
      ok: false,
      bucket,
      region,
      error: msg,
      hints: [
        "InvalidClientTokenId → wrong AWS_ACCESS_KEY_ID",
        "SignatureDoesNotMatch → wrong AWS_SECRET_ACCESS_KEY",
        "NoSuchBucket → wrong AWS_S3_BUCKET_NAME",
        "403 Forbidden → IAM user lacks s3:ListBucket permission on this bucket",
        "Wrong region → bucket is in a different region than AWS_REGION",
      ],
    });
  }
}
