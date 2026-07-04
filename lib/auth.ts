import crypto from "node:crypto";
import { cookies } from "next/headers";

const COOKIE = "admin_session";

// Deterministic session token derived from the admin password + secret.
// If the password changes, existing sessions become invalid automatically.
function sessionToken(): string {
  const secret = process.env.ADMIN_SECRET ?? "change-me-dev-secret";
  const pw = process.env.ADMIN_PASSWORD ?? "";
  return crypto.createHmac("sha256", secret).update(pw).digest("hex");
}

export async function isAdmin(): Promise<boolean> {
  const store = await cookies();
  const value = store.get(COOKIE)?.value;
  if (!value) return false;
  const expected = sessionToken();
  // constant-time compare
  const a = Buffer.from(value);
  const b = Buffer.from(expected);
  return a.length === b.length && crypto.timingSafeEqual(a, b);
}

export async function signInAdmin(password: string): Promise<boolean> {
  const expected = process.env.ADMIN_PASSWORD;
  if (!expected || password !== expected) return false;
  const store = await cookies();
  store.set(COOKIE, sessionToken(), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
  });
  return true;
}

export async function signOutAdmin(): Promise<void> {
  const store = await cookies();
  store.delete(COOKIE);
}
