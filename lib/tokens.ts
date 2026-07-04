import crypto from "node:crypto";

// Cryptographically-random, URL-safe access key for godparent QR links.
export function randomKey(length = 12): string {
  return crypto.randomBytes(24).toString("base64url").slice(0, length);
}

// Human-readable slug + unguessable random suffix so invite URLs can't be enumerated.
export function makeSlug(name: string): string {
  const base = name
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[^\w\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .slice(0, 32);
  const suffix = crypto.randomBytes(4).toString("hex");
  return base ? `${base}-${suffix}` : suffix;
}
