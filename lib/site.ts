import type { Role } from "@/generated/prisma/enums";

export function siteUrl(): string {
  return (process.env.NEXT_PUBLIC_SITE_URL ?? "").replace(/\/$/, "");
}

export function inviteUrl(slug: string): string {
  return `${siteUrl()}/invite/${slug}`;
}

export function godparentUrl(guest: {
  slug: string;
  role: Role;
  accessKey: string;
}): string {
  const params = new URLSearchParams({
    role: guest.role,
    guest: guest.slug,
    key: guest.accessKey,
    source: "qr",
  });
  return `${siteUrl()}/christening?${params.toString()}`;
}

// --- Google Maps helpers -------------------------------------------------

export function mapsEmbedUrl(address: string): string {
  const key = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
  const q = encodeURIComponent(address);
  if (!key) {
    // Keyless fallback: still renders an interactive map, no API key required.
    return `https://maps.google.com/maps?q=${q}&output=embed`;
  }
  return `https://www.google.com/maps/embed/v1/place?key=${key}&q=${q}`;
}

export function mapsDirectionsUrl(address: string): string {
  return `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(address)}`;
}

export function mapsPlaceUrl(address: string): string {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
}
