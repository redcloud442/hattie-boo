// Soft watercolor backdrop: pastel cloud washes in the corners + gentle glows.
// Purely ornamental → aria-hidden. Motion disabled under prefers-reduced-motion.

function Cloud({
  className,
  color,
}: {
  className: string;
  color: string;
}) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 200 120"
      className={className}
      fill={color}
      style={{ filter: "blur(2px)" }}
    >
      <ellipse cx="100" cy="70" rx="80" ry="34" />
      <circle cx="60" cy="66" r="30" />
      <circle cx="140" cy="64" r="34" />
      <circle cx="100" cy="48" r="40" />
    </svg>
  );
}

export function FairytaleBackground() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-20 overflow-hidden"
    >
      {/* warm base wash */}
      <div className="absolute inset-0 bg-[radial-gradient(120%_80%_at_50%_-10%,#ffe8f0_0%,transparent_55%)]" />
      <div className="absolute -top-16 -left-16 h-64 w-64 rounded-full bg-blush/40 blur-3xl" />
      <div className="absolute top-1/3 -right-20 h-72 w-72 rounded-full bg-gold/15 blur-3xl" />
      <div className="absolute bottom-0 left-1/4 h-64 w-64 rounded-full bg-lavender/40 blur-3xl" />

      {/* corner watercolor clouds */}
      <Cloud className="animate-float-slow absolute -left-8 top-16 w-44 opacity-80" color="var(--color-blush)" />
      <Cloud className="animate-float absolute -right-6 top-28 w-40 opacity-70" color="#ffe9a8" />
      <Cloud className="animate-float-slow absolute -left-6 bottom-28 w-36 opacity-70" color="#ffe9a8" />
      <Cloud className="animate-float absolute -right-10 bottom-16 w-44 opacity-80" color="var(--color-blush)" />
    </div>
  );
}
