/**
 * Lightweight session helper — signs/verifies a simple HMAC token stored
 * in an HttpOnly cookie called `admin_session`.
 *
 * No extra npm packages required; uses the Web Crypto API that is available
 * in both the Next.js Edge runtime and Node.js 18+.
 */

const COOKIE_NAME = "admin_session";
const MAX_AGE = 60 * 60 * 8; // 8 hours

// ── HMAC helpers ────────────────────────────────────────────────────────────

async function getKey(): Promise<CryptoKey> {
  // Trim to remove any accidental whitespace from the .env value
  const secret = (process.env.SESSION_SECRET ?? "fallback-dev-secret").trim();
  const enc = new TextEncoder();
  return crypto.subtle.importKey(
    "raw",
    enc.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign", "verify"]
  );
}

function bufToHex(buf: ArrayBuffer): string {
  return Array.from(new Uint8Array(buf))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

async function sign(payload: string): Promise<string> {
  const key = await getKey();
  const sig = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(payload));
  return `${payload}.${bufToHex(sig)}`;
}

async function verify(token: string): Promise<string | null> {
  const lastDot = token.lastIndexOf(".");
  if (lastDot === -1) return null;
  const payload = token.slice(0, lastDot);
  const expected = await sign(payload);
  return expected === token ? payload : null;
}

// ── Public API ───────────────────────────────────────────────────────────────

/** Build a Set-Cookie header value that creates the session. */
export async function createSessionCookie(): Promise<string> {
  const payload = `admin:${Date.now()}`;
  const token = await sign(payload);
  return `${COOKIE_NAME}=${encodeURIComponent(token)}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${MAX_AGE}`;
}

/** Build a Set-Cookie header value that clears the session. */
export function clearSessionCookie(): string {
  return `${COOKIE_NAME}=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0`;
}

/** Return true if the request carries a valid session cookie. */
export async function isAuthenticated(request: Request): Promise<boolean> {
  const cookieHeader = request.headers.get("cookie") ?? "";
  const match = cookieHeader
    .split(";")
    .map((c) => c.trim())
    .find((c) => c.startsWith(`${COOKIE_NAME}=`));

  if (!match) return false;
  const raw = decodeURIComponent(match.slice(COOKIE_NAME.length + 1));
  const payload = await verify(raw);
  if (!payload) return false;

  // Check token age
  const ts = Number(payload.split(":")[1]);
  return Date.now() - ts < MAX_AGE * 1000;
}
