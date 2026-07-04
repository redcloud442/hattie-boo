import Link from "next/link";
import { logoutAction } from "@/app/admin/actions";
import { AdminLogin } from "@/components/admin/AdminLogin";
import { CreateGuestForm } from "@/components/admin/CreateGuestForm";
import { GuestTable } from "@/components/admin/GuestTable";
import { SettingsForm } from "@/components/admin/SettingsForm";
import { SummaryCards } from "@/components/admin/SummaryCards";
import { DownloadIcon } from "@/components/icons";
import { isAdmin } from "@/lib/auth";
import { toDatetimeLocalValue } from "@/lib/format";
import { getStats, isGodparent, listGuests } from "@/lib/guests";
import { qrDataUrl } from "@/lib/qr";
import { getSettings } from "@/lib/settings";
import { godparentUrl, inviteUrl } from "@/lib/site";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  if (!(await isAdmin())) {
    return <AdminLogin />;
  }

  const [guests, stats, settings] = await Promise.all([
    listGuests(),
    getStats(),
    getSettings(),
  ]);

  // Pre-generate QR PNGs (small guest lists → cheap):
  //  - invite QR for every guest (encodes the general /invite link)
  //  - godparent QR for godparents only (encodes the exclusive /christening link)
  const [inviteEntries, godparentEntries] = await Promise.all([
    Promise.all(
      guests.map(
        async (g) => [g.slug, await qrDataUrl(inviteUrl(g.slug))] as const,
      ),
    ),
    Promise.all(
      guests
        .filter((g) => isGodparent(g.role))
        .map(async (g) => [g.slug, await qrDataUrl(godparentUrl(g))] as const),
    ),
  ]);
  const inviteQrMap = Object.fromEntries(inviteEntries);
  const qrMap = Object.fromEntries(godparentEntries);

  return (
    <main className="mx-auto w-full max-w-3xl px-4 py-8 sm:px-6">
      <header className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="font-script text-3xl text-rose-deep">Host Dashboard</h1>
          <p className="text-sm text-ink-soft">
            Manage invitations &amp; track RSVPs
          </p>
        </div>
        <form action={logoutAction}>
          <button
            type="submit"
            className="min-h-[44px] rounded-full border-2 border-blush bg-white px-4 py-2 text-sm font-semibold text-rose-deep hover:bg-blush-soft"
          >
            Sign out
          </button>
        </form>
      </header>

      <section className="mb-8">
        <SummaryCards stats={stats} />
      </section>

      <section className="mb-8">
        <CreateGuestForm />
      </section>

      <section className="mb-8">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="font-display text-xl text-ink">
            Guests{" "}
            <span className="text-ink-soft">({guests.length})</span>
          </h2>
          <Link
            href="/admin/export"
            prefetch={false}
            className="inline-flex min-h-[44px] items-center gap-1.5 rounded-full border-2 border-blush bg-white px-4 py-2 text-sm font-semibold text-rose-deep hover:bg-blush-soft"
          >
            <DownloadIcon width={16} height={16} />
            Export CSV
          </Link>
        </div>
        <GuestTable guests={guests} qrMap={qrMap} inviteQrMap={inviteQrMap} />
      </section>

      <section>
        <SettingsForm
          settings={settings}
          dateTimeValue={toDatetimeLocalValue(settings.christeningDateTime)}
        />
      </section>
    </main>
  );
}
