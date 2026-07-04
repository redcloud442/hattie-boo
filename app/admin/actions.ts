"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/db";
import { isAdmin, signInAdmin, signOutAdmin } from "@/lib/auth";
import { isGodparent } from "@/lib/guests";
import { makeSlug, randomKey } from "@/lib/tokens";
import { saveSettings, type SettingsInput } from "@/lib/settings";
import { Role } from "@/generated/prisma/enums";

async function requireAdmin() {
  if (!(await isAdmin())) throw new Error("Unauthorized");
}

export type FormState = { ok: boolean; error?: string };

// ---- Auth -----------------------------------------------------------------

export async function loginAction(
  _prev: FormState,
  formData: FormData,
): Promise<FormState> {
  const password = String(formData.get("password") ?? "");
  const ok = await signInAdmin(password);
  if (!ok) return { ok: false, error: "Incorrect password. Please try again." };
  redirect("/admin");
}

export async function logoutAction(): Promise<void> {
  await signOutAdmin();
  redirect("/admin");
}

// ---- Guests ---------------------------------------------------------------

function parseRole(value: unknown): Role | null {
  if (value === Role.ninong || value === Role.ninang || value === Role.invitation_only) {
    return value;
  }
  return null;
}

export async function createGuestAction(
  _prev: FormState,
  formData: FormData,
): Promise<FormState> {
  await requireAdmin();

  const name = String(formData.get("name") ?? "").trim();
  const role = parseRole(formData.get("role"));
  const personalMessage =
    String(formData.get("personalMessage") ?? "").trim() || null;

  if (!name) return { ok: false, error: "Please enter a guest name." };
  if (!role) return { ok: false, error: "Please choose a guest type." };

  // Retry once on the (very unlikely) slug collision.
  for (let attempt = 0; attempt < 2; attempt++) {
    try {
      await prisma.guest.create({
        data: {
          name,
          role,
          personalMessage,
          slug: makeSlug(name),
          accessKey: randomKey(),
          qrGeneratedAt: isGodparent(role) ? new Date() : null,
        },
      });
      revalidatePath("/admin");
      return { ok: true };
    } catch (err) {
      if (attempt === 1) {
        return { ok: false, error: "Could not create the guest. Try again." };
      }
    }
  }
  return { ok: false, error: "Could not create the guest." };
}

export async function regenerateKeyAction(formData: FormData): Promise<void> {
  await requireAdmin();
  const id = String(formData.get("id") ?? "");
  if (!id) return;
  await prisma.guest.update({
    where: { id },
    data: { accessKey: randomKey(), qrGeneratedAt: new Date() },
  });
  revalidatePath("/admin");
}

export async function deleteGuestAction(formData: FormData): Promise<void> {
  await requireAdmin();
  const id = String(formData.get("id") ?? "");
  if (!id) return;
  await prisma.guest.delete({ where: { id } });
  revalidatePath("/admin");
}

// ---- Event settings -------------------------------------------------------

export async function saveSettingsAction(
  _prev: FormState,
  formData: FormData,
): Promise<FormState> {
  await requireAdmin();

  const get = (k: string) => String(formData.get(k) ?? "").trim();
  const dt = get("christeningDateTime");
  const parsedDate = dt ? new Date(dt) : null;
  if (!parsedDate || Number.isNaN(parsedDate.getTime())) {
    return { ok: false, error: "Please enter a valid date and time." };
  }

  const data: SettingsInput = {
    babyName: get("babyName") || "Baby",
    parentNames: get("parentNames"),
    christeningDateTime: parsedDate,
    churchName: get("churchName"),
    churchAddress: get("churchAddress"),
    churchMapUrl: get("churchMapUrl") || null,
    venueName: get("venueName"),
    venueAddress: get("venueAddress"),
    venueMapUrl: get("venueMapUrl") || null,
    dressCode: get("dressCode") || null,
    heroImageUrl: get("heroImageUrl") || null,
    thankYouNote: get("thankYouNote") || null,
  };

  await saveSettings(data);
  revalidatePath("/admin");
  revalidatePath("/christening");
  return { ok: true };
}
