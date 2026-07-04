import Link from "next/link";
import { SparkleIcon } from "@/components/icons";

export default function InviteNotFound() {
  return (
    <main className="mx-auto flex min-h-dvh w-full max-w-md flex-col items-center justify-center px-6 text-center">
      <div className="clay w-full p-8">
        <SparkleIcon
          width={48}
          height={48}
          className="mx-auto"
          style={{ fill: "var(--color-gold)", stroke: "var(--color-gold-deep)" }}
        />
        <h1 className="mt-4 text-2xl text-rose-deep">Invitation not found</h1>
        <p className="mt-3 text-ink-soft">
          We couldn't find this invitation. Please check the link, or reach out
          to the family for a new one.
        </p>
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
