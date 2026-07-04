"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/db";
import { validateGodparent } from "@/lib/guests";
import { RsvpStatus } from "@/generated/prisma/enums";

export type RsvpState = { ok: boolean; error?: string };

// SECURITY: Server Actions are reachable by direct POST, so we re-validate the
// godparent access (role + slug + key) here and never trust the client.
export async function submitRsvp(
  _prev: RsvpState,
  formData: FormData,
): Promise<RsvpState> {
  const slug = String(formData.get("slug") ?? "");
  const key = String(formData.get("key") ?? "");
  const role = String(formData.get("role") ?? "");
  const attending = formData.get("attending") === "yes";
  const rawCompanions = Number(formData.get("companionCount") ?? 0);
  const companionCount = Number.isFinite(rawCompanions)
    ? Math.max(0, Math.min(20, Math.trunc(rawCompanions)))
    : 0;
  const message = String(formData.get("message") ?? "")
    .trim()
    .slice(0, 1000);

  const guest = await validateGodparent(role, slug, key);
  if (!guest) {
    return { ok: false, error: "We couldn't verify your invitation link." };
  }

  await prisma.guest.update({
    where: { id: guest.id },
    data: {
      rsvpStatus: attending ? RsvpStatus.attending : RsvpStatus.declined,
      companionCount: attending ? companionCount : 0,
      guestMessage: message || null,
      respondedAt: new Date(),
    },
  });

  revalidatePath("/christening");
  return { ok: true };
}
