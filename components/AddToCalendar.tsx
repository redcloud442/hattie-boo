"use client";

import { useState } from "react";
import { CalendarIcon, DownloadIcon, ExternalIcon } from "@/components/icons";
import { googleCalendarUrl, icsDataUrl } from "@/lib/calendar";

export function AddToCalendar({
  title,
  description,
  location,
  startIso,
}: {
  title: string;
  description: string;
  location: string;
  startIso: string;
}) {
  const [open, setOpen] = useState(false);
  const event = {
    title,
    description,
    location,
    start: new Date(startIso),
    durationMinutes: 180,
  };

  return (
    <div className="relative inline-block text-left">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-haspopup="menu"
        className="inline-flex min-h-[44px] items-center gap-2 rounded-full bg-gold px-5 py-2.5 font-semibold text-ink shadow-[0_10px_24px_-10px_rgba(176,125,0,0.7)] transition-transform hover:scale-[1.03] active:scale-[0.97]"
      >
        <CalendarIcon width={18} height={18} />
        Add to Calendar
      </button>
      {open && (
        <div
          role="menu"
          className="clay absolute left-1/2 z-20 mt-2 w-60 -translate-x-1/2 p-2"
        >
          <a
            role="menuitem"
            href={googleCalendarUrl(event)}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setOpen(false)}
            className="flex min-h-[44px] items-center gap-2 rounded-2xl px-3 py-2 font-semibold text-ink hover:bg-blush-soft"
          >
            <ExternalIcon width={18} height={18} />
            Google Calendar
          </a>
          <a
            role="menuitem"
            href={icsDataUrl(event)}
            download="christening.ics"
            onClick={() => setOpen(false)}
            className="flex min-h-[44px] items-center gap-2 rounded-2xl px-3 py-2 font-semibold text-ink hover:bg-blush-soft"
          >
            <DownloadIcon width={18} height={18} />
            Apple / Outlook (.ics)
          </a>
        </div>
      )}
    </div>
  );
}
