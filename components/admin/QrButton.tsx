"use client";

import { useState } from "react";
import { DownloadIcon } from "@/components/icons";

// Shows a print-ready godparent QR (PNG data URL generated on the server) in a
// popover with a download link.
export function QrButton({
  dataUrl,
  filename,
  guestName,
}: {
  dataUrl: string;
  filename: string;
  guestName: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative inline-block">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="inline-flex min-h-[40px] items-center gap-1.5 rounded-full border-2 border-lavender-deep/40 bg-lavender px-3 py-1.5 text-sm font-semibold text-ink transition hover:brightness-105"
      >
        QR code
      </button>
      {open && (
        <div className="clay absolute right-0 z-30 mt-2 w-56 p-3">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={dataUrl}
            alt={`Godparent QR code for ${guestName}`}
            width={200}
            height={200}
            className="mx-auto h-auto w-full rounded-2xl border-2 border-blush"
          />
          <p className="mt-2 text-center text-xs text-ink-soft">
            Scan to view your godparent invitation
          </p>
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
