/**
 * AWS S3 upload helper.
 *
 * Bucket: medicalerp
 * Folder: techno/
 *
 * Required env vars (server-side only):
 *   AWS_ACCESS_KEY_ID       – IAM access key ID
 *   AWS_SECRET_ACCESS_KEY   – IAM secret access key
 *   AWS_REGION              – e.g. us-east-1 / ap-south-1
 *   AWS_S3_BUCKET_NAME      – medicalerp
 *
 * NOTE: Do NOT set ACL on the PutObject command.
 *       AWS disabled per-object ACLs by default on new buckets
 *       ("Bucket owner enforced" ownership). Use a bucket policy instead.
 *       See the README section at the bottom of this file.
 */

import { S3Client, PutObjectCommand, DeleteObjectCommand } from "@aws-sdk/client-s3";
import path from "path";

// ── Folder prefix ─────────────────────────────────────────────────────────────

export const S3_FOLDER = "techno";

// ── Allowed types / size ──────────────────────────────────────────────────────

const ALLOWED_TYPES = new Set([
  "image/jpeg",
  "image/png",
  "image/gif",
  "image/webp",
  "image/svg+xml",
  "image/avif",
]);

const MAX_BYTES = 5 * 1024 * 1024; // 5 MB

// ── Client factory (no singleton — avoids stale env-var cache in dev) ─────────

function makeClient(): S3Client {
  const region = (process.env.AWS_REGION ?? "").trim();
  const accessKeyId = (process.env.AWS_ACCESS_KEY_ID ?? "").trim();
  const secretAccessKey = (process.env.AWS_SECRET_ACCESS_KEY ?? "").trim();

  if (!region || !accessKeyId || !secretAccessKey) {
    throw new Error(
      "AWS credentials missing. Make sure AWS_REGION, AWS_ACCESS_KEY_ID, " +
        "and AWS_SECRET_ACCESS_KEY are set in your .env file and the dev server was restarted."
    );
  }

  return new S3Client({
    region,
    credentials: { accessKeyId, secretAccessKey },
  });
}

// ── Types ─────────────────────────────────────────────────────────────────────

export interface UploadResult {
  success: true;
  url: string; // public HTTPS URL
  key: string; // S3 object key, e.g. "techno/1234567890_photo.jpg"
}

export interface UploadError {
  success: false;
  message: string;
}

// ── uploadToS3 ────────────────────────────────────────────────────────────────

export async function uploadToS3(file: File): Promise<UploadResult | UploadError> {
  // 1. Validate MIME type
  if (!ALLOWED_TYPES.has(file.type)) {
    return {
      success: false,
      message: "Only image files are allowed (JPEG, PNG, GIF, WebP, SVG, AVIF).",
    };
  }

  // 2. Validate size
  if (file.size > MAX_BYTES) {
    return { success: false, message: "File too large. Maximum size is 5 MB." };
  }

  // 3. Check bucket name
  const bucket = (process.env.AWS_S3_BUCKET_NAME ?? "").trim();
  if (!bucket) {
    return { success: false, message: "AWS_S3_BUCKET_NAME is not set in .env." };
  }

  // 4. Build a safe, unique S3 key under the techno/ folder
  const ext = path.extname(file.name).toLowerCase() || ".bin";
  const base = path
    .basename(file.name, ext)
    .replace(/[^a-zA-Z0-9_-]/g, "_")
    .slice(0, 60);
  const key = `${S3_FOLDER}/${Date.now()}_${base}${ext}`;

  // 5. Upload — NO ACL field (bucket uses "Bucket owner enforced" ownership)
  const bytes = await file.arrayBuffer();

  try {
    const client = makeClient();
    await client.send(
      new PutObjectCommand({
        Bucket: bucket,
        Key: key,
        Body: Buffer.from(bytes),
        ContentType: file.type,
        // ⚠️  Do NOT add  ACL: "public-read"  here.
        // New AWS buckets block ACLs by default. Use a bucket policy instead.
      })
    );
  } catch (err: unknown) {
    // Surface the real AWS error message so it's visible in the server log
    const awsMsg =
      err instanceof Error ? err.message : String(err);
    console.error("[s3] PutObject failed:", awsMsg);
    return {
      success: false,
      message: `S3 upload failed: ${awsMsg}`,
    };
  }

  // 6. Build the public URL
  const region = (process.env.AWS_REGION ?? "").trim();
  const url = `https://${bucket}.s3.${region}.amazonaws.com/${key}`;

  return { success: true, url, key };
}

// ── deleteFromS3 ──────────────────────────────────────────────────────────────

export async function deleteFromS3(key: string): Promise<void> {
  const bucket = (process.env.AWS_S3_BUCKET_NAME ?? "").trim();
  if (!bucket) return;
  try {
    const client = makeClient();
    await client.send(new DeleteObjectCommand({ Bucket: bucket, Key: key }));
  } catch (err) {
    console.error("[s3] DeleteObject failed:", err);
  }
}

/*
 * ── Bucket policy required for public image access ───────────────────────────
 *
 * In the AWS console → S3 → medicalerp → Permissions:
 *
 * 1. Block Public Access → turn OFF "Block all public access"
 *
 * 2. Bucket Policy → paste this (replace "medicalerp" if needed):
 *
 * {
 *   "Version": "2012-10-17",
 *   "Statement": [
 *     {
 *       "Sid": "PublicReadTechnoFolder",
 *       "Effect": "Allow",
 *       "Principal": "*",
 *       "Action": "s3:GetObject",
 *       "Resource": "arn:aws:s3:::medicalerp/techno/*"
 *     }
 *   ]
 * }
 *
 * 3. Object Ownership → keep "Bucket owner enforced" (default).
 *    Do NOT change it — that's why we removed ACL: "public-read".
 *
 * 4. Your IAM user needs these permissions on the bucket:
 *    s3:PutObject, s3:DeleteObject, s3:GetObject
 * ─────────────────────────────────────────────────────────────────────────────
 */
