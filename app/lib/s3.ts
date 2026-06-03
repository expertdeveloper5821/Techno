/**
 * AWS S3 upload helper.
 *
 * Uses the official @aws-sdk/lib-storage Upload class for multipart/streaming
 * uploads. This avoids the "socket idle timeout" error that occurs with
 * single-shot PutObject on slow connections — the Upload class sends data in
 * 5 MB chunks and retries each part independently.
 *
 * Required env vars (server-side only):
 *   AWS_ACCESS_KEY_ID
 *   AWS_SECRET_ACCESS_KEY
 *   AWS_REGION
 *   AWS_S3_BUCKET_NAME
 */

import { S3Client } from "@aws-sdk/client-s3";
import { Upload } from "@aws-sdk/lib-storage";
import { NodeHttpHandler } from "@smithy/node-http-handler";
import { Readable } from "stream";
import path from "path";

export const S3_FOLDER = "techno";

const ALLOWED_TYPES = new Set([
  "image/jpeg",
  "image/png",
  "image/gif",
  "image/webp",
  "image/svg+xml",
  "image/avif",
]);

const MAX_BYTES = 5 * 1024 * 1024; // 5 MB

// ── Client factory ────────────────────────────────────────────────────────────

function makeClient(): S3Client {
  const region = (process.env.AWS_REGION ?? "").trim();
  const accessKeyId = (process.env.AWS_ACCESS_KEY_ID ?? "").trim();
  const secretAccessKey = (process.env.AWS_SECRET_ACCESS_KEY ?? "").trim();

  if (!region || !accessKeyId || !secretAccessKey) {
    throw new Error(
      "AWS credentials missing. Set AWS_REGION, AWS_ACCESS_KEY_ID, and " +
        "AWS_SECRET_ACCESS_KEY in .env then restart the dev server."
    );
  }

  return new S3Client({
    region,
    credentials: { accessKeyId, secretAccessKey },
    requestHandler: new NodeHttpHandler({
      connectionTimeout: 30_000,   // 30 s to open TCP connection
      socketTimeout:    300_000,   // 5 min socket idle timeout
    }),
    maxAttempts: 5,
  });
}

// ── Types ─────────────────────────────────────────────────────────────────────

export interface UploadResult { success: true; url: string; key: string }
export interface UploadError  { success: false; message: string }

// ── uploadToS3 — uses multipart/streaming Upload ──────────────────────────────

export async function uploadToS3(file: File): Promise<UploadResult | UploadError> {
  if (!ALLOWED_TYPES.has(file.type)) {
    return { success: false, message: "Only image files are allowed (JPEG, PNG, GIF, WebP, SVG, AVIF)." };
  }
  if (file.size > MAX_BYTES) {
    return { success: false, message: "File too large. Maximum size is 5 MB." };
  }

  const bucket = (process.env.AWS_S3_BUCKET_NAME ?? "").trim();
  if (!bucket) {
    return { success: false, message: "AWS_S3_BUCKET_NAME is not set in .env." };
  }

  const ext  = path.extname(file.name).toLowerCase() || ".bin";
  const base = path.basename(file.name, ext).replace(/[^a-zA-Z0-9_-]/g, "_").slice(0, 60);
  const key  = `${S3_FOLDER}/${Date.now()}_${base}${ext}`;

  try {
    const bytes  = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Convert Buffer → Node.js Readable stream so the SDK can stream it
    // in chunks rather than sending the whole file as one blocked write.
    const stream = Readable.from(buffer);

    const upload = new Upload({
      client: makeClient(),
      params: {
        Bucket:      bucket,
        Key:         key,
        Body:        stream,
        ContentType: file.type,
      },
      // Send in one part for files ≤5 MB; for larger files it auto-splits.
      // queueSize = number of concurrent part uploads
      queueSize: 1,
      // 5 MB minimum part size (AWS minimum for multipart)
      partSize: 5 * 1024 * 1024,
      // Don't leave partial uploads in S3 on failure
      leavePartsOnError: false,
    });

    await upload.done();
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error("[s3] Upload failed:", msg);
    return { success: false, message: `S3 upload failed: ${msg}` };
  }

  const region = (process.env.AWS_REGION ?? "").trim();
  const url    = `https://${bucket}.s3.${region}.amazonaws.com/${key}`;
  return { success: true, url, key };
}

// ── deleteFromS3 ──────────────────────────────────────────────────────────────

export async function deleteFromS3(key: string): Promise<void> {
  const bucket = (process.env.AWS_S3_BUCKET_NAME ?? "").trim();
  if (!bucket) return;
  try {
    const { DeleteObjectCommand } = await import("@aws-sdk/client-s3");
    const client = makeClient();
    await client.send(new DeleteObjectCommand({ Bucket: bucket, Key: key }));
  } catch (err) {
    console.error("[s3] DeleteObject failed:", err);
  }
}
