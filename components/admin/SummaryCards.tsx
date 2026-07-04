import type { GuestStats } from "@/lib/guests";

function StatCard({
  label,
  value,
  hint,
  accent,
}: {
  label: string;
  value: number | string;
  hint?: string;
  accent: string;
}) {
  return (
    <div className="clay p-4 sm:p-5">
      <p className="text-xs font-bold uppercase tracking-wide text-ink-soft">
        {label}
      </p>
      <p className={`mt-1 font-display text-3xl tabular-nums ${accent}`}>
        {value}
      </p>
      {hint && <p className="mt-0.5 text-xs text-ink-soft">{hint}</p>}
    </div>
  );
}

export function SummaryCards({ stats }: { stats: GuestStats }) {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
      <StatCard
        label="Total invited"
        value={stats.totalInvited}
        accent="text-rose-deep"
      />
      <StatCard
        label="Opened"
        value={stats.totalOpened}
        hint={`${stats.totalInvited - stats.totalOpened} not yet`}
        accent="text-lavender-deep"
      />
      <StatCard
        label="Attending"
        value={stats.attendingHeadcount}
        hint={`${stats.attendingParties} responses + companions`}
        accent="text-success"
      />
      <StatCard
        label="Declined / Pending"
        value={`${stats.declined} / ${stats.pending}`}
        accent="text-ink"
      />
      <div className="clay col-span-2 p-4 sm:col-span-4 sm:p-5">
        <p className="text-xs font-bold uppercase tracking-wide text-ink-soft">
          Breakdown by role
        </p>
        <div className="mt-2 flex flex-wrap gap-2">
          <span className="rounded-full bg-blush-soft px-3 py-1 text-sm font-semibold text-rose-deep">
            Ninong · {stats.byRole.ninong}
          </span>
          <span className="rounded-full bg-blush-soft px-3 py-1 text-sm font-semibold text-rose-deep">
            Ninang · {stats.byRole.ninang}
          </span>
          <span className="rounded-full bg-lavender px-3 py-1 text-sm font-semibold text-ink">
            Invitation only · {stats.byRole.invitation_only}
          </span>
        </div>
      </div>
    </div>
  );
}
