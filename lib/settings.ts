import { prisma } from "@/lib/db";
import type { EventSettingsModel as EventSettings } from "@/generated/prisma/models";

export const SINGLETON_ID = "singleton";

// Placeholder content shown until the admin fills in real details.
export const DEFAULT_SETTINGS: EventSettings = {
  id: SINGLETON_ID,
  babyName: "Baby Hattie",
  parentNames: "Maria & Jose",
  christeningDateTime: new Date("2026-09-12T10:00:00+08:00"),
  churchName: "Our Lady of Grace Parish",
  churchAddress: "123 Chapel Road, Quezon City, Metro Manila",
  churchMapUrl: null,
  venueName: "The Garden Pavilion",
  venueAddress: "45 Rosewood Ave, Quezon City, Metro Manila",
  venueMapUrl: null,
  dressCode: "Semi-formal · Pastel colors welcome",
  heroImageUrl: null,
  thankYouNote:
    "Your love and prayers are the greatest gift to our little angel. Thank you for celebrating this blessed day with us.",
  updatedAt: new Date(),
};

// Returns the singleton settings row, falling back to placeholders so guest
// pages always render even before the admin has saved anything.
export async function getSettings(): Promise<EventSettings> {
  const row = await prisma.eventSettings.findUnique({
    where: { id: SINGLETON_ID },
  });
  return row ?? DEFAULT_SETTINGS;
}

export type SettingsInput = Omit<EventSettings, "id" | "updatedAt">;

export async function saveSettings(data: SettingsInput): Promise<EventSettings> {
  return prisma.eventSettings.upsert({
    where: { id: SINGLETON_ID },
    create: { id: SINGLETON_ID, ...data },
    update: data,
  });
}
