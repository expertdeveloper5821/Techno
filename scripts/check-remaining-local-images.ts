/**
 * scripts/check-remaining-local-images.ts
 *
 * Checks MongoDB for any records still using local /path URLs
 * and lists exactly which ones need attention.
 *
 * Run with: npm run check:images
 */

import "dotenv/config";
import path from "path";
import fs from "fs";
import mongoose from "mongoose";
import {
  S3Client,
  PutObjectCommand,
} from "@aws-sdk/client-s3";

const MONGODB_URI = process.env.MONGODB_URI!;
const AWS_REGION = (process.env.AWS_REGION ?? "").trim();
const AWS_ACCESS_KEY_ID = (process.env.AWS_ACCESS_KEY_ID ?? "").trim();
const AWS_SECRET_ACCESS_KEY = (process.env.AWS_SECRET_ACCESS_KEY ?? "").trim();
const BUCKET = (process.env.AWS_S3_BUCKET_NAME ?? "").trim();
const FOLDER = "techno";
const PUBLIC_DIR = path.join(process.cwd(), "public");

const s3 = new S3Client({
  region: AWS_REGION,
  credentials: { accessKeyId: AWS_ACCESS_KEY_ID, secretAccessKey: AWS_SECRET_ACCESS_KEY },
});

const COLLECTIONS = [
  { name: "products",       imageFields: ["image"] },
  { name: "services",       imageFields: ["image"] },
  { name: "partners",       imageFields: ["logoGray", "logoColor"] },
  { name: "technologies",   imageFields: ["logo"] },
  { name: "blogposts",      imageFields: ["image"] },
  { name: "portfolioworks", imageFields: ["image"] },
  { name: "industries",     imageFields: ["icon", "blackIcon"] },
  { name: "growthitems",    imageFields: ["icon", "blackIcon"] },
  { name: "features",       imageFields: ["image"] },
  { name: "whatwedos",      imageFields: ["imageSrc", "icon"] },
];

// ── Upload helper ─────────────────────────────────────────────────────────────

async function uploadBuffer(buffer: Buffer, originalUrl: string, contentType: string): Promise<string> {
  const ext      = path.extname(originalUrl).toLowerCase();
  const baseName = path.basename(originalUrl, ext).replace(/[^a-zA-Z0-9_-]/g, "_");
  const key      = `${FOLDER}/${Date.now()}_${baseName}${ext}`;

  await s3.send(new PutObjectCommand({
    Bucket: BUCKET,
    Key: key,
    Body: buffer,
    ContentType: contentType,
  }));

  return `https://${BUCKET}.s3.${AWS_REGION}.amazonaws.com/${key}`;
}

function getMime(ext: string): string {
  const map: Record<string, string> = {
    ".jpg": "image/jpeg", ".jpeg": "image/jpeg",
    ".png": "image/png",  ".gif": "image/gif",
    ".webp": "image/webp", ".svg": "image/svg+xml",
    ".avif": "image/avif",
  };
  return map[ext] ?? "application/octet-stream";
}

// ── Main ──────────────────────────────────────────────────────────────────────

async function main() {
  await mongoose.connect(MONGODB_URI, { bufferCommands: false });
  const db = mongoose.connection;
  console.log("✅  Connected to MongoDB\n");

  // Track which local files have already been uploaded this run
  // so duplicate references reuse the same S3 URL
  const uploadedCache = new Map<string, string>(); // localPath → s3Url

  let totalLocal = 0;
  let totalFixed = 0;
  let totalMissing = 0;
  let totalAlreadyS3 = 0;

  for (const cfg of COLLECTIONS) {
    const col  = db.collection(cfg.name);
    const docs = await col.find({}).toArray();
    if (docs.length === 0) continue;

    for (const doc of docs) {
      const updates: Record<string, string> = {};

      for (const field of cfg.imageFields) {
        const val = doc[field] as string | undefined;
        if (!val) continue;

        if (val.startsWith("http://") || val.startsWith("https://")) {
          totalAlreadyS3++;
          continue;
        }

        if (!val.startsWith("/")) continue;

        totalLocal++;
        const absPath = path.join(PUBLIC_DIR, val.replace(/^\//, ""));

        // Check cache first (same file referenced by multiple records)
        if (uploadedCache.has(val)) {
          updates[field] = uploadedCache.get(val)!;
          console.log(`  ♻️  ${cfg.name}/${doc._id} [${field}]: reusing cached S3 URL`);
          totalFixed++;
          continue;
        }

        if (!fs.existsSync(absPath)) {
          console.log(`  ❌  ${cfg.name}/${doc._id} [${field}]: FILE MISSING on disk — ${val}`);
          console.log(`      → You must manually re-upload this image in the CMS admin panel`);
          totalMissing++;
          continue;
        }

        // File exists — upload it
        try {
          console.log(`  ⬆️  ${cfg.name}/${doc._id} [${field}]: ${val}`);
          const buffer = fs.readFileSync(absPath);
          const ext    = path.extname(val).toLowerCase();
          const s3Url  = await uploadBuffer(buffer, val, getMime(ext));
          uploadedCache.set(val, s3Url);
          updates[field] = s3Url;
          console.log(`     ✅ → ${s3Url}`);

          // Delete local file
          fs.unlinkSync(absPath);
          console.log(`     🗑  Deleted: ${absPath}`);
          totalFixed++;
        } catch (err) {
          console.error(`     ❌ Upload failed: ${err instanceof Error ? err.message : err}`);
          totalMissing++;
        }
      }

      if (Object.keys(updates).length > 0) {
        await col.updateOne({ _id: doc._id }, { $set: updates });
      }
    }
  }

  await mongoose.disconnect();

  console.log("\n─────────────────────────────────────────");
  console.log(`📊  Summary:`);
  console.log(`   Already on S3 : ${totalAlreadyS3}`);
  console.log(`   Fixed now     : ${totalFixed}`);
  console.log(`   Missing files : ${totalMissing}  ← re-upload these manually in CMS`);
  console.log(`   Total local   : ${totalLocal}`);

  if (totalMissing === 0) {
    console.log("\n✅  All images are now on S3!");
  } else {
    console.log(`\n⚠️   ${totalMissing} image(s) could not be migrated because the source`);
    console.log(`    file no longer exists on disk. Open the CMS admin panel,`);
    console.log(`    find each affected record, and re-upload the image.`);
  }
}

main().catch((err) => {
  console.error("❌  Script failed:", err);
  process.exit(1);
});
