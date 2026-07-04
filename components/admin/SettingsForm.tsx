"use client";

import { useActionState } from "react";
import { saveSettingsAction, type FormState } from "@/app/admin/actions";
import type { EventSettingsModel } from "@/generated/prisma/models";

const initial: FormState = { ok: false };

function Field({
  name,
  label,
  defaultValue,
  placeholder,
  required,
  type = "text",
}: {
  name: string;
  label: string;
  defaultValue?: string;
  placeholder?: string;
  required?: boolean;
  type?: string;
}) {
  return (
    <div>
      <label htmlFor={name} className="mb-1 block text-sm font-semibold text-ink">
        {label} {required && <span className="text-danger">*</span>}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        defaultValue={defaultValue}
        placeholder={placeholder}
        required={required}
        className="clay-inset min-h-[44px] w-full rounded-xl border-2 border-blush bg-white px-3 py-2 text-ink outline-none focus:border-rose-deep"
      />
    </div>
  );
}

export function SettingsForm({
  settings,
  dateTimeValue,
}: {
  settings: EventSettingsModel;
  dateTimeValue: string;
}) {
  const [state, action] = useActionState(saveSettingsAction, initial);

  return (
    <form action={action} className="clay p-5 sm:p-6">
      <h2 className="mb-1 font-display text-xl text-rose-deep">Event details</h2>
      <p className="mb-4 text-sm text-ink-soft">
        These appear on every guest invitation.
      </p>

      <div className="grid gap-4 sm:grid-cols-2">
        <Field name="babyName" label="Baby name" defaultValue={settings.babyName} required />
        <Field name="parentNames" label="Parents" defaultValue={settings.parentNames} />
        <Field
          name="christeningDateTime"
          label="Date & time"
          type="datetime-local"
          defaultValue={dateTimeValue}
          required
        />
        <Field name="dressCode" label="Dress code / note" defaultValue={settings.dressCode ?? ""} />
      </div>

      <h3 className="mt-6 mb-2 font-display text-lg text-ink">Ceremony</h3>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field name="churchName" label="Church name" defaultValue={settings.churchName} />
        <Field name="churchAddress" label="Church address" defaultValue={settings.churchAddress} />
      </div>

      <h3 className="mt-6 mb-2 font-display text-lg text-ink">Reception</h3>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field name="venueName" label="Venue name" defaultValue={settings.venueName} />
        <Field name="venueAddress" label="Venue address" defaultValue={settings.venueAddress} />
      </div>

      <h3 className="mt-6 mb-2 font-display text-lg text-ink">Extras</h3>
      <div className="grid gap-4">
        <Field
          name="heroImageUrl"
          label="Hero image URL (optional)"
          defaultValue={settings.heroImageUrl ?? ""}
          placeholder="https://…"
        />
        <div>
          <label
            htmlFor="thankYouNote"
            className="mb-1 block text-sm font-semibold text-ink"
          >
            Thank-you note (footer)
          </label>
          <textarea
            id="thankYouNote"
            name="thankYouNote"
            rows={3}
            defaultValue={settings.thankYouNote ?? ""}
            className="clay-inset w-full rounded-xl border-2 border-blush bg-white px-3 py-2 text-ink outline-none focus:border-rose-deep"
          />
        </div>
      </div>

      {state.error && (
        <p role="alert" className="mt-3 text-sm font-semibold text-danger">
          {state.error}
        </p>
      )}
      {state.ok && (
        <p role="status" className="mt-3 text-sm font-semibold text-success">
          Saved! Guest pages are updated.
        </p>
      )}

      <button
        type="submit"
        className="mt-5 min-h-[48px] w-full rounded-full bg-rose-deep px-6 py-3 font-bold text-white transition-transform hover:scale-[1.01] active:scale-[0.99] sm:w-auto sm:px-8"
      >
        Save event details
      </button>
    </form>
  );
}
