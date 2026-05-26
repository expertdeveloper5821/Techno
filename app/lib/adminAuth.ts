import { NextResponse } from "next/server";
import { isAuthenticated } from "./session";

/** Returns null if authenticated, or a 401 response if not. */
export async function requireAdmin(request: Request): Promise<NextResponse | null> {
  if (await isAuthenticated(request)) return null;
  return NextResponse.json(
    { success: false, message: "Unauthorized" },
    { status: 401 }
  );
}
