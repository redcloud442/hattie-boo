import { regenerateKeyAction } from "@/app/admin/actions";
import { CopyButton } from "@/components/admin/CopyButton";
import { DeleteGuestButton } from "@/components/admin/DeleteGuestButton";
import { QrButton } from "@/components/admin/QrButton";
import type { Guest } from "@/lib/guests";
import { isGodparent } from "@/lib/guests";
import { roleLabel } from "@/lib/format";
import { godparentUrl, inviteUrl } from "@/lib/site";

function RoleBadge({ role }: { role: Guest["role"] }) {
  const godparent = isGodparent(role);
  return (
    <span
      className={`rounded-full px-2.5 py-0.5 text-xs font-bold ${
        godparent
          ? "bg-blush-soft text-rose-deep"
          : "bg-lavender text-ink"
      }`}
    >
      {godparent ? roleLabel(role) : "Invitation only"}
    </span>
  );
}

function RsvpBadge({ guest }: { guest: Guest }) {
  const map = {
    attending: { cls: "bg-success/15 text-success", text: "Attending" },
    declined: { cls: "bg-danger/15 text-danger", text: "Declined" },
    pending: { cls: "bg-gold/25 text-gold-deep", text: "Pending" },
  } as const;
  const s = map[guest.rsvpStatus];
  return (
    <span className={`rounded-full px-2.5 py-0.5 text-xs font-bold ${s.cls}`}>
      {s.text}
    </span>
  );
}

export function GuestTable({
  guests,
  qrMap,
  inviteQrMap,
}: {
  guests: Guest[];
  qrMap: Record<string, string>;
  inviteQrMap: Record<string, string>;
}) {
  if (guests.length === 0) {
    return (
      <div className="clay p-8 text-center text-ink-soft">
        <p className="font-display text-lg text-rose-deep">No guests yet</p>
        <p className="mt-1 text-sm">
          Create your first invitation using the form above.
        </p>
      </div>
    );
  }

  return (
    <ul className="flex flex-col gap-3">
      {guests.map((g) => {
        const godparent = isGodparent(g.role);
        return (
          <li key={g.id} className="clay p-4 sm:p-5">
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-display text-lg text-ink">{g.name}</span>
              <RoleBadge role={g.role} />
              <RsvpBadge guest={g} />
              <span
                className={`ml-auto inline-flex items-center gap-1.5 text-xs font-semibold ${
                  g.openedAt ? "text-success" : "text-ink-soft"
                }`}
              >
                <span
                  className={`inline-block h-2 w-2 rounded-full ${
                    g.openedAt ? "bg-success" : "bg-blush"
                  }`}
                />
                {g.openedAt ? "Opened" : "Not opened"}
              </span>
            </div>

            {g.guestMessage && (
              <p className="mt-2 rounded-xl bg-blush-soft px-3 py-2 text-sm italic text-ink-soft">
                “{g.guestMessage}”
              </p>
            )}

            {/* Invite link — shared with everyone (Messenger/Viber) */}
            <div className="mt-3 rounded-2xl bg-blush-soft/50 p-3">
              <p className="mb-1.5 text-xs font-bold uppercase tracking-wide text-lavender-deep">
                Invitation link
              </p>
              <div className="flex flex-wrap items-center gap-2">
                <CopyButton text={inviteUrl(g.slug)} label="Copy invite link" />
                <QrButton
                  dataUrl={inviteQrMap[g.slug] ?? ""}
                  filename={`invite-${g.slug}.png`}
                  guestName={g.name}
                  label="Invite QR"
                  caption="Scan to open the invitation"
                />
              </div>
            </div>

            {/* Godparent exclusive — separate, key-protected QR */}
            {godparent && (
              <div className="mt-2 rounded-2xl border-2 border-gold/50 bg-gold/10 p-3">
                <p className="mb-1.5 text-xs font-bold uppercase tracking-wide text-gold-deep">
                  Godparent exclusive · QR required
                </p>
                <div className="flex flex-wrap items-center gap-2">
                  <CopyButton
                    text={godparentUrl(g)}
                    label="Copy godparent link"
                  />
                  <QrButton
                    dataUrl={qrMap[g.slug] ?? ""}
                    filename={`godparent-${g.slug}.png`}
                    guestName={g.name}
                    label="Godparent QR"
                    caption="Scan to view your godparent invitation"
                    variant="gold"
                  />
                  <form action={regenerateKeyAction}>
                    <input type="hidden" name="id" value={g.id} />
                    <button
                      type="submit"
                      className="min-h-[40px] rounded-full border-2 border-gold-deep/40 px-3 py-1.5 text-sm font-semibold text-gold-deep hover:bg-gold/20"
                    >
                      New key
                    </button>
                  </form>
                </div>
              </div>
            )}

            <div className="mt-2 flex justify-end">
              <DeleteGuestButton id={g.id} name={g.name} />
            </div>
          </li>
        );
      })}
    </ul>
  );
}
