import { NextResponse } from "next/server";
import { connectDB } from "@/app/lib/db";
import ContactSubmission from "@/app/lib/models/ContactSubmission";

// ── Server-side validation ────────────────────────────────────────────────────

function validate(body: Record<string, unknown>): string | null {
  const { firstName, lastName, email, message, agreePrivacy } = body;
  if (!firstName || !lastName) return "First and last name are required.";
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(email)))
    return "A valid email address is required.";
  if (!message || String(message).trim().length < 10)
    return "Message must be at least 10 characters.";
  if (!agreePrivacy) return "Privacy policy must be accepted.";
  return null;
}

// ── POST /api/contact ─────────────────────────────────────────────────────────

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // 1. Basic field validation
    const validationError = validate(body);
    if (validationError) {
      return NextResponse.json({ ok: false, error: validationError }, { status: 400 });
    }

    await connectDB();

    const email = String(body.email).trim().toLowerCase();
    const phone = String(body.phone ?? "").trim();

    // 2. Duplicate email check
    const emailExists = await ContactSubmission.exists({ email });
    if (emailExists) {
      return NextResponse.json(
        {
          ok: false,
          error: "We already have a message from this email address. We'll get back to you soon!",
          code: "DUPLICATE_EMAIL",
        },
        { status: 409 }
      );
    }

    // 3. Duplicate phone check (only when a phone number was provided)
    if (phone) {
      // Normalise: strip all non-digit characters for comparison
      const phoneDigits = phone.replace(/\D/g, "");
      if (phoneDigits.length >= 7) {
        // Find any existing submission whose phone digits end with the same digits
        // (handles country-code variations like +91 vs 0091 vs bare number)
        const phoneExists = await ContactSubmission.exists({
          phone: { $regex: phoneDigits.slice(-9) + "$" },
        });
        if (phoneExists) {
          return NextResponse.json(
            {
              ok: false,
              error: "We already have a message from this phone number. We'll get back to you soon!",
              code: "DUPLICATE_PHONE",
            },
            { status: 409 }
          );
        }
      }
    }

    // 4. Save to MongoDB
    const ipAddress =
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
      request.headers.get("x-real-ip") ??
      "";
    const userAgent = request.headers.get("user-agent")?.slice(0, 300) ?? "";

    await ContactSubmission.create({
      firstName:    String(body.firstName).trim(),
      lastName:     String(body.lastName).trim(),
      email,
      phone,
      message:      String(body.message).trim(),
      agreePrivacy: Boolean(body.agreePrivacy),
      status:       "new",
      ipAddress,
      userAgent,
    });

    // 5. Optional: fire-and-forget to Supabase for email notifications
    const supabaseUrl = process.env.NEXT_PUBLIC_CONTACT_ENDPOINT?.trim();
    if (supabaseUrl) {
      const headers: Record<string, string> = { "Content-Type": "application/json" };
      const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
      if (anonKey) headers["Authorization"] = `Bearer ${anonKey}`;

      fetch(supabaseUrl, {
        method: "POST",
        headers,
        body: JSON.stringify({
          first_name:            body.firstName,
          last_name:             body.lastName,
          email:                 body.email,
          phone:                 body.phone,
          message:               body.message,
          privacy_policy_agreed: body.agreePrivacy,
        }),
      }).catch(() => {
        // Supabase failure must never break the user-facing response
      });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[POST /api/contact]", err);
    return NextResponse.json(
      { ok: false, error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
