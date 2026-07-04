import { isAdmin } from "@/lib/auth";
import { listGuests } from "@/lib/guests";
import { roleLabel } from "@/lib/format";

export const dynamic = "force-dynamic";

function csvCell(value: unknown): string {
  const s = value === null || value === undefined ? "" : String(value);
  return `"${s.replace(/"/g, '""')}"`;
}

export async function GET() {
  if (!(await isAdmin())) {
    return new Response("Unauthorized", { status: 401 });
  }

  const guests = await listGuests();
  const header = [
    "Name",
    "Role",
    "RSVP",
    "Companions",
    "Message",
    "Opened",
    "Responded",
    "Slug",
  ];
  const rows = guests.map((g) =>
    [
      g.name,
      g.role === "invitation_only" ? "Invitation only" : roleLabel(g.role),
      g.rsvpStatus,
      g.companionCount,
      g.guestMessage ?? "",
      g.openedAt ? g.openedAt.toISOString() : "",
      g.respondedAt ? g.respondedAt.toISOString() : "",
      g.slug,
    ]
      .map(csvCell)
      .join(","),
  );
  const csv = [header.map(csvCell).join(","), ...rows].join("\r\n");

  return new Response(csv, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": 'attachment; filename="christening-rsvps.csv"',
    },
  });
}
