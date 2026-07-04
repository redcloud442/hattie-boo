"use client";

import { useActionState, useState } from "react";
import { submitRsvp, type RsvpState } from "@/app/christening/actions";
import { Confetti } from "@/components/Confetti";
import { CheckIcon, HeartIcon } from "@/components/icons";

type Props = {
  slug: string;
  accessKey: string;
  role: string;
  name: string;
  initialStatus: "pending" | "attending" | "declined";
  initialMessage: string | null;
  alreadyResponded: boolean;
  onDone?: () => void;
};

const initial: RsvpState = { ok: false };

export function RsvpForm(props: Props) {
  const [state, action, pending] = useActionState(submitRsvp, initial);
  const [attending, setAttending] = useState(props.initialStatus !== "declined");
  const [editing, setEditing] = useState(!props.alreadyResponded);

  const done = state.ok || (props.alreadyResponded && !editing);

  if (done) {
    const status = state.ok
      ? attending
        ? "attending"
        : "declined"
      : props.initialStatus;
    return (
      <div className="clay relative overflow-hidden p-6 text-center sm:p-8">
        {state.ok && attending && <Confetti />}
        <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-rose-deep text-white">
          {status === "declined" ? (
            <HeartIcon width={28} height={28} />
          ) : (
            <CheckIcon width={28} height={28} />
          )}
        </div>
        <h3 className="font-display text-2xl text-rose-deep">
          {status === "attending"
            ? "Yay! We can't wait to see you 💕"
            : "Thank you for letting us know"}
        </h3>
        <p className="mx-auto mt-2 max-w-sm text-ink-soft">
          {status === "attending"
            ? `Dear ${props.name}, Thank you for saying “yes”. I’m so blessed to have you in my life.`
            : `Dear ${props.name}, we'll miss you — but thank you for your love and prayers.`}
        </p>
        <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
          <button
            type="button"
            onClick={() => setEditing(true)}
            className="min-h-[44px] rounded-full px-5 py-2 font-semibold text-rose-deep underline decoration-blush decoration-2 underline-offset-4"
          >
            Update my response
          </button>
          {props.onDone && (
            <button
              type="button"
              onClick={props.onDone}
              className="min-h-[44px] rounded-full bg-lavender px-6 py-2 font-semibold text-ink"
            >
              Close
            </button>
          )}
        </div>
      </div>
    );
  }

  return (
    <form action={action} className="clay p-6 sm:p-8">
      <input type="hidden" name="slug" value={props.slug} />
      <input type="hidden" name="key" value={props.accessKey} />

      <fieldset className="mb-5">
        <legend className="mb-2 font-display text-lg text-ink">
          Will you be able to attend?
        </legend>
        <div className="grid grid-cols-2 gap-3">
          <label
            className={`flex min-h-[52px] cursor-pointer items-center justify-center gap-2 rounded-2xl border-2 px-4 py-3 font-semibold transition ${
              attending
                ? "border-rose-deep bg-blush-soft text-rose-deep"
                : "border-blush bg-white text-ink-soft"
            }`}
          >
            <input
              type="radio"
              name="attending"
              value="yes"
              className="sr-only"
              checked={attending}
              onChange={() => setAttending(true)}
            />
            Joyfully, yes!
          </label>
          <label
            className={`flex min-h-[52px] cursor-pointer items-center justify-center gap-2 rounded-2xl border-2 px-4 py-3 font-semibold transition ${
              !attending
                ? "border-rose-deep bg-blush-soft text-rose-deep"
                : "border-blush bg-white text-ink-soft"
            }`}
          >
            <input
              type="radio"
              name="attending"
              value="no"
              className="sr-only"
              checked={!attending}
              onChange={() => setAttending(false)}
            />
            Sadly, no
          </label>
        </div>
      </fieldset>

      <div className="mb-6">
        <label
          htmlFor="message"
          className="mb-1.5 block font-display text-lg text-ink"
        >
          A message for the family{" "}
          <span className="font-body text-sm font-normal text-ink-soft">
            (optional)
          </span>
        </label>
        <textarea
          id="message"
          name="message"
          rows={3}
          defaultValue={props.initialMessage ?? ""}
          maxLength={1000}
          placeholder="Write a little blessing or note…"
          className="clay-inset w-full rounded-2xl border-2 border-blush bg-white px-4 py-3 text-ink outline-none placeholder:text-ink-soft/60 focus:border-rose-deep"
        />
      </div>

      {state.error && (
        <p role="alert" className="mb-4 text-sm font-semibold text-danger">
          {state.error}
        </p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="inline-flex min-h-[52px] w-full items-center justify-center gap-2 rounded-full bg-rose-deep px-6 py-3 text-lg font-bold text-white shadow-[0_14px_30px_-12px_rgba(214,31,117,0.8)] transition-transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-60"
      >
        {pending ? "Sending…" : "Confirm"}
        {!pending && <HeartIcon width={20} height={20} />}
      </button>
    </form>
  );
}
