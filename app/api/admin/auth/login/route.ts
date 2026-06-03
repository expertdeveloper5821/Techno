import { NextResponse } from "next/server";
import { compare } from "bcryptjs";
import { connectDB } from "@/app/lib/db";
import AdminUser from "@/app/lib/models/AdminUser";
import { createSessionCookie } from "@/app/lib/session";

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { success: false, message: "Email and password are required" },
        { status: 400 }
      );
    }

    await connectDB();
    const admin = await AdminUser.findOne({ email: email.toLowerCase().trim() });

    if (!admin) {
      return NextResponse.json(
        { success: false, message: "Invalid credentials" },
        { status: 401 }
      );
    }

    const valid = await compare(password, admin.passwordHash);
    if (!valid) {
      return NextResponse.json(
        { success: false, message: "Invalid credentials" },
        { status: 401 }
      );
    }

    const cookie = await createSessionCookie(admin.email);
    return NextResponse.json(
      { success: true, name: admin.name },
      { headers: { "Set-Cookie": cookie } }
    );
  } catch {
    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}
