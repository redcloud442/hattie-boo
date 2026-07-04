"use client";

import { useState } from "react";
import { CheckIcon, CopyIcon } from "@/components/icons";

export function CopyButton({
  text,
  label = "Copy link",
}: {
  text: string;
  label?: string;
}) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      // Fallback for older browsers
      const el = document.createElement("textarea");
      el.value = text;
      document.body.appendChild(el);
      el.select();
      document.execCommand("copy");
      document.body.removeChild(el);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  }

  return (
    <button
      type="button"
      onClick={copy}
      className="inline-flex min-h-[40px] items-center gap-1.5 rounded-full border-2 border-blush bg-white px-3 py-1.5 text-sm font-semibold text-rose-deep transition hover:bg-blush-soft"
    >
      {copied ? <CheckIcon width={16} height={16} /> : <CopyIcon width={16} height={16} />}
      {copied ? "Copied!" : label}
    </button>
  );
}
