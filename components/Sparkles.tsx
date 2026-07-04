import { SparkleIcon } from "@/components/icons";

// Decorative floating sparkles. Purely ornamental → aria-hidden, and the
// float/sparkle animations are disabled under prefers-reduced-motion (globals.css).
const SPARKLES = [
  { top: "12%", left: "8%", size: 26, delay: "0s", cls: "animate-float" },
  { top: "22%", left: "84%", size: 34, delay: "0.6s", cls: "animate-float-slow" },
  { top: "48%", left: "6%", size: 20, delay: "1.1s", cls: "animate-float-slow" },
  { top: "62%", left: "90%", size: 28, delay: "0.3s", cls: "animate-float" },
  { top: "80%", left: "14%", size: 22, delay: "0.9s", cls: "animate-float" },
  { top: "88%", left: "78%", size: 30, delay: "0.2s", cls: "animate-float-slow" },
];

export function Sparkles() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {SPARKLES.map((s, i) => (
        <span
          key={i}
          className={`absolute ${s.cls} text-gold`}
          style={{ top: s.top, left: s.left, animationDelay: s.delay }}
        >
          <SparkleIcon
            width={s.size}
            height={s.size}
            className="animate-sparkle drop-shadow-[0_2px_6px_rgba(255,215,0,0.5)]"
            style={{ animationDelay: s.delay, fill: "var(--color-gold)", stroke: "var(--color-gold-deep)" }}
          />
        </span>
      ))}
    </div>
  );
}
