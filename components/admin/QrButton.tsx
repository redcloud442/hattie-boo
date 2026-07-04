"use client";

import { useState } from "react";
import { DownloadIcon } from "@/components/icons";

// Shows a print-ready QR (PNG data URL generated on the server) in a popover
// with a download link. Used for both the general invite QR and the exclusive
// godparent QR — labels/captions are configurable.
export function QrButton({
  dataUrl,
  filename,
  guestName,
  label = "QR code",
  caption = "Scan to open the invitation",
  variant = "lavender",
}: {
  dataUrl: string;
  filename: string;
  guestName: string;
  label?: string;
  caption?: string;
  variant?: "lavender" | "gold";
}) {
  const [open, setOpen] = useState(false);

  const triggerCls =
    variant === "gold"
      ? "border-gold-deep/40 bg-gold/70 text-ink"
      : "border-lavender-deep/40 bg-lavender text-ink";

  return (
    <div className="relative inline-block">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className={`inline-flex min-h-[40px] items-center gap-1.5 rounded-full border-2 px-3 py-1.5 text-sm font-semibold transition hover:brightness-105 ${triggerCls}`}
      >
        {label}
      </button>
      {open && (
        <div className="clay absolute right-0 z-30 mt-2 w-56 p-3">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={dataUrl}
            alt={`${label} for ${guestName}`}
            width={200}
            height={200}
            className="mx-auto h-auto w-full rounded-2xl border-2 border-blush"
          />
          <p className="mt-2 text-center text-xs text-ink-soft">{caption}</p>
          <a
            href={dataUrl}
            download={filename}
            className="mt-2 inline-flex min-h-[40px] w-full items-center justify-center gap-1.5 rounded-full bg-rose-deep px-3 py-1.5 text-sm font-semibold text-white"
          >
            <DownloadIcon width={16} height={16} />
            Download PNG
          </a>
        </div>
      )}
    </div>
  );
}
