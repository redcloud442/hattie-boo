"use client";

import { useTransition } from "react";
import { deleteGuestAction } from "@/app/admin/actions";

export function DeleteGuestButton({
  id,
  name,
}: {
  id: string;
  name: string;
}) {
  const [pending, startTransition] = useTransition();

  function onClick() {
    if (!window.confirm(`Delete the invitation for ${name}? This can't be undone.`)) {
      return;
    }
    const fd = new FormData();
    fd.set("id", id);
    startTransition(() => deleteGuestAction(fd));
  }

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={pending}
      className="min-h-[40px] rounded-full px-3 py-1.5 text-sm font-semibold text-danger underline decoration-2 underline-offset-2 hover:bg-danger/10 disabled:opacity-50"
    >
      {pending ? "Deleting…" : "Delete"}
    </button>
  );
}
