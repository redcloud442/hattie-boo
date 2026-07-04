import { Bow } from "@/components/decor";

// Coquette wallpaper backdrop: warm blush-cream wash, dainty polka dots, soft
// cloud washes and faint scattered ribbon bows. Purely ornamental → aria-hidden.

function Cloud({ className, color }: { className: string; color: string }) {
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

const FAINT_BOWS = [
  { top: "14%", left: "8%", w: 46, r: -18 },
  { top: "30%", left: "84%", w: 40, r: 14 },
  { top: "52%", left: "6%", w: 36, r: 10 },
  { top: "66%", left: "88%", w: 44, r: -12 },
  { top: "82%", left: "16%", w: 38, r: 16 },
  { top: "88%", left: "76%", w: 42, r: -20 },
];

export function FairytaleBackground() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-20 overflow-hidden"
    >
      {/* blush → cream wash */}
      <div className="absolute inset-0 bg-[linear-gradient(180deg,#fff6f8_0%,#ffeaf1_48%,#ffe0ea_100%)]" />

      {/* dainty polka dots */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(rgba(224,122,158,0.16) 1.6px, transparent 1.7px)",
          backgroundSize: "24px 24px",
          backgroundPosition: "0 0",
        }}
      />

      {/* soft glows */}
      <div className="absolute -top-16 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-ribbon/25 blur-3xl" />
      <div className="absolute top-1/3 -right-20 h-72 w-72 rounded-full bg-gold/12 blur-3xl" />
      <div className="absolute bottom-0 left-1/4 h-64 w-64 rounded-full bg-lavender/35 blur-3xl" />

      {/* corner cloud washes */}
      <Cloud className="animate-float-slow absolute -left-8 top-16 w-44 opacity-80" color="var(--color-blush)" />
      <Cloud className="animate-float absolute -right-6 top-28 w-40 opacity-60" color="#ffe9a8" />
      <Cloud className="animate-float-slow absolute -left-6 bottom-28 w-36 opacity-60" color="#ffdbe6" />
      <Cloud className="animate-float absolute -right-10 bottom-16 w-44 opacity-80" color="var(--color-blush)" />

      {/* faint scattered ribbon bows */}
      {FAINT_BOWS.map((b, i) => (
        <span
          key={i}
          className="animate-float-slow absolute opacity-[0.18]"
          style={{
            top: b.top,
            left: b.left,
            width: b.w,
            transform: `rotate(${b.r}deg)`,
            animationDelay: `${i * 0.4}s`,
          }}
        >
          <Bow color="var(--color-ribbon)" knot="var(--color-ribbon-deep)" />
        </span>
      ))}
    </div>
  );
}
