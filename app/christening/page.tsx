import { AccessDenied } from "@/components/AccessDenied";
import { GuestInvitation } from "@/components/GuestInvitation";
import { markOpened, validateGodparent } from "@/lib/guests";
import { getSettings } from "@/lib/settings";

export const dynamic = "force-dynamic";

function first(v: string | string[] | undefined): string | undefined {
  return Array.isArray(v) ? v[0] : v;
}

// Godparent-exclusive entry point (QR target):
//   /christening?role=ninong|ninang&guest=<slug>&key=<token>&source=qr
// Godparent content + RSVP only render when role + slug + key all validate.
export default async function ChristeningPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const sp = await searchParams;
  const guest = await validateGodparent(
    first(sp.role),
    first(sp.guest),
    first(sp.key),
  );

  if (!guest) return <AccessDenied />;

  await markOpened(guest.slug, "qr");
  const settings = await getSettings();

  return <GuestInvitation settings={settings} guest={guest} mode="godparent" />;
}
