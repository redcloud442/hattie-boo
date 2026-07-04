"use client";

import { useActionState, useState } from "react";
import { loginAction, type FormState } from "@/app/admin/actions";
import { HeartIcon } from "@/components/icons";

const initial: FormState = { ok: false };

export function AdminLogin() {
  const [state, action, pending] = useActionState(loginAction, initial);
  const [show, setShow] = useState(false);

  return (
    <main className="mx-auto flex min-h-dvh w-full max-w-sm flex-col items-center justify-center px-6">
      <div className="clay w-full p-8">
        <div className="mb-5 text-center">
          <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-rose-deep text-white">
            <HeartIcon width={28} height={28} />
          </div>
          <h1 className="text-2xl text-rose-deep">Host Dashboard</h1>
          <p className="mt-1 text-sm text-ink-soft">
            Sign in to manage invitations
          </p>
        </div>
        <form action={action}>
          <label
            htmlFor="password"
            className="mb-1.5 block font-semibold text-ink"
          >
            Password
          </label>
          <div className="relative">
            <input
              id="password"
              name="password"
              type={show ? "text" : "password"}
              autoComplete="current-password"
              required
              className="clay-inset min-h-[48px] w-full rounded-2xl border-2 border-blush bg-white px-4 py-2 pr-16 text-ink outline-none focus:border-rose-deep"
            />
            <button
              type="button"
              onClick={() => setShow((v) => !v)}
              className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full px-3 py-1.5 text-sm font-semibold text-rose-deep"
            >
              {show ? "Hide" : "Show"}
            </button>
          </div>
          {state.error && (
            <p role="alert" className="mt-3 text-sm font-semibold text-danger">
              {state.error}
            </p>
          )}
          <button
            type="submit"
            disabled={pending}
            className="mt-5 min-h-[48px] w-full rounded-full bg-rose-deep px-6 py-3 font-bold text-white transition-transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-60"
          >
            {pending ? "Signing in…" : "Sign in"}
          </button>
        </form>
      </div>
    </main>
  );
}
