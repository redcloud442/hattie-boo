"use client";

import { useEffect, useState } from "react";

const COLORS = ["#FFB6C1", "#FF69B4", "#E6E6FA", "#FFD700", "#FFFFFF"];

type Piece = {
  left: number;
  delay: number;
  duration: number;
  color: string;
  size: number;
  rounded: boolean;
};

// One-shot celebratory confetti on mount. Skipped entirely when the user
// prefers reduced motion.
export function Confetti({ pieces = 90 }: { pieces?: number }) {
  const [items, setItems] = useState<Piece[]>([]);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    setItems(
      Array.from({ length: pieces }, () => ({
        left: Math.random() * 100,
        delay: Math.random() * 0.8,
        duration: 2.6 + Math.random() * 2.4,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        size: 7 + Math.random() * 8,
        rounded: Math.random() > 0.5,
      })),
    );
    const t = setTimeout(() => setItems([]), 6000);
    return () => clearTimeout(t);
  }, [pieces]);

  if (items.length === 0) return null;

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-50 overflow-hidden"
    >
      {items.map((p, i) => (
        <span
          key={i}
          style={{
            position: "absolute",
            top: 0,
            left: `${p.left}%`,
            width: p.size,
            height: p.size * (p.rounded ? 1 : 1.6),
            background: p.color,
            borderRadius: p.rounded ? "9999px" : "2px",
            animation: `confetti-fall ${p.duration}s linear ${p.delay}s forwards`,
            boxShadow: "0 1px 2px rgba(0,0,0,0.06)",
          }}
        />
      ))}
    </div>
  );
}
