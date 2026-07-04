import { notFound } from "next/navigation";
import { GuestInvitation } from "@/components/GuestInvitation";
import { getGuestBySlug, markOpened } from "@/lib/guests";
import { getSettings } from "@/lib/settings";

export const dynamic = "force-dynamic";

// General invitation. Godparent RSVP is NEVER shown here, even if the guest's
// role happens to be ninong/ninang — the exclusive flow lives at /christening.
export default async function InvitePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const guest = await getGuestBySlug(slug);
  if (!guest) notFound();

  await markOpened(slug, "link");
  const settings = await getSettings();

  return <GuestInvitation settings={settings} guest={guest} mode="general" />;
}
