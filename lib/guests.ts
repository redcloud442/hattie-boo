import { prisma } from "@/lib/db";
import { Role, RsvpStatus } from "@/generated/prisma/enums";
import type { GuestModel } from "@/generated/prisma/models";

export type Guest = GuestModel;

export const GODPARENT_ROLES: Role[] = [Role.ninong, Role.ninang];

export function isGodparent(role: Role): boolean {
  return role === Role.ninong || role === Role.ninang;
}

export function listGuests(): Promise<Guest[]> {
  return prisma.guest.findMany({ orderBy: { createdAt: "desc" } });
}

export function getGuestBySlug(slug: string): Promise<Guest | null> {
  return prisma.guest.findUnique({ where: { slug } });
}

// Marks the first time a guest opened their link (best-effort tracking).
export async function markOpened(
  slug: string,
  source: "qr" | "link",
): Promise<void> {
  const guest = await prisma.guest.findUnique({ where: { slug } });
  if (!guest) return;
  const data: Record<string, unknown> = {};
  if (!guest.openedAt) {
    data.openedAt = new Date();
    data.accessSource = source;
  }
  if (source === "qr" && !guest.qrScannedAt) data.qrScannedAt = new Date();
  if (Object.keys(data).length > 0) {
    await prisma.guest.update({ where: { slug }, data });
  }
}

// Validates a godparent QR/query-param access attempt. Returns the guest only
// when role + slug + key all match a real godparent record.
export async function validateGodparent(
  role: string | undefined,
  slug: string | undefined,
  key: string | undefined,
): Promise<Guest | null> {
  if (!role || !slug || !key) return null;
  if (role !== Role.ninong && role !== Role.ninang) return null;
  const guest = await prisma.guest.findUnique({ where: { slug } });
  if (!guest) return null;
  if (guest.role !== role) return null;
  if (!isGodparent(guest.role)) return null;
  if (guest.accessKey !== key) return null;
  return guest;
}

export type GuestStats = {
  totalInvited: number;
  totalOpened: number;
  attendingHeadcount: number;
  attendingParties: number;
  declined: number;
  pending: number;
  byRole: Record<Role, number>;
};

export async function getStats(): Promise<GuestStats> {
  const guests = await prisma.guest.findMany();
  const stats: GuestStats = {
    totalInvited: guests.length,
    totalOpened: 0,
    attendingHeadcount: 0,
    attendingParties: 0,
    declined: 0,
    pending: 0,
    byRole: {
      [Role.ninong]: 0,
      [Role.ninang]: 0,
      [Role.invitation_only]: 0,
    },
  };
  for (const g of guests) {
    if (g.openedAt) stats.totalOpened += 1;
    stats.byRole[g.role] += 1;
    if (g.rsvpStatus === RsvpStatus.attending) {
      stats.attendingParties += 1;
      stats.attendingHeadcount += 1 + (g.companionCount ?? 0);
    } else if (g.rsvpStatus === RsvpStatus.declined) {
      stats.declined += 1;
    } else {
      stats.pending += 1;
    }
  }
  return stats;
}
