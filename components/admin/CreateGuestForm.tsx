"use client";

import { useActionState, useEffect, useRef } from "react";
import { createGuestAction, type FormState } from "@/app/admin/actions";

const initial: FormState = { ok: false };

export function CreateGuestForm() {
  const [state, action, pending] = useActionState(createGuestAction, initial);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.ok) formRef.current?.reset();
  }, [state.ok]);

  return (
    <form ref={formRef} action={action} className="clay p-5 sm:p-6">
      <h2 className="mb-4 font-display text-xl text-rose-deep">
        Create an invitation
      </h2>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="mb-1 block text-sm font-semibold text-ink">
            Guest name <span className="text-danger">*</span>
          </label>
          <input
            id="name"
            name="name"
            required
            placeholder="e.g. Juan Dela Cruz"
            className="clay-inset min-h-[44px] w-full rounded-xl border-2 border-blush bg-white px-3 py-2 text-ink outline-none focus:border-rose-deep"
          />
        </div>
        <div>
          <label htmlFor="role" className="mb-1 block text-sm font-semibold text-ink">
            Guest type <span className="text-danger">*</span>
          </label>
          <select
            id="role"
            name="role"
            required
            defaultValue=""
            className="clay-inset min-h-[44px] w-full rounded-xl border-2 border-blush bg-white px-3 py-2 text-ink outline-none focus:border-rose-deep"
          >
            <option value="" disabled>
              Choose…
            </option>
            <option value="ninong">Ninong (godfather) — RSVP + QR</option>
            <option value="ninang">Ninang (godmother) — RSVP + QR</option>
            <option value="invitation_only">Invitation only — view only</option>
          </select>
        </div>
      </div>

      <div className="mt-4">
        <label
          htmlFor="personalMessage"
          className="mb-1 block text-sm font-semibold text-ink"
        >
          Personal message{" "}
          <span className="font-normal text-ink-soft">(optional)</span>
        </label>
        <textarea
          id="personalMessage"
          name="personalMessage"
          rows={2}
          placeholder="A warm note shown on their invitation…"
          className="clay-inset w-full rounded-xl border-2 border-blush bg-white px-3 py-2 text-ink outline-none focus:border-rose-deep"
        />
      </div>

      {state.error && (
        <p role="alert" className="mt-3 text-sm font-semibold text-danger">
          {state.error}
        </p>
      )}
      {state.ok && (
        <p role="status" className="mt-3 text-sm font-semibold text-success">
          Invitation created! It's in the list below.
        </p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="mt-4 min-h-[48px] w-full rounded-full bg-rose-deep px-6 py-3 font-bold text-white transition-transform hover:scale-[1.01] active:scale-[0.99] disabled:opacity-60 sm:w-auto sm:px-8"
      >
        {pending ? "Creating…" : "Generate invite link"}
      </button>
    </form>
  );
}
