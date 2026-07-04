"use client";

import { useEffect, useRef, useState } from "react";
import { RsvpForm } from "@/components/RsvpForm";

type Props = {
  slug: string;
  accessKey: string;
  role: string;
  name: string;
  initialStatus: "pending" | "attending" | "declined";
  initialMessage: string | null;
  alreadyResponded: boolean;
};

export function RsvpModal(props: Props) {
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
      triggerRef.current?.focus();
    };
  }, [open]);

  const responded = props.alreadyResponded;

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setOpen(true)}
        className="inline-flex min-h-[52px] items-center justify-center gap-2 rounded-full bg-rose-deep px-8 py-3 text-lg font-bold text-white shadow-[0_14px_30px_-12px_rgba(214,31,117,0.8)] transition-transform hover:scale-[1.03] active:scale-[0.97]"
      >
      
        {responded ? "View / update my RSVP" : "Click Here To Confirm"}
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center sm:p-4">
          {/* Scrim */}
          <button
            type="button"
            aria-label="Close RSVP"
            onClick={() => setOpen(false)}
            className="absolute inset-0 bg-ink/55 backdrop-blur-sm"
          />
          {/* Panel */}
          <div
            role="dialog"
            aria-modal="true"
            aria-label={`RSVP for ${props.name}`}
            className="animate-pop relative z-10 max-h-[92dvh] w-full overflow-y-auto rounded-t-clay-lg sm:max-w-lg sm:rounded-clay-lg"
          >
            <button
              ref={closeRef}
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close"
              className="absolute right-3 top-3 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-rose-deep shadow ring-2 ring-blush transition-transform hover:scale-105 active:scale-95"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" aria-hidden>
                <path d="M6 6l12 12M18 6L6 18" />
              </svg>
            </button>
            <RsvpForm {...props} onDone={() => setOpen(false)} />
          </div>
        </div>
      )}
    </>
  );
}
