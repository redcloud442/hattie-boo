"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/db";
import { isGodparent } from "@/lib/guests";
import { RsvpStatus } from "@/generated/prisma/enums";

export type RsvpState = { ok: boolean; error?: string };

// SECURITY: Server Actions are reachable by direct POST, so we look the guest up
// by their unguessable slug and — for godparents — re-check the access key.
export async function submitRsvp(
  _prev: RsvpState,
  formData: FormData,
): Promise<RsvpState> {
  const slug = String(formData.get("slug") ?? "");
  const key = String(formData.get("key") ?? "");
  const attending = formData.get("attending") === "yes";
  const message = String(formData.get("message") ?? "")
    .trim()
    .slice(0, 1000);

  const guest = slug
    ? await prisma.guest.findUnique({ where: { slug } })
    : null;
  if (!guest) {
    return { ok: false, error: "We couldn't verify your invitation link." };
  }
  // Godparent RSVPs additionally require the QR access key.
  if (isGodparent(guest.role) && guest.accessKey !== key) {
    return { ok: false, error: "We couldn't verify your invitation link." };
  }

  await prisma.guest.update({
    where: { id: guest.id },
    data: {
      rsvpStatus: attending ? RsvpStatus.attending : RsvpStatus.declined,
      companionCount: 0,
      guestMessage: message || null,
      respondedAt: new Date(),
    },
  });

  revalidatePath("/christening");
  return { ok: true };
}
