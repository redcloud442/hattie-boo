import Link from "next/link";
import { HeartIcon, SparkleIcon } from "@/components/icons";

// Friendly (never blank) fallback when a godparent link is invalid/expired.
export function AccessDenied() {
  return (
    <main className="mx-auto flex min-h-dvh w-full max-w-md flex-col items-center justify-center px-6 text-center">
      <div className="clay w-full p-8">
        <SparkleIcon
          width={48}
          height={48}
          className="mx-auto"
          style={{ fill: "var(--color-gold)", stroke: "var(--color-gold-deep)" }}
        />
        <h1 className="mt-4 text-2xl text-rose-deep">
          Hmm, this invitation link isn't quite right
        </h1>
        <p className="mt-3 text-ink-soft">
          This special godparent link may have a typo or may have been updated.
          Please double-check the link from your QR code, or kindly reach out to
          the family for a fresh one.
        </p>
        <div className="mt-6 flex items-center justify-center gap-2 text-rose">
          <HeartIcon width={20} height={20} />
          <span className="font-display font-semibold text-rose-deep">
            Thank you for your understanding
          </span>
        </div>
        <Link
          href="/"
          className="mt-6 inline-flex min-h-[44px] items-center justify-center rounded-full bg-lavender px-6 py-2.5 font-semibold text-ink"
        >
          Back to start
        </Link>
      </div>
    </main>
  );
}
