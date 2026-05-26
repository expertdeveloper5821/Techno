import { NextResponse } from "next/server";
import { createSessionCookie } from "@/app/lib/session";

export async function POST(request: Request) {
  try {
    const { username, password } = await request.json();

    const validUser = process.env.ADMIN_USERNAME ?? "admin";
    const validPass = process.env.ADMIN_PASSWORD ?? "admin123";

    if (username !== validUser || password !== validPass) {
      return NextResponse.json(
        { success: false, message: "Invalid credentials" },
        { status: 401 }
      );
    }

    const cookie = await createSessionCookie();
    return NextResponse.json(
      { success: true },
      { headers: { "Set-Cookie": cookie } }
    );
  } catch {
    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}
