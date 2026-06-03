import { SignJWT, jwtVerify } from "jose";

const COOKIE_NAME = "admin_session";
const MAX_AGE = 60 * 60 * 8; // 8 hours

function getSecret(): Uint8Array {
  const secret = (process.env.JWT_SECRET ?? "fallback-dev-secret-change-in-production").trim();
  return new TextEncoder().encode(secret);
}

/** Sign a JWT and return the Set-Cookie header string. */
export async function createSessionCookie(email: string): Promise<string> {
  const token = await new SignJWT({ email, role: "admin" })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("8h")
    .sign(getSecret());

  return `${COOKIE_NAME}=${token}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${MAX_AGE}`;
}

/** Return a Set-Cookie header that clears the session. */
export function clearSessionCookie(): string {
  return `${COOKIE_NAME}=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0`;
}

/** Return true if the request carries a valid, non-expired JWT cookie. */
export async function isAuthenticated(request: Request): Promise<boolean> {
  const cookieHeader = request.headers.get("cookie") ?? "";
  const match = cookieHeader
    .split(";")
    .map((c) => c.trim())
    .find((c) => c.startsWith(`${COOKIE_NAME}=`));

  if (!match) return false;
  const token = match.slice(COOKIE_NAME.length + 1);

  try {
    await jwtVerify(token, getSecret());
    return true;
  } catch {
    return false;
  }
}
