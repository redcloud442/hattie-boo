// Calendar link + .ics builders for the "Add to Calendar" button.

function toICSDate(d: Date): string {
  // UTC basic format: YYYYMMDDTHHMMSSZ
  return `${d.toISOString().replace(/[-:]/g, "").split(".")[0]}Z`;
}

type CalEvent = {
  title: string;
  description: string;
  location: string;
  start: Date;
  durationMinutes?: number;
};

function endDate(e: CalEvent): Date {
  return new Date(e.start.getTime() + (e.durationMinutes ?? 120) * 60000);
}

export function googleCalendarUrl(e: CalEvent): string {
  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: e.title,
    details: e.description,
    location: e.location,
    dates: `${toICSDate(e.start)}/${toICSDate(endDate(e))}`,
  });
  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

export function icsDataUrl(e: CalEvent): string {
  const lines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Christening Invite//EN",
    "BEGIN:VEVENT",
    `UID:${toICSDate(e.start)}-${Math.random().toString(36).slice(2)}@christening`,
    `DTSTAMP:${toICSDate(new Date())}`,
    `DTSTART:${toICSDate(e.start)}`,
    `DTEND:${toICSDate(endDate(e))}`,
    `SUMMARY:${escapeICS(e.title)}`,
    `DESCRIPTION:${escapeICS(e.description)}`,
    `LOCATION:${escapeICS(e.location)}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ];
  return `data:text/calendar;charset=utf-8,${encodeURIComponent(lines.join("\r\n"))}`;
}

function escapeICS(s: string): string {
  return s.replace(/([,;\\])/g, "\\$1").replace(/\n/g, "\\n");
}
